import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@/generated/prisma';
import axios, { AxiosError } from 'axios';

// Prisma 클라이언트 초기화
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  // 세션 확인 (로그인 상태 확인)
  const session = await getServerSession();
  
  if (!session || !session.user) {
    return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('요청 본문:', JSON.stringify(body));
    
    const { customers, registeredBy } = body;

    if (!Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json({ message: '유효한 고객 데이터가 없습니다.' }, { status: 400 });
    }
    
    console.log(`총 ${customers.length}명의 고객 데이터 처리 시작`);

    // 등록자 정보 확인
    const userId = registeredBy?.id || session.user.id || session.user.email;
    console.log('등록자 정보:', userId);

    // 결과 추적용 변수
    let successCount = 0;
    let failedCount = 0;
    const errors = [];

    // 각 고객 데이터 처리
    for (let i = 0; i < customers.length; i++) {
      const customerData = customers[i];
      
      try {
        console.log(`고객 데이터 #${i+1} 처리 중:`, JSON.stringify(customerData));
        
        // 필수 필드 확인
        if (!customerData.customer_name) {
          console.log(`고객 #${i+1}: 고객명 누락`);
          errors.push(`고객 #${i+1}: 고객명은 필수 항목입니다`);
          failedCount++;
          continue;
        }

        // 주소를 위경도로 변환
        let lat = null;
        let lng = null;
        let lat_company = null;
        let lng_company = null;

        try {
          // 개인 주소 위경도 변환
          if (customerData.address) {
            try {
              console.log('개인 주소 위경도 변환 시도:', customerData.address);
              const geocodeResponse = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(customerData.address)}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY || process.env.KAKAO_API_KEY}`
                  }
                }
              );
              
              console.log('Kakao API 응답:', JSON.stringify(geocodeResponse.data));
              
              if (
                geocodeResponse.data.documents && 
                geocodeResponse.data.documents.length > 0
              ) {
                const location = geocodeResponse.data.documents[0];
                lat = parseFloat(location.y); // 위도
                lng = parseFloat(location.x); // 경도
                console.log('변환된 위경도:', lat, lng);
              } else {
                console.log('주소에 대한 좌표를 찾을 수 없음:', customerData.address);
              }
            } catch (err: unknown) {
              const axiosError = err as AxiosError;
              console.error('개인 주소 변환 실패:', axiosError.message);
              if (axiosError.response) {
                console.error('응답 데이터:', axiosError.response.data);
                console.error('응답 상태:', axiosError.response.status);
              }
            }
          }

          // 회사 주소 위경도 변환
          if (customerData.address_company) {
            try {
              console.log('회사 주소 위경도 변환 시도:', customerData.address_company);
              const geocodeResponseCompany = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(customerData.address_company)}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY || process.env.KAKAO_API_KEY}`
                  }
                }
              );
              
              console.log('Kakao API 응답(회사):', JSON.stringify(geocodeResponseCompany.data));
              
              if (
                geocodeResponseCompany.data.documents && 
                geocodeResponseCompany.data.documents.length > 0
              ) {
                const locationCompany = geocodeResponseCompany.data.documents[0];
                lat_company = parseFloat(locationCompany.y); // 위도
                lng_company = parseFloat(locationCompany.x); // 경도
                console.log('변환된 회사 위경도:', lat_company, lng_company);
              } else {
                console.log('회사 주소에 대한 좌표를 찾을 수 없음:', customerData.address_company);
              }
            } catch (err: unknown) {
              const axiosError = err as AxiosError;
              console.error('회사 주소 변환 실패:', axiosError.message);
              if (axiosError.response) {
                console.error('응답 데이터:', axiosError.response.data);
                console.error('응답 상태:', axiosError.response.status);
              }
            }
          }
        } catch (geocodeError) {
          console.error('Geocoding 전체 오류:', geocodeError);
          // 지오코딩에 실패해도 계속 진행 (위경도 없이 저장)
        }

        console.log(`고객 #${i+1} 데이터베이스에 저장 시도`);
        
        // 고객 데이터 저장
        const newCustomer = await prisma.customer_info.create({
          data: {
            customer_name: customerData.customer_name,
            company: customerData.company || '',
            phone: customerData.phone || null,
            mobile: customerData.mobile || null,
            email: customerData.email || null,
            address: customerData.address || '',
            address_company: customerData.address_company || null, 
            lat: lat,
            lng: lng,
            lat_company: lat_company,
            lng_company: lng_company,
            tier: customerData.tier || 'C',
            position: customerData.position || null,
            comment: customerData.comment || null,
            created_by: userId,
          },
        });
        
        console.log(`고객 #${i+1} 저장 성공:`, newCustomer.id);
        successCount++;
      } catch (customerError) {
        console.error(`고객 #${i+1} 처리 중 오류:`, customerError);
        errors.push(`고객 #${i+1}: ${customerError instanceof Error ? customerError.message : '데이터 처리 오류'}`);
        failedCount++;
      }
    }

    console.log(`고객 데이터 처리 완료: 성공=${successCount}, 실패=${failedCount}`);
    
    // 결과 반환
    return NextResponse.json({
      success: successCount,
      failed: failedCount,
      errors: errors.length > 0 ? errors : undefined,
      message: `${successCount}명의 고객이 성공적으로 등록되었습니다.`
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json({ 
      success: 0,
      failed: 0,
      message: '고객 등록 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
} 