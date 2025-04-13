import React from 'react';
import { Customer } from '@/types/customer';
import Pagination from '@/components/UI/Pagination';
import CustomerCard from '@/components/Customer/CustomerCard';

// 고객 목록 컴포넌트
type CustomerListProps = {
  customers: Customer[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalCustomers: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  openEditForm: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
};

export default function CustomerList({
  customers,
  isLoading,
  currentPage,
  totalPages,
  totalCustomers,
  pageSize,
  handlePageChange,
  openEditForm,
  deleteCustomer
}: CustomerListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-white">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-800 rounded-xl">
        <p className="text-xl text-gray-300 mb-2">조회 결과가 없습니다.</p>
        <p className="text-gray-400">다른 검색 조건을 사용해 보세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            openEditForm={openEditForm}
            deleteCustomer={deleteCustomer}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCustomers}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
} 