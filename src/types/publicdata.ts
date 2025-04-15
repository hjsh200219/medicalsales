// 기관 데이터 항목 타입 정의
export interface InstitutionItem {
  addr?: string;
  clCd?: string;
  clCdNm?: string;
  distance?: string;
  emdongNm?: string;
  estbDd?: string; // 설립일(YYYYMMDD 형식)
  postNo?: string;
  sgguCd?: string;
  sgguCdNm?: string;
  sidoCd?: string;
  sidoCdNm?: string;
  telno?: string;
  XPos?: string;
  YPos?: string;
  yadmNm?: string;
  ykiho?: string;
  [key: string]: string | number | boolean | undefined; // 기타 필드
}

// API 응답 또는 오류 타입 정의
export interface ApiResult {
  error?: string;
  response?: {
    header?: {
      resultCode?: string;
      resultMsg?: string;
    };
    body?: {
      items?: {
        item?: InstitutionItem[] | InstitutionItem;
      };
      numOfRows?: number;
      pageNo?: number;
      totalCount?: number;
    };
  };
  success?: boolean;
} 

export const dbmapping: Record<string, string> = {
  yadmNm: "name",
  addr: "address",
  estbDd: "open_date",
  telno: "phone",
  XPos: "lng",
  YPos: "lat",
  clCdNm: "type"
}