'use server';

import { revalidatePath } from "next/cache";
import { InstitutionItem, dbmapping } from "@/types/publicdata";
import { prisma } from "@/lib/prisma";
import { convertAddressToCoords } from "@/lib/kakaoMap";

/**
 * 청크 단위로 의료기관 데이터를 DB에 저장하는 서버 액션
 * 
 * @param items 저장할 아이템 배열
 * @param chunkSize 한 번에 저장할 아이템 크기
 * @param startIndex 시작 인덱스 (진행 상황 추적용)
 */
export async function saveInstitutionsChunk(
  items: InstitutionItem[], 
  chunkSize: number = 2000,
  startIndex: number = 0
) {
  try {
    // 아이템 배열이 비어있으면 완료 상태 반환
    if (!items || items.length === 0 || startIndex >= items.length) {
      return { 
        success: true, 
        message: '모든 데이터가 저장되었습니다.',
        count: 0,
        totalItems: items.length,
        processedItems: items.length,
        progress: 100,
        done: true
      };
    }
    
    const endIndex = Math.min(startIndex + chunkSize, items.length);
    const currentChunk = items.slice(startIndex, endIndex);
    
    // 현재 청크의 데이터 변환 및 필터링
    const institutions = await Promise.all(currentChunk.map(async item => {
      const institution = {
        name: '',
        open_date: null as string | null,
        phone: null as string | null,
        address: null as string | null,
        type: null as string | null,
        lat: null as number | null,
        lng: null as number | null
      };
      
      // dbmapping을 사용하여 API 필드를 DB 필드로 매핑
      Object.entries(dbmapping).forEach(([apiField, dbField]) => {
        if (item[apiField] !== undefined) {
          // 위도/경도는 숫자로 변환
          if (dbField === 'lat' || dbField === 'lng') {
            if (item[apiField]) {
              const value = parseFloat(item[apiField] as string);
              if (!isNaN(value)) {
                institution[dbField as 'lat' | 'lng'] = value;
              }
            }
          } else if (dbField === 'name') {
            institution.name = String(item[apiField] || '');
          } else if (dbField === 'open_date') {
            institution.open_date = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'phone') {
            institution.phone = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'address') {
            institution.address = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'type') {
            institution.type = item[apiField] ? String(item[apiField]) : null;
          }
        }
      });
      
      // XPos 또는 YPos가 없고 주소가 있는 경우 위경도 변환
      if ((!item.XPos || !item.YPos) && institution.address) {
        try {
          const coords = await convertAddressToCoords(institution.address);
          
          if (coords) {
            institution.lat = parseFloat(coords.y);
            institution.lng = parseFloat(coords.x);
          }
        } catch (error) {
          console.error(`주소 변환 실패 (${institution.address}):`, error);
        }
      }
      
      return institution;
    }));
    
    // 필수 필드가 있는 항목만 필터링
    const validInstitutions = institutions.filter(inst => inst.name);
    
    // 현재 청크 저장
    let insertCount = 0;
    if (validInstitutions.length > 0) {
      const result = await prisma.institutions.createMany({
        data: validInstitutions,
        skipDuplicates: true, // 중복 항목 건너뛰기
      });
      insertCount = result.count;
    }
    
    // 진행률 계산
    const processedItems = endIndex;
    const progress = Math.round((processedItems / items.length) * 100);
    
    // 여전히 처리할 아이템이 남아있는지 확인
    const done = endIndex >= items.length;
    
    if (done) {
      revalidatePath('/settings');
      revalidatePath('/institutions');
    }
    
    return {
      success: true,
      message: done ? '모든 데이터가 저장되었습니다.' : '일부 데이터가 저장되었습니다.',
      count: insertCount,
      totalItems: items.length,
      processedItems: processedItems,
      progress: progress,
      done: done,
      nextIndex: endIndex
    };
  } catch (error) {
    console.error('DB 청크 저장 오류:', error);
    return { 
      success: false, 
      error: (error as Error).message,
      message: 'DB 저장 중 오류가 발생했습니다.',
      count: 0,
      totalItems: items.length,
      processedItems: startIndex,
      progress: Math.round((startIndex / items.length) * 100),
      done: false
    };
  }
}

/**
 * 신규 의료기관 데이터를 DB에 저장하는 서버 액션
 */
export async function saveInstitutionsToDb(items: InstitutionItem[]) {
  try {
    const startTime = Date.now();
    console.log(`DB 저장 시작: 총 ${items.length}개 항목`);
    
    // 아이템 배열이 비어있으면 처리하지 않음
    if (!items || items.length === 0) {
      return { 
        success: false, 
        message: '저장할 데이터가 없습니다.',
        count: 0 
      };
    }
    
    // 데이터 변환 및 필터링
    const institutions = await Promise.all(items.map(async item => {
      const institution = {
        name: '',
        open_date: null as string | null,
        phone: null as string | null,
        address: null as string | null,
        type: null as string | null,
        lat: null as number | null,
        lng: null as number | null
      };
      
      // dbmapping을 사용하여 API 필드를 DB 필드로 매핑
      Object.entries(dbmapping).forEach(([apiField, dbField]) => {
        if (item[apiField] !== undefined) {
          // 위도/경도는 숫자로 변환
          if (dbField === 'lat' || dbField === 'lng') {
            if (item[apiField]) {
              const value = parseFloat(item[apiField] as string);
              if (!isNaN(value)) {
                institution[dbField as 'lat' | 'lng'] = value;
              }
            }
          } else if (dbField === 'name') {
            institution.name = String(item[apiField] || '');
          } else if (dbField === 'open_date') {
            institution.open_date = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'phone') {
            institution.phone = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'address') {
            institution.address = item[apiField] ? String(item[apiField]) : null;
          } else if (dbField === 'type') {
            institution.type = item[apiField] ? String(item[apiField]) : null;
          }
        }
      });
      
      // XPos 또는 YPos가 없고 주소가 있는 경우 위경도 변환
      if ((!item.XPos || !item.YPos) && institution.address) {
        try {
          console.log(`주소 변환 시도: ${institution.address}`);
          const coords = await convertAddressToCoords(institution.address);
          
          if (coords) {
            console.log(`주소 변환 성공: ${institution.address} -> 위도: ${coords.y}, 경도: ${coords.x}`);
            institution.lat = parseFloat(coords.y);
            institution.lng = parseFloat(coords.x);
          }
        } catch (error) {
          console.error(`주소 변환 실패 (${institution.address}):`, error);
        }
      }
      
      return institution;
    }));
    
    // 필수 필드가 있는 항목만 필터링
    const validInstitutions = institutions.filter(inst => inst.name);
    
    if (validInstitutions.length === 0) {
      return { 
        success: false, 
        message: '유효한 데이터가 없습니다.',
        count: 0 
      };
    }
    
    // 데이터 저장 (일괄 처리)
    const result = await prisma.institutions.createMany({
      data: validInstitutions,
      skipDuplicates: true, // 중복 항목 건너뛰기
    });
    
    const endTime = Date.now();
    console.log(`DB 저장 완료: ${result.count}개 항목 저장됨, 소요시간 ${(endTime - startTime) / 1000}초`);
    
    revalidatePath('/settings');
    revalidatePath('/institutions');
    
    return { 
      success: true, 
      message: `${result.count}개 항목이 성공적으로 저장되었습니다.`,
      count: result.count 
    };
  } catch (error) {
    console.error('DB 저장 오류:', error);
    return { 
      success: false, 
      error: (error as Error).message,
      message: 'DB 저장 중 오류가 발생했습니다.',
      count: 0
    };
  }
} 