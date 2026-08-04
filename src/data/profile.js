// 교수 프로필 · 경력 · 대외활동 데이터

export const BASIC_INFO = {
  nameKo: "최정혜",
  nameEn: "Jeonghye Choi",
  position: "교수 · Professor of Marketing",
  school: "Yonsei School of Business",
  degree: "Ph.D. University of Pennsylvania",
  office: "경영관 537",
  phone: "02-2123-6575",
  email: "jeonghye@yonsei.ac.kr",
  tagline:
    "디지털 마케팅과 데이터로 시장의 다음 수를 읽는 연구실",
};

// 히어로 스탯 카운터 — section/focus: 클릭 시 이동할 섹션과 초기 상태
export const HERO_STATS = [
  { value: 40, suffix: "+", label: "SSCI 논문", section: "publications", focus: "ssci" },
  { value: 50, suffix: "+", label: "KCI 논문", section: "publications", focus: "kci" },
  {
    value: 13,
    suffix: "명",
    label: "지도 박사·석사 배출",
    sub: "박사 2 · 석사 11",
    section: "alumni",
  },
  { value: 20, suffix: "+", label: "수상", section: "awards" },
];

export const EDUCATION = [
  { degree: "Ph.D.", detail: "Wharton School, University of Pennsylvania" },
  { degree: "M.S. · B.S.", detail: "KAIST" },
];

export const CAREER = [
  { period: "2020 – 현재", role: "연세대학교 경영대학 교수" },
  { period: "2021 – 현재", role: "연세대학교 언더우드 특훈교수" },
  { period: "2020 – 현재", role: "연세대학교 경영대학 우수연구업적교수" },
  { period: "2016 – 2017", role: "KAIST 산업공학과 방문교수" },
  { period: "2015 – 2020", role: "연세대학교 경영대학 부교수" },
  { period: "2014 – 2020", role: "연세대학교 경영대학 연구업적교수" },
  { period: "2010 – 2015", role: "연세대학교 경영대학 조교수" },
];

export const OUTSIDE_DIRECTOR = {
  current: ["티쓰리엔터테인먼트"],
  past: [
    "SK행복나래 (2023–2024)",
    "KB손해보험 (2020–2023)",
    "에이비엘바이오 (2020–2022)",
  ],
};

export const ACADEMIC_SERVICE = [
  "한국유통학회 부회장",
  "서비스마케팅학회 부회장",
  "한국마케팅학회 감사",
  "마케팅관리학회 상임이사",
  "한국경영과학회 이사",
  "마케팅관려연구 편집위원장",
];

export const INDUSTRY_CURRENT = [
  "국립박물관문화재단",
  "상공회의소 유통물류진흥원",
  "산업통상부 유통물류과",
  "KOTRA 서비스산업팀",
  "GS리테일 시청자위원회",
];

export const INDUSTRY_PAST = [
  "올리브영",
  "중소벤처기업연구원",
  "TV홈쇼핑협회",
  "한국지식재산연구원",
  "써모피셔사이언티픽",
  "스몰티켓",
  "이건창호",
  "효성ITX",
  "포스코ICT",
  "엔코드",
  "Class101",
  "OCI/DCRE",
  "Kantar TNS",
  "유한양행",
  "하나멤버스",
  "NAVER",
  "인천국제공항",
  "빅디퍼(데이터분석)",
  "KB국민카드",
  "엔트리브(게임)",
  "삼성SDS",
  "삼성전기",
  "Diapers.com(Amazon 자회사)",
];

// 관심분야 섹션
export const TEACHING = [
  {
    level: "학부",
    courses: [
      "디지털 마케팅 전략 및 응용",
      "마케팅 전략 모형(신상품수요예측)",
      "시장조사론",
      "마케팅원론",
    ],
  },
  { level: "석박사", courses: ["디지털 마케팅 세미나"] },
  { level: "EMBA", courses: ["디지털 마케팅"] },
];

// 연구관심분야 — "스킬 세트" 카드용. 도메인 / 방법론 두 축으로 구분
export const RESEARCH_DOMAINS = [
  "디지털 마케팅",
  "유통/물류",
  "스타트업",
  "플랫폼",
  "콘텐츠(OTT, 게임)",
  "헬스케어",
  "건기식/OTC",
  "펫케어",
  "ESG",
  "공공정책 효과분석",
];

export const RESEARCH_METHODS = [
  "현장실험",
  "빅데이터분석",
  "텍스트분석",
  "이미지분석",
  "로그데이터분석",
  "AI/GenAI",
];
