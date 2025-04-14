'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/UI/PageHeader';
import TrendFilter from '@/components/Institution/TrendFilter';
import { RegionTrendChart, InstitutionTypeChart, PharmacyTrendChart } from '@/components/Institution/InstitutionCharts';

export default function InstitutionTrend() {
  // 필터 상태 관리
  const [period, setPeriod] = useState('year'); // 기본값 수정
  const [analysisUnit, setAnalysisUnit] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  // 직접 선택 기능을 주석 처리했으므로 날짜 관련 상태도 주석 처리
  // const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  // const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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

  /* const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setPeriod('custom');
    }
  }; */

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader 
            title="의료기관 개업 추이" 
          />
        </div>
        
        <div className="flex flex-col">
          {/* 필터 컴포넌트 */}
          <TrendFilter 
            period={period}
            onPeriodChange={handlePeriodChange}
            onAnalysisUnitChange={handleAnalysisUnitChange}
            onSearchChange={handleSearchChange}
          />
          
          {/* 차트 컴포넌트들 */}
          <div className="flex flex-col gap-2">
            {/* 지역별 의료기관 개업 추이 차트 */}
            <RegionTrendChart 
              period={period}
              analysisUnit={analysisUnit}
              searchTerm={searchTerm}
              // startDate={startDate}
              // endDate={endDate}
            />
            
            {/* 의료기관 유형별 차트 */}
            <InstitutionTypeChart 
              period={period}
              analysisUnit={analysisUnit}
              searchTerm={searchTerm}
              // startDate={startDate}
              // endDate={endDate}
            />
            
            {/* 약국 개업 추이 차트 */}
            <PharmacyTrendChart 
              period={period}
              analysisUnit={analysisUnit}
              searchTerm={searchTerm}
              // startDate={startDate}
              // endDate={endDate}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 