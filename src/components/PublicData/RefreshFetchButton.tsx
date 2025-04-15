'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResult } from '@/types/publicdata';
import { ApiDataDisplay } from '@/components/PublicData/ApiDataDisplay';
import { saveInstitutionsChunk } from '@/app/actions';

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
  lastupdate: string; // open_date 기준 최종 업데이트 날짜
  lastupdateTimestamp: number; // open_date 기준 타임스탬프
  createdDateStr: string; // created_at 기준 최종 업데이트 날짜
  createdDateTimestamp: number; // created_at 기준 타임스탬프
}

export function RefreshFetchButton({ 
  fetchAction, 
  lastupdate, 
  lastupdateTimestamp,
  createdDateStr,
  createdDateTimestamp
}: RefreshFetchButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<{
    pharmacyData?: ApiResult;
    hospitalData?: ApiResult;
    error?: string;
  }>({});
  const [progress, setProgress] = useState(0);
  const [savingToDb, setSavingToDb] = useState(false);
  const [saveResult, setSaveResult] = useState<{ success: boolean; message: string } | null>(null);
  const [filterType, setFilterType] = useState<'open_date' | 'created_at' | 'custom_date'>('created_at');
  const [customDate, setCustomDate] = useState<string>('');
  const [customDateTimestamp, setCustomDateTimestamp] = useState<number>(0);
  
  const router = useRouter();

  // 로컬 스토리지에서 필터 타입 및 커스텀 날짜 불러오기
  useEffect(() => {
    // 서버 사이드 렌더링일 경우 실행하지 않음
    if (typeof window === 'undefined') return;
    
    const savedFilter = localStorage.getItem('dataFilterType') as 'open_date' | 'created_at' | 'custom_date' | null;
    if (savedFilter && ['open_date', 'created_at', 'custom_date'].includes(savedFilter)) {
      setFilterType(savedFilter);
    }
    
    const savedCustomDate = localStorage.getItem('customFilterDate');
    if (savedCustomDate) {
      setCustomDate(savedCustomDate);
      // 타임스탬프 계산
      const date = new Date(savedCustomDate);
      if (!isNaN(date.getTime())) {
        setCustomDateTimestamp(date.getTime());
      }
    }
    
    // localStorage 변경 감지를 위한 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dataFilterType') {
        const newFilterType = e.newValue as 'open_date' | 'created_at' | 'custom_date' | null;
        if (newFilterType && ['open_date', 'created_at', 'custom_date'].includes(newFilterType)) {
          setFilterType(newFilterType);
        }
      } else if (e.key === 'customFilterDate' && e.newValue) {
        setCustomDate(e.newValue);
        const date = new Date(e.newValue);
        if (!isNaN(date.getTime())) {
          setCustomDateTimestamp(date.getTime());
        }
      }
    };
    
    // 커스텀 이벤트 리스너
    const handleFilterTypeChange = (e: CustomEvent) => {
      if (e.detail?.filterType) {
        setFilterType(e.detail.filterType);
      }
    };
    
    const handleCustomDateChange = (e: CustomEvent) => {
      if (e.detail?.customDate) {
        setCustomDate(e.detail.customDate);
        const date = new Date(e.detail.customDate);
        if (!isNaN(date.getTime())) {
          setCustomDateTimestamp(date.getTime());
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('filterTypeChange', handleFilterTypeChange as EventListener);
    window.addEventListener('customDateChange', handleCustomDateChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('filterTypeChange', handleFilterTypeChange as EventListener);
      window.removeEventListener('customDateChange', handleCustomDateChange as EventListener);
    };
  }, []);

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
      setSaveResult(null);
      
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

  // DB에 데이터 저장 핸들러
  const handleSaveToDb = async () => {
    try {
      setSavingToDb(true);
      setSaveResult(null);
      
      // 실행 시점에 localStorage에서 최신 필터 타입 가져오기
      let actualFilterType = filterType;
      
      if (typeof window !== 'undefined') {
        const currentFilterType = localStorage.getItem('dataFilterType') as 'open_date' | 'created_at' | 'custom_date' | null;
        if (currentFilterType && ['open_date', 'created_at', 'custom_date'].includes(currentFilterType)) {
          setFilterType(currentFilterType);
          actualFilterType = currentFilterType;
        }
      }
      
      // 필터링 기준 타임스탬프 선택
      let selectedTimestamp = 0;
      
      if (actualFilterType === 'open_date') {
        selectedTimestamp = lastupdateTimestamp;
      } else if (actualFilterType === 'created_at') {
        selectedTimestamp = createdDateTimestamp;
      } else if (actualFilterType === 'custom_date') {
        // 최신 커스텀 날짜도 확인
        if (typeof window !== 'undefined') {
          const savedCustomDate = localStorage.getItem('customFilterDate');
          if (savedCustomDate && savedCustomDate !== customDate) {
            setCustomDate(savedCustomDate);
            const date = new Date(savedCustomDate);
            if (!isNaN(date.getTime())) {
              setCustomDateTimestamp(date.getTime());
              selectedTimestamp = date.getTime();
            } else {
              selectedTimestamp = customDateTimestamp;
            }
          } else {
            selectedTimestamp = customDateTimestamp;
          }
        } else {
          selectedTimestamp = customDateTimestamp;
        }
      }
      
      // 약국 및 병원 데이터에서 신규 항목 필터링
      const pharmacyItems = data.pharmacyData?.response?.body?.items?.item || [];
      const hospitalItems = data.hospitalData?.response?.body?.items?.item || [];
      
      // 배열로 변환
      const pharmacyArray = Array.isArray(pharmacyItems) ? pharmacyItems : [pharmacyItems];
      const hospitalArray = Array.isArray(hospitalItems) ? hospitalItems : [hospitalItems];
      
      // YYYYMMDD 형식의 날짜를 타임스탬프로 변환
      const getTimestampFromYYYYMMDD = (dateStr?: string): number => {
        if (!dateStr || dateStr.length !== 8) return 0;
        
        try {
          const year = parseInt(dateStr.substring(0, 4));
          const month = parseInt(dateStr.substring(4, 6)) - 1;
          const day = parseInt(dateStr.substring(6, 8));
          return new Date(year, month, day).getTime();
        } catch {
          return 0;
        }
      };
      
      // 선택된 필터 타입에 따라 신규 항목 필터링
      const filterNewItems = (items: Array<Record<string, string | number | boolean | undefined>>) => {
        if (actualFilterType === 'created_at') {
          // created_at 기준으로는 모든 아이템을 신규로 간주
          return items;
        } else {
          // open_date 또는 custom_date 기준으로 필터링
          return items.filter(item => {
            if (!item.estbDd) return false;
            const itemTimestamp = getTimestampFromYYYYMMDD(item.estbDd.toString());
            return itemTimestamp > selectedTimestamp;
          });
        }
      };
      
      const newPharmacyItems = filterNewItems(pharmacyArray);
      const newHospitalItems = filterNewItems(hospitalArray);
      
      // 모든 신규 항목 합치기
      const allNewItems = [...newPharmacyItems, ...newHospitalItems];
      
      if (allNewItems.length === 0) {
        setSaveResult({
          success: false,
          message: '저장할 신규 데이터가 없습니다.'
        });
        setSavingToDb(false);
        return;
      }
      
      // DB 삽입 진행률 표시 시작
      setProgress(0);
      
      // DB에 청크 단위로 저장 (청크 크기: 100)
      let currentIndex = 0;
      const chunkSize = 100;
      let isDone = false;
      
      while (!isDone) {
        // 청크 단위로 저장 실행
        const chunkResult = await saveInstitutionsChunk(allNewItems, chunkSize, currentIndex);
        
        // 진행률 업데이트
        setProgress(chunkResult.progress);
        
        if (chunkResult.success) {
          if (chunkResult.done) {
            // 모든 처리가 완료됨
            isDone = true;
            setSaveResult({
              success: true,
              message: `${chunkResult.totalItems}개 아이템 중 ${chunkResult.count}개가 성공적으로 저장되었습니다.`
            });
            
            // 페이지 새로고침
            router.refresh();
          } else {
            // 다음 청크 처리를 위해 인덱스 업데이트
            currentIndex = chunkResult.nextIndex ?? (currentIndex + chunkSize);
          }
        } else {
          // 오류 발생
          isDone = true;
          setSaveResult({
            success: false,
            message: chunkResult.message
          });
        }
      }
      
      setSavingToDb(false);
    } catch (error) {
      console.error('DB 저장 오류:', error);
      setSaveResult({
        success: false,
        message: (error as Error).message
      });
      setSavingToDb(false);
    }
  };

  // 필터 타입에 따른 버튼 텍스트 생성
  const getFilterButtonText = () => {
    if (savingToDb) return 'DB에 저장 중...';
    
    // 서버 사이드 렌더링 환경 체크
    if (typeof window === 'undefined') {
      return 'DB에 추가';
    }
    
    // 최신 필터 타입 확인
    const currentFilterType = localStorage.getItem('dataFilterType') as 'open_date' | 'created_at' | 'custom_date' | null;
    const actualFilterType = currentFilterType || filterType;
    
    if (actualFilterType === 'open_date') {
      return 'DB에 추가 (등록일 기준)';
    } else if (actualFilterType === 'created_at') {
      return 'DB에 추가 (생성일 기준)';
    } else {
      // 최신 커스텀 날짜 확인
      const savedCustomDate = localStorage.getItem('customFilterDate') || customDate;
      return `DB에 추가 (${savedCustomDate} 이후 데이터)`;
    }
  };

  // 표시할 날짜와 타임스탬프 결정
  const getDisplayDateInfo = () => {
    // 서버 사이드 렌더링 환경 체크
    if (typeof window === 'undefined') {
      return { 
        dateStr: lastupdate, 
        timestamp: lastupdateTimestamp 
      };
    }
    
    // 최신 필터 타입 확인
    const currentFilterType = localStorage.getItem('dataFilterType') as 'open_date' | 'created_at' | 'custom_date' | null;
    const actualFilterType = currentFilterType || filterType;
    
    if (actualFilterType === 'open_date') {
      return { 
        dateStr: lastupdate, 
        timestamp: lastupdateTimestamp 
      };
    } else if (actualFilterType === 'created_at') {
      return { 
        dateStr: createdDateStr, 
        timestamp: createdDateTimestamp 
      };
    } else {
      // 최신 커스텀 날짜 확인
      const savedCustomDate = localStorage.getItem('customFilterDate');
      if (savedCustomDate && savedCustomDate !== customDate) {
        const date = new Date(savedCustomDate);
        if (!isNaN(date.getTime())) {
          return { 
            dateStr: date.toLocaleDateString('ko-KR'), 
            timestamp: date.getTime() 
          };
        }
      }
      return { 
        dateStr: new Date(customDateTimestamp).toLocaleDateString('ko-KR'), 
        timestamp: customDateTimestamp 
      };
    }
  };

  const dateInfo = getDisplayDateInfo();

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2 ">
        <button
          onClick={handleRefresh}
          disabled={isLoading || isPending}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isLoading || isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading || isPending ? '데이터 갱신 중...' : 'API 데이터 가져오기'}
        </button>
        
        {/* DB 추가 버튼 */}
        {data.pharmacyData || data.hospitalData ? (
          <button
            onClick={handleSaveToDb}
            disabled={savingToDb || !data.pharmacyData || !data.hospitalData}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              savingToDb ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {getFilterButtonText()}
          </button>
        ) : null}
      </div>
      
      {/* 진행률 표시 바 */}
      {(isLoading || isPending || progress > 0) && (
        <div className="w-full mt-2 mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
                savingToDb ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {savingToDb 
              ? `DB 저장 중... (${Math.round(progress)}%)`
              : progress < 100 
                ? '데이터 가져오는 중...' 
                : '데이터 가져오기 완료!'
            } ({Math.round(progress)}%)
          </p>
        </div>
      )}
      
      {/* DB 저장 결과 표시 */}
      {saveResult && (
        <div className={`p-4 rounded-md mt-2 mb-4 ${saveResult.success ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
          <p className={saveResult.success ? 'text-green-300' : 'text-red-300'}>
            {saveResult.message}
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
          <ApiDataDisplay 
            title="약국 정보" 
            data={data.pharmacyData} 
            lastupdate={dateInfo.dateStr} 
            lastupdateTimestamp={dateInfo.timestamp}
          />
        )}
        
        {data.hospitalData && !data.hospitalData.error && (
          <ApiDataDisplay 
            title="병원 정보" 
            data={data.hospitalData} 
            lastupdate={dateInfo.dateStr} 
            lastupdateTimestamp={dateInfo.timestamp} 
          />
        )}
      </div>
    </div>
  );
} 