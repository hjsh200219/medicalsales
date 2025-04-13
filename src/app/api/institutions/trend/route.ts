import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDateParam = searchParams.get('startDate') || '';
  const endDateParam = searchParams.get('endDate') || '';
  const search = searchParams.get('search') || '';
  const unit = searchParams.get('unit') || 'month';
  
  let startDate = new Date();
  let endDate = new Date();
  
  // 시작 날짜 파싱
  if (startDateParam) {
    try {
      startDate = new Date(startDateParam);
    } catch (error) {
      console.error('시작 날짜 파싱 오류:', error);
      return NextResponse.json({ error: '잘못된 시작 날짜 형식입니다.' }, { status: 400 });
    }
  }

  // 종료 날짜 파싱
  if (endDateParam) {
    try {
      endDate = new Date(endDateParam);
    } catch (error) {
      console.error('종료 날짜 파싱 오류:', error);
      return NextResponse.json({ error: '잘못된 종료 날짜 형식입니다.' }, { status: 400 });
    }
  }

  try {
    // 기본 조건: 시작일 이후 데이터만 가져오기
    let whereInput: Prisma.institutionsWhereInput = {
      open_date: {
        not: null,
        gte: startDate.toISOString().split('T')[0]
      }
    };

    // 종료 날짜가 제공된 경우 추가
    if (endDateParam) {
      whereInput = {
        ...whereInput,
        open_date: {
          ...whereInput.open_date as object,
          lte: endDate.toISOString().split('T')[0]
        }
      };
    }

    // 검색어가 제공된 경우 주소 필터링 추가
    if (search) {
      whereInput = {
        ...whereInput,
        address: {
          contains: search,
          mode: 'insensitive' as Prisma.QueryMode
        }
      };
    }

    // 기관 데이터 조회
    const institutions = await prisma.institutions.findMany({
      where: whereInput,
      select: {
        id: true,
        name: true,
        address: true,
        open_date: true,
        type: true
      }
    });

    return NextResponse.json({ 
      institutions,
      meta: {
        total: institutions.length,
        unit,
        startDate: startDate.toISOString(),
        endDate: endDateParam ? endDate.toISOString() : new Date().toISOString(),
        search: search || undefined
      }
    });
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    return NextResponse.json({ error: '데이터를 조회하는 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 