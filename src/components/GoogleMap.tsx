'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface MapPosition {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  position: MapPosition;
  title?: string;
  icon?: google.maps.Icon | string;
  label?: google.maps.MarkerLabel | string;
  onClick?: (marker: google.maps.Marker) => void;
}

// InfoWindow 스타일 옵션 인터페이스 추가
export interface InfoWindowStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: string;
  closeButtonColor?: string;
}

interface GoogleMapProps {
  apiKey?: string;
  markers?: MapMarker[];
  defaultCenter?: MapPosition;
  defaultZoom?: number;
  isDarkMode?: boolean;
  height?: string;
  width?: string;
  className?: string;
  onMapInit?: (map: google.maps.Map) => void;
  infoWindowStyle?: InfoWindowStyle; // InfoWindow 스타일 옵션 추가
  showDefaultMap?: boolean; // 기본 지도 표시 여부
  showCurrentLocationButton?: boolean; // 현재 위치 버튼 표시 여부
}

// 지도 스타일 - 다크 모드
const darkModeStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

declare global {
  interface Window {
    initMap?: () => void;
    google?: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        InfoWindow: typeof google.maps.InfoWindow;
        LatLngBounds: typeof google.maps.LatLngBounds;
        MapTypeId: {
          ROADMAP: string;
        };
        Size: typeof google.maps.Size;
        Point: typeof google.maps.Point;
        event: typeof google.maps.event;
      };
    } | undefined;
  }
}

