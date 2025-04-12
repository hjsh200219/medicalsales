// 의료기관 타입 정의
export interface SerializedInstitution {
  id: number;
  name: string;
  open_date: string | null;
  phone: string | null;
  address: string | null;
  type: string | null;
  lat: string | null;
  lng: string | null;
  created_at: string | null;
}

// 의료기관 유형 정의
export interface InstitutionTypeOption {
  code: string;
  name: string;
}

// 의료기관 유형 목록
export const INSTITUTION_TYPES: InstitutionTypeOption[] = [
  { code: "all", name: "전체" },
  { code: "상급종합", name: "상급종합" }, 
  { code: "종합병원", name: "종합병원" },
  { code: "병원", name: "병원" },
  { code: "의원", name: "의원" },
  { code: "요양병원", name: "요양병원" },
  { code: "치과병원", name: "치과병원" },
  { code: "치과의원", name: "치과의원" },
  { code: "한방병원", name: "한방병원" },
  { code: "한의원", name: "한의원" },
  { code: "약국", name: "약국" }
];

// 의료기관 유형 코드 타입
export type InstitutionTypeCode = typeof INSTITUTION_TYPES[number]['code']; 