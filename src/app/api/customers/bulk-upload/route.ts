import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@/generated/prisma';
import axios from 'axios';

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
    const { customers, registeredBy } = body;

    if (!Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json({ message: '유효한 고객 데이터가 없습니다.' }, { status: 400 });
    }

    // 등록자 정보 확인
    const userEmail = registeredBy?.email || session.user.email || '';

    // 결과 추적용 변수
    let successCount = 0;
    let failedCount = 0;
    const errors = [];

    // 각 고객 데이터 처리
    for (let i = 0; i < customers.length; i++) {
      const customerData = customers[i];
      
      try {
        // 필수 필드 확인
        if (!customerData.customer_name) {
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
              const geocodeResponse = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(customerData.address)}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY || process.env.KAKAO_API_KEY}`
                  }
                }
              );
              
              if (
                geocodeResponse.data.documents && 
                geocodeResponse.data.documents.length > 0
              ) {
                const location = geocodeResponse.data.documents[0];
                lat = parseFloat(location.y); // 위도
                lng = parseFloat(location.x); // 경도
              }
            } catch {
              // 지오코딩 실패해도 계속 진행
            }
          }

          // 회사 주소 위경도 변환
          if (customerData.address_company) {
            try {
              const geocodeResponseCompany = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(customerData.address_company)}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY || process.env.KAKAO_API_KEY}`
                  }
                }
              );
              
              if (
                geocodeResponseCompany.data.documents && 
                geocodeResponseCompany.data.documents.length > 0
              ) {
                const locationCompany = geocodeResponseCompany.data.documents[0];
                lat_company = parseFloat(locationCompany.y); // 위도
                lng_company = parseFloat(locationCompany.x); // 경도
              }
            } catch {
              // 지오코딩 실패해도 계속 진행
            }
          }
        } catch {
          // 지오코딩에 실패해도 계속 진행 (위경도 없이 저장)
        }
        
        // 고객 데이터 저장
        await prisma.customer_info.create({
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
            created_by: userEmail,
          },
        });
        
        successCount++;
      } catch (customerError) {
        errors.push(`고객 #${i+1}: ${customerError instanceof Error ? customerError.message : '데이터 처리 오류'}`);
        failedCount++;
      }
    }
    
    // 결과 반환
    return new NextResponse(
      JSON.stringify({
        success: successCount,
        failed: failedCount,
        errors: errors.length > 0 ? errors : undefined,
        message: `${successCount}명의 고객이 성공적으로 등록되었습니다.`
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache'
        }
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ 
        success: 0,
        failed: 0,
        message: '고객 등록 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache'
        }
      }
    );
  }
}