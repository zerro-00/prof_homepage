// 제자 진출 데이터 — 도시 단위 핀 + 각 핀의 소속 인원 목록 (스키마: CLAUDE.md 참고)
// coordinates: [경도, 위도] 순서 주의
// 실명은 연세대 공식 페이지에서 확인된 명단만 사용 — 추측·창작 금지.

export const LAB_STAT_LINE = "본 연구실 SSCI 40+편 · KCI 50+편";

export const CITY_PINS = [
  // ---------- 교수 임용 (isFaculty) ----------
  {
    id: "columbus",
    city: "콜럼버스",
    country: "미국",
    coordinates: [-83.0007, 39.9612],
    label: "김민경",
    labelDx: 10,
    labelDy: 4,
    entries: [
      {
        nameKo: "김민경",
        nameEn: "Mingyung Kim",
        grad: "2015 학사",
        affiliation: "Ohio State University · Fisher College of Business",
        title: "Assistant Professor of Marketing",
        path: "2015 학사 → 2017 Wharton School 마케팅 박사 → 2024 Ohio State 임용",
        isFaculty: true,
        link: "https://fisher.osu.edu/people/kim.9572",
        linkLabel: "교수 홈페이지 →",
        subLink: "https://www.mingyung-kim.com/",
        subLinkLabel: "개인 사이트 →",
      },
    ],
  },
  {
    id: "west-lafayette",
    city: "웨스트라피엣",
    country: "미국",
    coordinates: [-86.9212, 40.4237],
    label: "조우용",
    labelDx: -10,
    labelDy: -10,
    entries: [
      {
        nameKo: "조우용",
        nameEn: "Wooyong Jo",
        grad: "2017 석사",
        affiliation: "Purdue University · Mitchell E. Daniels Jr. School of Business",
        title: "Assistant Professor of Marketing",
        path: "2017 석사 → 2022 Emory University 마케팅 박사 → Purdue 임용",
        isFaculty: true,
        link: "https://business.purdue.edu/directory/bio.php?username=jo63",
        linkLabel: "교수 홈페이지 →",
        subLink: "https://sites.google.com/view/wooyong-jo/home",
        subLinkLabel: "개인 사이트 →",
      },
    ],
  },
  {
    id: "hamilton",
    city: "해밀턴",
    country: "캐나다",
    coordinates: [-79.8711, 43.2557],
    label: "김상화",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        nameKo: "김상화",
        nameEn: "Sanghwa Kim",
        grad: "2019 석사",
        affiliation: "McMaster University · DeGroote School of Business",
        title: "Assistant Professor of Marketing",
        path: "2019 석사 → 2024 University of Maryland 마케팅 박사 → McMaster 임용",
        isFaculty: true,
        link: "https://degroote.mcmaster.ca/profiles/kim910/",
        linkLabel: "교수 홈페이지 →",
        subLink: "https://sites.google.com/view/ksanghwa",
        subLinkLabel: "개인 사이트 →",
      },
    ],
  },
  {
    id: "melbourne",
    city: "멜버른",
    country: "호주",
    coordinates: [144.9631, -37.8136],
    label: "김지연",
    labelDx: 10,
    labelDy: 12,
    entries: [
      {
        nameKo: "김지연",
        nameEn: "Jeeyeon Kim",
        grad: "2014 석사 · 2018 박사",
        affiliation: "La Trobe University · La Trobe Business School",
        title: "Lecturer/Assistant Professor of Marketing",
        path: "2014 석사 → 2018 연세대 박사 → National Sun Yat-sen University(대만) 조교수 → La Trobe 임용",
        isFaculty: true,
        // TODO: La Trobe Scholars 공식 프로필 URL로 교체
        link: "https://orcid.org/0000-0002-4818-4385",
        linkLabel: "ORCID 프로필 →",
        subLink: null,
        subLinkLabel: null,
      },
    ],
  },

  // ---------- 박사과정 진학 / 기업 진출 ----------
  {
    id: "houston",
    city: "휴스턴",
    country: "미국",
    coordinates: [-95.3698, 29.7604],
    label: "장연",
    labelDx: -8,
    labelDy: 14,
    entries: [
      {
        nameKo: "장연",
        nameEn: "Jiang Yan",
        grad: "2018 석사",
        affiliation: "University of Houston · Bauer College",
        title: "마케팅 박사과정",
        path: "2018 석사 → 2024 진학",
        isFaculty: false,
      },
    ],
  },
  {
    id: "seoul",
    city: "서울",
    country: "대한민국",
    coordinates: [126.978, 37.5665],
    label: "서울 ×2",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        // TODO: 이예령 교수 소속 확정 필요 (고려대 디지털경영 / 화성의과학대 의료경영 - 학교 페이지 간 불일치)
        // 소속 확정 전까지 isFaculty: false (일반 핀) 유지
        nameKo: "이예령",
        nameEn: "Li Yiling",
        grad: "2025 박사",
        affiliation: "TODO: 소속 확인 필요",
        title: "교수",
        path: "2025 박사 졸업 → 교수 임용",
        isFaculty: false,
      },
      {
        nameKo: "이지연",
        nameEn: null,
        grad: "2021 석사",
        affiliation: "롯데면세점",
        title: "입사",
        path: "2021 석사 졸업",
        isFaculty: false,
      },
    ],
  },
  {
    id: "philadelphia",
    city: "필라델피아",
    country: "미국",
    coordinates: [-75.1652, 39.9526],
    label: "정현우",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        nameKo: "정현우",
        nameEn: null,
        grad: "2025 석사",
        affiliation: "Wharton School, University of Pennsylvania",
        title: "마케팅 박사과정",
        path: "2025 진학",
        isFaculty: false,
      },
    ],
  },
  {
    id: "atlanta",
    city: "애틀랜타",
    country: "미국",
    coordinates: [-84.388, 33.749],
    label: "애틀랜타 ×4",
    labelDx: 10,
    labelDy: 14,
    entries: [
      {
        nameKo: "김혜정",
        nameEn: null,
        grad: "2024 석사",
        affiliation: "Georgia Institute of Technology",
        title: "마케팅 박사과정",
        path: "2024 진학",
        isFaculty: false,
      },
      {
        nameKo: "곽유신",
        nameEn: null,
        grad: "2022 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2022 진학",
        isFaculty: false,
      },
      {
        nameKo: "윤여홍",
        nameEn: null,
        grad: "2021 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2021 진학",
        isFaculty: false,
      },
      {
        nameKo: "송혜신",
        nameEn: null,
        grad: "2020 석사",
        affiliation: "Georgia State University",
        title: "마케팅 박사과정",
        path: "2021 진학",
        isFaculty: false,
      },
    ],
  },
  {
    id: "minneapolis",
    city: "미니애폴리스",
    country: "미국",
    coordinates: [-93.265, 44.9778],
    label: "윤여림",
    labelDx: -8,
    labelDy: -10,
    entries: [
      {
        nameKo: "윤여림",
        nameEn: null,
        grad: "2023 통합과정",
        affiliation: "University of Minnesota",
        title: "마케팅 박사과정",
        path: "2023 진학",
        isFaculty: false,
      },
    ],
  },
];

// 지도 하단 요약 배지
export const MAP_BADGES = [
  { value: "4명", label: "해외 대학 교수 임용" },
  { value: "8명", label: "해외 박사과정 진학" },
  { value: "4개 대륙", label: "제자 진출 무대" },
  { value: "5명", label: "재학생" },
];

// ---------------------------------------------------------------
// 현재 연구실 구성원 (재학생)
// TODO: 재학생 명단은 학교 페이지 기준(2026.08). 교수님 확인 후 갱신 필요.
// 확인된 정보가 이름뿐이므로 이름 외 필드는 넣지 않는다 (링크·사진·상세정보 금지).
export const CURRENT_MEMBERS = [
  { nameKo: "김우경" },
  { nameKo: "황인서" },
  { nameKo: "나규원" },
  { nameKo: "김정현" },
  { nameKo: "오가령" },
];
