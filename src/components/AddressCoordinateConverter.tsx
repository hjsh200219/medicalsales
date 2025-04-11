import React, { useState, useEffect } from 'react';

type AddressCoordinateConverterProps = {
  address: string;
  isCompany?: boolean;
  onCoordinateChange: (latitude: string, longitude: string) => void;
  existingLatitude?: string;
  existingLongitude?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
};

export default function AddressCoordinateConverter({
  address,
  isCompany = false,
  onCoordinateChange,
  existingLatitude,
  existingLongitude,
  onChange,
  inputName
}: AddressCoordinateConverterProps) {
  const [status, setStatus] = useState<string | null>(null);
  
  // 카카오 API 키 - 환경 변수에서 가져오기
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  
  // Kakao Maps SDK 스크립트 로드
  useEffect(() => {
    // 이미 스크립트가 로드되어 있는지 확인
    if (document.getElementById('kakao-sdk')) return;
    
    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      // 컴포넌트가 unmount될 때 스크립트를 제거하지 않음 (다른 컴포넌트에서 재사용)
    };
  }, []);

  // 주소를 위경도로 변환하는 함수
  const convertAddressToCoords = async () => {
    if (!address.trim()) {
      setStatus('주소를 입력해주세요');
      return;
    }
    
    try {
      setStatus('변환 중...');
      
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
        onCoordinateChange(result.y, result.x);
        setStatus('✓ 변환 완료');
      } else {
        setStatus('검색 결과가 없습니다');
      }
    } catch (err) {
      console.error('Error converting address:', err);
      setStatus('변환 실패');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {isCompany ? '회사 주소' : '자택 주소'}
      </label>
      <div className="flex">
        <input
          type="text"
          name={inputName}
          value={address}
          onChange={onChange}
          className="flex-grow px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={convertAddressToCoords}
          className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          위경도 변환
        </button>
      </div>
      {status && (
        <p className={`text-sm mt-1 ${status.includes('✓') ? 'text-green-400' : 'text-yellow-400'}`}>
          {status}
          {status.includes('✓') && (
            <span className="ml-2 text-xs text-gray-400">
              (위도: {existingLatitude}, 경도: {existingLongitude})
            </span>
          )}
        </p>
      )}
      {!status && existingLatitude && existingLongitude && (
        <p className="text-sm mt-1 text-green-400">
          ✓ 기존 위경도 정보 있음
          <span className="ml-2 text-xs text-gray-400">
            (위도: {existingLatitude}, 경도: {existingLongitude})
          </span>
        </p>
      )}
    </div>
  );
} 