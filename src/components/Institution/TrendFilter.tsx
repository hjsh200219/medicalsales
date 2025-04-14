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
    <div className="flex flex-col md:flex-row lg:justify-start lg:items-center gap-2 mb-2 ">
      <div className="w-full md:w-1/8">
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
          className="w-full h-10 px-2 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {PERIOD_OPTIONS.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
          <option value="custom">직접 선택</option>
        </select>
      </div>

      {useCustomRange && (
        <div className="flex justify-between gap-2">
            <div className="w-1/2 ">
              <DatePickerInput
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="시작일"
                showMonthYearPicker={analysisUnit === 'month'}
                showYearPicker={analysisUnit === 'year' || analysisUnit === 'decade'}
                dateFormat={
                  analysisUnit === 'month' ? 'yyyy년 MM월' : 
                  (analysisUnit === 'year' || analysisUnit === 'decade') ? 'yyyy년' : 
                  'yyyy.MM.dd'
                }
              />
            </div>

            <div className="w-1/2 ">
              <DatePickerInput
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="종료일"
                showMonthYearPicker={analysisUnit === 'month'}
                showYearPicker={analysisUnit === 'year' || analysisUnit === 'decade'}
                dateFormat={
                  analysisUnit === 'month' ? 'yyyy년 MM월' : 
                  (analysisUnit === 'year' || analysisUnit === 'decade') ? 'yyyy년' : 
                  'yyyy.MM.dd'
                }
              />
            </div>

            <div className="w-1/4 ">
              <select
                value={analysisUnit}
                onChange={(e) => setAnalysisUnit(e.target.value)}
                className="w-full h-10 px-2 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
              >
                {UNIT_OPTIONS.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/4">
              <button
                onClick={() => {
                  applyCustomRange();
                  setUseCustomRange(true);
                }}
                disabled={!startDate || !endDate}
                className={`w-full h-10 px-2 py-2 rounded-md font-medium ${
                  !startDate || !endDate
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                적용
              </button>
            </div>
          </div>
      )}
    </div>
  );
} 