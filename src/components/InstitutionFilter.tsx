'use client';

import React, { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import { REGION_CODES, getRegionFromAddress } from '@/types/regions';
import { SerializedInstitution, INSTITUTION_TYPES, InstitutionTypeCode } from '@/types/institution';
import { DateRangeSlider } from './DateRangeSlider';

export function SearchFilter({ 
  institutions, 
  onFilterChange 
}: { 
  institutions: SerializedInstitution[], 
  onFilterChange: (filtered: SerializedInstitution[]) => void 
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState<InstitutionTypeCode>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<{ start: Date, end: Date } | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // 검색 및 필터 적용
  const applyFilters = () => {
    // 검색어 및 지역 필터 모두 적용
    let filtered = [...institutions]; // 원본 배열 복사

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(institution => {
        return (
          (institution.name && institution.name.toLowerCase().includes(query)) ||
          (institution.phone && institution.phone.includes(query)) ||
          (institution.address && institution.address?.toLowerCase().includes(query))
        );
      });
    }
    
    // 지역 필터링 - 전체 아닌 경우만
    if (regionFilter !== 'all') {
      filtered = filtered.filter(institution => {
        // 주소에서 지역 코드 추출
        const regionCode = getRegionFromAddress(institution.address);
        return regionCode === regionFilter;
      });
    }
    
    // 의료기관 유형 필터링 - 전체 아닌 경우만
    if (typeFilter !== 'all') {
      filtered = filtered.filter(institution => {
        return institution.type === typeFilter;
      });
    }
    
    // 개업일 필터링
    if (dateRangeFilter) {
      filtered = filtered.filter(institution => {
        if (!institution.open_date) return false;
        
        // YYYYMMDD 형식의 문자열을 Date 객체로 변환
        const dateStr = institution.open_date;
        if (dateStr.length !== 8) return false;
        
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1; // 0-11
        const day = parseInt(dateStr.substring(6, 8));
        const openDate = new Date(year, month, day);
        
        // 개업일이 범위 내에 있는지 확인
        return (
          openDate >= dateRangeFilter.start && 
          openDate <= dateRangeFilter.end
        );
      });
    }
    
    onFilterChange(filtered);
  };

  // 필터가 변경될 때마다 필터 적용
  useEffect(() => {
    applyFilters();
  }, [regionFilter, typeFilter, dateRangeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // 지역 필터 변경 시 필터 적용
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(e.target.value);
  };

  // 의료기관 유형 필터 변경 시 필터 적용
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value as InstitutionTypeCode);
  };

  // 날짜 범위 변경 처리
  const handleDateRangeChange = (range: { start: Date, end: Date }) => {
    setDateRangeFilter(range);
  };

  // 개업일 필터 토글
  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
    if (!showDateFilter && !dateRangeFilter) {
      // 필터가 처음 활성화될 때 전체 범위로 설정
      setDateRangeFilter({ 
        start: new Date(1900, 0, 1), 
        end: new Date() 
      });
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="grid grid-cols-2 md:grid-cols-none md:flex md:gap-3 gap-2 md:w-auto w-full">
          <div className="w-full md:w-[180px]">
            <select
              value={regionFilter}
              onChange={handleRegionChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">지역 전체</option>
              {Object.entries(REGION_CODES)
                .filter(([code]) => code !== 'all')
                .map(([code, names]) => (
                  <option key={code} value={code}>{names[names.length - 1]}</option>
                ))
              }
            </select>
          </div>
          
          <div className="w-full md:w-[180px]">
            <select
              value={typeFilter}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {INSTITUTION_TYPES.map((type) => (
                <option key={type.code} value={type.code}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="w-full">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="의료기관명, 전화번호, 주소 검색"
          />
        </div>
      </form>

      <div className="mt-3">
        <button 
          onClick={toggleDateFilter}
          className="flex items-center text-sm text-gray-300 hover:text-white mb-1"
        >
          <svg 
            className={`w-4 h-4 mr-1 transition-transform ${showDateFilter ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          개업일 필터 {showDateFilter ? '숨기기' : '표시'}
        </button>
        
        {showDateFilter && (
          <div className="p-3 bg-gray-800 rounded-md mt-1">
            <DateRangeSlider
              onRangeChange={handleDateRangeChange}
              initialRange={dateRangeFilter || undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
} 