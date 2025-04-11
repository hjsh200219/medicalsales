import React, { useState } from 'react';

// 고객 추가 폼 컴포넌트
type CustomerAddFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function CustomerAddForm({ onCancel, onSuccess }: CustomerAddFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    company: '',
    position: '',
    tier: '',
    comment: '',
    address_company: '',
    lat: '', 
    lng: '', 
    lat_company: '', 
    lng_company: '', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 주소를 위경도로 변환하는 함수
  const convertAddressToCoords = async (address: string): Promise<{latitude: string, longitude: string} | null> => {
    if (!address.trim()) {
      return null;
    }
    
    // 카카오 API 키 - 환경 변수에서 가져오기
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    
    try {
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error('주소 변환에 실패했습니다');
      }
      
      const data = await response.json();
      
      if (data.documents && data.documents.length > 0) {
        const result = data.documents[0];
        return { latitude: result.y, longitude: result.x };
      } else {
        return null;
      }
    } catch (err) {
      console.error('Error converting address:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name.trim()) {
      setError('고객명은 필수 항목입니다');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // 폼 제출 전에 주소를 위경도로 변환
      const updatedFormData = { ...formData };
      
      // 자택 주소가 있으면 위경도 변환
      if (formData.address) {
        const homeCoords = await convertAddressToCoords(formData.address);
        if (homeCoords) {
          updatedFormData.lat = homeCoords.latitude;
          updatedFormData.lng = homeCoords.longitude;
        }
      }
      
      // 회사 주소가 있으면 위경도 변환
      if (formData.address_company) {
        const companyCoords = await convertAddressToCoords(formData.address_company);
        if (companyCoords) {
          updatedFormData.lat_company = companyCoords.latitude;
          updatedFormData.lng_company = companyCoords.longitude;
        }
      }

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '고객 등록에 실패했습니다');
      }

      onSuccess();
    } catch (err) {
      console.error('Error adding customer:', err);
      setError(err instanceof Error ? err.message : '고객 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-white mb-4">고객 등록</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 개인 정보 섹션 */}
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-lg font-medium text-blue-400 mb-3">개인 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={formData.email}
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
                value={formData.phone}
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
                value={formData.mobile}
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
                <option value="VIP">VIP</option>
                <option value="감사고객">감사고객</option>
                <option value="법인고객">법인고객</option>
                <option value="신규고객">신규고객</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                자택 주소
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                저장 시 자동으로 위경도로 변환됩니다.
              </p>
            </div>
            
          </div>
        </div>
        
        {/* 회사 정보 섹션 */}
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-lg font-medium text-blue-400 mb-3">회사 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                회사
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
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
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                회사 주소
              </label>
              <input
                type="text"
                name="address_company"
                value={formData.address_company}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                저장 시 자동으로 위경도로 변환됩니다.
              </p>
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
            value={formData.comment}
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
            {isSubmitting ? '처리 중...' : '저장하기'}
          </button>
        </div>
      </form>
    </div>
  );
} 