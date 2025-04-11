import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET: 고객 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 쿼리 파라미터
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const skip = (page - 1) * pageSize;

    // 검색 조건 설정
    const whereCondition: {
      OR?: { [key: string]: { contains: string } }[];
      tier?: string;
    } = {};
    
    // 검색어가 있는 경우 검색 조건 추가
    if (search) {
      whereCondition.OR = [
        { customer_name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
        { address_company: { contains: search } },
        { phone: { contains: search } },
        { mobile: { contains: search } },
      ];
    }
    
    // 등급 필터가 있는 경우 필터 조건 추가
    if (tier) {
      whereCondition.tier = tier;
    }

    // 고객 목록 조회
    const customers = await prisma.customer_info.findMany({
      where: whereCondition,
      skip,
      take: pageSize,
      orderBy: { created_at: 'desc' },
    });

    // 전체 고객 수 조회
    const total = await prisma.customer_info.count({ where: whereCondition });

    return NextResponse.json({
      customers,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }
    });
  } catch (error) {
    console.error('고객 목록 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// POST: 고객 등록
export async function POST(request: NextRequest) {
  try {
    // 세션 확인 (로그인 필요)
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { 
      customer_name, email, phone, mobile, address, lat, lng, 
      comment, company, position, tier, address_company, lat_company, lng_company 
    } = body;

    // 필수 필드 검증
    if (!customer_name) {
      return NextResponse.json({ error: '고객명은 필수 항목입니다' }, { status: 400 });
    }

    // 고객 정보 저장
    const customer = await prisma.customer_info.create({
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
        created_by: session.user.id || session.user.email,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('고객 등록 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
} 