import React from 'react';
import { Customer } from '@/types/customer';

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
  formatDate: (dateString: string) => string;
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
  deleteCustomer,
  formatDate
}: CustomerListProps) {
  return (
    <>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">이름</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">연락처</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">회사</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">회사 주소</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">직책</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">등록일</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-white">
                  데이터를 불러오는 중...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-white">
                  고객 정보가 없습니다.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{customer.customer_name}</div>
                    <div className="text-sm text-gray-400">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{customer.phone || '-'}</div>
                    <div className="text-sm text-gray-400">{customer.mobile || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {customer.company || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {customer.address_company || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {customer.position || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatDate(customer.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openEditForm(customer)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-white">
          <div>
            총 {totalCustomers}명의 고객 중 {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalCustomers)}명 표시
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              이전
            </button>
            <div className="px-3 py-1 bg-gray-700 rounded-md">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </>
  );
} 