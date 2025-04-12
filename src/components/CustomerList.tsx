import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import Pagination from './Pagination';

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
  // 열린 행 ID를 추적
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // 행 클릭 핸들러
  const toggleRowExpand = (id: string) => {
    if (expandedRowId === id) {
      setExpandedRowId(null); // 같은 행을 클릭하면 접음
    } else {
      setExpandedRowId(id); // 다른 행을 클릭하면 해당 행을 펼침
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-sm font-medium text-center text-gray-300 uppercase tracking-wider">고객명/이메일</th>
              <th scope="col" className="px-6 py-3 text-sm font-medium text-center text-gray-300 uppercase tracking-wider">전화번호/휴대폰</th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-sm font-medium text-center text-gray-300 uppercase tracking-wider">회사/직책</th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-sm font-medium text-center text-gray-300 uppercase tracking-wider">주소</th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-sm font-medium text-center text-gray-300 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-white">
                  데이터를 불러오는 중...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-white">
                  고객 정보가 없습니다.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <React.Fragment key={customer.id}>
                  <tr 
                    className={`hover:bg-blue-800 cursor-pointer md:cursor-default ${expandedRowId === customer.id ? 'bg-blue-900' : ''}`}
                    onClick={() => toggleRowExpand(customer.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{customer.customer_name}</div>
                      <div className="text-gray-400">
                        {customer.email ? (
                          <a 
                            href={`mailto:${customer.email}`} 
                            className="text-blue-400 hover:underline"
                            onClick={(e) => e.stopPropagation()} // 링크 클릭 시 행 확장되지 않도록
                          >
                            {customer.email}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white">
                        {customer.phone ? (
                          <a 
                            href={`tel:${customer.phone}`} 
                            className="text-blue-400 hover:underline"
                            onClick={(e) => e.stopPropagation()} // 링크 클릭 시 행 확장되지 않도록
                          >
                            {customer.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                      <div className="text-gray-400">
                        {customer.mobile ? (
                          <a 
                            href={`tel:${customer.mobile}`} 
                            className="text-blue-400 hover:underline"
                            onClick={(e) => e.stopPropagation()} // 링크 클릭 시 행 확장되지 않도록
                          >
                            {customer.mobile}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-white">{customer.company || '-'}</div>
                      <div className="text-gray-400">{customer.position || '-'}</div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-white">자택: {customer.address || '-'}</div>
                      <div className="text-gray-400">회사: {customer.address_company || '-'}</div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-center font-medium space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditForm(customer);
                        }}
                        className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded-md bg-gray-700"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCustomer(customer.id);
                        }}
                        className="text-red-400 hover:text-red-300 px-2 py-1 rounded-md bg-gray-700"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                  {/* 모바일에서 확장된 행 */}
                  {expandedRowId === customer.id && (
                    <tr className="md:hidden bg-blue-900">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-white mt-1">{customer.company || '-'}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 mt-1">{customer.position || '-'}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-white mt-1">자택: {customer.address || '-'}</div>
                            <div className="text-gray-400 mt-1">회사: {customer.address_company || '-'}</div>
                          </div>
                          <div className="flex col-span-2 justify-center space-x-4 mt-2">
                            <button
                              onClick={() => openEditForm(customer)}
                              className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md bg-gray-900"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => deleteCustomer(customer.id)}
                              className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md bg-gray-900"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCustomers}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
} 