'use client';

import { Customer } from '@/types/customer';
import { SerializedInstitution, INSTITUTION_TYPES } from '@/types/institution';
import { getTierColor } from '@/types/tierColors';

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  icon?: google.maps.Icon | string;
  label?: google.maps.MarkerLabel | string;
  onClick?: (marker: google.maps.Marker) => void;
}

/**
 * 고객 마커 생성 유틸리티 함수
 */
export const createCustomerMarker = (
  customer: Customer, 
  index: number, 
  isCompany: boolean,
  onMarkerClick: (customer: Customer, marker: google.maps.Marker, isCompany: boolean) => void
): MapMarker | null => {
  const lat = isCompany ? customer.lat_company : customer.lat;
  const lng = isCompany ? customer.lng_company : customer.lng;
  
  if (!lat || !lng || isNaN(parseFloat(String(lat))) || isNaN(parseFloat(String(lng)))) {
    return null;
  }

  const tierColor = getTierColor(customer.tier || 'default');
  const pinSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
      <path fill="${tierColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
    </svg>
  `;

  if (!window.google?.maps) {
    return null;
  }

  return {
    id: `${isCompany ? 'company' : 'home'}-${customer.id || index}`,
    position: {
      lat: parseFloat(String(lat)),
      lng: parseFloat(String(lng))
    },
    title: `${customer.customer_name} (${isCompany ? '회사' : '자택'})`,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(10, 20),
      labelOrigin: new google.maps.Point(10, 8)
    },
    label: {
      text: isCompany ? 'C' : 'H',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    onClick: (marker: google.maps.Marker) => {
      if (marker && window.google && window.google.maps) {
        onMarkerClick(customer, marker, isCompany);
      }
    }
  };
};

/**
 * 의료기관 마커 생성 유틸리티 함수
 */
export const createInstitutionMarker = (
  institution: SerializedInstitution, 
  index: number,
  onMarkerClick: (institution: SerializedInstitution, marker: google.maps.Marker) => void
): MapMarker | null => {
  try {
    const { lat, lng, name, id, type } = institution;
    
    // 좌표 타입 변환
    let parsedLat: number;
    let parsedLng: number;
    
    if (typeof lat === 'string') {
      parsedLat = parseFloat(lat);
    } else if (typeof lat === 'number') {
      parsedLat = lat;
    } else {
      return null;
    }
    
    if (typeof lng === 'string') {
      parsedLng = parseFloat(lng);
    } else if (typeof lng === 'number') {
      parsedLng = lng;
    } else {
      return null;
    }
    
    // NaN 체크
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      return null;
    }
    
    // 범위 체크 (대한민국 좌표 범위)
    if (parsedLat < 33 || parsedLat > 43 || parsedLng < 124 || parsedLng > 132) {
      return null;
    }

    // 의료기관 유형에 따른 마커 색상 설정
    const institutionType = INSTITUTION_TYPES.find(t => t.code === type) || INSTITUTION_TYPES[0];
    const color = institutionType.color;

    // 의료기관 타입에 따른 아이콘 선택
    let iconPath = '';
    if (type === '약국') {
      // Pill 아이콘
      iconPath = `<path d="M10.5 16.5L3 9c-1.5-1.5-1.5-4 0-5.5s4-1.5 5.5 0L16 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.5 7.5L21 15c1.5 1.5 1.5 4 0 5.5s-4 1.5-5.5 0L8 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (type === '한방병원' || type === '한의원') {
      // Herb 아이콘
      iconPath = `<path d="M19 8c0-2-1-2-3-2-2 0-7 1-8 3-0.5 0.5-0.5 2-1 3 3-1 6-1 8-1 1 0 1 0 3-1 1-0.5 1-1 1-2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 8c0-2 1-2 3-2 2 0 7 1 8 3 0.5 0.5 0.5 2 1 3-3-1-6-1-8-1-1 0-1 0-3-1-1-0.5-1-1-1-2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 22a8 8 0 0 0 8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 22a8 8 0 0 1-8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 10h6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 10v12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      // Hospital 아이콘
      iconPath = `<path d="M8 3v4a1 1 0 0 1-1 1H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 3v4a1 1 0 0 0 1 1h4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 21v-4a1 1 0 0 0-1-1H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 21v-4a1 1 0 0 1 1-1h4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 8h8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 16h8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8v8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }

    // 아이콘 내부에 Lucide 아이콘 추가
    const iconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
        <path fill="${color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
        <svg x="142" y="96" width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${iconPath}
        </svg>
      </svg>
    `;

    // Google Maps API가 로드되었는지 확인
    if (!window.google?.maps) {
      return null;
    }
    
    return {
      id: `institution-${id || index}`,
      position: {
        lat: parsedLat,
        lng: parsedLng
      },
      title: name || '이름 없음',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSVG),
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(10, 20),
        labelOrigin: new window.google.maps.Point(15, 15)
      },
      onClick: (marker: google.maps.Marker) => {
        if (marker && window.google && window.google.maps) {
          onMarkerClick(institution, marker);
        }
      }
    };
  } catch {
    return null;
  }
};

/**
 * 의료기관 유효성 검사 (좌표 확인)
 */
export const isValidInstitution = (inst: SerializedInstitution): boolean => {
  // 좌표 값 존재 여부 확인
  if (!inst.lat || !inst.lng) {
    return false;
  }
  
  // 문자열이면 숫자로 변환 시도
  const latValue = typeof inst.lat === 'string' ? parseFloat(inst.lat) : inst.lat;
  const lngValue = typeof inst.lng === 'string' ? parseFloat(inst.lng) : inst.lng;
  
  // NaN 체크
  if (isNaN(latValue) || isNaN(lngValue)) {
    return false;
  }
  
  // 범위 체크 (대한민국 좌표 범위)
  if (latValue < 33 || latValue > 43 || lngValue < 124 || lngValue > 132) {
    return false;
  }
  
  return true;
};

const MarkerUtils = {
  createCustomerMarker,
  createInstitutionMarker,
  isValidInstitution
};

export default MarkerUtils; 