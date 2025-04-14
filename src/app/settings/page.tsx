import PageHeader from '@/components/UI/PageHeader';
import Layout from '@/components/Layout';
import { Suspense } from 'react';
import { RefreshFetchButton } from '@/components/PublicData/RefreshFetchButton';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ApiResult, InstitutionItem } from './types';

/**
 * 가장 최근 업데이트된 기관의 날짜 정보를 가져옴
 */
async function getLatestOpenDate() {
  return await prisma.institutions.findFirst({
    select: { open_date: true },
    orderBy: { open_date: 'desc' },
    where: { open_date: { not: null } }
  });
}

/**
 * YYYYMMDD 형식의 문자열을 Date 객체로 변환
 */
function formatYYYYMMDD(dateStr: string): Date | null {
  if (!dateStr || dateStr.length !== 8) return null;
  
  try {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1; // 0-11 기준
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  } catch {
    return null;
  }
}

/**
 * XML을 JSON으로 변환하는 함수
 */
async function xmlToJson(xmlData: string) {
  const { XMLParser } = await import('fast-xml-parser');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_'
  });
  
  return parser.parse(xmlData);
}

/**
 * 약국 정보 조회 서버 액션 (전체 데이터)
 */
async function fetchPharmacyInfo(): Promise<ApiResult> {
  const serviceKey = process.env.GOV_SERVICE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_PHARMACY_INFO_ENDPOINT;
  
  if (!serviceKey || !endpoint) {
    return { error: "환경 변수가 설정되지 않았습니다." };
  }
  
  try {
    // 먼저 총 개수를 확인하기 위한 초기 요청
    const initialParams = new URLSearchParams({
      pageNo: '1',
      numOfRows: '1',
      ServiceKey: serviceKey,
    });
    
    const initialUrl = `${endpoint}?${initialParams.toString()}`;
    const initialResponse = await fetch(initialUrl, { next: { revalidate: 0 } });
    
    if (!initialResponse.ok) {
      throw new Error(`API 초기 요청 실패: ${initialResponse.status}`);
    }
    
    const initialXmlData = await initialResponse.text();
    const initialJsonData = await xmlToJson(initialXmlData);
    
    // totalCount 확인
    const totalCount = initialJsonData?.response?.body?.totalCount || 0;
    console.log(`약국 정보 총 개수: ${totalCount}`);
    
    // 페이지 단위로 전체 데이터 가져오기
    const pageSize = 10000; // 한 페이지당 가져올 항목 수
    const totalPages = Math.ceil(totalCount / pageSize);
    
    let allItems: InstitutionItem[] = [];
    let loadedItemCount = 0;
    let progressInfo = { 
      current: 0, 
      total: totalCount, 
      percentage: 0,
      loadedItems: 0,
      pageInfo: { current: 0, total: totalPages }
    };
    
    // 초기 API 결과 복사
    const result = JSON.parse(JSON.stringify(initialJsonData)) as ApiResult;
    
    for (let page = 1; page <= totalPages; page++) {
      const params = new URLSearchParams({
        pageNo: page.toString(),
        numOfRows: pageSize.toString(),
        ServiceKey: serviceKey,
      });
      
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url, { next: { revalidate: 0 } });
      
      if (!response.ok) {
        throw new Error(`API 요청 실패 (페이지 ${page}): ${response.status}`);
      }
      
      const xmlData = await response.text();
      const jsonData = await xmlToJson(xmlData);
      
      let pageItemCount = 0;
      
      if (jsonData?.response?.body?.items?.item) {
        const items = Array.isArray(jsonData.response.body.items.item)
          ? jsonData.response.body.items.item
          : [jsonData.response.body.items.item];
        
        pageItemCount = items.length;
        allItems = [...allItems, ...items];
      }
      
      // 로드된 항목 수 업데이트
      loadedItemCount += pageItemCount;
      
      // 진행 상황 업데이트 - 항목 기반으로 계산
      const itemProgressPercentage = Math.round((loadedItemCount / totalCount) * 100);
      progressInfo = {
        current: loadedItemCount,  // 로드된 항목 수
        total: totalCount,         // 전체 항목 수
        percentage: itemProgressPercentage,
        loadedItems: loadedItemCount,
        pageInfo: { current: page, total: totalPages }
      };
      
      console.log(`약국 데이터 로딩 진행률: ${progressInfo.percentage}% (${loadedItemCount}/${totalCount} 항목, 페이지 ${page}/${totalPages})`);
      
      // 진행 상황이 업데이트될 때마다 결과에 반영하여 중간 진행상황을 보여줄 수 있게 함
      if (result.response?.body?.items) {
        result.response.body.items.item = allItems;
        if (result.response.body.totalCount !== undefined) {
          result.response.body.totalCount = totalCount;
        }
      }
      result.progressInfo = progressInfo;
    }
    
    // 최종 결과 구성
    if (result.response?.body?.items) {
      result.response.body.items.item = allItems;
      if (result.response.body.totalCount !== undefined) {
        result.response.body.totalCount = totalCount;
      }
    }
    
    // 진행 정보도 포함 - 로딩 완료
    result.progressInfo = { 
      current: totalCount, 
      total: totalCount, 
      percentage: 100,
      loadedItems: loadedItemCount,
      pageInfo: { current: totalPages, total: totalPages }
    };
    
    return result;
  } catch (error) {
    console.error('약국 정보 가져오기 오류:', error);
    return { error: (error as Error).message };
  }
}

