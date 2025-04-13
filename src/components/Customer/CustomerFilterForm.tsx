import React from 'react';
import { tierColors } from '@/types/tierColors';
import { SearchInput } from '@/components/UI/SearchInput';

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
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
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
        
        <div className="flex-1 w-full md:w-auto lg:w-full xl:w-full">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="고객 검색"
          />
        </div>
      </div>
    </div>
  );
} 