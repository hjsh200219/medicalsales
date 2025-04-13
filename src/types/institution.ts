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
  color: string;
}

export const INSTITUTION_TYPES: InstitutionTypeOption[] = [
  { code: "all", name: "전체", color: "#333333" },
  // 종합병원 그룹 - 빨간색 계열
  { code: "상급종합", name: "상급종합", color: "#CC0000" },
  { code: "종합병원", name: "종합병원", color: "#990000" },
  { code: "병원", name: "병원", color: "#660000" },
  // 전문병원 그룹 - 파란색 계열  
  { code: "요양병원", name: "요양병원", color: "#000099" },
  { code: "정신병원", name: "정신병원", color: "#000066" },
  // 의원 그룹 - 초록색 계열
  { code: "의원", name: "의원", color: "#006600" },
  { code: "치과병원", name: "치과병원", color: "#004D00" },
  { code: "치과의원", name: "치과의원", color: "#003300" },
  { code: "조산원", name: "조산원", color: "#002600" },
  // 보건소 그룹 - 보라색 계열
  { code: "보건소", name: "보건소", color: "#4B0082" },
  { code: "보건지소", name: "보건지소", color: "#3A0066" },
  { code: "보건진료소", name: "보건진료소", color: "#290049" },
  { code: "보건의료원", name: "보건의료원", color: "#18002D" },
  // 한방 그룹 - 갈색 계열
  { code: "한방병원", name: "한방병원", color: "#5C2E0A" },
  { code: "한의원", name: "한의원", color: "#3D1F07" },
  // 약국 - 주황색
  { code: "약국", name: "약국", color: "#CC5500" }
];

// 의료기관 유형 코드 타입
export type InstitutionTypeCode = typeof INSTITUTION_TYPES[number]['code'];
