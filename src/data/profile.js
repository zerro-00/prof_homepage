// 번역이 필요 없는 프로필 상수만 유지.
// 번역 대상 텍스트(경력·사외이사·학술활동·산관연협력·관심분야 등)는 src/i18n/*.json 에서 관리.

export const BASIC_INFO = {
  nameKo: "최정혜",
  nameEn: "Jeonghye Choi",
  phone: "02-2123-6575",
  email: "jeonghye@yonsei.ac.kr",
};

// 히어로 스탯 카운터 — labelKey는 i18n hero.stats.*, suffixKey는 hero.suffix.*
// section/focus: 클릭 시 이동할 섹션과 초기 상태
export const HERO_STATS = [
  { key: "ssci", value: 37, suffixKey: "papers", section: "publications", focus: "ssci" },
  { key: "kci", value: 42, suffixKey: "papers", section: "publications", focus: "kci" },
  { key: "alumni", value: 13, suffixKey: "people", hasSub: true, section: "alumni" },
  { key: "awards", value: 23, suffixKey: "count", section: "awards" },
];
