'use client';

import { useState, useEffect } from 'react';

type FilterType = 'open_date' | 'created_at' | 'custom_date';

export default function FilterSelector() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('created_at');
  const [customDate, setCustomDate] = useState<string>('');

  // 선택된 필터와 커스텀 날짜를 로컬 스토리지에 저장
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('dataFilterType', selectedFilter);
    if (customDate) {
      localStorage.setItem('customFilterDate', customDate);
    }
  }, [selectedFilter, customDate]);

  // 페이지 로드 시 로컬 스토리지에서 필터 타입과 커스텀 날짜 불러오기
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedFilter = localStorage.getItem('dataFilterType') as FilterType | null;
    if (savedFilter && (savedFilter === 'open_date' || savedFilter === 'created_at' || savedFilter === 'custom_date')) {
      setSelectedFilter(savedFilter);
    }
    
    const savedCustomDate = localStorage.getItem('customFilterDate');
    if (savedCustomDate) {
      setCustomDate(savedCustomDate);
    } else {
      // 기본값으로 오늘 날짜 설정
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setCustomDate(formattedDate);
    }
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
    
    // 커스텀 이벤트를 통해 필터 변경 알림
    if (typeof window === 'undefined') return;
    
    const event = new CustomEvent('filterTypeChange', { 
      detail: { filterType: filter } 
    });
    window.dispatchEvent(event);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
    
    // 커스텀 이벤트를 통해 날짜 변경 알림
    if (typeof window === 'undefined') return;
    
    const event = new CustomEvent('customDateChange', { 
      detail: { customDate: e.target.value } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="mb-2">
      <h3 className="text-white text-lg font-medium mb-2">신규 데이터 필터링 기준</h3>
      <div className="flex flex-wrap gap-4 mb-3">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="filter-type"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedFilter === 'created_at'}
            onChange={() => handleFilterChange('created_at')}
          />
          <span className="ml-2 text-gray-300">생성일 기준</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="filter-type"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedFilter === 'open_date'}
            onChange={() => handleFilterChange('open_date')}
          />
          <span className="ml-2 text-gray-300">등록일 기준</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="filter-type"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedFilter === 'custom_date'}
            onChange={() => handleFilterChange('custom_date')}
          />
          <span className="ml-2 text-gray-300">특정 날짜 기준</span>
        </label>
      </div>
      
      {selectedFilter === 'custom_date' && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            기준 날짜 선택 (이 날짜 이후 데이터만 필터링)
          </label>
          <input
            type="date"
            value={customDate}
            onChange={handleDateChange}
            className="px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full max-w-xs"
          />
        </div>
      )}
      
      <p className="text-xs text-gray-400 mt-1">
        {selectedFilter === 'open_date' 
          ? '의료기관의 등록일자를 기준으로 신규 데이터를 필터링합니다.' 
          : selectedFilter === 'created_at'
            ? '데이터베이스 레코드 생성일을 기준으로 신규 데이터를 필터링합니다.'
            : `${customDate} 이후에 등록된 데이터만 필터링합니다.`}
      </p>
    </div>
  );
} 