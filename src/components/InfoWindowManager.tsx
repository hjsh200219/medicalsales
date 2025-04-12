'use client';

import { useEffect, useRef } from 'react';

export interface InfoWindowStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: string;
  closeButtonColor?: string;
}

export interface InfoWindowOptions {
  content: string | Element | Text | null | undefined;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  maxWidth?: number;
  disableAutoPan?: boolean;
  pixelOffset?: google.maps.Size;
}

interface InfoWindowManagerProps {
  map: google.maps.Map | null;
  marker?: google.maps.Marker;
  options: InfoWindowOptions;
  style?: InfoWindowStyle;
  isOpen: boolean;
  onClose?: () => void;
}

/**
 * InfoWindow 스타일을 적용하는 유틸리티 함수
 */
export const applyInfoWindowStyle = (infoWindow: google.maps.InfoWindow, style: InfoWindowStyle = {}) => {
  const defaultStyle: InfoWindowStyle = {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderRadius: '6px',
    padding: '8px',
    borderColor: '#E5E7EB',
    closeButtonColor: '#F3F4F6'
  };

  const mergedStyle = { ...defaultStyle, ...style };

  // InfoWindow가 DOM에 추가된 후 스타일 적용
  infoWindow.addListener('domready', () => {
    // InfoWindow의 부모 컨테이너 스타일 변경
    const iwOuter = document.querySelector('.gm-style-iw-a') as HTMLElement;
    if (iwOuter) {
      // 기본 그림자 제거
      iwOuter.style.boxShadow = 'none';
    }
    
    // 기본 닫기 버튼 숨기기
    const defaultCloseButton = document.querySelector('.gm-ui-hover-effect') as HTMLElement;
    if (defaultCloseButton) {
      defaultCloseButton.style.display = 'none';
    }
    
    // InfoWindow 컨테이너
    const iwBackground = document.querySelector('.gm-style-iw-t') as HTMLElement;
    if (iwBackground) {
      // 삼각형 꼬리 요소 찾기
      const iwTail = document.querySelector('.gm-style-iw-tc') as HTMLElement;
      
      // 배경색 변경 (삼각형 꼬리 제외)
      const iwChildren = iwBackground.querySelectorAll('div');
      for (let i = 0; i < iwChildren.length; i++) {
        const child = iwChildren[i] as HTMLElement;
        
        // 삼각형 꼬리는 배경색 변경하지 않음
        if (child.classList.contains('gm-style-iw-tc')) {
          continue;
        }
        
        child.style.backgroundColor = mergedStyle.backgroundColor!;
        child.style.boxShadow = 'none';
      }
      
      // 삼각형 꼬리 요소가 있으면 삼각형 모양 유지
      if (iwTail) {
        iwTail.style.backgroundColor = 'transparent';
      }
    }
    
    // 닫기 버튼 스타일 변경
    const closeButton = document.querySelector('.gm-ui-hover-effect') as HTMLElement;
    if (closeButton) {
      closeButton.style.display = 'none'; // 기본 닫기 버튼 숨기기
    }
    
    // InfoWindow 콘텐츠 컨테이너
    const iwContent = document.querySelector('.gm-style-iw-d') as HTMLElement;
    if (iwContent) {
      iwContent.style.overflow = 'hidden';
      iwContent.style.backgroundColor = mergedStyle.backgroundColor!;
      
      // 텍스트 색상 적용
      const textElements = iwContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
      textElements.forEach((element) => {
        if ((element as HTMLElement).style.color !== 'white') { // 흰색 텍스트(예: 티어 라벨)는 유지
          (element as HTMLElement).style.color = mergedStyle.textColor!;
        }
      });
    }
    
    // InfoWindow 배경 색상 변경
    const iwContainer = document.querySelector('.gm-style-iw') as HTMLElement;
    if (iwContainer) {
      iwContainer.style.backgroundColor = mergedStyle.backgroundColor!;
      iwContainer.style.padding = '0';
      iwContainer.style.borderRadius = mergedStyle.borderRadius!;
      
      // 모바일 화면에서 최대 너비 제한
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        iwContainer.style.maxWidth = 'calc(100% - 30px)';
      }
    }
  });

  return infoWindow;
};

