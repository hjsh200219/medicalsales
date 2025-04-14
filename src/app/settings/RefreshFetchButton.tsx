'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResult } from '@/app/settings/types';
import { ApiDataDisplay } from '@/app/settings/ApiDataDisplay';

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
      setData({}); // 이전 데이터도 초기화
      
      // 서버 액션 호출
      startTransition(async () => {
        const result = await fetchAction();
        
        if (result.success) {
          // 데이터 설정
          setData({
            pharmacyData: result.pharmacyData,
            hospitalData: result.hospitalData
          });
          
          router.refresh(); // UI 갱신을 위한 새로고침
        } else {
          setData({ error: result.error });
        }
        
        // 잠시 후 로딩 상태 해제
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
        {isLoading || isPending ? (
          <>
            <span className="inline-block animate-spin mr-2">⟳</span>
            데이터 갱신 중...
          </>
        ) : (
          'API 데이터 새로고침'
        )}
      </button>
      
      {/* 데이터 표시 영역 */}
      {data.error && (
        <div className="bg-red-900/30 border border-red-800 p-4 rounded-md mt-4">
          <h3 className="text-xl text-white font-semibold mb-2">오류 발생</h3>
          <p className="text-red-300">{data.error}</p>
        </div>
      )}
      
      {data.pharmacyData && !data.pharmacyData.error && (
        <ApiDataDisplay title="약국 정보" data={data.pharmacyData} lastupdate={lastupdate} lastupdateTimestamp={lastupdateTimestamp} />
      )}
      
      {data.hospitalData && !data.hospitalData.error && (
        <ApiDataDisplay title="병원 정보" data={data.hospitalData} lastupdate={lastupdate} lastupdateTimestamp={lastupdateTimestamp} />
      )}
    </div>
  );
} 