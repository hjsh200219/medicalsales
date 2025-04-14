import React from 'react';
import { Customer } from '@/types/customer';
import { Mail, Building, Edit, Trash2, Smartphone } from 'lucide-react';

type CustomerCardProps = {
  customer: Customer;
  openEditForm: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
};

export default function CustomerCard({
  customer,
  openEditForm,
  deleteCustomer
}: CustomerCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-750 transition-colors">
      <div className="p-4">
        {/* 고객 이름 및 이메일 */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{customer.customer_name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => openEditForm(customer)}
                className="text-gray-300 hover:text-blue-300"
                aria-label="고객 정보 수정"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => deleteCustomer(customer.id)}
                className="text-red-400 hover:text-red-300"
                aria-label="고객 정보 삭제"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center mt-1 text-gray-400">
            <Mail size={16} className="mr-1" />
            {customer.email ? (
              <a href={`mailto:${customer.email}`} className="text-gray-300 hover:underline">
                {customer.email}
              </a>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        
        {/* 연락처 정보 */}
        <div className="mb-3">
          <div className="flex items-center text-gray-400 mb-1/2">
            <Smartphone size={16} className="mr-1 " />
            {customer.mobile ? (
              <a href={`tel:${customer.mobile}`} className="text-gray-300 hover:text-gray-100">
                {customer.mobile}
              </a>
            ) : (
              <span>-</span>
            )}
            <span className="mx-1">|</span>
            {customer.phone ? (
              <a href={`tel:${customer.phone}`} className="text-gray-300 hover:text-gray-100">
                {customer.phone}
              </a>
            ) : (
              <span>-</span>
            )}
          </div>
          <div className="flex items-start text-white">
          <span className="ml-5">
              {customer.address ? (
                <a 
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(customer.address)}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-gray-100"
                >
                  {customer.address}
                </a>
              ) : '-'}
            </span>
          </div>
        </div>
        
        {/* 회사 및 직책 */}
        <div className="mb-0">
          <div className="flex items-center text-gray-400 mb-1/2">
            <Building size={16} className="mr-1" />
            <span className="font-bold">{customer.company || '-'}<span className="font-medium text-sm"> | {customer.position || '-'}</span></span>
          </div>
          <div className="flex items-center text-gray-400">
            <span className="ml-5">{customer.address_company ? (
                    <a 
                      href={`https://map.naver.com/v5/search/${encodeURIComponent(customer.address_company)}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-gray-100"
                    >
                      {customer.address_company}
                    </a>
                  ) : '-'}
                </span>
              </div>
        </div>
      
      </div>
    </div>
  );
} 