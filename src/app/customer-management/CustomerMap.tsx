"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Customer } from '@/types/customer';
import { getTierColor } from '@/types/tierColors';
import CustomerFilterForm from '@/components/CustomerFilterForm';
import GoogleMap, { MapMarker } from '@/components/GoogleMap';
import InfoWindowManager, { createCustomerInfoContent, CustomerInfo } from '@/components/InfoWindowManager';

interface CustomerMapProps {
  customers: Customer[];
  apiKey: string;
}

interface CurrentInfoWindow {
  customer: Customer;
  marker: google.maps.Marker;
  isCompany: boolean;
  isOpen: boolean;
}

const CustomerMap: React.FC<CustomerMapProps> = ({ customers, apiKey }) => {
  // 상태 관리
  const [search, setSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [showDefaultMap, setShowDefaultMap] = useState<boolean>(false);
  const [currentInfoWindow, setCurrentInfoWindow] = useState<CurrentInfoWindow | null>(null);
  const [googleMapInstance, setGoogleMapInstance] = useState<google.maps.Map | null>(null);
  const uniqueIdRef = useRef<string>(`close-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // 필터링 로직
  const filterCustomers = useCallback((searchTerm: string, tier: string) => {
    return customers.filter(customer => {
      const searchFields = [
        customer.customer_name,
        customer.email,
        customer.company,
        customer.address,
        customer.address_company
      ];
      
      const matchesSearch = !searchTerm || 
        searchFields.some(field => 
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesTier = !tier || customer.tier === tier;
      
      return matchesSearch && matchesTier;
    });
  }, [customers]);

  // 마커 생성 로직
  const createMarker = useCallback((customer: Customer, index: number, isCompany: boolean): MapMarker | null => {
    const lat = isCompany ? customer.lat_company : customer.lat;
    const lng = isCompany ? customer.lng_company : customer.lng;
    
    if (!lat || !lng || isNaN(parseFloat(String(lat))) || isNaN(parseFloat(String(lng)))) {
      return null;
    }

    const tierColor = getTierColor(customer.tier);
    const pinSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
        <path fill="${tierColor}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
    `;

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
          // InfoWindow 열기
          setCurrentInfoWindow({
            customer,
            marker,
            isCompany,
            isOpen: true
          });
        }
      }
    };
  }, []);

  // 정보창 닫기 핸들러
  const handleInfoWindowClose = useCallback(() => {
    setCurrentInfoWindow(null);
  }, []);

  // 마커에 사용자 정의 클릭 이벤트 리스너 추가
  const handleCustomCloseButtonClick = useCallback(() => {
    // 정보창 닫기
    handleInfoWindowClose();
    
    // 사용자 정의 버튼 이벤트 리스너 제거 (메모리 누수 방지)
    setTimeout(() => {
      const customBtn = document.getElementById(uniqueIdRef.current);
      if (customBtn) {
        customBtn.removeEventListener('click', handleCustomCloseButtonClick);
      }
    }, 100);
  }, [handleInfoWindowClose]);

  // 지도 초기화 콜백
  const handleMapInit = useCallback((map: google.maps.Map) => {
    setGoogleMapInstance(map);
  }, []);

  // 이벤트 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = filterCustomers(search, tierFilter);
    setFilteredCustomers(filtered);
    setShowDefaultMap(filtered.length === 0);
  };

  const resetFilters = () => {
    setSearch('');
    setTierFilter('');
    setFilteredCustomers(customers);
    setShowDefaultMap(false);
  };

  // 효과
  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  useEffect(() => {
    const filtered = filterCustomers(search, tierFilter);
    setFilteredCustomers(filtered);
    setShowDefaultMap(filtered.length === 0);
  }, [search, tierFilter, filterCustomers]);

  useEffect(() => {
    // DOM에 추가된 후 사용자 정의 버튼에 이벤트 리스너 추가
    if (currentInfoWindow?.isOpen) {
      setTimeout(() => {
        const customBtn = document.getElementById(uniqueIdRef.current);
        if (customBtn) {
          customBtn.addEventListener('click', handleCustomCloseButtonClick);
        }
      }, 100);
    }

    return () => {
      // 컴포넌트 언마운트 또는 정보창이 변경될 때 이벤트 리스너 제거
      const customBtn = document.getElementById(uniqueIdRef.current);
      if (customBtn) {
        customBtn.removeEventListener('click', handleCustomCloseButtonClick);
      }
    };
  }, [currentInfoWindow, handleCustomCloseButtonClick]);

  useEffect(() => {
    if (!filteredCustomers?.length || !window.google?.maps) {
      setMarkers([]);
      setShowDefaultMap(true);
      return;
    }

    const newMarkers = filteredCustomers.flatMap((customer, index) => {
      const homeMarker = createMarker(customer, index, false);
      const companyMarker = createMarker(customer, index, true);
      return [homeMarker, companyMarker].filter(Boolean) as MapMarker[];
    });

    setMarkers(newMarkers);
    setShowDefaultMap(false);
  }, [filteredCustomers, createMarker]);

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
        height="calc(100vh - 200px)"
        width="100%"
        className="rounded-md shadow-lg"
        showDefaultMap={showDefaultMap}
        showCurrentLocationButton={true}
        onMapInit={handleMapInit}
      />

      {/* 동적 InfoWindow 관리 */}
      {currentInfoWindow && googleMapInstance && (
        <InfoWindowManager
          map={googleMapInstance}
          marker={currentInfoWindow.marker}
          isOpen={currentInfoWindow.isOpen}
          onClose={handleInfoWindowClose}
          options={{
            content: createCustomerInfoContent(
              currentInfoWindow.customer as unknown as CustomerInfo, 
              currentInfoWindow.isCompany,
              uniqueIdRef.current
            ),
            disableAutoPan: false,
            pixelOffset: new google.maps.Size(0, -10)
          }}
          style={{
            backgroundColor: 'white',
            textColor: 'black',
            borderRadius: '6px',
            borderColor: '#e5e7eb',
            closeButtonColor: '#f3f4f6'
          }}
        />
      )}
    </div>
  );
};

export default CustomerMap;