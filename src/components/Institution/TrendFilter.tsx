'use client';

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import DatePickerInput from '@/components/UI/DatePickerInput';

// 기간 옵션 정의
export const PERIOD_OPTIONS = [
  { id: 'week', label: '최근 1주일', unit: 'day' },
  { id: 'month', label: '최근 1달', unit: 'day' },
  { id: 'halfYear', label: '최근 6개월', unit: 'week' },
  { id: 'year', label: '최근 1년', unit: 'month' },
  { id: 'twoYears', label: '최근 2년', unit: 'month' },
  { id: 'fiveYears', label: '최근 5년', unit: 'month' },
  { id: 'all', label: '전체', unit: 'year' },
];

// 분석 단위 옵션
export const UNIT_OPTIONS = [
  { id: 'day', label: '일' },
  { id: 'week', label: '주' },
  { id: 'month', label: '월' },
  { id: 'year', label: '년' },
  { id: 'decade', label: '10년' },
];

// 기본 선택 기간
export const DEFAULT_PERIOD = 'month';

// 기본 분석 단위
export const DEFAULT_UNIT = 'month';

interface PeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
  onFilterChange?: (filters: {
    searchTerm: string;
    startDate: Date | null;
    endDate: Date | null;
    analysisUnit: string;
  }) => void;
  onAnalysisUnitChange?: (unit: string) => void;
  onSearchChange?: (search: string) => void;
  onDateRangeChange?: (start: Date | undefined, end: Date | undefined) => void;
}

export default function PeriodFilter({ 
  period, 
  onPeriodChange, 
  onFilterChange,
  onAnalysisUnitChange,
  onSearchChange,
  onDateRangeChange
}: PeriodFilterProps) {
  // 커스텀 날짜 범위 상태
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [analysisUnit, setAnalysisUnit] = useState(DEFAULT_UNIT);
  
  // 초기 렌더링 감지용 ref
  const isInitialRender = useRef(true);

  // 필터 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    // 초기 렌더링 시에는 호출하지 않음
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    if (onFilterChange) {
      onFilterChange({
        searchTerm: '',
        startDate,
        endDate,
        analysisUnit
      });
    }
  }, [startDate, endDate, analysisUnit, onFilterChange]);

  // 분석 단위 변경 시 콜백 호출
  useEffect(() => {
    if (onAnalysisUnitChange) {
      onAnalysisUnitChange(analysisUnit);
    }
  }, [analysisUnit, onAnalysisUnitChange]);

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 변경 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  // 커스텀 날짜 범위 적용
  const applyCustomRange = () => {
    if (startDate && endDate) {
      onPeriodChange('custom');
      setUseCustomRange(true);
      
      if (onFilterChange) {
        onFilterChange({
          searchTerm: '',
          startDate,
          endDate,
          analysisUnit
        });
      }
      
      if (onDateRangeChange) {
        onDateRangeChange(startDate, endDate);
      }
    }
  };

  return (
    <div className="mb-6 space-y-4 lg:space-y-0 lg:flex  item-center lg:gap-6">
      {/* 기간 옵션 선택 박스 */}
      <div className="w-full md:w-1/4">
        <select
          value={useCustomRange ? 'custom' : period}
          onChange={(e) => {
            if (e.target.value === 'custom') {
              // 커스텀 선택 시 상태 변경
              setUseCustomRange(true);
              return;
            }
            setUseCustomRange(false);
            onPeriodChange(e.target.value);
          }}
          className="w-full h-10 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {PERIOD_OPTIONS.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
          <option value="custom">직접 선택</option>
        </select>
      </div>

      {/* 검색 입력창 */}
      <div className="w-full md:w-1/4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어 입력"
          className="w-full h-10 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* 커스텀 필터 부분 - 직접 선택일 때만 표시 */}
      {useCustomRange && (
        <div className="flex flex-wrap  w-full">
          {/* 모든 필터 요소를 한 줄로 정렬 (모바일에서는 2줄) */}
          <div className="w-full flex flex-wrap md:flex-nowrap justify-between md:justify-between">
            {/* 시작일 */}
            <div className="w-1/2 md:w-[23%] mb-2 md:mb-0">
              <DatePickerInput
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="시작일 선택"
                showMonthYearPicker={analysisUnit === 'month'}
                showYearPicker={analysisUnit === 'year' || analysisUnit === 'decade'}
                dateFormat={
                  analysisUnit === 'month' ? 'yyyy년 MM월' : 
                  (analysisUnit === 'year' || analysisUnit === 'decade') ? 'yyyy년' : 
                  'yyyy.MM.dd'
                }
              />
            </div>

            {/* 종료일 */}
            <div className="w-1/2 md:w-[23%] mb-2 md:mb-0">
              <DatePickerInput
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="종료일 선택"
                showMonthYearPicker={analysisUnit === 'month'}
                showYearPicker={analysisUnit === 'year' || analysisUnit === 'decade'}
                dateFormat={
                  analysisUnit === 'month' ? 'yyyy년 MM월' : 
                  (analysisUnit === 'year' || analysisUnit === 'decade') ? 'yyyy년' : 
                  'yyyy.MM.dd'
                }
              />
            </div>

            {/* 분석 단위 */}
            <div className="w-1/2 md:w-[23%]">
              <select
                value={analysisUnit}
                onChange={(e) => setAnalysisUnit(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {UNIT_OPTIONS.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 적용 버튼 */}
            <div className="w-1/2 md:w-[23%]">
              <button
                onClick={() => {
                  applyCustomRange();
                  setUseCustomRange(true);
                }}
                disabled={!startDate || !endDate}
                className={`w-full h-10 px-4 py-2 rounded-md text-sm font-medium ${
                  !startDate || !endDate
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 