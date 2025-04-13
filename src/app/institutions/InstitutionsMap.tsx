'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { SerializedInstitution } from '@/types/institution';
import GoogleMap from '@/components/Map/GoogleMap';
import InfoWindowManager, { createInstitutionInfoContent } from '@/components/Map/InfoWindowManager';
import { createInstitutionMarker, isValidInstitution, MapMarker } from '@/components/Map/MarkerUtils';

interface InstitutionMapProps {
  institutions: SerializedInstitution[];
  isFilterVisible?: boolean;
}

interface CurrentInfoWindow {
  institution: SerializedInstitution;
  marker: google.maps.Marker;
  isOpen: boolean;
}

export default function InstitutionMap({ 
  institutions,
  isFilterVisible = true 
}: InstitutionMapProps) {
  // 필터 표시 여부와 브라우저 너비에 따라 높이 계산
  const getMapHeight = () => {
    if (isFilterVisible) {
      return 'h-[calc(100vh-320px)] md:h-[calc(100vh-280px)] lg:h-[calc(100vh-270px)]';
    } else {
      return 'h-[calc(100vh-190px)]';
    }
  };

  const [currentInfoWindow, setCurrentInfoWindow] = useState<CurrentInfoWindow | null>(null);
  const [googleMapInstance, setGoogleMapInstance] = useState<google.maps.Map | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);

  // 최대 표시 가능한 의료기관 데이터 메모이제이션
  const limitedInstitutions = useMemo(() => {
    // 조회 결과가 1000개가 넘을 때만 1000개로 제한
    return institutions.length > 1000 ? institutions.slice(0, 1000) : institutions;
  }, [institutions]);

  // 지도 초기화 콜백 - 한 번만 실행되도록 수정
  const handleMapInit = useCallback((map: google.maps.Map) => {
    if (!isMapInitialized && map) {
      setGoogleMapInstance(map);
      setIsMapInitialized(true);
    }
  }, [isMapInitialized]);

  // 마커 클릭 핸들러
  const handleMarkerClick = useCallback((institution: SerializedInstitution, marker: google.maps.Marker) => {
    if (marker && window.google && window.google.maps) {
      setCurrentInfoWindow({
        institution,
        marker,
        isOpen: true
      });
    }
  }, []);

  // 정보창 닫기 핸들러
  const handleInfoWindowClose = useCallback(() => {
    setCurrentInfoWindow(null);
  }, []);

  // 마커 생성 메모이제이션
  const markers = useMemo(() => {
    if (!window.google?.maps || !limitedInstitutions.length) {
      return [];
    }

    try {
      // 유효한 좌표를 가진 기관만 필터링
      const validInstitutions = limitedInstitutions.filter(isValidInstitution);
      
      const createdMarkers = validInstitutions
        .map((institution, index) => createInstitutionMarker(institution, index, handleMarkerClick))
        .filter(Boolean) as MapMarker[];
      
      return createdMarkers;
    } catch {
      return [];
    }
  }, [limitedInstitutions, handleMarkerClick]);

  // 기본 지도 표시 여부 계산
  const showDefaultMap = useMemo(() => {
    return markers.length === 0;
  }, [markers]);

  return (
    <div className={`institution-map-view ${getMapHeight()} transition-all duration-300`}>
      {typeof window !== 'undefined' && (
        <GoogleMap
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
          markers={markers}
          defaultCenter={{ lat: 37.5665, lng: 126.9780 }} // 서울 중심
          defaultZoom={10}
          isDarkMode={true}
          height="100%"
          width="100%"
          className="rounded-md shadow-lg"
          showDefaultMap={showDefaultMap}
          showCurrentLocationButton={true}
          onMapInit={handleMapInit}
        />
      )}

      {/* 동적 InfoWindow 관리 */}
      {currentInfoWindow && googleMapInstance && (
        <InfoWindowManager
          map={googleMapInstance}
          marker={currentInfoWindow.marker}
          isOpen={currentInfoWindow.isOpen}
          onClose={handleInfoWindowClose}
          options={{
            content: createInstitutionInfoContent(currentInfoWindow.institution),
            disableAutoPan: false,
            pixelOffset: window.google?.maps ? new google.maps.Size(0, -10) : undefined
          }}
          style={{
            backgroundColor: 'white',
            textColor: 'black',
            borderRadius: '6px',
            borderColor: '#e5e7eb'
          }}
        />
      )}
    </div>
  );
}
