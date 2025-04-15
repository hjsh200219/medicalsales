import PageHeader from '@/components/UI/PageHeader';
import Layout from '@/components/Layout';
import { Suspense } from 'react';
import { RefreshFetchButton } from '@/components/PublicData/RefreshFetchButton';
import { prisma } from '@/lib/prisma';
import { fetchMedicalData } from '@/lib/api';

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
  const latestInstitution = await getLatestOpenDate();
  let lastupdate = '데이터 없음';
  let lastupdateTimestamp = 0;
  
  if (latestInstitution?.open_date) {
    const dateObj = new Date(latestInstitution.open_date);
    
    if (!isNaN(dateObj.getTime())) {
      lastupdate = dateObj.toLocaleDateString('ko-KR');
      lastupdateTimestamp = dateObj.getTime();
    } else {

      lastupdate = latestInstitution.open_date.toString();
      
      const formattedDate = formatYYYYMMDD(lastupdate);
      if (formattedDate) {
        lastupdate = formattedDate.toLocaleDateString('ko-KR');
        lastupdateTimestamp = formattedDate.getTime();
      }
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader title="설정" />
        </div>
        
          <div className="bg-blue-900/30 p-4 rounded-md mb-6">
            <p className="text-gray-300">DB 최종 업데이트 날짜: {lastupdate}</p>
          </div>

          <Suspense fallback={<div>로딩 중...</div>}>
            <RefreshFetchButton fetchAction={fetchMedicalData} lastupdate={lastupdate} lastupdateTimestamp={lastupdateTimestamp} />
          </Suspense>
        </div>
    </Layout>
  );
}