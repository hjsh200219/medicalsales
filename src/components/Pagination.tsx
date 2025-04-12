import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  style?: 'numbers' | 'simple';
  label?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  style = 'simple',
  label = '고객'
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // 표시할 페이지 번호 범위 계산 (numbers 스타일용)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // 한 번에 표시할 최대 페이지 번호 수
    
    // 기본 시작 페이지와 끝 페이지
    let startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    
    // endPage가 전체 페이지보다 작다면 startPage 조정
    if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // 번호가 있는 상세 페이지네이션 스타일
  if (style === 'numbers') {
    return (
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="이전 페이지"
        >
          <ChevronLeft size={20} />
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="다음 페이지"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  // 간단한 페이지네이션 스타일
  return (
    <div className="flex justify-between items-center mt-4 text-white">
      {totalItems && itemsPerPage && (
        <div>
          총 {totalItems}명의 {label} 중 {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}명 표시
        </div>
      )}
      <div className="flex space-x-2 ml-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          이전
        </button>
        <div className="px-3 py-1 bg-gray-700 rounded-md">
          {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
} 