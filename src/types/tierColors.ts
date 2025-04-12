// 고객 등급 타입 정의
export type CustomerTier = 'VIP' | '감사고객' | '법인고객' | '신규고객' | '일반' | '';

// 고객 등급별 색상 정의
export const tierColors: Record<string, string> = {
  'VIP': '#FF5252', // 빨간색
  '감사고객': '#FFD700', // 금색
  '법인고객': '#3F51B5', // 파란색
  '신규고객': '#2196F3', // 밝은 파란색
  '일반': '#4CAF50', // 초록색
  'default': '#808080' // 기본 색상 (회색)
};

// 등급에 따른 색상을 가져오는 유틸리티 함수
export const getTierColor = (tier: string | undefined): string => {
  if (!tier) return tierColors.default;
  return tierColors[tier] || tierColors.default;
}; 