import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';
import { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    // URL 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // 필터 파라미터 추출
    const search = searchParams.get('search');
    const region = searchParams.get('region');
    const type = searchParams.get('type');
    const date = searchParams.get('date');
    
    console.log('[API] 요청 파라미터:', { offset, limit, search, region, type, date });
    
    // 필터링 조건 구성
    const conditions: string[] = [];
    const queryParams: (string | number)[] = [];
    let paramIndex = 1;
    
    // 검색어 필터
    if (search) {
      conditions.push(`(name ILIKE $${paramIndex} OR phone ILIKE $${paramIndex+1} OR address ILIKE $${paramIndex+2})`);
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
      console.log(`[API] 검색어 필터 추가: 검색어=${search}, 파라미터 인덱스=${paramIndex}-${paramIndex+2}`);
      paramIndex += 3;
    }
    
    // 의료기관 유형 필터
    if (type && type !== 'all') {
      conditions.push(`type = $${paramIndex}`);
      queryParams.push(type);
      console.log(`[API] 유형 필터 추가: 유형=${type}, 파라미터 인덱스=${paramIndex}`);
      paramIndex += 1;
    }
    
    // 날짜 필터
    if (date && date !== 'all') {
      let startDate = new Date();
      const endDate = new Date(); // 종료일은 항상 오늘(현재)로 설정
      
      // 디버깅을 위한 현재 날짜 로깅
      console.log(`[API] 현재 날짜: ${endDate.toISOString()}`);
      
      switch (date) {
        case 'week':
          startDate.setDate(startDate.getDate() - 7);
          console.log(`[API] 최근 1주일 선택: ${startDate.toISOString()} ~ ${endDate.toISOString()}`);
          break;
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1);
          console.log(`[API] 최근 1개월 선택: ${startDate.toISOString()} ~ ${endDate.toISOString()}`);
          break;
        case 'halfYear':
          startDate.setMonth(startDate.getMonth() - 6);
          console.log(`[API] 최근 6개월 선택: ${startDate.toISOString()} ~ ${endDate.toISOString()}`);
          break;
        case 'year':
          startDate.setFullYear(startDate.getFullYear() - 1);
          console.log(`[API] 최근 1년 선택: ${startDate.toISOString()} ~ ${endDate.toISOString()}`);
          break;
        case 'twoYears':
          // 최근 1~2년은 2년 전부터 1년 전까지
          startDate.setFullYear(startDate.getFullYear() - 2);
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          
          // endDate는 oneYearAgo로 설정 (1년 전)
          console.log(`[API] 최근 1~2년 선택: ${startDate.toISOString()} ~ ${oneYearAgo.toISOString()}`);
          
          // 날짜 형식 변환 (YYYYMMDD)
          const startDateStr = `${startDate.getFullYear()}${(startDate.getMonth() + 1).toString().padStart(2, '0')}${startDate.getDate().toString().padStart(2, '0')}`;
          const endDateStr = `${oneYearAgo.getFullYear()}${(oneYearAgo.getMonth() + 1).toString().padStart(2, '0')}${oneYearAgo.getDate().toString().padStart(2, '0')}`;
          
          console.log(`[API] 날짜 범위: ${date}, 시작일=${startDateStr}, 종료일=${endDateStr}`);
          
          // 단순 텍스트 비교
          conditions.push(`open_date >= $${paramIndex} AND open_date <= $${paramIndex+1}`);
          queryParams.push(startDateStr, endDateStr);
          console.log(`[API] 날짜 필터 추가: 시작일=${startDateStr}, 종료일=${endDateStr}, 파라미터 인덱스=${paramIndex}-${paramIndex+1}`);
          paramIndex += 2;
          break;
          
        case 'fiveYears':
          // 최근 2~5년은 5년 전부터 2년 전까지
          startDate.setFullYear(startDate.getFullYear() - 5);
          const twoYearsAgo = new Date();
          twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
          
          // endDate는 twoYearsAgo로 설정 (2년 전)
          console.log(`[API] 최근 2~5년 선택: ${startDate.toISOString()} ~ ${twoYearsAgo.toISOString()}`);
          
          // 날짜 형식 변환 (YYYYMMDD)
          const fiveYearStartStr = `${startDate.getFullYear()}${(startDate.getMonth() + 1).toString().padStart(2, '0')}${startDate.getDate().toString().padStart(2, '0')}`;
          const fiveYearEndStr = `${twoYearsAgo.getFullYear()}${(twoYearsAgo.getMonth() + 1).toString().padStart(2, '0')}${twoYearsAgo.getDate().toString().padStart(2, '0')}`;
          
          console.log(`[API] 날짜 범위: ${date}, 시작일=${fiveYearStartStr}, 종료일=${fiveYearEndStr}`);
          
          // 단순 텍스트 비교
          conditions.push(`open_date >= $${paramIndex} AND open_date <= $${paramIndex+1}`);
          queryParams.push(fiveYearStartStr, fiveYearEndStr);
          console.log(`[API] 날짜 필터 추가: 시작일=${fiveYearStartStr}, 종료일=${fiveYearEndStr}, 파라미터 인덱스=${paramIndex}-${paramIndex+1}`);
          paramIndex += 2;
          break;
          
        default:
          startDate = new Date(1900, 0, 1);
          console.log(`[API] 전체 기간 선택: ${startDate.toISOString()} ~ ${endDate.toISOString()}`);
      }
      
      // 날짜 형식 변환 (YYYYMMDD)
      const startDateStr = `${startDate.getFullYear()}${(startDate.getMonth() + 1).toString().padStart(2, '0')}${startDate.getDate().toString().padStart(2, '0')}`;
      const endDateStr = `${endDate.getFullYear()}${(endDate.getMonth() + 1).toString().padStart(2, '0')}${endDate.getDate().toString().padStart(2, '0')}`;
      
      console.log(`[API] 날짜 범위: ${date}, 시작일=${startDateStr}, 종료일=${endDateStr}`);
      
      // 단순 텍스트 비교
      conditions.push(`open_date >= $${paramIndex} AND open_date <= $${paramIndex+1}`);
      queryParams.push(startDateStr, endDateStr);
      console.log(`[API] 날짜 필터 추가: 시작일=${startDateStr}, 종료일=${endDateStr}, 파라미터 인덱스=${paramIndex}-${paramIndex+1}`);
      paramIndex += 2;
    }
    
    // WHERE 절 생성
    const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
    console.log(`[API] 구성된 WHERE 절: ${whereClause || '(없음)'}`);
    
    // 전체 카운트 쿼리 실행
    const countQuery = `SELECT COUNT(*) as count FROM institutions${whereClause}`;
    console.log('[API] 카운트 쿼리:', countQuery);
    console.log('[API] 카운트 쿼리 파라미터:', queryParams);
    
    const countResult = await db.$queryRawUnsafe<{ count: bigint }[]>(countQuery, ...queryParams);
    const total = Number(countResult[0]?.count || 0);
    console.log('[API] 전체 개수:', total);
    
    // 지역 필터링이 필요한지 확인
    const needsRegionFiltering = region && region !== 'all';
    
    // 지역 필터링이 필요한 경우 페이징을 적용하지 않고 모든 데이터를 가져옴
    const actualLimit = needsRegionFiltering ? 999999 : limit; // 큰 값으로 설정하여 모든 데이터 가져오기
    const actualOffset = needsRegionFiltering ? 0 : offset;  // 지역 필터링 시 오프셋을 0으로 설정
    
    // 데이터 쿼리 실행
    console.log(`[API] 페이징 파라미터: limit=${actualLimit}, offset=${actualOffset}, 파라미터 인덱스=${paramIndex}-${paramIndex+1}`);
    const dataQuery = `
      SELECT * FROM institutions${whereClause} 
      ORDER BY name ASC
      LIMIT $${paramIndex} OFFSET $${paramIndex+1}
    `;
    console.log('[API] 데이터 쿼리:', dataQuery);
    
    queryParams.push(actualLimit, actualOffset);
    console.log('[API] 최종 쿼리 파라미터:', queryParams);
    
    const institutions = await db.$queryRawUnsafe<Institution[]>(dataQuery, ...queryParams);
    console.log('[API] 조회된 레코드 수:', institutions.length);
    
    // Decimal 객체를 문자열로 변환
    const serializedInstitutions = institutions.map(inst => ({
      ...inst,
      lat: inst.lat ? inst.lat.toString() : null,
      lng: inst.lng ? inst.lng.toString() : null,
      created_at: inst.created_at ? inst.created_at.toISOString() : null
    }));
    
    // 지역 필터링 (DB에서 지원하지 않는 경우 클라이언트에서 처리)
    let filteredInstitutions = serializedInstitutions;
    let totalAfterRegionFilter = total; // 지역 필터링 후 전체 개수를 저장할 변수
    
    if (needsRegionFiltering) {
      try {
        const { getRegionFromAddress } = await import('@/types/regions');
        console.log(`[API] 지역 필터 적용: region=${region}, 필터링 전 데이터 수=${serializedInstitutions.length}`);
        
        // 지역 정보를 포함한 로깅을 위한 배열
        const addressSamples: { address: string | null; regionCode: string | null }[] = [];
        
        filteredInstitutions = serializedInstitutions.filter(inst => {
          const regionCode = getRegionFromAddress(inst.address);
          
          // 처음 몇 개의 주소에 대해 로깅 (디버깅용)
          if (addressSamples.length < 5) {
            addressSamples.push({ address: inst.address, regionCode });
          }
          
          return regionCode === region;
        });
        
        // 지역 필터링 후, 페이징 적용 전의 전체 개수 저장
        totalAfterRegionFilter = filteredInstitutions.length;
        
        // 지역 주소 샘플 로깅
        console.log('[API] 주소 샘플 및 지역 코드:', addressSamples);
        console.log('[API] 지역 필터링 결과 쿼리:', `SELECT * FROM institutions WHERE address에서 추출한 지역코드 = '${region}'`);
        console.log(`[API] 지역 필터링 후 데이터 수: ${totalAfterRegionFilter}/${serializedInstitutions.length}`);
        
        // 지역 필터링 후 페이징 적용
        const start = offset;
        const end = offset + limit;
        console.log(`[API] 지역 필터링 후 페이징 적용: 전체=${totalAfterRegionFilter}, start=${start}, end=${end}`);
        filteredInstitutions = filteredInstitutions.slice(start, end);
        console.log(`[API] 페이징 적용 후 결과 수: ${filteredInstitutions.length}`);
      } catch (regionError) {
        console.error('[API] 지역 필터링 오류:', regionError);
        // 지역 필터링에 실패해도 원본 데이터 반환
      }
    }
    
    return NextResponse.json({
      institutions: filteredInstitutions,
      total: needsRegionFiltering ? totalAfterRegionFilter : total
    });
  } catch (error) {
    console.error('[API] 오류 발생:', error);
    if (error instanceof Error) {
      console.error('[API] 오류 메시지:', error.message);
      console.error('[API] 오류 스택:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: '의료기관 데이터를 조회하는 중 오류가 발생했습니다.', 
        details: error instanceof Error ? error.message : String(error),
        errorType: error?.constructor?.name || 'Unknown'
      },
      { status: 500 }
    );
  }
} 