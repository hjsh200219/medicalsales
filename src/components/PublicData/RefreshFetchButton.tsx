'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResult } from '@/types/publicdata';
import { ApiDataDisplay } from '@/components/PublicData/ApiDataDisplay';

interface FetchAction {
  (): Promise<{
    success: boolean;
    pharmacyData: ApiResult;
    hospitalData: ApiResult;
    error?: string;
  }>;
}

interface RefreshFetchButtonProps {
  fetchAction: FetchAction;
  lastupdate: string;
  lastupdateTimestamp: number;
}

export function RefreshFetchButton({ fetchAction, lastupdate, lastupdateTimestamp }: RefreshFetchButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<{
    pharmacyData?: ApiResult;
    hospitalData?: ApiResult;
    error?: string;
  }>({});
  
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setData({}); 
      
      startTransition(async () => {
        const result = await fetchAction();
        
        if (result.success) {
          setData({
            pharmacyData: result.pharmacyData,
            hospitalData: result.hospitalData
          });
          
          router.refresh();
        } else {
          setData({ error: result.error });
        }
        
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
    } catch (error) {
      console.error('데이터 갱신 오류:', error);
      setIsLoading(false);
      setData({ error: (error as Error).message });
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleRefresh}
        disabled={isLoading || isPending}
        className={`px-4 py-2 rounded-md text-white font-medium mb-2 ${
          isLoading || isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading || isPending ? '데이터 갱신 중...' : 'API 데이터 새로고침'}
      </button>
      
      {/* 데이터 표시 영역 */}
      {data.error && (
        <div className="bg-red-900/30 border border-red-800 p-4 rounded-md mt-4">
          <h3 className="text-xl text-white font-semibold mb-2">오류 발생</h3>
          <p className="text-red-300">{data.error}</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        {data.pharmacyData && !data.pharmacyData.error && (
          <ApiDataDisplay title="약국 정보" data={data.pharmacyData} lastupdate={lastupdate} lastupdateTimestamp={lastupdateTimestamp} />
        )}
        
        {data.hospitalData && !data.hospitalData.error && (
          <ApiDataDisplay title="병원 정보" data={data.hospitalData} lastupdate={lastupdate} lastupdateTimestamp={lastupdateTimestamp} />
        )}
      </div>
    </div>
  );
} 