// InfoWindow 스타일 적용 함수 추가
const applyInfoWindowStyle = (infoWindow: google.maps.InfoWindow, style: InfoWindowStyle = {}) => {
  const defaultStyle: InfoWindowStyle = {
    backgroundColor: '#1f2937',
    textColor: 'white',
    borderRadius: '6px',
    padding: '8px',
    borderColor: '#1f2937',
    closeButtonColor: '#374151'
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
      closeButton.style.backgroundColor = mergedStyle.closeButtonColor!;
      closeButton.style.borderRadius = '4px';
      closeButton.style.opacity = '1';
      closeButton.style.right = '0';
      closeButton.style.top = '0';
      closeButton.style.margin = '5px';
      closeButton.style.padding = '6px !important';
      
      // 부모 요소의 스타일 수정
      const parent = closeButton.parentElement;
      if (parent) {
        parent.style.top = '0px';
        parent.style.right = '0px';
        parent.style.left = 'auto';
      }
      
      // 버튼 내부의 이미지 크기 수정
      const buttonImages = closeButton.querySelectorAll('img');
      buttonImages.forEach((img: HTMLImageElement) => {
        img.style.width = '14px';
        img.style.height = '14px';
      });
    }
    
    // InfoWindow 콘텐츠 컨테이너
    const iwContent = document.querySelector('.gm-style-iw-d') as HTMLElement;
    if (iwContent) {
      iwContent.style.overflow = 'hidden';
      iwContent.style.backgroundColor = mergedStyle.backgroundColor!;
      
      // 타이틀과 텍스트 색상을 검정색으로 강제 적용
      const headings = iwContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => {
        (heading as HTMLElement).style.color = 'black';
      });
      
      const paragraphs = iwContent.querySelectorAll('p, span, div');
      paragraphs.forEach((text) => {
        if ((text as HTMLElement).style.color !== 'white') { // 흰색 텍스트(예: 티어 라벨)는 유지
          (text as HTMLElement).style.color = 'black';
        }
      });
    }
    
    // InfoWindow 배경 색상 변경
    const iwContainer = document.querySelector('.gm-style-iw') as HTMLElement;
    if (iwContainer) {
      iwContainer.style.backgroundColor = mergedStyle.backgroundColor!;
      iwContainer.style.padding = '0';
    }
  });

  return infoWindow;
};

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  markers = [],
  defaultCenter = { lat: 37.5665, lng: 126.9780 }, // 서울 기본값
  defaultZoom = 10,
  isDarkMode = false,
  height = '500px',
  width = '100%',
  className = '',
  onMapInit,
  infoWindowStyle = {},
  showDefaultMap = false,
  showCurrentLocationButton = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState<Map<string, google.maps.Marker>>(new Map());
  const [isLocating, setIsLocating] = useState(false);
  const currentLocationMarkerRef = useRef<google.maps.Marker | null>(null);
  
  // 현재 위치 가져오기 함수
  const getCurrentLocation = () => {
    if (!googleMap || !window.navigator.geolocation) {
      alert('현재 위치를 확인할 수 없습니다. 브라우저가 위치 서비스를 지원하지 않습니다.');
      return;
    }
    
    setIsLocating(true);
    
    // 이전 현재 위치 마커 제거
    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setMap(null);
      currentLocationMarkerRef.current = null;
    }
    
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        
        // 지도를 현재 위치로 이동
        googleMap.setCenter(currentLocation);
        googleMap.setZoom(15); // 현재 위치에서는 줌 레벨을 높임
        
        // 현재 위치에 마커 추가
        const marker = new google.maps.Marker({
          position: currentLocation,
          map: googleMap,
          title: '현재 위치',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2,
            scale: 8
          },
          zIndex: 1000 // 다른 마커보다 위에 표시
        });
        
        currentLocationMarkerRef.current = marker;
        
        // InfoWindow 표시 제거 (사용자 요청)
        
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = '위치 정보를 가져오는데 실패했습니다.';
        
        // 오류 코드에 따라 다른 메시지 표시
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = '위치 정보 권한이 거부되었습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요.';
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = '현재 위치를 확인할 수 없습니다. GPS 신호가 약하거나 위치 서비스가 비활성화되었을 수 있습니다.';
            break;
          case 3: // TIMEOUT
            errorMessage = '위치 정보 요청 시간이 초과되었습니다. 다시 시도해주세요.';
            break;
        }
        
        console.error('위치 정보 오류:', error.message);
        alert(errorMessage);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 타임아웃 시간 증가
        maximumAge: 0
      }
    );
  };
  
  // Google Maps API 로드
  useEffect(() => {
    if (!apiKey) {
      setError('API 키가 제공되지 않았습니다.');
      setIsLoading(false);
      return;
    }
    
    // 이미 로드된 경우
    if (window.google && window.google.maps) {
      setIsLoading(false);
      initializeMap();
      return;
    }
    
    // 이미 스크립트가 로드 중인지 확인
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      window.initMap = initializeMap;
      return;
    }
    
    // 스크립트 로드
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = initializeMap;
    
    script.onerror = () => {
      setError('Google Maps API를 로드하는 중 오류가 발생했습니다.');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
    
    return () => {
      window.initMap = undefined;
      // 스크립트 제거는 하지 않음 (다른 컴포넌트에서도 사용할 수 있음)
    };
  }, [apiKey]);
  
  // 지도 초기화
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      const mapOptions: google.maps.MapOptions = {
        center: defaultCenter,
        zoom: defaultZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: isDarkMode ? darkModeStyle : undefined,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      setGoogleMap(map);
      
      // 구글 지도 기본 InfoWindow 스타일링
      // InfoWindow가 열릴 때마다 스타일 적용
      map.addListener('click', () => {
        setTimeout(() => {
          styleDefaultInfoWindows();
        }, 100);
      });
      
      // POI(관심 장소) 클릭 시 InfoWindow 스타일링
      map.addListener('poi_clicked', () => {
        setTimeout(() => {
          styleDefaultInfoWindows();
        }, 100);
      });
      
      // 지도 초기화 후 콜백
      if (onMapInit) {
        onMapInit(map);
      }
      
      setIsLoading(false);
    } catch {
      setError('지도를 초기화하는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };
  
  // 구글 지도 기본 InfoWindow 스타일링 함수
  const styleDefaultInfoWindows = () => {
    // InfoWindow 요소 찾기
    const allInfoWindows = document.querySelectorAll('.gm-style-iw-d');
    
    allInfoWindows.forEach((infoWindow) => {
      // 모든 텍스트 요소를 검정색으로 설정
      const allTextElements = infoWindow.querySelectorAll('span, div, h1, h2, h3, h4, h5, h6, p, a');
      allTextElements.forEach((element) => {
        (element as HTMLElement).style.color = 'black';
      });
      
      // 1. 타이틀(헤더) 요소에 정확한 스타일 적용
      const mainTitle = infoWindow.querySelector('.gm-style-iw-d > div > div') as HTMLElement;
      if (mainTitle) {
        mainTitle.style.color = '#374151';
        
        // 타이틀 내부의 첫 번째 요소(주로 장소 이름)에 직접 스타일 적용
        const titleText = mainTitle.querySelector('div:first-child, span:first-child') as HTMLElement;
        if (titleText) {
          titleText.style.color = '#374151';
        }
      }
      
      // 2. 특정 구조를 가진 타이틀 요소 선택자 (구글 지도의 일반적인 POI 정보창)
      const titleElements = infoWindow.querySelectorAll(
        '.gm-style-iw-d > div:first-child > div:first-child > div, ' + 
        '.gm-style-iw-d > div > div > div:first-child, ' +
        '.gm-style-iw-d > div > div:first-child, ' +
        '.gm-style-iw-d > div:first-child > span'
      );
      
      titleElements.forEach((title) => {
        (title as HTMLElement).style.color = '#374151';
      });
    });
    
    // 3. 추가적으로 기본 InfoWindow 컨테이너 스타일 조정
    const iwContainers = document.querySelectorAll('.gm-style-iw');
    iwContainers.forEach((container) => {
      (container as HTMLElement).style.color = '#374151';
      
      // 첫 번째 자식 요소가 주로 타이틀을 포함함
      const firstChild = container.querySelector('div:first-child') as HTMLElement;
      if (firstChild) {
        firstChild.style.color = 'black';
      }
    });
  };
  
  // 지도 이동이나 줌 변경 시에도 InfoWindow 스타일 적용
  useEffect(() => {
    if (!googleMap) return;
    
    // 지도 이동 완료 후 스타일 적용
    const idleListener = googleMap.addListener('idle', () => {
      styleDefaultInfoWindows();
    });
    
    return () => {
      // 리스너 제거
      if (window.google && window.google.maps) {
        window.google.maps.event.removeListener(idleListener);
      }
    };
  }, [googleMap]);
  
  // 마커 업데이트
  useEffect(() => {
    if (!googleMap) return;
    
    // Google Maps API가 로드되었는지 확인
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      return;
    }
    
    // 기존 마커 제거
    currentMarkers.forEach(marker => marker.setMap(null));
    const newMarkers = new Map<string, google.maps.Marker>();
    
    // 기본 지도 모드이거나 마커가 없는 경우 중앙 위치 기본값 사용
    if (showDefaultMap || markers.length === 0) {
      googleMap.setCenter(defaultCenter);
      googleMap.setZoom(defaultZoom);
      setCurrentMarkers(newMarkers);
      return;
    }
    
    // 새 마커 추가 및 bounds 계산
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: googleMap,
        title: markerData.title,
        icon: markerData.icon,
        label: markerData.label
      });
      
      // 클릭 이벤트 핸들러 추가
      if (markerData.onClick) {
        marker.addListener('click', () => {
          // 마커 클릭 핸들러 호출 전 infoWindow 스타일링 기능 제공
          const originalOnClick = markerData.onClick!;
          
          // 클릭 핸들러 호출 
          originalOnClick(marker);
          
          // InfoWindow 찾아서 스타일 적용
          setTimeout(() => {
            const infoWindows = document.querySelectorAll('.gm-style-iw-a');
            if (infoWindows.length > 0) {
              // 가장 최근에 열린 InfoWindow에 스타일 적용
              // 직접적인 접근은 어렵기 때문에 DOM 요소에 스타일을 적용
              const backgroundColor = infoWindowStyle?.backgroundColor || '#1f2937';
              const closeButtonColor = infoWindowStyle?.closeButtonColor || '#374151';
              
              // InfoWindow 부모 컨테이너
              const iwOuter = document.querySelector('.gm-style-iw-a') as HTMLElement;
              if (iwOuter) {
                iwOuter.style.boxShadow = 'none';
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
                  
                  child.style.backgroundColor = backgroundColor;
                  child.style.boxShadow = 'none';
                }
                
                // 삼각형 꼬리 요소가 있으면 삼각형 모양 유지
                if (iwTail) {
                  iwTail.style.backgroundColor = 'transparent';
                }
              }
              
              // 닫기 버튼
              const closeButton = document.querySelector('.gm-ui-hover-effect') as HTMLElement;
              if (closeButton) {
                closeButton.style.backgroundColor = closeButtonColor;
                closeButton.style.borderRadius = '4px';
                closeButton.style.opacity = '1';
                closeButton.style.right = '0';
                closeButton.style.top = '0';
                closeButton.style.margin = '5px';
                closeButton.style.padding = '6px !important';
                
                const parent = closeButton.parentElement;
                if (parent) {
                  parent.style.top = '0px';
                  parent.style.right = '0px';
                  parent.style.left = 'auto';
                }
                
                const buttonImages = closeButton.querySelectorAll('img');
                buttonImages.forEach((img: HTMLImageElement) => {
                  img.style.width = '14px';
                  img.style.height = '14px';
                });
              }
              
              // 콘텐츠 컨테이너
              const iwContent = document.querySelector('.gm-style-iw-d') as HTMLElement;
              if (iwContent) {
                iwContent.style.overflow = 'hidden';
                iwContent.style.backgroundColor = backgroundColor;
                
                // 타이틀과 텍스트 색상을 검정색으로 강제 적용
                const headings = iwContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
                headings.forEach((heading) => {
                  (heading as HTMLElement).style.color = 'black';
                });
                
                const paragraphs = iwContent.querySelectorAll('p, span, div');
                paragraphs.forEach((text) => {
                  if ((text as HTMLElement).style.color !== 'white') { // 흰색 텍스트(예: 티어 라벨)는 유지
                    (text as HTMLElement).style.color = 'black';
                  }
                });
              }
              
              // InfoWindow 자체
              const iwContainer = document.querySelector('.gm-style-iw') as HTMLElement;
              if (iwContainer) {
                iwContainer.style.backgroundColor = backgroundColor;
                iwContainer.style.padding = '0';
              }
            }
            
            // 모든 InfoWindow에 스타일 적용 (기본 InfoWindow 포함)
            styleDefaultInfoWindows();
          }, 10);
        });
      }
      
      newMarkers.set(markerData.id, marker);
      bounds.extend(markerData.position);
    });
    
    // 모든 마커가 보이도록 지도 이동
    if (markers.length > 1) {
      googleMap.fitBounds(bounds);
      
      // 과도한 줌 방지
      google.maps.event.addListenerOnce(googleMap, 'bounds_changed', () => {
        if (googleMap.getZoom() && googleMap.getZoom()! > 15) {
          googleMap.setZoom(15);
        }
      });
    } else if (markers.length === 1) {
      // 마커가 하나인 경우 해당 위치로 이동
      googleMap.setCenter(markers[0].position);
      googleMap.setZoom(14);
    }
    
    setCurrentMarkers(newMarkers);
  }, [googleMap, markers, showDefaultMap, defaultCenter, defaultZoom]);
  
  // 전역 스타일링 함수 노출 (window 객체 타입 확장)
  interface ExtendedWindow extends Window {
    applyInfoWindowStyle: (infoWindow: google.maps.InfoWindow, style: InfoWindowStyle) => google.maps.InfoWindow;
  }
  
  // 안전하게 window에 함수 추가
  (window as unknown as ExtendedWindow).applyInfoWindowStyle = applyInfoWindowStyle;
  
  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-50 dark:bg-red-900 dark:bg-opacity-20 z-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}
      
      {showCurrentLocationButton && !isLoading && !error && (
        <div className="absolute left-4 bottom-4 z-10">
          <button
            onClick={getCurrentLocation}
            disabled={isLocating}
            className={`bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${isLocating ? 'opacity-70' : ''}`}
            title="현재 위치 찾기"
          >
            {isLocating ? (
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-t-transparent border-black"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            )}
          </button>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-md"
        style={{ visibility: isLoading || error ? 'hidden' : 'visible' }}
      ></div>
    </div>
  );
};

export default GoogleMap; 