'use client';

import React from 'react';
import { SerializedInstitution } from '@/types/institution';

interface InstitutionMapProps {
  institutions: SerializedInstitution[];
  isFilterVisible?: boolean;
}

export default function InstitutionMap({ 
  institutions,
  isFilterVisible = true 
}: InstitutionMapProps) {
  // 필터 표시 여부와 브라우저 너비에 따라 높이 계산
  const getMapHeight = () => {
    if (isFilterVisible) {
      return 'h-[calc(100vh-320px)] md:h-[calc(100vh-350px)]  lg:h-[calc(100vh-270px)]';
    } else {
      return 'h-[calc(100vh-190px)]';
    }
  };

  return (
    <div className={`institution-map-view bg-gray-800 p-8 rounded-lg text-center ${getMapHeight()} flex items-center justify-center transition-all duration-300`}>
      <div className="text-gray-400">
        <h3 className="text-xl mb-4">지도 보기</h3>
        <p>지도 보기 기능은 현재 준비 중입니다.</p>
        <p className="mt-2">총 {institutions.length}개의 의료기관을 지도에 표시할 예정입니다.</p>
      </div>
    </div>
  );
}
