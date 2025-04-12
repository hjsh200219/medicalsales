"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Customer } from '@/types/customer';
import { getTierColor } from '@/types/tierColors';
import CustomerFilterForm from '@/components/CustomerFilterForm';
import GoogleMap, { MapMarker } from '@/components/GoogleMap';

interface CustomerMapProps {
  customers: Customer[];
  apiKey: string;
}

const CustomerMap: React.FC<CustomerMapProps> = ({ customers, apiKey }) => {
  const [search, setSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [showDefaultMap, setShowDefaultMap] = useState<boolean>(false);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  
  // 필터 처리 함수
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  // 필터 초기화 함수
  const resetFilters = () => {
    setSearch('');
    setTierFilter('');
    // 필터 초기화 시 바로 전체 고객 목록으로 업데이트
    setFilteredCustomers(customers);
    setShowDefaultMap(false);
  };
  
  // 필터 적용 함수
  const applyFilters = useCallback(() => {
    // 검색어와 등급 필터를 적용하여 고객 필터링
    const filtered = customers.filter(customer => {
      const matchesSearch = search === '' || 
        customer.customer_name?.toLowerCase().includes(search.toLowerCase()) || 
        customer.email?.toLowerCase().includes(search.toLowerCase()) || 
        customer.company?.toLowerCase().includes(search.toLowerCase()) || 
        customer.address?.toLowerCase().includes(search.toLowerCase()) || 
        customer.address_company?.toLowerCase().includes(search.toLowerCase());
      
      const matchesTier = tierFilter === '' || customer.tier === tierFilter;
      
      return matchesSearch && matchesTier;
    });
        
    // 필터 결과가 없으면 기본 지도 표시 모드로 전환
    if (filtered.length === 0) {
      setMarkers([]);
      setShowDefaultMap(true);
    } else {
      setShowDefaultMap(false);
    }
    
    setFilteredCustomers(filtered);
  }, [customers, search, tierFilter]);
  
  // 초기 필터링된 고객 설정
  useEffect(() => {
    setFilteredCustomers(customers);
    setShowDefaultMap(false);
  }, [customers]);
  
  // 필터 변경 시 필터 적용
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // 컴포넌트 언마운트 시 InfoWindow 정리
  useEffect(() => {
    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
    };
  }, []);
  
  // InfoWindow 생성 및 표시 함수
  const createInfoWindow = useCallback((customer: Customer, marker: google.maps.Marker, isCompanyAddress: boolean) => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API가 로드되지 않았습니다.');
      return;
    }
    
    console.log('InfoWindow 생성 시작:', { 
      customerName: customer.customer_name, 
      isCompanyAddress
    });

    // 이전에 열린 InfoWindow가 있으면 닫기
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    
    // 고유 ID 생성
    const uniqueId = `close-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tierColor = getTierColor(customer.tier);
    const addressType = isCompanyAddress ? '회사' : '자택';
    const address = isCompanyAddress ? customer.address_company : customer.address;
    
    // InfoWindow 내용 생성
    const content = `
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
    
    // 새 InfoWindow 생성
    const infoWindow = new google.maps.InfoWindow({
      content: content,
      disableAutoPan: false,
      pixelOffset: new google.maps.Size(0, -10)
    });
    
    // InfoWindow 열기
    infoWindow.open(marker.getMap() as google.maps.Map, marker);
    
    // InfoWindow 참조 저장
    infoWindowRef.current = infoWindow;
    
    // domready 이벤트에 리스너 추가
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      console.log('InfoWindow domready 이벤트 발생');
      
      // 사용자 정의 닫기 버튼에 이벤트 리스너 추가
      const customCloseButton = document.getElementById(uniqueId);
      if (customCloseButton) {
        customCloseButton.addEventListener('click', () => {
          console.log('InfoWindow 닫기 버튼 클릭됨');
          infoWindow.close();
          infoWindowRef.current = null;
        });
      }
      
      // 기존 X 버튼 숨기기
      const defaultCloseButton = document.querySelector('.gm-ui-hover-effect');
      if (defaultCloseButton) {
        (defaultCloseButton as HTMLElement).style.display = 'none';
      }
      
      // 모바일에서 InfoWindow 스타일 추가 조정
      const isMobile = window.innerWidth < 768;
      
      // InfoWindow 컨테이너
      const iwContainer = document.querySelector('.gm-style-iw') as HTMLElement;
      if (iwContainer) {
        iwContainer.style.backgroundColor = 'white';
        iwContainer.style.padding = '0';
        if (isMobile) {
          iwContainer.style.maxWidth = 'calc(100% - 30px)';
        }
      }
      
      // 콘텐츠 컨테이너
      const iwContent = document.querySelector('.gm-style-iw-d') as HTMLElement;
      if (iwContent) {
        iwContent.style.overflow = 'hidden';
        iwContent.style.backgroundColor = 'white';
        if (isMobile) {
          iwContent.style.maxWidth = '100%';
          iwContent.style.paddingRight = '10px';
        }
        
        // 텍스트 색상 강제 적용
        const textElements = iwContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
        textElements.forEach(element => {
          (element as HTMLElement).style.color = 'black';
        });
      }
      
      // 배경 컨테이너
      const iwBackground = document.querySelector('.gm-style-iw-t') as HTMLElement;
      if (iwBackground) {
        const iwChildren = iwBackground.querySelectorAll('div');
        for (let i = 0; i < iwChildren.length; i++) {
          const child = iwChildren[i] as HTMLElement;
          if (!child.classList.contains('gm-style-iw-tc')) {
            child.style.backgroundColor = 'white';
            child.style.boxShadow = 'none';
          }
        }
      }
    });
    
    // InfoWindow 닫힐 때 이벤트
    google.maps.event.addListener(infoWindow, 'closeclick', () => {
      console.log('InfoWindow closeclick 이벤트 발생');
      infoWindowRef.current = null;
    });
    
  }, []);
  
  // 마커와 InfoWindow 생성
  useEffect(() => {
    // 필터링된 고객이 없는 경우 마커 초기화
    if (!filteredCustomers || filteredCustomers.length === 0) {
      setMarkers([]);
      setShowDefaultMap(true);
      return;
    }
    
    // Google Maps API가 로드되었는지 확인
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      return;
    }
    
    // 마커 배열 초기화 (이전 마커 제거)
    const customerMarkers: MapMarker[] = [];
    
    // 각 고객에 대해 마커 생성
    filteredCustomers.forEach((customer, index) => {
      const tierColor = getTierColor(customer.tier);
      
      // SVG 마커 이미지 생성
      const pinSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
          <path fill="${tierColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
        </svg>
      `;
      
      // 자택 주소에 마커 생성
      if (customer.lat && customer.lng && !isNaN(parseFloat(String(customer.lat))) && !isNaN(parseFloat(String(customer.lng)))) {
        customerMarkers.push({
          id: `home-${customer.id || index}`,
          position: {
            lat: parseFloat(String(customer.lat)),
            lng: parseFloat(String(customer.lng))
          },
          title: `${customer.customer_name} (자택)`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
            scaledSize: new google.maps.Size(20, 20),
            anchor: new google.maps.Point(10, 20),
            labelOrigin: new google.maps.Point(10, 8)
          },
          label: {
            text: 'H',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          },
          onClick: (marker: google.maps.Marker) => {
            if (marker && window.google && window.google.maps) {
              console.log('자택 마커 클릭됨:', {
                customerName: customer.customer_name,
                markerId: `home-${customer.id || index}`,
                markerPosition: marker.getPosition()?.toJSON()
              });
              
              // 직접 InfoWindow 생성 및 표시
              createInfoWindow(customer, marker, false);
            }
          }
        });
      }
      
      // 회사 주소에 마커 생성
      if (customer.lat_company && customer.lng_company && !isNaN(parseFloat(String(customer.lat_company))) && !isNaN(parseFloat(String(customer.lng_company)))) {
        customerMarkers.push({
          id: `company-${customer.id || index}`,
          position: {
            lat: parseFloat(String(customer.lat_company)),
            lng: parseFloat(String(customer.lng_company))
          },
          title: `${customer.customer_name} (회사)`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
            scaledSize: new google.maps.Size(20, 20),
            anchor: new google.maps.Point(10, 20),
            labelOrigin: new google.maps.Point(10, 8)
          },
          label: {
            text: 'C',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          },
          onClick: (marker: google.maps.Marker) => {
            if (marker && window.google && window.google.maps) {
              console.log('회사 마커 클릭됨:', {
                customerName: customer.customer_name,
                markerId: `company-${customer.id || index}`,
                markerPosition: marker.getPosition()?.toJSON()
              });
              
              // 직접 InfoWindow 생성 및 표시
              createInfoWindow(customer, marker, true);
            }
          }
        });
      }
    });
        
    // 마커 상태 업데이트
    setMarkers(customerMarkers);
    setShowDefaultMap(false);
  }, [filteredCustomers, createInfoWindow]);
  
  return (
    <div className="space-y-4">
      <CustomerFilterForm
        search={search}
        setSearch={setSearch}
        tierFilter={tierFilter}
        setTierFilter={setTierFilter}
        handleSearch={handleSearch}
        resetFilters={resetFilters}
        isSearching={false}
      />
      
      <GoogleMap
        apiKey={apiKey}
        markers={markers}
        defaultCenter={{ lat: 37.5665, lng: 126.9780 }}
        defaultZoom={9}
        isDarkMode={true}
        height="calc(100vh - 260px)"
        width="100%"
        className="rounded-md shadow-lg"
        infoWindowStyle={{
          backgroundColor: 'white',
          textColor: 'black',
          borderRadius: '6px',
          borderColor: '#e5e7eb',
          closeButtonColor: '#f3f4f6'
        }}
        showDefaultMap={showDefaultMap}
        showCurrentLocationButton={true}
      />
    </div>
  );
};

export default CustomerMap; 