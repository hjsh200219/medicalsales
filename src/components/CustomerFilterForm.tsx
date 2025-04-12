import React from 'react';
import { tierColors } from '@/types/tierColors';

// 고객 검색 필터 컴포넌트
type CustomerFilterFormProps = {
  search: string;
  setSearch: (search: string) => void;
  tierFilter: string;
  setTierFilter: (tier: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  resetFilters: () => void;
  isSearching: boolean;
};

export default function CustomerFilterForm({
  search,
  setSearch,
  tierFilter,
  setTierFilter,
  handleSearch,
}: CustomerFilterFormProps) {
  const handleTierFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTierFilter(e.target.value);
  };

  return (
    <div className=" mb-4">
      <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2">
        <select
          value={tierFilter}
          onChange={handleTierFilterChange}
          className="px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">등급 전체</option>
          {Object.keys(tierColors)
            .filter(key => key !== 'default')
            .map(tier => (
              <option key={tier} value={tier}>{tier}</option>
            ))
          }
        </select>
        
        <div className="relative flex-1 min-w-[200px]">
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="고객 검색"
            className="w-full px-3 py-2 pr-10 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
} 