import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET: 고객 상세 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    const id = params.id;
    const body = await request.json();
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

    // 고객 정보 업데이트
    const updatedCustomer = await prisma.customer_info.update({
      where: { id },
      data: {
        customer_name,
        email,
        phone,
        mobile,
        address,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        comment,
        company,
        position,
        tier,
        address_company,
        lat_company: lat_company ? parseFloat(lat_company) : null,
        lng_company: lng_company ? parseFloat(lng_company) : null,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('고객 정보 수정 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// DELETE: 고객 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    const id = params.id;

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