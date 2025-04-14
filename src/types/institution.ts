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
  icon: string;
}

export const INSTITUTION_TYPES: InstitutionTypeOption[] = [
  { code: "all", name: "전체", color: "#333333", icon: "hospital" },
  // 종합병원 그룹 - 빨간색 계열
  { code: "상급종합", name: "상급종합", color: "#CD5C5C", icon: "building-2" },
  { code: "종합병원", name: "종합병원", color: "#FA8072", icon: "building-2" },
  { code: "병원", name: "병원", color: "#FFA07A", icon: "building-2" },
  // 전문병원 그룹 -  계열  
  { code: "요양병원", name: "요양병원", color: "#a569bd", icon: "square-activity" },
  { code: "정신병원", name: "정신병원", color: "#7d3c98", icon: "heart-off" },
  // 의원 그룹 - 주황색 계열
  { code: "의원", name: "의원", color: "#e67e22", icon: "stethoscope" },
  // 치과병원 그룹 - 하늘색 계열
  { code: "치과병원", name: "치과병원", color: "#3498db ", icon: "tooth" },
  { code: "치과의원", name: "치과의원", color: "#5dade2", icon: "tooth" },
  // 조산원 그룹 - 핑크 계열
  { code: "조산원", name: "조산원", color: "#002600", icon: "baby" },
  // 보건소 그룹 - 보라색 계열
  { code: "보건소", name: "보건소", color: "#5d6d7e", icon: "briefcase-medical" },
  { code: "보건지소", name: "보건지소", color: "#5d6d7e", icon: "briefcase-medical" },
  { code: "보건진료소", name: "보건진료소", color: "#85929e", icon: "briefcase-medical" },
  { code: "보건의료원", name: "보건의료원", color: "#aeb6bf", icon: "briefcase-medical" },
  // 한방 그룹 - 갈색 계열
  { code: "한방병원", name: "한방병원", color: "#138d75", icon: "leaf" },
  { code: "한의원", name: "한의원", color: "#45b39d", icon: "leaf" },
  // 약국 - 주황색
  { code: "약국", name: "약국", color: "#76448a", icon: "pill" }
];

// 의료기관 유형 코드 타입
export type InstitutionTypeCode = typeof INSTITUTION_TYPES[number]['code'];
