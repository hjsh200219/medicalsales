import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';

interface Institution {
  id: number;
  name: string;
  open_date: string | null;
  phone: string | null;
  address: string | null;
  type: string | null;
  lat: Decimal | null;
  lng: Decimal | null;
  created_at: Date | null;
}

export async function GET() {
  try {
    // 데이터베이스에서 의료기관 정보 가져오기
    const institutions = await db.$queryRaw<Institution[]>`
      SELECT * FROM institutions 
      ORDER BY name ASC 
      LIMIT 50
    `;
    
    // Decimal 객체를 문자열로 변환
    const serializedInstitutions = institutions.map((inst) => ({
      ...inst,
      lat: inst.lat ? inst.lat.toString() : null,
      lng: inst.lng ? inst.lng.toString() : null,
      created_at: inst.created_at ? inst.created_at.toISOString() : null
    }));

    return NextResponse.json(serializedInstitutions);
  } catch (error) {
    console.error('데이터 로딩 중 오류:', error);
    return NextResponse.json(
      { error: '의료기관 데이터를 조회하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 