import React from 'react';
import { MapPin, Phone, Calendar, Building } from 'lucide-react';
import { SerializedInstitution } from '@/types/institution';

export const InstitutionCard = ({ institution }: { institution: SerializedInstitution }) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 text-white shadow hover:bg-gray-700 transition-colors">
      <div className="flex flex-col justify-between space-y-1 px-6 pt-6 pb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold leading-none tracking-tight text-lg truncate">
            {institution.name}
          </h3>
          <span className="text-sm text-gray-400 flex items-center gap-1 ml-2">
            <Building size={16} />
            {institution.type || '정보 없음'}
          </span>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <div className="space-y-1">
          <p className="text-gray-300 flex items-center gap-2">
            <Calendar size={16} />
            {institution.open_date ? 
              `${institution.open_date.slice(0,4)}년 ${institution.open_date.slice(4,6)}월 ${institution.open_date.slice(6,8)}일` 
              : '정보 없음'}
          </p>
          <p className="text-gray-300 flex items-center gap-2">
            <Phone size={16} />
            <a href={`tel:${institution.phone}`} className="text-gray-300 hover:text-gray-100">
              {institution.phone || '연락처 정보 없음'}
            </a>
          </p>
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
        </div>
      </div>
    </div>
  );
}; 