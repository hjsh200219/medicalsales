'use client';

import { useEffect, useRef } from 'react';
import { getTierColor } from '@/types/tierColors';
import { SerializedInstitution, INSTITUTION_TYPES } from '@/types/institution';

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
  padding: '0px',
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

const defaultInfoWindowStyle: InfoWindowStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: STYLE_CONSTANTS.borderRadius,
  padding: STYLE_CONSTANTS.padding,
  borderColor: STYLE_CONSTANTS.colors.borderColor,
  closeButtonColor: STYLE_CONSTANTS.colors.lightGray
};

const InfoWindowElements = {
  getCloseButton(): HTMLElement | null {
    return document.querySelector(STYLE_CONSTANTS.selectors.closeButton);
  },
  
  getContainer(): HTMLElement | null {
    return document.querySelector(STYLE_CONSTANTS.selectors.infoWindowContainer);
  },
  
  getOuterContainer(): HTMLElement | null {
    return document.querySelector(STYLE_CONSTANTS.selectors.outerContainer);
  },
  
  getBackground(): HTMLElement | null {
    return document.querySelector(STYLE_CONSTANTS.selectors.infoWindowBackground);
  },
  
  getTail(): HTMLElement | null {
    const background = this.getBackground();
    if (!background) return null;
    return background.querySelector(STYLE_CONSTANTS.selectors.infoWindowTail);
  }
};

const InfoWindowStyling = {
  setCloseButtonStyle(display: 'block' | 'none' = 'block'): void {
    const closeButton = InfoWindowElements.getCloseButton();
    if (closeButton) {
      closeButton.style.display = display;
    }
  },
  
  setContainerStyle(style: InfoWindowStyle): void {
    const container = InfoWindowElements.getContainer();
    if (container) {
      container.style.backgroundColor = style.backgroundColor || defaultInfoWindowStyle.backgroundColor!;
      container.style.padding = '0';
      container.style.borderRadius = style.borderRadius || defaultInfoWindowStyle.borderRadius!;
    }
  },
  
  removeBoxShadow(): void {
    const outerContainer = InfoWindowElements.getOuterContainer();
    if (outerContainer) {
      outerContainer.style.boxShadow = 'none';
    }
  },
  
  setTailBackgroundColor(color: string = 'transparent'): void {
    const tail = InfoWindowElements.getTail();
    if (tail) {
      tail.style.backgroundColor = color;
    }
  },
  
  applyDefaultStyles(): void {
    this.setCloseButtonStyle('none');
    this.setContainerStyle(defaultInfoWindowStyle);
    this.removeBoxShadow();
    this.setTailBackgroundColor('transparent');
  }
};

export const styleDefaultInfoWindows = () => {
  InfoWindowStyling.applyDefaultStyles();
};

