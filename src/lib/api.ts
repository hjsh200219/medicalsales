import { revalidatePath } from "next/cache";
import { ApiResult, InstitutionItem } from "@/types/publicdata";

/**
 * API 요청 수행 함수 - JSON 형식으로 직접 요청
 */
async function fetchApiData(url: string): Promise<ApiResult> {
  try {
    // JSON 형식 요청을 위해 _type=json 파라미터 추가
    const urlWithJsonParam = url.includes('?') 
      ? `${url}&_type=json` 
      : `${url}?_type=json`;
    
    const response = await fetch(urlWithJsonParam, { 
      next: { revalidate: 0 },
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    // 직접 JSON으로 파싱
    return response.json();
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
}

/**
 * 병렬 요청으로 페이지 데이터 가져오기
 */
async function fetchPagesInParallel(
  endpoint: string, 
  serviceKey: string, 
  startPage: number,
  endPage: number,
  pageSize: number,
  batchSize: number = 5
): Promise<InstitutionItem[]> {
  let allItems: InstitutionItem[] = [];
  
  // 배치 단위로 병렬 처리
  for (let batchStart = startPage; batchStart <= endPage; batchStart += batchSize) {
    const batchEnd = Math.min(batchStart + batchSize - 1, endPage);
    const pagePromises = [];
    
    for (let page = batchStart; page <= batchEnd; page++) {
      const pageParams = new URLSearchParams({
        pageNo: page.toString(),
        numOfRows: pageSize.toString(),
        ServiceKey: serviceKey,
      });
      
      const pageUrl = `${endpoint}?${pageParams.toString()}`;
      pagePromises.push(fetchApiData(pageUrl));
    }
    
    const batchResults = await Promise.all(pagePromises);
    
    // 각 배치 결과에서 항목 추출
    for (const pageData of batchResults) {
      if (pageData?.response?.body?.items?.item) {
        const items = Array.isArray(pageData.response.body.items.item)
          ? pageData.response.body.items.item
          : [pageData.response.body.items.item];
        
        allItems = [...allItems, ...items];
      }
    }
    
    console.log(`페이지 배치 완료: ${batchStart}-${batchEnd}`);
  }
  
  return allItems;
}

/**
 * 기관(약국, 병원) 데이터를 가져오는 공통 함수
 */
export async function fetchInstitutionData(
  endpoint: string,
  serviceKey: string,
  institutionType: 'pharmacy' | 'hospital'
): Promise<ApiResult> {
  try {
    // 1. 총 데이터 개수 확인을 위한 초기 요청
    const params = new URLSearchParams({
      pageNo: '1',
      numOfRows: '1',
      ServiceKey: serviceKey,
    });
    
    const initialUrl = `${endpoint}?${params.toString()}`;
    const initialData = await fetchApiData(initialUrl);
    
    const totalCount = initialData?.response?.body?.totalCount || 0;
    const typeName = institutionType === 'pharmacy' ? '약국' : '병원';
    console.log(`${typeName} 정보 총 개수: ${totalCount}`);
    
    // 초기 결과 객체 생성
    const result = JSON.parse(JSON.stringify(initialData)) as ApiResult;
    
    // 데이터가 없으면 결과 반환
    if (totalCount === 0) {
      return result;
    }
    
    // 2. 페이지네이션 설정
    const pageSize = 10000; // API가 허용하는 최대 페이지 크기
    const totalPages = Math.ceil(totalCount / pageSize);
    const batchSize = 5; // 병렬 요청 단위 (API 서버 부하를 고려하여 조정 필요)
    
    console.log(`${typeName} 데이터 로딩 시작: 총 ${totalPages}페이지`);
    const startTime = Date.now();
    
    // 3. 병렬 처리로 데이터 가져오기
    const allItems = await fetchPagesInParallel(
      endpoint, 
      serviceKey, 
      1, 
      totalPages, 
      pageSize,
      batchSize
    );
    
    const endTime = Date.now();
    console.log(`${typeName} 데이터 로딩 완료: ${allItems.length}개 항목, 소요시간 ${(endTime - startTime) / 1000}초`);
    
    // 4. 결과 업데이트
    if (result.response?.body) {
      if (result.response.body.items) {
        result.response.body.items.item = allItems;
      }
      
      if (result.response.body.totalCount !== undefined) {
        result.response.body.totalCount = totalCount;
      }
    }
    
    return result;
  } catch (error) {
    console.error(`${institutionType === 'pharmacy' ? '약국' : '병원'} 정보 가져오기 오류:`, error);
    return { error: (error as Error).message };
  }
}

/**
 * 약국 정보를 가져오는 함수
 */
export async function fetchPharmacyInfo(): Promise<ApiResult> {
  const serviceKey = process.env.GOV_SERVICE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_PHARMACY_INFO_ENDPOINT;
  
  if (!serviceKey || !endpoint) {
    return { error: "환경 변수가 설정되지 않았습니다." };
  }
  
  return fetchInstitutionData(endpoint, serviceKey, 'pharmacy');
}

/**
 * 병원 정보를 가져오는 함수
 */
export async function fetchHospitalInfo(): Promise<ApiResult> {
  const serviceKey = process.env.GOV_SERVICE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_HOSPITAL_INFO_ENDPOINT;
  
  if (!serviceKey || !endpoint) {
    return { error: "환경 변수가 설정되지 않았습니다." };
  }
  
  return fetchInstitutionData(endpoint, serviceKey, 'hospital');
}

/**
 * 약국 및 병원 정보를 가져오는 서버 액션
 */
export async function fetchMedicalData() {
  'use server';
  
  try {
    const startTime = Date.now();
    
    const pharmacyData = await fetchPharmacyInfo();
    const hospitalData = await fetchHospitalInfo();
    
    const endTime = Date.now();
    console.log(`전체 데이터 가져오기 완료: 총 소요시간 ${(endTime - startTime) / 1000}초`);
    
    revalidatePath('/settings');
    
    return { 
      success: true,
      pharmacyData,
      hospitalData
    };
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    return { 
      success: false, 
      error: (error as Error).message,
      pharmacyData: { error: '약국 데이터 가져오기 실패' },
      hospitalData: { error: '병원 데이터 가져오기 실패' }
    };
  }
} 