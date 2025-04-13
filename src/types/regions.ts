// 지역 코드와 이름 매핑
export const REGION_CODES: Record<string, string[]> = {
  "all": ["전체"],
  "11": ["서울특별시", "서울시", "서울"],
  "26": ["부산광역시", "부산시", "부산"],
  "27": ["대구광역시", "대구시", "대구"],
  "28": ["인천광역시", "인천시", "인천"],
  "29": ["광주광역시", "광주시", "광주"],
  "30": ["대전광역시", "대전시", "대전"],
  "31": ["울산광역시", "울산시", "울산"],
  "36": ["세종특별자치시", "세종시", "세종"],
  "41": ["경기도", "경기"],
  "42": ["강원도", "강원"],
  "43": ["충청북도", "충북"],
  "44": ["충청남도", "충남"],
  "45": ["전라북도", "전북"],
  "46": ["전라남도", "전남"],
  "47": ["경상북도", "경북"],
  "48": ["경상남도", "경남"],
  "50": ["제주특별자치도", "제주도", "제주"]
};

// 지역 그룹 정의 및 색상 매핑
export const REGION_GROUPS: Record<string, { codes: string[], baseColor: string }> = {
  "수도권": {
    codes: ["11", "28", "41"], // 서울, 인천, 경기
    baseColor: "hsl(200, 70%, 50%)" // 파란색 계열
  },
  "경상권": {
    codes: ["26", "27", "31", "47", "48"], // 부산, 대구, 울산, 경북, 경남
    baseColor: "hsl(0, 70%, 50%)" // 빨간색 계열
  },
  "전라제주권": {
    codes: ["29", "45", "46", "50"], // 광주, 전북, 전남, 제주
    baseColor: "hsl(50, 70%, 50%)" // 노란색 계열
  },
  "충청권": {
    codes: ["30", "36", "43", "44"], // 대전, 세종, 충북, 충남
    baseColor: "hsl(120, 70%, 50%)" // 초록색 계열
  },
  "강원권": {
    codes: ["42"], // 강원
    baseColor: "hsl(30, 70%, 50%)" // 갈색 계열
  }
};

// 지역 코드로 색상 가져오기
export const getRegionColor = (regionCode: string, index = 0): string => {
  if (regionCode === 'unknown' || regionCode === 'all') {
    return "hsl(0, 0%, 70%)"; // 미상이나 전체는 회색 계열
  }
  
  // 해당 지역이 속한 그룹 찾기
  const group = Object.values(REGION_GROUPS).find(group => 
    group.codes.includes(regionCode)
  );
  
  if (!group) return "hsl(0, 0%, 70%)";
  
  // 그룹 내에서 약간 다른 색조 부여 (같은 그룹은 유사한 색상)
  const hue = parseInt(group.baseColor.match(/hsl\((\d+),/)?.[1] || "0");
  const variation = (index % 3) * 12 - 12; // -12, 0, 12 정도의 색조 변화
  
  return `hsl(${hue + variation}, 70%, 50%)`;
};

// 지역 코드 타입
export type RegionCode = keyof typeof REGION_CODES;

// 지역 주소에서 해당 지역 코드를 반환하는 유틸리티 함수
export const getRegionFromAddress = (address: string | null): string => {
  if (!address || address.trim() === '') return 'unknown';

  // 주소 정규화 (앞뒤 공백 제거)
  const normalizedAddress = address.trim();

  // 모든 지역 코드에 대해 확인
  for (const [code, names] of Object.entries(REGION_CODES)) {
    if (code === 'all') continue;

    for (const name of names) {
      // 주소가 지역명으로 시작하는지 정확히 확인 (단어 경계 고려)
      if (
        normalizedAddress === name || // 주소가 정확히 지역명과 일치하거나
        normalizedAddress.startsWith(name + ' ') || // 지역명 뒤에 공백이 있거나
        normalizedAddress.startsWith(name + '시') || // 지역명 뒤에 '시'가 오거나
        normalizedAddress.startsWith(name + '도') || // 지역명 뒤에 '도'가 오거나
        normalizedAddress.startsWith(name + '군') || // 지역명 뒤에 '군'이 오거나
        normalizedAddress.startsWith(name + '구') // 지역명 뒤에 '구'가 오는 경우
      ) {
        return code;
      }
    }
  }
  
  return 'unknown';
}; 