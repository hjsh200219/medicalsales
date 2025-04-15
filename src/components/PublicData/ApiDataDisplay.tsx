import { ApiResult } from "@/types/publicdata";
import { useState } from "react";

interface ApiDataDisplayProps {
  title: string;
  data: ApiResult;
  lastupdate: string;
  lastupdateTimestamp: number;
}

export function ApiDataDisplay({ title, data, lastupdate, lastupdateTimestamp }: ApiDataDisplayProps) {
  const [isJsonExpanded, setIsJsonExpanded] = useState(false);

  if (data.error) {
    return (
      <div className="bg-red-900/30 border border-red-800 p-4 rounded-md mb-6 mt-4">
        <h3 className="text-xl text-white font-semibold mb-2">{title} - 오류</h3>
        <p className="text-red-300">{data.error}</p>
      </div>
    );
  }
  
  if (!data.response) {
    return (
      <div className="bg-gray-700 p-4 rounded-md mb-6 mt-4">
        <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">데이터가 없습니다.</p>
      </div>
    );
  }
  
  const body = data.response.body || {};
  const totalCount = body.totalCount || 0;
  
  const items = body.items?.item || [];
  const itemList = Array.isArray(items) ? items : [items];
  
  const getTimestampFromYYYYMMDD = (dateStr: string): number => {
    if (!dateStr || dateStr.length !== 8) return 0;
    
    try {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      return new Date(year, month, day).getTime();
    } catch {
      return 0;
    }
  };
  
  const filteredItems = itemList.filter(item => {
    if (!item.estbDd) return false;
    const itemTimestamp = getTimestampFromYYYYMMDD(item.estbDd.toString());
    return itemTimestamp > lastupdateTimestamp;
  });
  
  const summary = {
    totalItems: itemList.length,
    filteredItems: filteredItems.length,
    regions: {} as Record<string, number>,
    types: {} as Record<string, number>
  };
  
  filteredItems.forEach(item => {
    // 지역별 카운트
    if (item.sidoCdNm) {
      const region = item.sidoCdNm.toString();
      summary.regions[region] = (summary.regions[region] || 0) + 1;
    }
    
    // 타입별 카운트
    if (item.clCdNm) {
      const type = item.clCdNm.toString();
      summary.types[type] = (summary.types[type] || 0) + 1;
    }
  });
  
  // 지역 및 타입별 상위 항목
  const topRegions = Object.entries(summary.regions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
    
  const topTypes = Object.entries(summary.types)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return (
    <div className="flex flex-col w-full md:w-1/2 gap-2">
      <h3 className="text-xl text-white font-semibold mb-0 mt-4 ml-1">{title}</h3>
      {/* 데이터 요약 섹션 */}
      <div className="bg-gray-700 p-3 rounded-md mb-4">
        <p className="text-gray-300 font-bold">전체 데이터: <span className="font-medium">{totalCount.toLocaleString()}</span></p>
        <p className="text-gray-300 font-bold">신규 데이터: <span className="font-medium">{summary.filteredItems.toLocaleString()}</span></p>
        
        <div className="flex flex-row gap-2 mt-3">
          {/* 지역별 분포 */}
          {topRegions.length > 0 && (
            <div className="w-1/2 mt-3">
              <p className="text-gray-300 font-bold">지역별(상위 5개)</p>
              <ul className="text-gray-300 mt-1">
                {topRegions.map(([region, count], index) => (
                  <li key={index}>
                    - {region}: {count.toLocaleString()}건 
                    {summary.filteredItems > 0 && ` (${Math.round(count / summary.filteredItems * 100)}%)`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 기관유형별 분포 */}
          {topTypes.length > 0 && (
            <div className="w-1/2 mt-3">
              <p className="text-gray-300 font-bold">기관별(상위 5개)</p>
              <ul className="text-gray-300 mt-1">
                {topTypes.map(([type, count], index) => (
                  <li key={index}>
                    - {type}: {count.toLocaleString()}건
                    {summary.filteredItems > 0 && ` (${Math.round(count / summary.filteredItems * 100)}%)`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* 최신 데이터 표시 (최종 업데이트 이후) */}
      {filteredItems.length > 0 ? (
        <div className="bg-gray-600 p-3 rounded-md overflow-auto">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-medium">
              신규 데이터 ({filteredItems.length}개)
            </h4>
            <button 
              onClick={() => setIsJsonExpanded(!isJsonExpanded)}
              className="px-2 py-1 text-sm text-gray-300 bg-gray-800 hover:bg-gray-600 rounded"
            >
              {isJsonExpanded ? '닫기' : '펼치기'}
            </button>
          </div>
          
          {isJsonExpanded && (
            <pre className="text-gray-300 text-sm overflow-x-auto mt-2">
              {JSON.stringify(filteredItems, null, 2)}
            </pre>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 p-3 rounded-md">
          <h4 className="text-white font-medium mb-2">신규 데이터</h4>
          <p className="text-gray-300">{lastupdate} 이후에 업데이트된 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 