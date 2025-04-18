"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Customer } from '@/types/customer';
import CustomerFilterForm from '@/components/Customer/CustomerFilterForm';
import GoogleMap from '@/components/Map/GoogleMap';
import InfoWindowManager, { createCustomerInfoContent, CustomerInfo } from '@/components/Map/InfoWindowManager';
import { createCustomerMarker, MapMarker } from '@/components/Map/MarkerUtils';

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

  // 마커 클릭 핸들러
  const handleMarkerClick = useCallback((customer: Customer, marker: google.maps.Marker, isCompany: boolean) => {
    if (marker && window.google && window.google.maps) {
      // InfoWindow 열기
      setCurrentInfoWindow({
        customer,
        marker,
        isCompany,
        isOpen: true
      });
    }
  }, []);

  // 정보창 닫기 핸들러
  const handleInfoWindowClose = useCallback(() => {
    setCurrentInfoWindow(null);
  }, []);

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
    if (!filteredCustomers?.length || !window.google?.maps) {
      setMarkers([]);
      setShowDefaultMap(true);
      return;
    }

    const newMarkers = filteredCustomers.flatMap((customer, index) => {
      const homeMarker = createCustomerMarker(customer, index, false, handleMarkerClick);
      const companyMarker = createCustomerMarker(customer, index, true, handleMarkerClick);
      return [homeMarker, companyMarker].filter(Boolean) as MapMarker[];
    });

    setMarkers(newMarkers);
    setShowDefaultMap(newMarkers.length === 0);
  }, [filteredCustomers, handleMarkerClick]);

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
              currentInfoWindow.isCompany
            ),
            disableAutoPan: true,
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