'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  LineElement,  
  PointElement,
  Title, 
  Tooltip, 
  Legend,
  Colors,
  TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths, subYears, startOfYear, endOfYear, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PERIOD_OPTIONS } from '@/components/Institution/TrendFilter';
import { REGION_CODES, getRegionFromAddress, getRegionColor } from '@/types/regions';
import { INSTITUTION_TYPES } from '@/types/institution';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

// 공통 인터페이스
interface Institution {
  id: number;
  name: string;
  address: string | null;
  open_date: string | null;
  type: string | null;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderWidth: number;
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
    hidden?: boolean;
  }[];
}

interface ChartProps {
  period: string;
  analysisUnit?: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

// 공통 유틸리티 함수
// 지역 데이터 포맷 함수
const formatAddressData = (addresses: (string | null)[]): string[] => {
  return addresses.map(address => {
    if (!address) return '미상';
    
    // 지역 코드 가져오기
    const regionCode = getRegionFromAddress(address);
    
    // 지역 코드에 해당하는 짧은 이름 (배열의 마지막 요소) 가져오기
    if (regionCode !== 'unknown' && regionCode !== 'all') {
      const regionNames = REGION_CODES[regionCode];
      return regionNames[regionNames.length - 1]; // 마지막 요소(가장 짧은 이름)
    }
    
    return '미상';
  });
};

// 기간에 따른 시작일 계산 함수
const calculateStartDate = (
  period: string,
  startDate?: Date,
  endDate?: Date,
  analysisUnit?: string
): { fetchStartDate: Date, unit: string } => {
  let fetchStartDate = new Date();
  let unit = analysisUnit || 'month';

  // 커스텀 날짜 범위 사용 처리
  if (period === 'custom' && startDate && endDate) {
    fetchStartDate = startDate;
    // 커스텀 기간일 때는 분석 단위를 연도로 설정
    if (!analysisUnit || analysisUnit === 'month') {
      // 1년 이상 차이나면 연 단위로 설정
      const yearDiff = endDate.getFullYear() - startDate.getFullYear();
      if (yearDiff >= 1) {
        unit = 'year';
      }
    }
  } else {
    switch (period) {
      case 'week':
        fetchStartDate = subDays(new Date(), 7);
        unit = 'day';
        break;
      case 'month':
        fetchStartDate = subMonths(new Date(), 1);
        unit = 'day';
        break;
      case 'halfYear':
        fetchStartDate = subMonths(new Date(), 6);
        unit = 'week';
        break;
      case 'year':
        fetchStartDate = subYears(new Date(), 1);
        unit = 'month';
        break;
      case 'twoYears':
        fetchStartDate = subYears(new Date(), 2);
        unit = 'month';
        break;
      case 'fiveYears':
        fetchStartDate = subYears(new Date(), 5);
        unit = 'month';
        break;
      case 'all':
        fetchStartDate = new Date(1990, 0, 1); // 1990년 1월 1일
        unit = 'year';
        break;
      default:
        fetchStartDate = subDays(new Date(), 7);
        unit = 'day';
    }
  }
  
  return { fetchStartDate, unit };
};

// 기간에 따른 레이블 생성 함수
const generateTimeLabels = (period: string, unit: string, startDate?: Date, endDate?: Date): string[] => {
  let labels: string[] = [];
  
  // 커스텀 기간이 설정된 경우 (startDate와 endDate가 있는 경우)
  if (period === 'custom' && startDate && endDate) {
    switch (unit) {
      case 'year':
        // 시작 연도부터 종료 연도까지 레이블 생성
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const yearCount = endYear - startYear + 1;
        
        labels = Array.from({ length: yearCount }, (_, i) => 
          `${startYear + i}년`
        );
        break;
      
      case 'month':
        // 월 단위 레이블 생성 (최대 24개월까지)
        const monthDiff = 
          (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
          endDate.getMonth() - startDate.getMonth() + 1;
        
        for (let i = 0; i < Math.min(monthDiff, 60); i++) {
          const date = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + i,
            1
          );
          labels.push(format(date, 'yyyy.MM', { locale: ko }));
        }
        break;
      
      default:
        // 기본 레이블 생성
        return generateTimeLabels('year', unit);
    }
    
    return labels;
  }
  
  // 기본 기간 옵션에 따른 레이블 생성
  switch (unit) {
    case 'day':
      const days = period === 'week' ? 7 : 30;
      labels = Array.from({ length: days }, (_, i) => {
        const date = subDays(new Date(), days - i - 1);
        return format(date, 'MM.dd', { locale: ko });
      });
      break;
    case 'week':
      const weeks = 26; // 6개월 = 약 26주
      labels = Array.from({ length: weeks }, (_, i) => {
        const date = subDays(new Date(), (weeks - i) * 7);
        return `${format(date, 'MM.dd', { locale: ko })} 주`;
      });
      break;
    case 'month':
      const months = period === 'year' ? 12 : (period === 'twoYears' ? 24 : 60);
      labels = Array.from({ length: months }, (_, i) => {
        const date = subMonths(new Date(), months - i - 1);
        return format(date, 'yyyy.MM', { locale: ko });
      });
      break;
    case 'year':
      // 'all' 옵션이 아닐 경우 최근 기간만 표시
      if (period === 'all') {
        const currentYear = new Date().getFullYear();
        const years = currentYear - 1990 + 1;
        labels = Array.from({ length: years }, (_, i) => `${1990 + i}년`);
      } else if (startDate && endDate) {
        // 커스텀 기간이 있는 경우
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const yearCount = endYear - startYear + 1;
        labels = Array.from({ length: yearCount }, (_, i) => `${startYear + i}년`);
      } else {
        // 최근 기간만 표시
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - (period === 'fiveYears' ? 5 : (period === 'twoYears' ? 2 : 1));
        const years = currentYear - startYear + 1;
        labels = Array.from({ length: years }, (_, i) => `${startYear + i}년`);
      }
      break;
  }
  
  return labels;
};

// 차트 옵션 생성 함수
const getChartOptions = (period: string) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          pointStyle: 'circle',
          usePointStyle: true,
        },
        display: true
      },
      title: {
        display: false,
        text: PERIOD_OPTIONS.find(opt => opt.id === period)?.label || '',
        font: {
          size: 16
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        filter: function(tooltipItem: TooltipItem<'line'>) {
          // 숨겨진 데이터셋은 툴큅에서 제외
          return !tooltipItem.dataset.hidden;
        },
        callbacks: {
          title: (items: TooltipItem<'line'>[]) => {
            if (!items.length) return '';
            const item = items[0];
            return `${item.label} 데이터`;
          },
          label: (context: TooltipItem<'line'>) => {
            const dataset = context.dataset;
            const value = context.parsed.y || 0;
            return `${dataset.label}: ${value}개`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: false,
          text: '개업 수',
        },
      },
      x: {
        title: {
          display: false,
          text: '기간',
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
      },
    },
    elements: {
      line: {
        tension: 0.3 
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  };
};

// 날짜 인덱스 찾기 함수
const findDateIndex = (openDate: Date, period: string, unit: string, startDate?: Date, endDate?: Date): number => {
  let index = -1;
  
  // 커스텀 기간인 경우
  if (period === 'custom' && startDate && endDate) {
    const openYear = openDate.getFullYear();
    const openMonth = openDate.getMonth();
    
    if (unit === 'year') {
      // 연도 단위 인덱스 계산
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      if (openYear >= startYear && openYear <= endYear) {
        index = openYear - startYear;
      }
    } else if (unit === 'month') {
      // 월 단위 인덱스 계산
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      
      // 날짜가 범위 내에 있는지 확인
      if (
        (openYear > startYear || (openYear === startYear && openMonth >= startMonth)) &&
        (openYear < endDate.getFullYear() || (openYear === endDate.getFullYear() && openMonth <= endDate.getMonth()))
      ) {
        // 월 차이 계산
        index = (openYear - startYear) * 12 + (openMonth - startMonth);
      }
    }
    
    return index;
  }
  
  // 기본 기간 옵션에 따른 인덱스 계산
  switch (unit) {
    case 'day':
      const days = period === 'week' ? 7 : 30;
      for (let i = 0; i < days; i++) {
        const compareDate = subDays(new Date(), days - i - 1);
        if (format(openDate, 'yyyy-MM-dd') === format(compareDate, 'yyyy-MM-dd')) {
          index = i;
          break;
        }
      }
      break;
    case 'week':
      const weeks = 26;
      for (let i = 0; i < weeks; i++) {
        const weekStart = subDays(new Date(), (weeks - i) * 7);
        const weekEnd = subDays(new Date(), (weeks - i - 1) * 7);
        if (openDate >= weekStart && openDate < weekEnd) {
          index = i;
          break;
        }
      }
      break;
    case 'month':
      const months = period === 'year' ? 12 : (period === 'twoYears' ? 24 : 60);
      for (let i = 0; i < months; i++) {
        const monthStart = subMonths(new Date(), months - i - 1);
        const monthEnd = i === months - 1 ? new Date() : subMonths(new Date(), months - i - 2);
        
        if (openDate >= startOfYear(monthStart) && 
            openDate <= endOfYear(monthEnd) && 
            format(openDate, 'yyyy-MM') === format(monthStart, 'yyyy-MM')) {
          index = i;
          break;
        }
      }
      break;
    case 'year':
      const year = openDate.getFullYear();
      if (year >= 1990 && year <= new Date().getFullYear()) {
        index = year - 1990;
      }
      break;
  }
  
  return index;
};

// 데이터 패칭 훅 - API 호출 로직 분리
function useFetchInstitutionData({
  period, 
  analysisUnit,
  searchTerm,
  startDate,
  endDate,
  type
}: {
  period: string;
  analysisUnit: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
  type?: string;
}) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { fetchStartDate, unit } = calculateStartDate(period, startDate, endDate, analysisUnit);

        // URL 쿼리 파라미터 구성
        const url = new URL(`/api/institutions/trend`, window.location.origin);
        url.searchParams.append('period', period);
        url.searchParams.append('startDate', fetchStartDate.toISOString());
        url.searchParams.append('unit', unit);
        
        if (searchTerm) {
          url.searchParams.append('search', searchTerm);
        }
        
        if (type) {
          url.searchParams.append('type', type);
        }
        
        if (period === 'custom' && endDate) {
          url.searchParams.append('endDate', endDate.toISOString());
        }

        console.log('데이터 요청 URL:', url.toString());
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API 응답:', {
          total: data.institutions?.length || 0,
          period,
          startDate: startDate ? startDate.toISOString() : 'none',
          endDate: endDate ? endDate.toISOString() : 'none',
          unit,
          첫번째데이터: data.institutions?.[0] || 'none',
          마지막데이터: data.institutions?.length > 0 ? data.institutions[data.institutions.length - 1] : 'none'
        });

        if (data && data.institutions) {
          setInstitutions(data.institutions);
        } else {
          setInstitutions([]);
        }
      } catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, analysisUnit, searchTerm, startDate, endDate, type]);

  return { institutions, loading, error };
}

