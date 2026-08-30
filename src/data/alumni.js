// 제자 진출 데이터 — 도시 단위 핀 + 각 핀의 소속 인원 목록 (스키마: CLAUDE.md 참고)
// coordinates: [경도, 위도] 순서 주의
//
// NOTE: 학생별 실적은 publications.js의 논문별 authors/studentIds(명시적 id 매핑)로만 연결.
// 이름 문자열 매칭·추론 절대 금지. 저자 표기가 이니셜뿐이라 확정 불가한 건은 배정하지 않음.
// ⚠️ 이예령(li-yiling, Li Yiling)과 오가령(wu-jialing, Wu Jialing)은 완전히 다른 인물.
// 주의: 'Jikyung (Jeanne) Kim'은 IE University 소속 외부 공동연구자이며 제자 김지연(Jeeyeon Kim)과 다른 인물.
//       해당 논문(Channel Stickiness 2021, Purchase Now and Consume Later 2020,
//       Sentiment Change 2022, Surprising Consequences 2024 등)을 김지연 실적에 넣지 말 것.
//
// [불확실 항목 — 어느 학생에게도 배정하지 않음]
// 1. Click, Sign-up and Purchase (2025, IJA) — 저자 'Yoon, Y.'가 윤여홍/윤여림 불명
// 2. Weathering the Digital Shift (2026, JRIM) — 저자 'Kim, J.'가 이니셜뿐이라 특정 불가 (이예령에게만 배정)
// (해소됨) 가상 인플루언서 얼굴 특성 (2024) / 감염병 확산 헬스장 폐업 (2024)
//   → 14차에서 저자 확정, 김혜정·김지연 / 김혜정·황인서에 배정 완료
//
// works 스키마: { year, type: "SSCI"|"KCI"|"BOOK", title, journal, top?: true }

