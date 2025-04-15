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
  const [progress, setProgress] = useState(0);
  
  const router = useRouter();

  // 진행 상황을 추적하기 위한 함수
  const trackProgress = () => {
    // 진행률 초기화
    setProgress(0);
    
    // 진행률 시뮬레이션 - fetchMedicalData가 실제 진행률을 리턴하지 않으므로 시뮬레이션
    const interval = setInterval(() => {
      setProgress(prev => {
        // 진행률을 천천히 증가시키다가 95%에서 멈춤 (실제 완료 시 100%로 설정)
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + (100 - prev) * 0.05; // 지수 감소 형태로 증가 속도 조절
      });
    }, 300);
    
    return interval;
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setData({});
      
      // 진행률 추적 시작
      const progressInterval = trackProgress();
      
      startTransition(async () => {
        const result = await fetchAction();
        
        // 진행률 추적 중지
        clearInterval(progressInterval);
        
        if (result.success) {
          // 완료 시 진행률 100%로 설정
          setProgress(100);
          
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
          // 1초 후 진행률 리셋
          setTimeout(() => setProgress(0), 1000);
        }, 500);
      });
    } catch (error) {
      console.error('데이터 갱신 오류:', error);
      setIsLoading(false);
      setProgress(0);
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
      
      {/* 진행률 표시 바 */}
      {(isLoading || isPending || progress > 0) && (
        <div className="w-full mt-2 mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {progress < 100 ? '데이터 가져오는 중...' : '데이터 가져오기 완료!'} ({Math.round(progress)}%)
          </p>
        </div>
      )}
      
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