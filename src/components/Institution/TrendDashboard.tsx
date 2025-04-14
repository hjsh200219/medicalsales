'use client';

import { useState } from 'react';
import InstitutionTypeChart from './InstitutionTypeChart';
import TrendFilter from './TrendFilter';
import RegionTrendChart from './RegionTrendChart';
import PharmacyTrendChart from './PharmacyTrendChart';

export default function TrendDashboard() {
  // 필터 상태 관리
  const [period, setPeriod] = useState('year'); // 기본값 수정
  const [analysisUnit, setAnalysisUnit] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // 필터 변경 처리
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const handleAnalysisUnitChange = (newUnit: string) => {
    setAnalysisUnit(newUnit);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch);
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setPeriod('custom');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 필터 컴포넌트 */}
      <TrendFilter 
        period={period}
        onPeriodChange={handlePeriodChange}
        onAnalysisUnitChange={handleAnalysisUnitChange}
        onSearchChange={handleSearchChange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      {/* 차트 컴포넌트들 */}
      <div className="flex flex-col gap-2">
        {/* 지역별 의료기관 개업 추이 차트 */}
        <RegionTrendChart 
          period={period}
          analysisUnit={analysisUnit}
          searchTerm={searchTerm}
          startDate={startDate}
          endDate={endDate}
        />
        
        {/* 의료기관 유형별 차트 */}
        <InstitutionTypeChart 
          period={period}
          analysisUnit={analysisUnit}
          searchTerm={searchTerm}
          startDate={startDate}
          endDate={endDate}
        />
        
        {/* 약국 개업 추이 차트 */}
        <PharmacyTrendChart 
          period={period}
          analysisUnit={analysisUnit}
          searchTerm={searchTerm}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}