export const CITY_PINS = [
  // ---------- 교수 임용 (isFaculty) ----------
  {
    id: "columbus",
    region: "OHIO",
    lang: {"en": {"city": "Columbus", "country": "USA", "label": "Mingyung Kim"}, "zh": {"city": "哥伦布", "country": "美国", "label": "Mingyung Kim"}, "ja": {"city": "コロンバス", "country": "アメリカ", "label": "Mingyung Kim"}},
    city: "콜럼버스",
    country: "미국",
    coordinates: [-83.0007, 39.9612],
    label: "김민경",
    labelDx: 10,
    labelDy: 4,
    entries: [
      {
        nameKo: "김민경",
        personId: "kim-mingyung",
        lang: {"en": {"grad": "B.S. 2015", "path": "B.S. 2015 → Ph.D. in Marketing, Wharton School (2017) → Assistant Professor, Ohio State University (2024–)", "linkLabel": "Faculty Profile →", "subLinkLabel": "Personal Site →"}, "zh": {"grad": "2015 学士", "title": "市场营销助理教授", "path": "2015 学士 → 2017 Wharton School 市场营销博士 → 2024 任职 Ohio State", "linkLabel": "教授主页 →", "subLinkLabel": "个人网站 →"}, "ja": {"grad": "2015年 学士", "path": "2015年 学士 → 2017年 Wharton School マーケティング博士 → 2024年 Ohio State 就任", "linkLabel": "教授ホームページ →", "subLinkLabel": "個人サイト →"}},
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
    region: "INDIANA",
    lang: {"en": {"city": "West Lafayette", "country": "USA", "label": "Wooyong Jo"}, "zh": {"city": "西拉法叶", "country": "美国", "label": "Wooyong Jo"}, "ja": {"city": "ウェストラファイエット", "country": "アメリカ", "label": "Wooyong Jo"}},
    city: "웨스트라피엣",
    country: "미국",
    coordinates: [-86.9212, 40.4237],
    label: "조우용",
    labelDx: -10,
    labelDy: -10,
    entries: [
      {
        nameKo: "조우용",
        personId: "jo-wooyong",
        lang: {"en": {"grad": "M.S. 2017", "path": "M.S. 2017 → Ph.D. in Marketing, Emory University (2022) → Assistant Professor, Purdue University", "linkLabel": "Faculty Profile →", "subLinkLabel": "Personal Site →"}, "zh": {"grad": "2017 硕士", "title": "市场营销助理教授", "path": "2017 硕士 → 2022 Emory University 市场营销博士 → 任职 Purdue", "linkLabel": "教授主页 →", "subLinkLabel": "个人网站 →"}, "ja": {"grad": "2017年 修士", "path": "2017年 修士 → 2022年 Emory University マーケティング博士 → Purdue 就任", "linkLabel": "教授ホームページ →", "subLinkLabel": "個人サイト →"}},
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
    region: "ONTARIO",
    lang: {"en": {"city": "Hamilton", "country": "Canada", "label": "Sanghwa Kim"}, "zh": {"city": "汉密尔顿", "country": "加拿大", "label": "Sanghwa Kim"}, "ja": {"city": "ハミルトン", "country": "カナダ", "label": "Sanghwa Kim"}},
    city: "해밀턴",
    country: "캐나다",
    coordinates: [-79.8711, 43.2557],
    label: "김상화",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        nameKo: "김상화",
        personId: "kim-sanghwa",
        lang: {"en": {"grad": "M.S. 2019", "path": "M.S. 2019 → Ph.D. in Marketing, University of Maryland (2024) → Assistant Professor, McMaster University", "linkLabel": "Faculty Profile →", "subLinkLabel": "Personal Site →"}, "zh": {"grad": "2019 硕士", "title": "市场营销助理教授", "path": "2019 硕士 → 2024 University of Maryland 市场营销博士 → 任职 McMaster", "linkLabel": "教授主页 →", "subLinkLabel": "个人网站 →"}, "ja": {"grad": "2019年 修士", "path": "2019年 修士 → 2024年 University of Maryland マーケティング博士 → McMaster 就任", "linkLabel": "教授ホームページ →", "subLinkLabel": "個人サイト →"}},
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
    region: "MELBOURNE",
    lang: {"en": {"city": "Melbourne", "country": "Australia", "label": "Jeeyeon Kim"}, "zh": {"city": "墨尔本", "country": "澳大利亚", "label": "Jeeyeon Kim"}, "ja": {"city": "メルボルン", "country": "オーストラリア", "label": "Jeeyeon Kim"}},
    city: "멜버른",
    country: "호주",
    coordinates: [144.9631, -37.8136],
    label: "김지연",
    labelDx: 10,
    labelDy: 12,
    entries: [
      {
        nameKo: "김지연",
        personId: "kim-jeeyeon",
        lang: {"en": {"grad": "M.S. 2014 · Ph.D. 2018", "path": "M.S. 2014 → Ph.D., Yonsei University (2018) → Assistant Professor, National Sun Yat-sen University (Taiwan) → Lecturer, La Trobe University", "linkLabel": "ORCID Profile →", "title": "Lecturer in Marketing"}, "zh": {"grad": "2014 硕士 · 2018 博士", "title": "市场营销讲师", "path": "2014 硕士 → 2018 延世大学博士 → National Sun Yat-sen University（台湾）助理教授 → 任职 La Trobe", "linkLabel": "ORCID 主页 →"}, "ja": {"grad": "2014年 修士 · 2018年 博士", "path": "2014年 修士 → 2018年 延世大学博士 → National Sun Yat-sen University（台湾）Assistant Professor → La Trobe 就任", "linkLabel": "ORCID プロフィール →", "title": "Lecturer in Marketing"}},
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
        // 주의: 'Jikyung (Jeanne) Kim'(IE University) 논문을 여기에 넣지 말 것 (동명이인 아님, 별개 인물)
      },
    ],
  },

  {
    // 이예령 — 고려대 세종캠퍼스 융합경영학부 디지털경영전공 교수 (2026.08.31 학교 공식 교수소개 확인)
    // 서울이 아니라 세종캠퍼스다. 14차의 "고려대학교 · 디지털경영"(서울) 표기는 폐기됨.
    id: "sejong",
    region: "SEJONG, KOREA",
    lang: {"en": {"city": "Sejong", "country": "South Korea", "label": "SEJONG, KOREA"}, "zh": {"city": "世宗", "country": "韩国", "label": "SEJONG, KOREA"}, "ja": {"city": "世宗", "country": "韓国", "label": "SEJONG, KOREA"}},
    city: "세종",
    country: "대한민국",
    coordinates: [127.289, 36.48],
    label: "SEJONG, KOREA",
    labelDx: 10,
    labelDy: 12,
    entries: [
      {
        nameKo: "이예령",
        personId: "li-yiling",
        lang: {"en": {"grad": "Ph.D. 2025", "affiliation": "Korea University Sejong Campus · Division of Convergence Business, Digital Management", "title": "Professor", "path": "Ph.D. in Marketing, Yonsei University (2025) → Professor, Korea University Sejong Campus", "linkLabel": "Faculty Profile →"}, "zh": {"grad": "2025 博士", "affiliation": "高丽大学世宗校区 · 融合经营学部 数字经营专业", "title": "教授", "path": "2025 延世大学市场营销博士 → 任职高丽大学世宗校区", "linkLabel": "教授主页 →"}, "ja": {"grad": "2025年 博士", "affiliation": "高麗大学世宗キャンパス · 融合経営学部 デジタル経営専攻", "title": "教授", "path": "2025年 延世大学マーケティング博士 → 高麗大学世宗キャンパス 就任", "linkLabel": "教授ホームページ →"}},
        nameEn: "Yiling Li",
        grad: "2025 박사",
        affiliation: "고려대학교 세종캠퍼스 · 융합경영학부 디지털경영전공",
        title: "교수",
        path: "2025 연세대학교 마케팅 박사 → 고려대학교 세종캠퍼스 교수 임용",
        isFaculty: true,
        // 출처: 고려대 세종캠퍼스 디지털경영전공 교수소개 (2026.08.31 확인)
        // 개별 상세는 JS로 열려 고정 URL이 없어 학과 목록 페이지를 링크한다
        link: "https://sejong.korea.ac.kr/faculty/13978/subview.do",
        linkLabel: "교수 홈페이지 →",
        subLink: null,
        subLinkLabel: null,
      },
    ],
  },

  // ---------- 박사과정 진학 / 기업 진출 ----------
  {
    id: "houston",
    region: "TEXAS",
    lang: {"en": {"city": "Houston", "country": "USA", "label": "Yan Jiang"}, "zh": {"city": "休斯顿", "country": "美国", "label": "Yan Jiang"}, "ja": {"city": "ヒューストン", "country": "アメリカ", "label": "Yan Jiang"}},
    city: "휴스턴",
    country: "미국",
    coordinates: [-95.3698, 29.7604],
    label: "장연",
    labelDx: -8,
    labelDy: 14,
    entries: [
      {
        nameKo: "장연",
        personId: "jiang-yan",
        lang: {"en": {"grad": "M.S. 2018", "title": "Ph.D. Student in Marketing", "path": "M.S. 2018 → Entered Ph.D. program (2024)"}, "zh": {"grad": "2018 硕士", "title": "市场营销博士生", "path": "2018 硕士 → 2024 升学"}, "ja": {"grad": "2018年 修士", "title": "博士課程（マーケティング）", "path": "2018年 修士 → 2024年 進学"}},
        nameEn: "Yan Jiang",
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
    region: "SEOUL, KOREA",
    lang: {"en": {"city": "Seoul", "country": "South Korea", "label": "SEOUL, KOREA"}, "zh": {"city": "首尔", "country": "韩国", "label": "SEOUL, KOREA"}, "ja": {"city": "ソウル", "country": "韓国", "label": "SEOUL, KOREA"}},
    city: "서울",
    country: "대한민국",
    coordinates: [126.978, 37.5665],
    label: "SEOUL, KOREA",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        nameKo: "이지연",
        personId: "lee-jiyeon",
        lang: {"en": {"grad": "M.S. 2021", "affiliation": "Lotte Duty Free", "title": "Joined 2021", "path": "M.S. 2021"}, "zh": {"grad": "2021 硕士", "affiliation": "Lotte Duty Free", "title": "入职", "path": "2021 硕士毕业"}, "ja": {"grad": "2021年 修士", "affiliation": "Lotte Duty Free", "title": "入社", "path": "2021年 修士修了"}},
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
    region: "PENNSYLVANIA",
    lang: {"en": {"city": "Philadelphia", "country": "USA", "label": "Hyunwoo Jung"}, "zh": {"city": "费城", "country": "美国", "label": "Hyunwoo Jung"}, "ja": {"city": "フィラデルフィア", "country": "アメリカ", "label": "Hyunwoo Jung"}},
    city: "필라델피아",
    country: "미국",
    coordinates: [-75.1652, 39.9526],
    label: "정현우",
    labelDx: 10,
    labelDy: -8,
    entries: [
      {
        nameKo: "정현우",
        personId: "jung-hyunwoo",
        lang: {"en": {"grad": "M.S. 2025", "title": "Ph.D. Student in Marketing", "path": "Entered 2025"}, "zh": {"grad": "2025 硕士", "title": "市场营销博士生", "path": "2025 升学"}, "ja": {"grad": "2025年 修士", "title": "博士課程（マーケティング）", "path": "2025年 進学"}},
        nameEn: "Hyunwoo Jung",
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
    region: "GEORGIA",
    lang: {"en": {"city": "Atlanta", "country": "USA", "label": "Atlanta ×4"}, "zh": {"city": "亚特兰大", "country": "美国", "label": "Atlanta ×4"}, "ja": {"city": "アトランタ", "country": "アメリカ", "label": "Atlanta ×4"}},
    city: "애틀랜타",
    country: "미국",
    coordinates: [-84.388, 33.749],
    label: "애틀랜타 ×4",
    labelDx: 10,
    labelDy: 14,
    entries: [
      {
        nameKo: "김혜정",
        personId: "kim-hyejeong",
        lang: {"en": {"grad": "M.S. 2024", "title": "Ph.D. Student in Marketing", "path": "Entered 2024"}, "zh": {"grad": "2024 硕士", "title": "市场营销博士生", "path": "2024 升学"}, "ja": {"grad": "2024年 修士", "title": "博士課程（マーケティング）", "path": "2024年 進学"}},
        nameEn: "Hyejeong Kim",
        grad: "2024 석사",
        affiliation: "Georgia Institute of Technology",
        title: "마케팅 박사과정",
        path: "2024 진학",
        isFaculty: false,
      },
      {
        nameKo: "곽유신",
        personId: "kwak-yushin",
        lang: {"en": {"grad": "M.S. 2022", "title": "Ph.D. Student in Marketing", "path": "Entered 2022"}, "zh": {"grad": "2022 硕士", "title": "市场营销博士生", "path": "2022 升学"}, "ja": {"grad": "2022年 修士", "title": "博士課程（マーケティング）", "path": "2022年 進学"}},
        nameEn: null,
        grad: "2022 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2022 진학",
        isFaculty: false,
      },
      {
        nameKo: "윤여홍",
        personId: "yoon-yeohong",
        lang: {"en": {"grad": "M.S. 2021", "title": "Ph.D. Student in Marketing", "path": "Entered 2021"}, "zh": {"grad": "2021 硕士", "title": "市场营销博士生", "path": "2021 升学"}, "ja": {"grad": "2021年 修士", "title": "博士課程（マーケティング）", "path": "2021年 進学"}},
        nameEn: "Yeohong Yoon",
        grad: "2021 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2021 진학",
        isFaculty: false,
      },
      {
        nameKo: "송혜신",
        personId: "song-hyeasinn",
        lang: {"en": {"grad": "M.S. 2020", "title": "Ph.D. Student in Marketing", "path": "Entered 2021"}, "zh": {"grad": "2020 硕士", "title": "市场营销博士生", "path": "2021 升学"}, "ja": {"grad": "2020年 修士", "title": "博士課程（マーケティング）", "path": "2021年 進学"}},
        nameEn: "Hyeasinn Song",
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
    region: "MINNESOTA",
    lang: {"en": {"city": "Minneapolis", "country": "USA", "label": "Yeo Lim Yoon"}, "zh": {"city": "明尼阿波利斯", "country": "美国", "label": "Yeo Lim Yoon"}, "ja": {"city": "ミネアポリス", "country": "アメリカ", "label": "Yeo Lim Yoon"}},
    city: "미니애폴리스",
    country: "미국",
    coordinates: [-93.265, 44.9778],
    label: "윤여림",
    labelDx: -8,
    labelDy: -10,
    entries: [
      {
        nameKo: "윤여림",
        personId: "yoon-yeolim",
        lang: {"en": {"grad": "Integrated M.S.–Ph.D. 2023", "title": "Ph.D. Student in Marketing", "path": "Entered 2023"}, "zh": {"grad": "2023 硕博连读", "title": "市场营销博士生", "path": "2023 升学"}, "ja": {"grad": "2023年 修士・博士一貫課程", "title": "博士課程（マーケティング）", "path": "2023年 進学"}},
        nameEn: "Yeo Lim Yoon",
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
  { value: "5명", label: "교수 임용" },
  { value: "7명", label: "해외 박사과정 진학" },
  { value: "4개 대륙", label: "제자 진출 무대" },
  { value: "4명", label: "재학생" },
];

// ---------------------------------------------------------------
// 현재 연구실 구성원 (재학생) — 15차에서 교수님 확인으로 4명 확정 (2026.08.31)
// 실적은 publications.js의 studentIds 매핑으로만 계산 — 이름 문자열 추론 금지.
// ⚠️ 오가령(Wu Jialing)은 이예령(Li Yiling)과 완전히 다른 인물이다. 절대 섞지 말 것.
// ⚠️ 김정현·나규원은 진출처 미확인이므로 명단·지도 어디에도 넣지 않는다 (인물 id 삭제).
//    단 김정현은 2026 아식스 논문(마케팅관리연구)의 실제 공저자이므로 해당 논문의
//    authors 표기는 사실 그대로 유지한다.
export const CURRENT_MEMBERS = [
  { personId: "kim-wookyoung", nameKo: "김우경", nameEn: "Wookyoung Kim" },
  { personId: "hwang-inseo", nameKo: "황인서", nameEn: "Inseo Hwang" },
  { personId: "wu-jialing", nameKo: "오가령", nameEn: "Wu Jialing" },
  // TODO: 김연정 본인 KCI 연구자번호(KRI) 또는 CV 확보 후 교수님과의 공저 논문만 추가.
  //       동명이인이 매우 많아 웹 검색으로 특정 불가 → 현재 배정 논문 0편.
  { personId: "kim-yeonjeong", nameKo: "김연정", nameEn: null },
];
