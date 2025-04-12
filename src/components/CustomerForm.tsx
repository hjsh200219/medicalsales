import React, { useState } from 'react';
import AddressCoordinateConverter from './AddressCoordinateConverter';
import { Customer } from '@/types/customer';
import { tierColors } from '@/types/tierColors';

// Customer 인터페이스에서 폼에 필요한 필드만 추출
export type CustomerFormData = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;

// 고객 폼 컴포넌트 Props
export type CustomerFormProps = {
  initialData?: Partial<Customer>;
  onCancel: () => void;
  onSubmit: (formData: CustomerFormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  title: string;
  submitButtonText: string;
};

export default function CustomerForm({
  initialData = {},
  onCancel,
  onSubmit,
  isSubmitting,
  error,
  title,
  submitButtonText
}: CustomerFormProps) {
  // Customer 인터페이스의 옵셔널 필드를 고려하여 초기값 설정
  const [formData, setFormData] = useState<CustomerFormData>({
    customer_name: initialData.customer_name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    mobile: initialData.mobile || '',
    address: initialData.address || '',
    company: initialData.company || '',
    position: initialData.position || '',
    tier: initialData.tier || '',
    comment: initialData.comment || '',
    address_company: initialData.address_company || '',
    lat: initialData.lat || '', 
    lng: initialData.lng || '', 
    lat_company: initialData.lat_company || '', 
    lng_company: initialData.lng_company || '', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHomeCoordinateChange = (latitude: string, longitude: string) => {
    setFormData(prev => ({ ...prev, lat: latitude, lng: longitude }));
  };

  const handleCompanyCoordinateChange = (latitude: string, longitude: string) => {
    setFormData(prev => ({ ...prev, lat_company: latitude, lng_company: longitude }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name) {
      return; 
    }

    await onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 섹션 */}
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-lg font-medium text-blue-400 mb-3">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                고객명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                전화번호
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                휴대폰
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                등급
              </label>
              <select
                name="tier"
                value={formData.tier || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                {Object.keys(tierColors)
                  .filter(key => key !== 'default')
                  .map(tier => (
                    <option key={tier} value={tier}>{tier}</option>
                  ))
                }
              </select>
            </div>
            
            <div className="md:col-span-2">
              <AddressCoordinateConverter
                address={formData.address || ''}
                onCoordinateChange={handleHomeCoordinateChange}
                existingLatitude={formData.lat || ''}
                existingLongitude={formData.lng || ''}
                onChange={handleChange}
                inputName="address"
              />
            </div>
            
          </div>
        </div>
        
        {/* 회사 정보 섹션 */}
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-lg font-medium text-blue-400 mb-3">회사 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                회사
              </label>
              <input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                직책
              </label>
              <input
                type="text"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <AddressCoordinateConverter
                address={formData.address_company || ''}
                isCompany={true}
                onCoordinateChange={handleCompanyCoordinateChange}
                existingLatitude={formData.lat_company || ''}
                existingLongitude={formData.lng_company || ''}
                onChange={handleChange}
                inputName="address_company"
              />
            </div>
          </div>
        </div>
        
        {/* 메모 섹션 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            메모
          </label>
          <textarea
            name="comment"
            value={formData.comment || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="flex justify-center space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
          >
            취소하기
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? '처리 중...' : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
} 