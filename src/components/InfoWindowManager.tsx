'use client';

import { useEffect, useRef } from 'react';
import { getTierColor } from '@/types/tierColors';

// 스타일 관련 상수 정의
const STYLE_CONSTANTS = {
  colors: {
    white: 'white',
    black: 'black',
    darkGray: '#374151',
    lightGray: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  borderRadius: '6px',
  padding: '8px',
  selectors: {
    infoWindowContainer: '.gm-style-iw',
    infoWindowContent: '.gm-style-iw-d',
    outerContainer: '.gm-style-iw-a',
    closeButton: '.gm-ui-hover-effect',
    infoWindowTail: '.gm-style-iw-tc',
    infoWindowBackground: '.gm-style-iw-t',
  },
};

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

// 기본 스타일 객체
const defaultInfoWindowStyle: InfoWindowStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: STYLE_CONSTANTS.borderRadius,
  padding: STYLE_CONSTANTS.padding,
  borderColor: STYLE_CONSTANTS.colors.borderColor,
  closeButtonColor: STYLE_CONSTANTS.colors.lightGray
};

/**
 * InfoWindow 스타일을 적용하는 유틸리티 함수
 */
export const applyInfoWindowStyle = (infoWindow: google.maps.InfoWindow, style: InfoWindowStyle = {}) => {
  const mergedStyle = { ...defaultInfoWindowStyle, ...style };

  infoWindow.addListener('domready', () => {
    const closeButton = document.querySelector(STYLE_CONSTANTS.selectors.closeButton) as HTMLElement;
    if (closeButton) {
      closeButton.style.display = 'none';
    }
    
    const iwBackground = document.querySelector(STYLE_CONSTANTS.selectors.infoWindowBackground) as HTMLElement;
    if (iwBackground) {
      const iwTail = document.querySelector(STYLE_CONSTANTS.selectors.infoWindowTail) as HTMLElement;
      if (iwTail) {
        iwTail.style.backgroundColor = 'transparent';
      }
    }
    
    // InfoWindow 컨테이너 배경색만 설정
    const container = document.querySelector(STYLE_CONSTANTS.selectors.infoWindowContainer) as HTMLElement;
    if (container) {
      container.style.backgroundColor = mergedStyle.backgroundColor!;
      container.style.padding = '0';
      container.style.borderRadius = mergedStyle.borderRadius!;
    }
    
    // 그림자 제거
    const iwOuter = document.querySelector(STYLE_CONSTANTS.selectors.outerContainer) as HTMLElement;
    if (iwOuter) {
      iwOuter.style.boxShadow = 'none';
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
    if (!window.google?.maps || !map) return;
    
    if (!infoWindowRef.current) {
      const infoWindow = new google.maps.InfoWindow(options);
      infoWindowRef.current = applyInfoWindowStyle(infoWindow, style);
      
      if (onClose) {
        infoWindow.addListener('closeclick', onClose);
      }
    } else {
      infoWindowRef.current.setContent(options.content);
      
      if (options.position) {
        infoWindowRef.current.setPosition(options.position);
      }
      
      if (options.maxWidth !== undefined) {
        infoWindowRef.current.setOptions({ maxWidth: options.maxWidth });
      }
    }
    
    if (isOpen) {
      if (marker) {
        infoWindowRef.current?.open(map, marker);
      } else if (options.position) {
        infoWindowRef.current?.open(map);
      }
    } else {
      infoWindowRef.current?.close();
    }

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
  uniqueId: string
) => {
  const addressType = isCompanyAddress ? '회사' : '자택';
  const address = isCompanyAddress ? customer.address_company : customer.address;
  const tierDisplayColor = customer.tier ? getTierColor(customer.tier) : getTierColor('default');

  return `
    <div style="min-width: 250px; max-width: 280px; padding: 16px; word-break: break-word; background-color: white; border-radius: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div style="max-width: 70%;">
          <h3 style="font-size: 16px; font-weight: bold; margin: 0; overflow: hidden; text-overflow: ellipsis; color: black;">${customer.customer_name}<span style="color: #9CA3AF; margin-left: 4px;">[${addressType}]</span></h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background-color: ${tierDisplayColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${customer.tier || '일반'}</span>
          <button id="${uniqueId}" style="background-color: #f3f4f6; border: none; border-radius: 4px; color: black; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer;">✕</button>
        </div>
      </div>
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <a href="tel:${customer.phone || '없음'}" style="text-decoration: none;">${customer.phone || '없음'}</a>
      </p>
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <a href="tel:${customer.mobile || '없음'}" style="text-decoration: none;">${customer.mobile || '없음'}</a>
      </p>
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <a href="mailto:${customer.email || '없음'}" style="text-decoration: none;">${customer.email || '없음'}</a>
      </p>
      <p style="color: black; margin: 6px 0; padding-right: 20px; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        ${address || '없음'}
      </p>
      ${customer.company ? `
          <div style="border-top: 1px solid #e5e7eb; margin-top: 10px; padding-top: 10px;">
            <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              ${customer.company}
            </p>
          </div>` : ''}
      ${customer.position ? `
          <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            ${customer.position}
          </p>` : ''}
    </div>
  `;
};

/**
 * 모든 InfoWindow의 스타일을 적용하는 글로벌 함수
 */
export const styleDefaultInfoWindows = () => {
  // 기본 닫기 버튼 숨기기
  const closeButton = document.querySelector(STYLE_CONSTANTS.selectors.closeButton) as HTMLElement;
  if (closeButton) {
    closeButton.style.display = 'none';
  }
  
  // InfoWindow 컨테이너 배경색만 설정
  const container = document.querySelector(STYLE_CONSTANTS.selectors.infoWindowContainer) as HTMLElement;
  if (container) {
    container.style.backgroundColor = defaultInfoWindowStyle.backgroundColor!;
    container.style.padding = '0';
    container.style.borderRadius = defaultInfoWindowStyle.borderRadius!;
  }
  
  // 그림자 제거
  const iwOuter = document.querySelector(STYLE_CONSTANTS.selectors.outerContainer) as HTMLElement;
  if (iwOuter) {
    iwOuter.style.boxShadow = 'none';
  }
};

export default InfoWindowManager; 