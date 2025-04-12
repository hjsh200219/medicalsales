'use client';

import React from 'react';
import { SerializedInstitution } from '@/types/institution';

interface InstitutionMapProps {
  institutions: SerializedInstitution[];
}

export default function InstitutionMap({ institutions }: InstitutionMapProps) {
  return (
    <div className="institution-map-view bg-gray-800 p-8 rounded-lg text-center h-[500px] flex items-center justify-center">
      <div className="text-gray-400">
        <h3 className="text-xl mb-4">지도 보기</h3>
        <p>지도 보기 기능은 현재 준비 중입니다.</p>
        <p className="mt-2">총 {institutions.length}개의 의료기관을 지도에 표시할 예정입니다.</p>
      </div>
    </div>
  );
}
