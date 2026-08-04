// 제자 진출 데이터 — 도시 단위로 핀을 묶고, 각 핀에 소속 인원 목록을 담는다.
// coordinates: [경도, 위도]
// 이름이 확인되지 않은 졸업생은 익명("석사 졸업생" 등) 처리 — 실명 창작 금지.

export const LAB_STAT_LINE = "본 연구실 SSCI 40+편 · KCI 50+편";

export const CITY_PINS = [
  {
    id: "seoul",
    city: "서울",
    country: "대한민국",
    coordinates: [126.978, 37.566],
    labelDx: 8,
    labelDy: -10,
    entries: [
      {
        name: "Li Yiling",
        grad: "2025 박사",
        placement: "연세대학교 임용/진출",
      },
      {
        name: "석사 졸업생",
        grad: "2021 석사",
        placement: "롯데면세점 입사",
      },
    ],
  },
  {
    id: "philadelphia",
    city: "필라델피아",
    country: "미국",
    coordinates: [-75.165, 39.952],
    labelDx: 8,
    labelDy: -8,
    entries: [
      {
        name: "석사 졸업생",
        grad: "2025 석사",
        placement: "Wharton School, Univ. of Pennsylvania 마케팅 박사과정 진학",
      },
    ],
  },
  {
    id: "atlanta",
    city: "애틀랜타",
    country: "미국",
    coordinates: [-84.388, 33.749],
    labelDx: 8,
    labelDy: 14,
    entries: [
      {
        name: "석사 졸업생",
        grad: "2024 석사",
        placement: "Georgia Institute of Technology 마케팅 박사과정 진학",
      },
      {
        name: "석사 졸업생",
        grad: "2022 석사",
        placement: "Emory University 마케팅 박사과정 진학",
      },
      {
        name: "석사 졸업생",
        grad: "2021 석사",
        placement: "Emory University 마케팅 박사과정 진학",
      },
      {
        name: "석사 졸업생",
        grad: "2020 석사",
        placement: "Georgia State University 마케팅 박사과정 진학",
      },
    ],
  },
  {
    id: "minneapolis",
    city: "미니애폴리스",
    country: "미국",
    coordinates: [-93.265, 44.978],
    labelDx: -8,
    labelDy: -10,
    entries: [
      {
        name: "석사 졸업생",
        grad: "2023 석사",
        placement: "University of Minnesota 마케팅 박사과정 진학",
      },
    ],
  },
  {
    id: "hamilton",
    city: "해밀턴",
    country: "캐나다",
    coordinates: [-79.866, 43.256],
    labelDx: 10,
    labelDy: -12,
    entries: [
      {
        name: "석사 졸업생",
        grad: "2019 석사",
        placement: "University of Maryland 박사 진학 → McMaster University 교수",
      },
    ],
  },
  {
    id: "houston",
    city: "휴스턴",
    country: "미국",
    coordinates: [-95.369, 29.76],
    labelDx: -8,
    labelDy: 16,
    entries: [
      {
        name: "Jiang Yan",
        grad: "2018 석사",
        placement: "University of Houston 마케팅 조교수 임용 (2024)",
      },
    ],
  },
  {
    id: "west-lafayette",
    city: "웨스트라피엣",
    country: "미국",
    coordinates: [-86.908, 40.426],
    labelDx: -10,
    labelDy: -12,
    entries: [
      {
        name: "석사 졸업생",
        grad: "2017 석사",
        placement: "Emory University 박사 → Purdue University 교수",
      },
    ],
  },
  {
    id: "columbus",
    city: "콜럼버스",
    country: "미국",
    coordinates: [-82.999, 39.961],
    labelDx: 12,
    labelDy: 6,
    entries: [
      {
        name: "학부 졸업생",
        grad: "2015 학사",
        placement: "Wharton School 박사 (2017) → Ohio State University 교수",
      },
    ],
  },
  {
    id: "melbourne",
    city: "멜버른",
    country: "호주",
    coordinates: [144.963, -37.814],
    labelDx: 8,
    labelDy: 14,
    entries: [
      {
        name: "졸업생",
        grad: "2014 석사 · 2018 박사",
        placement: "La Trobe University 교수",
      },
    ],
  },
];

// 지도 하단 요약 배지
export const MAP_BADGES = [
  { value: "9명", label: "미국 명문대 박사과정 진학" },
  { value: "5명", label: "해외 대학 교수 임용" },
  { value: "4개국", label: "한국 · 미국 · 캐나다 · 호주" },
];
