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
    const { customers } = await request.json();

    if (!Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json({ message: '유효한 고객 데이터가 없습니다.' }, { status: 400 });
    }

    // 결과 추적용 변수
    let successCount = 0;
    let failedCount = 0;

    // 각 고객 데이터 처리
    for (const customerData of customers) {
      try {
        // 필수 필드 확인
        if (!customerData.customer_name || !customerData.company || !customerData.address) {
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

        // 고객 데이터 저장
        await prisma.customer_info.create({
          data: {
            customer_name: customerData.customer_name,
            company: customerData.company,
            phone: customerData.phone || null,
            mobile: customerData.mobile || null,
            email: customerData.email || null,
            address: customerData.address,
            address_company: customerData.address_company || null, 
            lat: lat,
            lng: lng,
            lat_company: lat_company,
            lng_company: lng_company,
            tier: customerData.tier || 'C',
            position: customerData.position || null,
            comment: customerData.comment || null,
            created_by: session.user.id, // 현재 로그인한 사용자 ID
          },
        });

        successCount++;
      } catch (customerError) {
        console.error('Error processing customer:', customerError);
        failedCount++;
      }
    }

    // 결과 반환
    return NextResponse.json({
      success: successCount,
      failed: failedCount,
      message: `${successCount}명의 고객이 성공적으로 등록되었습니다.`
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json({ 
      success: 0,
      failed: 0,
      message: '고객 등록 중 오류가 발생했습니다.' 
    }, { status: 500 });
  }
} 