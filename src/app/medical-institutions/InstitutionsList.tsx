'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/InstitutionCard';
import { MapPin, Phone, Calendar, Building } from 'lucide-react';
import { SerializedInstitution } from '@/types/institution';
import Pagination from '@/components/Pagination';

interface InstitutionsListProps {
  institutions: SerializedInstitution[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function InstitutionsList({ 
  institutions, 
  currentPage, 
  itemsPerPage, 
  onPageChange 
}: InstitutionsListProps) {
  // 현재 페이지에 표시할 기관 목록 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = institutions.slice(startIndex, endIndex);
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(institutions.length / itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((institution) => (
          <Card key={institution.id} className="bg-gray-800 text-white hover:bg-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">{institution.name}</CardTitle>
              <CardDescription className="text-gray-400 flex items-center gap-1">
                <Building size={16} />
                {institution.type || '정보 없음'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <MapPin size={16} />
                  {institution.address ? (
                    <a 
                      href={`https://map.naver.com/v5/search/${encodeURIComponent(institution.address)}?c=${institution.lng},${institution.lat},15,0,0,0,dh`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="hover:text-gray-100"
                    >
                      {institution.address}
                    </a>
                  ) : '주소 정보 없음'}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone size={16} />
                  <a href={`tel:${institution.phone}`} className="text-gray-300 hover:text-gray-100">{institution.phone || '연락처 정보 없음'}</a>
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Calendar size={16} />
                  {institution.open_date ? 
                    `${institution.open_date.slice(0,4)}.${institution.open_date.slice(4,6)}.${institution.open_date.slice(6,8)}` 
                    : '정보 없음'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={institutions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        style="simple"
        label="의료기관"
      />
    </div>
  );
} 