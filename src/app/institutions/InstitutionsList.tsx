'use client';

import React from 'react';
import { InstitutionCard } from '@/components/Institution/InstitutionCard';
import { SerializedInstitution } from '@/types/institution';
import Pagination from '@/components/UI/Pagination';

interface InstitutionsListProps {
  institutions: SerializedInstitution[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function InstitutionsList({ 
  institutions, 
  currentPage, 
  itemsPerPage, 
  totalItems,
  onPageChange 
}: InstitutionsListProps) {
  // 현재 페이지에 표시할 기관 목록은 이미 서버에서 필터링되어 있음
  const currentItems = institutions;
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      {currentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-800 rounded-xl">
          <p className="text-xl text-gray-300 mb-2">조회 결과가 없습니다.</p>
          <p className="text-gray-400">다른 검색 조건을 사용해 보세요.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            style="simple"
            label="의료기관"
          />
        </>
      )}
    </div>
  );
} 