// 기본 차트 컴포넌트 - 로딩 상태 및 데이터 표시 로직 공통화
function ChartContainer({
  title,
  loading,
  chartData,
  period,
  emptyMessage = '데이터가 없습니다'
}: {
  title: string;
  loading: boolean;
  chartData: ChartData;
  period: string;
  emptyMessage?: string;
}) {
  return (
    <>
      <h2 className="text-lg text-white font-semibold mt-4">{title}</h2>
      <div className="bg-gray-700 rounded-lg shadow-md px-4 py-2 h-[600px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-200">데이터를 불러오는 중...</p>
          </div>
        ) : chartData.datasets.length > 0 ? (
          <Line
            data={chartData}
            options={getChartOptions(period)}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-300">{emptyMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}

//-------------------------------------------------------------
// 1. 지역별 의료기관 개업 추세 차트 컴포넌트
//-------------------------------------------------------------
export function RegionTrendChart({ 
  period, 
  analysisUnit = 'month',
  searchTerm = '',
  startDate,
  endDate
}: ChartProps) {
  // 데이터 패칭 로직을 훅으로 분리
  const { institutions, loading } = useFetchInstitutionData({
    period,
    analysisUnit,
    searchTerm,
    startDate,
    endDate
  });

  // 차트 데이터 처리 로직을 useMemo로 최적화
  const chartData = useMemo(() => {
    // 기본 선택 지역 (서울, 경기, 부산)
    const defaultRegionCodes = ["11", "41", "26"];
    
    // 기본 선택 지역 이름 추출
    const defaultRegions = defaultRegionCodes.map(code => 
      REGION_CODES[code][REGION_CODES[code].length - 1]
    );
    
    // 모든 가능한 지역 코드 목록 생성 (미상과 전체 제외)
    const allRegions = Object.entries(REGION_CODES)
      .filter(([code]) => code !== 'all' && code !== 'unknown')
      .map(([code, names]) => ({ 
        code, 
        name: names[names.length - 1] 
      }));

    if (!institutions || institutions.length === 0) {
      // 데이터가 없을 때 모든 지역에 대한 빈 데이터셋 생성
      const emptyDatasets = allRegions.map((region, idx) => {
        const color = getRegionColor(region.code, idx);
        
        return {
          label: region.name,
          data: [0], // 완전히 빈 배열 대신 0 값 하나 포함
          borderWidth: 2,
          borderColor: color,
          backgroundColor: `${color.replace('50%)', '50%, 0.2)')}`,
          tension: 0.3,
          hidden: !defaultRegions.includes(region.name) // 기본 지역만 표시
        };
      });
      
      return { 
        labels: ['데이터 없음'],
        datasets: emptyDatasets 
      };
    }

    // 검색어로 필터링
    let filteredInstitutions = institutions;
    if (searchTerm) {
      filteredInstitutions = institutions.filter(inst => 
        inst.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 주소에서 지역 추출
    const regions = formatAddressData(filteredInstitutions.map(inst => inst.address));
    
    // 지역별 그룹화
    const regionGroups: Record<string, Institution[]> = {};
    filteredInstitutions.forEach((inst, index) => {
      const region = regions[index];
      if (!regionGroups[region]) {
        regionGroups[region] = [];
      }
      
      if (inst.open_date) {
        regionGroups[region].push(inst);
      }
    });

    // 기간에 따른 레이블 생성
    const labels = generateTimeLabels(period, analysisUnit, startDate, endDate);

    // 데이터가 있는 지역 추적
    const regionsWithData = new Set(Object.keys(regionGroups));

    // 모든 지역에 대한 데이터셋 생성
    const datasets = allRegions.map((region, idx) => {
      const data = new Array(labels.length).fill(0);
      
      // 해당 지역에 데이터가 있는 경우 데이터 채우기
      if (regionsWithData.has(region.name) && regionGroups[region.name]) {
        regionGroups[region.name].forEach(inst => {
          if (!inst.open_date) return;
          
          try {
            // 날짜 파싱 (open_date가 "YYYY-MM-DD" 형식이라고 가정)
            const openDate = parseISO(inst.open_date);
            
            // 단위에 따라 적절한 인덱스에 카운트 증가
            const index = findDateIndex(openDate, period, analysisUnit, startDate, endDate);
            
            if (index !== -1) {
              data[index]++;
            }
          } catch (error) {
            console.error('날짜 처리 오류:', error);
          }
        });
      }

      // 색상 관련 설정 - 지역별 그룹 색상 사용
      const color = getRegionColor(region.code, idx);
      const backgroundColor = `${color.replace('50%)', '50%, 0.2)')}`;

      return {
        label: region.name,
        data,
        borderWidth: 2,
        borderColor: color,
        backgroundColor: backgroundColor,
        tension: 0.3,
        hidden: !defaultRegions.includes(region.name) && !searchTerm // 기본 지역 또는 검색 결과만 표시
      };
    });

    return {
      labels,
      datasets,
    };
  }, [institutions, period, searchTerm, analysisUnit, startDate, endDate]);

  // 공통 컴포넌트를 사용하여 차트 렌더링
  return (
    <ChartContainer
      title="지역별 의료기관 개업 추세"
      loading={loading}
      chartData={chartData}
      period={period}
    />
  );
}

//-------------------------------------------------------------
// 2. 의료기관 유형별 차트 컴포넌트
//-------------------------------------------------------------
export function InstitutionTypeChart({ 
  period, 
  analysisUnit = 'month',
  searchTerm = '',
  startDate,
  endDate
}: ChartProps) {
  // 데이터 패칭 로직을 훅으로 분리
  const { institutions, loading } = useFetchInstitutionData({
    period,
    analysisUnit,
    searchTerm,
    startDate,
    endDate
  });

  // 차트 데이터 처리 로직을 useMemo로 최적화
  const chartData = useMemo(() => {
    // 모든 가능한 기관 유형 목록 (전체 제외)
    const allTypes = INSTITUTION_TYPES.filter(type => type.code !== 'all');
    
    // 기본적으로 표시할 유형
    const defaultTypesToShow = ['병원', '의원', '약국'];

    if (!institutions || institutions.length === 0) {
      // 데이터가 없을 때 모든 유형에 대한 빈 데이터셋 생성
      const emptyDatasets = allTypes.map((typeInfo) => {
        return {
          label: typeInfo.name,
          data: [0], // 완전히 빈 배열 대신 0 값 하나 포함
          borderWidth: 2,
          borderColor: typeInfo.color,
          backgroundColor: `${typeInfo.color}33`, // 투명도 20%
          tension: 0.3,
          hidden: !defaultTypesToShow.includes(typeInfo.code) // 기본 표시 유형만 보이기
        };
      });
      
      return { 
        labels: ['데이터 없음'],
        datasets: emptyDatasets 
      };
    }

    // 검색어로 필터링
    let filteredInstitutions = institutions;
    if (searchTerm) {
      filteredInstitutions = institutions.filter(inst => 
        inst.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inst.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 유형별 그룹화
    const typeGroups: Record<string, Institution[]> = {};
    
    // 모든 유형에 대해 빈 배열 초기화
    allTypes.forEach(type => {
      typeGroups[type.code] = [];
    });
    
    filteredInstitutions.forEach((inst) => {
      // 유형이 없거나 매핑되지 않은 유형은 '의원'으로 처리
      let matchedType = '의원'; // 기본값
      
      if (inst.type) {
        // 정확히 일치하는 유형 찾기
        const exactMatch = allTypes.find(type => type.name === inst.type);
        if (exactMatch) {
          matchedType = exactMatch.code;
        } else {
          // 부분 일치 확인
          if (inst.type.includes('상급')) matchedType = '상급종합';
          else if (inst.type.includes('종합')) matchedType = '종합병원';
          else if (inst.type.includes('병원') && !inst.type.includes('치과') && !inst.type.includes('한방')) matchedType = '병원';
          else if (inst.type.includes('요양')) matchedType = '요양병원';
          else if (inst.type.includes('치과') && inst.type.includes('병원')) matchedType = '치과병원';
          else if (inst.type.includes('치과')) matchedType = '치과의원';
          else if (inst.type.includes('한방') && inst.type.includes('병원')) matchedType = '한방병원';
          else if (inst.type.includes('한의')) matchedType = '한의원';
          else if (inst.type.includes('약국')) matchedType = '약국';
          else if (inst.type.includes('의원')) matchedType = '의원';
        }
      }
      
      if (inst.open_date) {
        typeGroups[matchedType].push(inst);
      }
    });

    // 기간에 따른 레이블 생성
    const labels = generateTimeLabels(period, analysisUnit, startDate, endDate);

    // 모든 유형에 대한 데이터셋 생성
    const datasets = allTypes.map((typeInfo) => {
      const data = new Array(labels.length).fill(0);
      const typeCode = typeInfo.code;
      
      // 해당 유형에 데이터가 있는 경우 데이터 채우기
      if (typeGroups[typeCode] && typeGroups[typeCode].length > 0) {
        typeGroups[typeCode].forEach(inst => {
          if (!inst.open_date) return;
          
          try {
            // 날짜 파싱 (open_date가 "YYYY-MM-DD" 형식이라고 가정)
            const openDate = parseISO(inst.open_date);
            
            // 단위에 따라 적절한 인덱스에 카운트 증가
            const index = findDateIndex(openDate, period, analysisUnit, startDate, endDate);
            
            if (index !== -1) {
              data[index]++;
            }
          } catch (error) {
            console.error('날짜 처리 오류:', error);
          }
        });
      }

      return {
        label: typeInfo.name,
        data,
        borderWidth: 2,
        borderColor: typeInfo.color,
        backgroundColor: `${typeInfo.color}33`, // 투명도 20%
        tension: 0.3,
        hidden: !defaultTypesToShow.includes(typeInfo.code) // 기본 표시 유형만 보이기
      };
    });

    return {
      labels,
      datasets,
    };
  }, [institutions, period, searchTerm, analysisUnit, startDate, endDate]);

  // 공통 컴포넌트를 사용하여 차트 렌더링
  return (
    <ChartContainer
      title="의료기관 유형별 개업 추세"
      loading={loading}
      chartData={chartData}
      period={period}
    />
  );
}

//-------------------------------------------------------------
// 3. 약국 개업 추이 차트 컴포넌트
//-------------------------------------------------------------
export function PharmacyTrendChart({ 
  period, 
  analysisUnit = 'month',
  searchTerm = '',
  startDate,
  endDate
}: ChartProps) {
  // 데이터 패칭 로직을 훅으로 분리 (약국 타입만 필터링)
  const { institutions, loading } = useFetchInstitutionData({
    period,
    analysisUnit,
    searchTerm,
    startDate,
    endDate,
    type: '약국'
  });

  // 차트 데이터 처리 로직을 useMemo로 최적화
  const chartData = useMemo(() => {
    // 약국만 필터링 (API에서 이미 필터링했지만 추가 필터링)
    const pharmacyInstitutions = institutions.filter(inst => 
      inst.type?.includes('약국')
    );
    
    if (pharmacyInstitutions.length === 0) {
      return {
        labels: ['데이터 없음'],
        datasets: [{
          label: '약국 데이터 없음',
          data: [0],
          borderWidth: 2,
          borderColor: '#999',
          backgroundColor: 'rgba(153, 153, 153, 0.2)',
          tension: 0.3
        }]
      };
    }
    
    // 기본 선택 지역 (서울, 경기, 부산)
    const defaultRegionCodes = ["11", "41", "26"];
    
    // 기본 선택 지역 이름 추출
    const defaultRegions = defaultRegionCodes.map(code => 
      REGION_CODES[code][REGION_CODES[code].length - 1]
    );
    
    // 모든 가능한 지역 코드 목록 생성 (미상과 전체 제외)
    const allRegions = Object.entries(REGION_CODES)
      .filter(([code]) => code !== 'all' && code !== 'unknown')
      .map(([code, names]) => ({ 
        code, 
        name: names[names.length - 1] 
      }));

    // 검색어로 필터링
    let filteredInstitutions = pharmacyInstitutions;
    if (searchTerm) {
      filteredInstitutions = pharmacyInstitutions.filter(inst => 
        inst.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 주소에서 지역 추출
    const regions = formatAddressData(filteredInstitutions.map(inst => inst.address));
    
    // 지역별 그룹화
    const regionGroups: Record<string, Institution[]> = {};
    filteredInstitutions.forEach((inst, index) => {
      const region = regions[index];
      if (!regionGroups[region]) {
        regionGroups[region] = [];
      }
      
      if (inst.open_date) {
        regionGroups[region].push(inst);
      }
    });

    // 기간에 따른 레이블 생성
    const labels = generateTimeLabels(period, analysisUnit, startDate, endDate);

    // 데이터가 있는 지역 추적
    const regionsWithData = new Set(Object.keys(regionGroups));

    // 모든 지역에 대한 데이터셋 생성
    const datasets = allRegions.map((region, idx) => {
      const data = new Array(labels.length).fill(0);
      
      // 해당 지역에 데이터가 있는 경우 데이터 채우기
      if (regionsWithData.has(region.name) && regionGroups[region.name]) {
        regionGroups[region.name].forEach(inst => {
          if (!inst.open_date) return;
          
          try {
            // 날짜 파싱 (open_date가 "YYYY-MM-DD" 형식이라고 가정)
            const openDate = parseISO(inst.open_date);
            
            // 단위에 따라 적절한 인덱스에 카운트 증가
            const index = findDateIndex(openDate, period, analysisUnit, startDate, endDate);
            
            if (index !== -1) {
              data[index]++;
            }
          } catch (error) {
            console.error('날짜 처리 오류:', error);
          }
        });
      }

      // 색상 관련 설정 - 지역별 그룹 색상 사용
      const color = getRegionColor(region.code, idx);
      const backgroundColor = `${color.replace('50%)', '50%, 0.2)')}`;

      return {
        label: region.name,
        data,
        borderWidth: 2,
        borderColor: color,
        backgroundColor: backgroundColor,
        tension: 0.3,
        hidden: !defaultRegions.includes(region.name) && !searchTerm // 기본 지역 또는 검색 결과만 표시
      };
    });

    return {
      labels,
      datasets,
    };
  }, [institutions, period, searchTerm, analysisUnit, startDate, endDate]);

  // 공통 컴포넌트를 사용하여 차트 렌더링
  return (
    <ChartContainer
      title="지역별 약국 개업 추세"
      loading={loading}
      chartData={chartData}
      period={period}
      emptyMessage="약국 데이터가 없습니다"
    />
  );
} 