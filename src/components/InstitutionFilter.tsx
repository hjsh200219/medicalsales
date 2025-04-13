'use client';

import React, { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import { REGION_CODES, getRegionFromAddress } from '@/types/regions';
import { SerializedInstitution, INSTITUTION_TYPES, InstitutionTypeCode } from '@/types/institution';

export function SearchFilter({ 
  institutions, 
  onFilterChange,
  onToggleFilters,
  showFilters = true
}: { 
  institutions: SerializedInstitution[], 
  onFilterChange: (filtered: SerializedInstitution[]) => void,
  onToggleFilters?: (isVisible: boolean) => void,
  showFilters?: boolean
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState<InstitutionTypeCode>('all');
  const [dateFilter, setDateFilter] = useState('month');
  const [isFilterVisible, setIsFilterVisible] = useState(showFilters);

  useEffect(() => {
    setIsFilterVisible(showFilters);
  }, [showFilters]);

  // 날짜 범위 계산 함수
  const getDateRange = (option: string): { start: Date, end: Date } => {
    const end = new Date();
    let start = new Date();
    
    switch(option) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'halfYear':
        start.setMonth(start.getMonth() - 6);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
      case 'twoYears':
        start.setFullYear(start.getFullYear() - 2);
        break;
      case 'fiveYears':
        start.setFullYear(start.getFullYear() - 5);
        break;
      case 'all':
      default:
        start = new Date(1900, 0, 1);
        break;
    }
    
    return { start, end };
  };

  // 검색 및 필터 적용
  const applyFilters = () => {
    let filtered = [...institutions];

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
    
    // 지역 필터링
    if (regionFilter !== 'all') {
      filtered = filtered.filter(institution => {
        const regionCode = getRegionFromAddress(institution.address);
        return regionCode === regionFilter;
      });
    }
    
    // 의료기관 유형 필터링
    if (typeFilter !== 'all') {
      filtered = filtered.filter(institution => {
        return institution.type === typeFilter;
      });
    }
    
    // 개업일 필터링
    if (dateFilter !== 'all') {
      const dateRange = getDateRange(dateFilter);
      filtered = filtered.filter(institution => {
        if (!institution.open_date) return false;
        
        const dateStr = institution.open_date;
        if (dateStr.length !== 8) return false;
        
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = parseInt(dateStr.substring(6, 8));
        const openDate = new Date(year, month, day);
        
        return (
          openDate >= dateRange.start && 
          openDate <= dateRange.end
        );
      });
    }
    
    onFilterChange(filtered);
  };

  // 필터 변경 시 필터 적용
  useEffect(() => {
    applyFilters();
  }, [regionFilter, typeFilter, dateFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // 필터 토글
  const toggleFilters = () => {
    const newState = !isFilterVisible;
    setIsFilterVisible(newState);
    if (onToggleFilters) {
      onToggleFilters(newState);
    }
  };

  return (
    <div className="mb-4">
      {/* 필터 토글 버튼 */}
      <div className="mb-3">
        <button 
          onClick={toggleFilters}
          className="flex items-center text-sm text-gray-300 hover:text-white mb-1"
        >
          <svg 
            className={`w-4 h-4 mr-1 transition-transform ${isFilterVisible ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          필터 {isFilterVisible ? '숨기기' : '표시'}
        </button>
      </div>
      
      {/* 필터 내용 */}
      {isFilterVisible && (
        <div className="p-4 bg-gray-800 rounded-md">
          <form onSubmit={handleSearch} className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="grid grid-cols-3 gap-2 w-full md:flex md:flex-row md:gap-3 md:flex-nowrap">
                <div className="w-full md:w-40">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
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
                
                <div className="w-full md:w-40">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as InstitutionTypeCode)}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {INSTITUTION_TYPES.map((type) => (
                      <option key={type.code} value={type.code}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full md:w-40">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">전체 기간</option>
                    <option value="week">최근 1주일</option>
                    <option value="month">최근 1달</option>
                    <option value="halfYear">최근 6개월</option>
                    <option value="year">최근 1년</option>
                    <option value="twoYears">최근 1~2년</option>
                    <option value="fiveYears">최근 2~5년</option>
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 