/**
 * 병원 정보 조회 서버 액션 (전체 데이터)
 */
async function fetchHospitalInfo(): Promise<ApiResult> {
  const serviceKey = process.env.GOV_SERVICE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_HOSPITAL_INFO_ENDPOINT;
  
  if (!serviceKey || !endpoint) {
    return { error: "환경 변수가 설정되지 않았습니다." };
  }
  
  try {
    // 먼저 총 개수를 확인하기 위한 초기 요청
    const initialParams = new URLSearchParams({
      pageNo: '1',
      numOfRows: '1',
      ServiceKey: serviceKey,
    });
    
    const initialUrl = `${endpoint}?${initialParams.toString()}`;
    const initialResponse = await fetch(initialUrl, { next: { revalidate: 0 } });
    
    if (!initialResponse.ok) {
      throw new Error(`API 초기 요청 실패: ${initialResponse.status}`);
    }
    
    const initialXmlData = await initialResponse.text();
    const initialJsonData = await xmlToJson(initialXmlData);
    
    // totalCount 확인
    const totalCount = initialJsonData?.response?.body?.totalCount || 0;
    console.log(`병원 정보 총 개수: ${totalCount}`);
    
    // 페이지 단위로 전체 데이터 가져오기
    const pageSize = 10000; // 한 페이지당 가져올 항목 수
    const totalPages = Math.ceil(totalCount / pageSize);
    
    let allItems: InstitutionItem[] = [];
    let loadedItemCount = 0;
    let progressInfo = { 
      current: 0, 
      total: totalCount, 
      percentage: 0,
      loadedItems: 0,
      pageInfo: { current: 0, total: totalPages }
    };
    
    // 초기 API 결과 복사
    const result = JSON.parse(JSON.stringify(initialJsonData)) as ApiResult;
    
    for (let page = 1; page <= totalPages; page++) {
      const params = new URLSearchParams({
        pageNo: page.toString(),
        numOfRows: pageSize.toString(),
        ServiceKey: serviceKey,
      });
      
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url, { next: { revalidate: 0 } });
      
      if (!response.ok) {
        throw new Error(`API 요청 실패 (페이지 ${page}): ${response.status}`);
      }
      
      const xmlData = await response.text();
      const jsonData = await xmlToJson(xmlData);
      
      let pageItemCount = 0;
      
      if (jsonData?.response?.body?.items?.item) {
        const items = Array.isArray(jsonData.response.body.items.item)
          ? jsonData.response.body.items.item
          : [jsonData.response.body.items.item];
        
        pageItemCount = items.length;
        allItems = [...allItems, ...items];
      }
      
      // 로드된 항목 수 업데이트
      loadedItemCount += pageItemCount;
      
      // 진행 상황 업데이트 - 항목 기반으로 계산
      const itemProgressPercentage = Math.round((loadedItemCount / totalCount) * 100);
      progressInfo = {
        current: loadedItemCount,  // 로드된 항목 수
        total: totalCount,         // 전체 항목 수
        percentage: itemProgressPercentage,
        loadedItems: loadedItemCount,
        pageInfo: { current: page, total: totalPages }
      };
      
      console.log(`병원 데이터 로딩 진행률: ${progressInfo.percentage}% (${loadedItemCount}/${totalCount} 항목, 페이지 ${page}/${totalPages})`);
      
      // 진행 상황이 업데이트될 때마다 결과에 반영하여 중간 진행상황을 보여줄 수 있게 함
      if (result.response?.body?.items) {
        result.response.body.items.item = allItems;
        if (result.response.body.totalCount !== undefined) {
          result.response.body.totalCount = totalCount;
        }
      }
      result.progressInfo = progressInfo;
    }
    
    // 최종 결과 구성
    if (result.response?.body?.items) {
      result.response.body.items.item = allItems;
      if (result.response.body.totalCount !== undefined) {
        result.response.body.totalCount = totalCount;
      }
    }
    
    // 진행 정보도 포함 - 로딩 완료
    result.progressInfo = { 
      current: totalCount, 
      total: totalCount, 
      percentage: 100,
      loadedItems: loadedItemCount,
      pageInfo: { current: totalPages, total: totalPages }
    };
    
    return result;
  } catch (error) {
    console.error('병원 정보 가져오기 오류:', error);
    return { error: (error as Error).message };
  }
}

