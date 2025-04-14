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

interface InstitutionTypeChartProps {
  period: string;
  analysisUnit?: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

export default function InstitutionTypeChart({ 
  period, 
  analysisUnit = 'month',
  searchTerm = '',
  startDate,
  endDate
}: InstitutionTypeChartProps) {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  // 차트 데이터 준비 (useCallback으로 메모이제이션)
  const prepareChartData = useCallback((institutions: Institution[], startDate: Date, unit: string) => {
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
      
      setChartData({ 
        labels: ['데이터 없음'],
        datasets: emptyDatasets 
      });
      return;
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
        
        if (searchTerm) {
          url.searchParams.append('search', searchTerm);
        }
        
        if (period === 'custom' && endDate) {
          url.searchParams.append('endDate', endDate.toISOString());
        }

        console.log('데이터 요청 URL:', url.toString());
        const response = await fetch(url.toString());
        const data = await response.json();

        console.log('API 응답 데이터:', {
          total: data.institutions?.length || 0,
          hasType: data.institutions?.filter((i: Institution) => i.type).length || 0,
          types: [...new Set(data.institutions?.map((i: Institution) => i.type))]
        });

        if (data && data.institutions) {
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
  }, [period, prepareChartData, analysisUnit, searchTerm, startDate, endDate]); // 의존성 추가

  return (
    <>
      <h2 className="text-lg text-white font-semibold mt-4">의료기관 유형별 개업 추세</h2>
      <div className="bg-gray-700 rounded-lg shadow-md px-4 py-2 h-[600px]">
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
          <p className="text-lg text-gray-600">데이터가 없습니다</p>
        </div>
      )}
    </div>
    </>
  );
} 