/**
 * 정보창 관리 컴포넌트
 */
const InfoWindowManager: React.FC<InfoWindowManagerProps> = ({
  map,
  marker,
  options,
  style,
  isOpen,
  onClose
}) => {
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    // Google Maps API가 로드되지 않았다면 무시
    if (!window.google?.maps || !map) return;
    
    // InfoWindow 생성
    if (!infoWindowRef.current) {
      const infoWindow = new google.maps.InfoWindow(options);
      infoWindowRef.current = applyInfoWindowStyle(infoWindow, style);
      
      // 닫기 이벤트 설정
      if (onClose) {
        infoWindow.addListener('closeclick', onClose);
      }
    } else {
      // 이미 존재하는 InfoWindow의 콘텐츠 업데이트
      infoWindowRef.current.setContent(options.content);
      
      // 위치 업데이트 (있는 경우)
      if (options.position) {
        infoWindowRef.current.setPosition(options.position);
      }
      
      // 기타 옵션 업데이트
      if (options.maxWidth !== undefined) {
        infoWindowRef.current.setOptions({ maxWidth: options.maxWidth });
      }
    }
    
    // 열기/닫기 처리
    if (isOpen) {
      if (marker) {
        infoWindowRef.current?.open(map, marker);
      } else if (options.position) {
        infoWindowRef.current?.open(map);
      }
    } else {
      infoWindowRef.current?.close();
    }

    // 컴포넌트 언마운트 시 정보창 닫기
    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [map, marker, options, style, isOpen, onClose]);

  return null;
};

// 고객 정보 인터페이스 정의
export interface CustomerInfo {
  id?: string | number;
  customer_name: string;
  phone?: string;
  mobile?: string;
  email?: string;
  address?: string;
  address_company?: string;
  tier?: string;
  company?: string;
  position?: string;
  lat?: number | string;
  lng?: number | string;
  lat_company?: number | string;
  lng_company?: number | string;
}

/**
 * 커스텀 InfoWindow 콘텐츠 생성 함수
 */
export const createCustomerInfoContent = (
  customer: CustomerInfo,
  isCompanyAddress: boolean,
  tierColor: string,
  uniqueId: string
) => {
  const addressType = isCompanyAddress ? '회사' : '자택';
  const address = isCompanyAddress ? customer.address_company : customer.address;

  return `
    <div style="min-width: 250px; max-width: 280px; padding: 16px; word-break: break-word;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div style="max-width: 70%;">
          <h3 style="font-size: 16px; font-weight: bold; color: black; margin: 0; overflow: hidden; text-overflow: ellipsis;">${customer.customer_name} (${addressType})</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background-color: ${tierColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${customer.tier || '일반'}</span>
          <button id="${uniqueId}" style="background-color: #f3f4f6; border: none; border-radius: 4px; color: black; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer;">✕</button>
        </div>
      </div>
      <p style="color: black; margin: 6px 0;"><strong>연락처:</strong><a href="tel:${customer.phone || '없음'}" style="color: black; text-decoration: none;">${customer.phone || '없음'}</a></p>
      <p style="color: black; margin: 6px 0;"><strong>휴대폰:</strong><a href="tel:${customer.mobile || '없음'}" style="color: black; text-decoration: none;">${customer.mobile || '없음'}</a></p>
      <p style="color: black; margin: 6px 0;"><strong>이메일:</strong><a href="mailto:${customer.email || '없음'}" style="color: black; text-decoration: none;">${customer.email || '없음'}</a></p>
      <p style="color: black; margin: 6px 0; padding-right: 20px;"><strong>${addressType}:</strong> ${address || '없음'}</p>
      ${customer.company ? `
          <div style="border-top: 1px solid #e5e7eb; margin-top: 10px; padding-top: 10px;">
            <p style="color: black; margin: 6px 0;"><strong>회사:</strong> ${customer.company}</p>
          </div>` : ''}
      ${customer.position ? `<p style="color: black; margin: 6px 0;"><strong>직책:</strong> ${customer.position}</p>` : ''}
    </div>
  `;
};

export default InfoWindowManager; 