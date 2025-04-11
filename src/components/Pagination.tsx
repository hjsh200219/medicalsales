import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-4 text-white">
      <div>
        총 {totalItems}명의 고객 중 {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)}명 표시
      </div>
      <div className="flex space-x-2">
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