/**
 * 약국 및 병원 정보를 가져오는 서버 액션
 */
async function fetchMedicalData() {
  'use server';
  
  try {
    // 약국 및 병원 정보 가져오기
    const pharmacyData = await fetchPharmacyInfo();
    const hospitalData = await fetchHospitalInfo();
    
    // 페이지 리프레시
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

/**
 * API 데이터 디스플레이 컴포넌트
 */
function ApiDataContainer() {
  return (
    <div className="mt-6">
      <h2 className="text-2xl text-white font-bold mb-4">API 데이터</h2>
      <div className="bg-gray-700 p-4 rounded-md mb-6">
        <p className="text-gray-300">
          &apos;API 데이터 새로고침&apos; 버튼을 클릭하여 최신 데이터를 불러올 수 있습니다.
        </p>
      </div>
    </div>
  );
}

/**
 * 설정 페이지 컴포넌트
 */
export default async function Settings() {
  // 최신 업데이트 날짜 가져오기
  const latestInstitution = await getLatestOpenDate();
  let lastupdate = '데이터 없음';

  // 날짜 형식 포맷팅
  if (latestInstitution?.open_date) {
    const dateObj = new Date(latestInstitution.open_date);
    
    if (!isNaN(dateObj.getTime())) {
      // Date 객체가 유효한 경우
      lastupdate = dateObj.toLocaleDateString('ko-KR');
    } else {
      // YYYYMMDD 문자열 형식인 경우
      lastupdate = latestInstitution.open_date.toString();
      
      const formattedDate = formatYYYYMMDD(lastupdate);
      if (formattedDate) {
        lastupdate = formattedDate.toLocaleDateString('ko-KR');
      }
    }
  }

  return (
    <Layout>
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
          <PageHeader title="설정" />
      </div>
        
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
          {/* 최근 업데이트 정보 */}
          <div className="bg-blue-900/30 p-4 rounded-md mb-6">
            <p className="text-gray-300">최종 업데이트 날짜: {lastupdate}</p>
            <p className="text-gray-300 text-sm">
              데이터베이스에 저장된 의료기관 정보의 최신 업데이트 날짜입니다.
            </p>
          </div>
          
          {/* API 데이터 가져오기 버튼 */}
          <div className="mb-6">
            <RefreshFetchButton fetchAction={fetchMedicalData} />
          </div>
          
          {/* API 데이터 표시 영역 */}
          <Suspense fallback={<div>로딩 중...</div>}>
            <ApiDataContainer />
          </Suspense>
        </div>
    </div>
    </Layout>
  );
} 