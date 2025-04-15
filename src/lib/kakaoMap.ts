/**
 * 카카오 지도 API 관련 유틸리티 함수
 */

/**
 * 특정 주소로 API 호출을 시도하는 함수
 * @param address 변환할 주소
 * @param apiKey API 키
 * @returns 성공 시 {y: 위도, x: 경도}, 실패 시 null
 */
async function tryCoordinateConversion(address: string, apiKey: string): Promise<{y: string, x: string} | null> {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, 
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('주소 변환에 실패했습니다');
    }
    
    const data = await response.json();
    
    if (data.documents && data.documents.length > 0) {
      const result = data.documents[0];
      return { y: result.y, x: result.x };
    }
    
    return null;
  } catch (error) {
    console.error(`주소(${address}) 변환 오류:`, error);
    return null;
  }
}

/**
 * 주소를 위경도 좌표로 변환하는 함수
 * @param address 변환할 주소
 * @returns 성공 시 {y: 위도, x: 경도}, 실패 시 null
 */
export async function convertAddressToCoords(address: string): Promise<{y: string, x: string} | null> {
  if (!address || address.trim() === '') {
    return null;
  }

  const KAKAO_API_KEY = process.env.KAKAO_API_KEY || process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  
  if (!KAKAO_API_KEY) {
    console.error('KAKAO_API_KEY가 설정되지 않았습니다.');
    return null;
  }
  
  // 먼저 전체 주소로 시도
  let result = await tryCoordinateConversion(address, KAKAO_API_KEY);
  
  // 변환 성공시 바로 반환
  if (result) {
    console.log(`주소 변환 성공: ${address}`);
    return result;
  }
  
  // 실패시 주소의 마지막 글자를 하나씩 제거하며 재시도
  let shortenedAddress = address;
  const minLength = Math.max(address.length * 0.4, 15); // 최소 60% 또는 5글자까지 시도
  
  while (shortenedAddress.length > minLength) {
    shortenedAddress = shortenedAddress.slice(0, -1); // 마지막 글자 제거
    console.log(`주소 축소 시도: ${shortenedAddress}`);
    
    result = await tryCoordinateConversion(shortenedAddress, KAKAO_API_KEY);
    
    if (result) {
      console.log(`축소된 주소로 변환 성공: ${shortenedAddress}`);
      return result;
    }
  }
  
  console.log(`모든 주소 변환 시도 실패: ${address}`);
  return null;
} 