import PageHeader from '@/components/UI/PageHeader';
import Layout from '@/components/Layout';
import { Suspense } from 'react';
import { RefreshFetchButton } from '@/components/PublicData/RefreshFetchButton';
import { prisma } from '@/lib/prisma';
import { fetchMedicalData } from '@/lib/api';
import FilterSelector from '@/components/PublicData/FilterSelector';

// created_at 기준 최신 데이터 조회
async function getLatestCreatedDate() {
  return await prisma.institutions.findFirst({
    select: { created_at: true },
    orderBy: { created_at: 'desc' },
    where: { created_at: { not: null } }
  });
}

// open_date 기준 최신 데이터 조회
async function getLatestOpenDate() {
  return await prisma.institutions.findFirst({
    select: { open_date: true },
    orderBy: { open_date: 'desc' },
    where: { open_date: { not: null } }
  });
}

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

export default async function Settings() {
  // 두 가지 기준으로 모두 최신 데이터 조회
  const latestByCreatedAt = await getLatestCreatedDate();
  const latestByOpenDate = await getLatestOpenDate();
  
  // created_at 기준 날짜 정보
  let createdDateStr = '데이터 없음';
  let createdDateTimestamp = 0;
  
  if (latestByCreatedAt?.created_at) {
    const dateObj = new Date(latestByCreatedAt.created_at);
    
    if (!isNaN(dateObj.getTime())) {
      createdDateStr = dateObj.toLocaleDateString('ko-KR');
      createdDateTimestamp = dateObj.getTime();
    } else {
      createdDateStr = latestByCreatedAt.created_at.toString();
    }
  }
  
  // open_date 기준 날짜 정보
  let openDateStr = '데이터 없음';
  let openDateTimestamp = 0;
  
  if (latestByOpenDate?.open_date) {
    const dateStrValue = latestByOpenDate.open_date.toString();
    const formattedDate = formatYYYYMMDD(dateStrValue);
    
    if (formattedDate) {
      openDateStr = formattedDate.toLocaleDateString('ko-KR');
      openDateTimestamp = formattedDate.getTime();
    } else {
      openDateStr = dateStrValue;
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader title="설정" />
        </div>
        
        <div className="bg-blue-900/30 p-4 rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white text-lg font-medium mb-2">DB 업데이트 정보</h3>
              <p className="text-gray-300">등록일 기준 최종 업데이트: {openDateStr}</p>
              <p className="text-gray-300">생성일 기준 최종 업데이트: {createdDateStr}</p>
            </div>
            <div>
              <FilterSelector />
            </div>
          </div>
        </div>

        <Suspense fallback={<div>로딩 중...</div>}>
          <RefreshFetchButton 
            fetchAction={fetchMedicalData} 
            lastupdate={openDateStr} 
            lastupdateTimestamp={openDateTimestamp} 
            createdDateStr={createdDateStr}
            createdDateTimestamp={createdDateTimestamp}
          />
        </Suspense>
      </div>
    </Layout>
  );
}