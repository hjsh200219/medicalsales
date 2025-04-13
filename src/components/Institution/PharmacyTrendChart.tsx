'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  LineElement,  
  PointElement,
  Title, 
  Tooltip, 
  Legend,
  Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths, subYears, startOfYear, endOfYear, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PERIOD_OPTIONS } from '@/components/Institution/TrendFilter';
import { REGION_CODES, getRegionFromAddress, getRegionColor } from '@/types/regions';

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

interface PharmacyTrendChartProps {
  period: string;
  analysisUnit?: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

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

export default function PharmacyTrendChart({ 
  period, 
  analysisUnit = 'month',
  searchTerm = '',
  startDate,
  endDate
}: PharmacyTrendChartProps) {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  // 차트 데이터 준비 (useCallback으로 메모이제이션)
  const prepareChartData = useCallback((institutions: Institution[], startDate: Date, unit: string) => {
    // 약국만 필터링
    const pharmacyInstitutions = institutions.filter(inst => 
      inst.type?.includes('약국')
    );
    
    if (pharmacyInstitutions.length === 0) {
      setChartData({
        labels: ['데이터 없음'],
        datasets: [{
          label: '약국 데이터 없음',
          data: [0],
          borderWidth: 2,
          borderColor: '#999',
          backgroundColor: 'rgba(153, 153, 153, 0.2)',
          tension: 0.3
        }]
      });
      return;
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
    let labels: string[] = [];
    
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
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        const years = currentYear - startYear + 1;
        labels = Array.from({ length: years }, (_, i) => `${startYear + i}년`);
        break;
    }

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
            let index = -1;
            
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

    setChartData({
      labels,
      datasets,
    });
  }, [period, searchTerm]);

  // 선택된 기간에 따라 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 기간에 따른 시작일 계산
        let fetchStartDate = new Date();
        let unit = analysisUnit || 'month';

        // 커스텀 날짜 범위 사용 처리
        if (period === 'custom' && startDate && endDate) {
          fetchStartDate = startDate;
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

        // URL 쿼리 파라미터에 분석 단위와 검색어도 추가
        const url = new URL(`/api/institutions/trend`, window.location.origin);
        url.searchParams.append('period', period);
        url.searchParams.append('startDate', fetchStartDate.toISOString());
        url.searchParams.append('unit', unit);
        url.searchParams.append('type', '약국');
        
        if (searchTerm) {
          url.searchParams.append('search', searchTerm);
        }
        
        if (period === 'custom' && endDate) {
          url.searchParams.append('endDate', endDate.toISOString());
        }

        console.log('약국 데이터 요청 URL:', url.toString());
        const response = await fetch(url.toString());
        const data = await response.json();

        if (data && data.institutions) {
          console.log(`약국 데이터 ${data.institutions.length}개 받음`);
          // 데이터 처리 및 차트 데이터 설정
          prepareChartData(data.institutions, fetchStartDate, unit);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, prepareChartData, analysisUnit, searchTerm, startDate, endDate]);

  return (
    <>
      <h2 className="text-2xl text-white font-semibold mt-6 mb-2">지역별 약국 개업 추세</h2>
      <div className="bg-gray-700 rounded-lg shadow-md p-6 h-[600px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-200">데이터를 불러오는 중...</p>
          </div>
        ) : chartData.datasets.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
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
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'rgba(33, 33, 33, 0.9)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderWidth: 1,
                  padding: 10,
                  displayColors: true,
                  filter: function(tooltipItem) {
                    // 숨겨진 데이터셋은 툴팁에서 제외
                    return !tooltipItem.dataset.hidden;
                  },
                  callbacks: {
                    title: (items) => {
                      if (!items.length) return '';
                      const item = items[0];
                      return `${item.label} 데이터`;
                    },
                    label: (context) => {
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
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-300">약국 데이터가 없습니다</p>
          </div>
        )}
      </div>
    </>
  );
} 