export const applyInfoWindowStyle = (infoWindow: google.maps.InfoWindow, style: InfoWindowStyle = {}) => {
  const mergedStyle = { ...defaultInfoWindowStyle, ...style };

  infoWindow.addListener('domready', () => {
    InfoWindowStyling.setCloseButtonStyle('none');
    InfoWindowStyling.setTailBackgroundColor('transparent');
    InfoWindowStyling.setContainerStyle(mergedStyle);
    InfoWindowStyling.removeBoxShadow();
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
      // InfoWindow 생성 시 옵션에 disableAutoPan:false 설정 (InfoWindow가 화면 밖으로 나가지 않도록)
      const infoWindowOptions = {
        ...options,
        disableAutoPan: false // false로 변경하여 자동 이동 활성화
      };
      const infoWindow = new google.maps.InfoWindow(infoWindowOptions);
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
        infoWindowRef.current.setOptions({ 
          maxWidth: options.maxWidth,
          disableAutoPan: false // false로 변경하여 자동 이동 활성화
        });
      }
    }
    
    if (isOpen) {
      if (marker) {
        // autoPan을 활성화하는 옵션 설정
        const options = { disableAutoPan: false };
        infoWindowRef.current?.open({
          map: map,
          anchor: marker,
          shouldFocus: false,
          ...options
        });
      } else if (options.position) {
        // autoPan을 활성화하는 옵션 설정
        const openOptions = { disableAutoPan: false };
        // 먼저 position 설정 후 open 호출
        infoWindowRef.current?.setPosition(options.position);
        infoWindowRef.current?.open({
          map: map,
          shouldFocus: false,
          ...openOptions
        });
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
) => {
  const addressType = isCompanyAddress ? '회사' : '자택';
  const address = isCompanyAddress ? customer.address_company : customer.address;
  const tierDisplayColor = customer.tier ? getTierColor(customer.tier) : getTierColor('default');

  return `
    <div style="min-width: 250px; max-width: 280px; padding: 16px; word-break: break-word; background-color: white; border-radius: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div style="max-width: 75%;">
          <h3 style="font-size: 16px; font-weight: bold; margin: 0; overflow: hidden; text-overflow: ellipsis; color: black;">${customer.customer_name}<span style="color: #9CA3AF; margin-left: 4px;">[${addressType}]</span></h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background-color: ${tierDisplayColor}; color: white; padding: 4px 6px; border-radius: 4px; font-size: 12px;">${customer.tier || '일반'}</span>
          <button onclick="this.closest('.gm-style-iw-a').querySelector('.gm-ui-hover-effect').click();" style="border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
      <p style="color: black; margin: 6px 0;  display: flex; align-items: center;">
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
 * 개설일자 포맷팅 함수
 */
export const formatOpenDate = (openDate: string | null | undefined): string => {
  if (!openDate) return '정보 없음';
  
  try {
    let dateObj: Date;
    
    // YYYYMMDD 형식인 경우 (숫자로만 이루어진 8자리 문자열)
    if (openDate.length === 8 && /^\d+$/.test(openDate)) {
      const year = openDate.slice(0, 4);
      const month = openDate.slice(4, 6);
      const day = openDate.slice(6, 8);
      dateObj = new Date(`${year}-${month}-${day}`);
    } else {
      // 기존 방식으로 처리 (ISO 형식 등)
      dateObj = new Date(openDate);
    }
    
    // 유효한 날짜인지 확인
    if (isNaN(dateObj.getTime())) {
      return '정보 없음';
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}년 ${month}월 ${day}일`;
  } catch {
    return '정보 없음';
  }
};

/**
 * 의료기관 정보창 내용 생성 함수
 */
export const createInstitutionInfoContent = (institution: SerializedInstitution) => {
  const { name, address, phone, type, open_date } = institution;
  const code = 'code' in institution ? institution['code' as keyof typeof institution] : undefined;
  
  // 의료기관 유형 찾기
  const institutionType = INSTITUTION_TYPES.find(t => t.code === type) || INSTITUTION_TYPES[0];
  const typeName = institutionType.name;
  const typeColor = institutionType.color;
  
  const formattedOpenDate = formatOpenDate(open_date);
  
  return `
    <div style="min-width: 250px; max-width: 280px; padding: 16px; word-break: break-word; background-color: white; border-radius: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div style="max-width: 90%;">
          <h3 style="font-size: 16px; font-weight: bold; margin: 0; overflow: hidden; text-overflow: ellipsis; color: black;">${name || '이름 없음'}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background-color: ${typeColor}; color: white; padding: 4px 6px; border-radius: 4px; font-size: 12px;">${typeName}</span>
          <button onclick="this.closest('.gm-style-iw-a').querySelector('.gm-ui-hover-effect').click();" style="border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <a href="tel:${phone || '없음'}" style="text-decoration: none;">${phone || '없음'}</a>
      </p>
      <p style="color: black; margin: 6px 0;  display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        ${address || '주소 정보 없음'}
      </p>
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        ${formattedOpenDate}
      </p>
      ${code ? `
      <p style="color: black; margin: 6px 0; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; color: #6B7280; margin-right: 4px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
        ${code}
      </p>` : ''}
    </div>
  `;
};

export default InfoWindowManager; 