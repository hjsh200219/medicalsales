import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma'; // 싱글톤 Prisma 클라이언트 사용

interface RouteParams {
  params: {
    id: string;
  };
}

// GET: 고객 상세 정보 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    const id = params.id;

    // 고객 정보 조회
    const customer = await prisma.customer_info.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('고객 정보 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// PATCH: 고객 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // request.json()을 먼저 await하고 params.id 사용
    const body = await request.json();
    const { id } = params;

    const { 
      customer_name, email, phone, mobile, address, lat, lng, 
      comment, company, position, tier, address_company, lat_company, lng_company 
    } = body;

    // 필수 필드 검증
    if (!customer_name) {
      return NextResponse.json({ error: '고객명은 필수 항목입니다' }, { status: 400 });
    }

    // 고객 존재 여부 확인
    const existingCustomer = await prisma.customer_info.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }

    // 좌표 데이터 안전하게 변환
    const processCoordinate = (value: string | number | null | undefined): number | null => {
      if (value === null || value === undefined || value === '') {
        return null;
      }
      
      // 문자열인 경우 숫자로 변환 시도
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
      }
      
      // 이미 숫자인 경우 그대로 반환
      if (typeof value === 'number') {
        return isNaN(value) ? null : value;
      }
      
      return null;
    };

    // 고객 정보 업데이트 데이터 준비
    const updateData = {
      customer_name,
      email: email || null,
      phone: phone || null,
      mobile: mobile || null,
      address: address || null,
      lat: processCoordinate(lat),
      lng: processCoordinate(lng),
      comment: comment || null,
      company: company || null,
      position: position || null,
      tier: tier || null,
      address_company: address_company || null,
      lat_company: processCoordinate(lat_company),
      lng_company: processCoordinate(lng_company),
      updated_at: new Date()
    };

    console.log('고객 정보 업데이트 데이터:', updateData);

    // 고객 정보 업데이트
    try {
      console.log('업데이트 시도:', { id, ...updateData });
      
      // ID 확인
      if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: '유효하지 않은 ID입니다' }, { status: 400 });
      }
      
      // Prisma 간단한 업데이트 접근법 시도
      const updatedCustomer = await prisma.$transaction(async (tx) => {
        try {
          return await tx.customer_info.update({
            where: { id },
            data: {
              customer_name: updateData.customer_name,
              email: updateData.email,
              phone: updateData.phone,
              mobile: updateData.mobile, 
              address: updateData.address,
              lat: updateData.lat,
              lng: updateData.lng,
              comment: updateData.comment,
              company: updateData.company,
              position: updateData.position,
              tier: updateData.tier,
              address_company: updateData.address_company,
              lat_company: updateData.lat_company,
              lng_company: updateData.lng_company,
              updated_at: new Date()
            }
          });
        } catch (txErr) {
          console.error('트랜잭션 내 업데이트 오류:', txErr);
          throw txErr;
        }
      });
      
      console.log('업데이트 성공:', updatedCustomer);
      return NextResponse.json(updatedCustomer);
    } catch (error) {
      // 자세한 오류 로깅
      console.error('업데이트 오류 상세:');
      console.error(error instanceof Error ? error.message : '알 수 없는 오류');
      console.error(error instanceof Error && error.stack ? error.stack : '스택 정보 없음');
      
      // 클라이언트에 반환할 오류 메시지와 함께 HTTP 상태 코드 조정
      return NextResponse.json({ 
        error: '고객 정보 업데이트 중 오류가 발생했습니다',
        details: error instanceof Error ? error.message : '알 수 없는 오류' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('고객 정보 수정 중 오류 발생 세부 정보:');
    console.error(error instanceof Error ? error.message : '알 수 없는 오류');
    console.error(error instanceof Error && error.stack ? error.stack : '스택 정보 없음');
    
    return NextResponse.json({ 
      error: '서버 오류가 발생했습니다',
      details: error instanceof Error ? error.message : '알 수 없는 오류'  
    }, { status: 500 });
  }
}

// DELETE: 고객 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    const { id } = params; // 수정: params 객체 구조 분해를 통해 id 사용

    // 고객 존재 여부 확인
    const existingCustomer = await prisma.customer_info.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }

    // 고객 삭제
    await prisma.customer_info.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('고객 삭제 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
} 