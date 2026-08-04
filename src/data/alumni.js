// 제자 진출 데이터 — 도시 단위 핀 + 각 핀의 소속 인원 목록 (스키마: CLAUDE.md 참고)
// coordinates: [경도, 위도] 순서 주의
//
// NOTE: 학생별 실적은 논문 원문의 정식 저자명을 한국어 이름과 대조해 작성 (2026.08 기준).
// 저자 표기가 이니셜뿐이라 확정 불가한 건은 배정하지 않음. 교수님 확인 후 보완 필요.
// 주의: 'Jikyung (Jeanne) Kim'은 IE University 소속 외부 공동연구자이며 제자 김지연(Jeeyeon Kim)과 다른 인물.
//       해당 논문(Channel Stickiness 2021, Purchase Now and Consume Later 2020,
//       Sentiment Change 2022, Surprising Consequences 2024 등)을 김지연 실적에 넣지 말 것.
//
// [불확실 항목 — 어느 학생에게도 배정하지 않음]
// 1. Click, Sign-up and Purchase (2025, IJA) — 저자 'Yoon, Y.'가 윤여홍/윤여림 불명
// 2. Weathering the Digital Shift (2026, JRIM) — 저자 'Kim, J.'가 김지연/김정현 불명 (이예령에게만 배정)
// 3. 가상 인플루언서 얼굴 특성 (2024) / 감염병 확산 헬스장 폐업 (2024) — 저자 미확인
//
// works 스키마: { year, type: "SSCI"|"KCI"|"BOOK", title, journal, top?: true }

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
        works: [
          {
            year: 2017,
            type: "SSCI",
            title:
              "Mobile Shopping through Applications: Understanding Application Possession and Mobile Purchase",
            journal: "Journal of Interactive Marketing",
          },
          {
            year: 2015,
            type: "KCI",
            title: "오프라인 환경 변화가 틈새 제품의 온라인 수요에 미치는 영향",
            journal: "마케팅연구",
          },
          {
            year: 2015,
            type: "KCI",
            title: "모바일 VOD 콘텐츠 구매 요인에 관한 실증 연구",
            journal: "지식경영연구",
          },
          {
            year: 2015,
            type: "BOOK",
            title: "기술혁신에 따른 지역간 정보격차",
            journal: "집문당",
          },
        ],
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
        works: [
          {
            year: 2025,
            type: "SSCI",
            top: true,
            title:
              "In the Company of Strangers: Social Influence from Anonymous Peers in Online Game Settings",
            journal: "Journal of Consumer Research",
          },
          {
            year: 2025,
            type: "SSCI",
            title:
              "A Picture's Worth a Thousand Shares: An Empirical Analysis of Logo Sizes in Social Media Posts and Their Impact on Content Virality",
            journal: "Marketing Letters",
          },
          {
            year: 2024,
            type: "SSCI",
            title: "Older Adult Consumers and Local Competition in the Healthcare Service",
            journal: "International Journal of Consumer Studies",
          },
          {
            year: 2021,
            type: "SSCI",
            title:
              "Who Are the Multichannel Shoppers and How Can Retailers Use Them? Evidence from the French Apparel Industry",
            journal: "Asia Pacific Journal of Marketing and Logistics",
          },
          {
            year: 2020,
            type: "SSCI",
            top: true,
            title:
              "Protecting Consumers from Themselves: Assessing Consequences of Usage Restriction Laws on Online Game Usage and Spending",
            journal: "Marketing Science",
          },
          {
            year: 2018,
            type: "KCI",
            title:
              "럭셔리 브랜드의 판매 성과와 제품, 고객, 구색의 영향: 매장 유형의 조절 효과를 중심으로",
            journal: "유통연구",
          },
          {
            year: 2016,
            type: "KCI",
            title: "온라인상의 기업 및 소비자 텍스트 분석과 이를 활용한 온라인 매출 증진 전략",
            journal: "한국경영과학회지",
          },
          {
            year: 2015,
            type: "KCI",
            title: "모바일 VOD 콘텐츠 구매 요인에 관한 실증 연구",
            journal: "지식경영연구",
          },
        ],
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
        works: [
          {
            year: 2020,
            type: "SSCI",
            title:
              "Purchase Now and Consume Later: Do Online and Offline Environments Drive Online Social Interactions and Sales?",
            journal: "Journal of Business Research",
          },
          {
            year: 2020,
            type: "KCI",
            title:
              "건강식품 구매에 제품 네이밍과 고객의 제품 경험, 기업의 제품 판촉이 미치는 영향",
            journal: "유통연구",
          },
          {
            year: 2018,
            type: "KCI",
            title:
              "럭셔리 브랜드의 판매 성과와 제품, 고객, 구색의 영향: 매장 유형의 조절 효과를 중심으로",
            journal: "유통연구",
          },
          {
            year: 2016,
            type: "KCI",
            title: "B2B 기업의 마케팅 활동과 고객의 시장 환경이 매출 성과에 미치는 영향",
            journal: "한국경영과학회지",
          },
        ],
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
        // 주의: 'Jikyung (Jeanne) Kim'(IE University) 논문을 여기에 넣지 말 것 (동명이인 아님, 별개 인물)
        works: [
          {
            year: 2026,
            type: "SSCI",
            title:
              "Push the Paw: A Field Experiment on Personalised Push Notifications and User Engagement",
            journal: "Australasian Marketing Journal",
          },
          {
            year: 2024,
            type: "SSCI",
            title:
              "The Impact of Offline Store Presence on Digital Sales: The Moderating Role of Product Functionality",
            journal: "Journal of Retailing and Consumer Services",
          },
          {
            year: 2024,
            type: "SSCI",
            title: "Older Adult Consumers and Local Competition in the Healthcare Service",
            journal: "International Journal of Consumer Studies",
          },
          {
            year: 2019,
            type: "SSCI",
            title:
              "The Effects of eWOM Characteristics on Consumer Ratings: Evidence from TripAdvisor.com",
            journal: "International Journal of Advertising",
          },
          {
            year: 2017,
            type: "SSCI",
            title:
              "Mobile Shopping through Applications: Understanding Application Possession and Mobile Purchase",
            journal: "Journal of Interactive Marketing",
          },
          {
            year: 2023,
            type: "KCI",
            title: "Understanding of the Continuance Intention to Use Chatbot Services",
            journal: "Asia Marketing Journal",
          },
          {
            year: 2016,
            type: "KCI",
            title: "온라인상의 기업 및 소비자 텍스트 분석과 이를 활용한 온라인 매출 증진 전략",
            journal: "한국경영과학회지",
          },
          {
            year: 2016,
            type: "KCI",
            title: "B2B 기업의 마케팅 활동과 고객의 시장 환경이 매출 성과에 미치는 영향",
            journal: "한국경영과학회지",
          },
          {
            year: 2015,
            type: "BOOK",
            title: "기술혁신에 따른 지역간 정보격차",
            journal: "집문당",
          },
        ],
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
        nameEn: "Yan Jiang",
        grad: "2018 석사",
        affiliation: "University of Houston · Bauer College",
        title: "마케팅 박사과정",
        path: "2018 석사 → 2024 진학",
        isFaculty: false,
        works: [
          {
            year: 2020,
            type: "SSCI",
            title:
              "From Clicks to Bricks: The Impact of Product Launches in Offline Stores for Digital Retailers",
            journal: "Journal of Business Research",
          },
          {
            year: 2018,
            type: "KCI",
            title:
              "럭셔리 브랜드의 판매 성과와 제품, 고객, 구색의 영향: 매장 유형의 조절 효과를 중심으로",
            journal: "유통연구",
          },
        ],
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
        nameEn: "Yiling Li",
        grad: "2025 박사",
        affiliation: "TODO: 소속 확인 필요",
        title: "교수",
        path: "2025 박사 졸업 → 교수 임용",
        isFaculty: false,
        works: [
          {
            year: 2026,
            type: "SSCI",
            title:
              "Emotional Anthropomorphism of Notifications and App Engagement: Does the Usage Frequency Matter?",
            journal: "Journal of Research in Interactive Marketing",
          },
          {
            // D-3: 저자 'Kim, J.' 불명으로 이예령에게만 배정된 논문
            year: 2026,
            type: "SSCI",
            title:
              "Weathering the Digital Shift: How Interaction Spaces and Weather Conditions Shape Mobile App Engagement",
            journal: "Journal of Research in Interactive Marketing",
          },
          {
            year: 2025,
            type: "SSCI",
            top: true,
            title:
              "Liability of Foreignness in Immersive Technologies: Evidence from Extended Reality Innovations",
            journal: "Journal of International Business Studies",
          },
          {
            year: 2023,
            type: "KCI",
            title:
              "스포츠 구단의 경기 실적 및 소셜미디어 운영이 팬덤의 인게이지먼트에 미치는 영향: 팬 토큰의 조절 효과를 중심으로",
            journal: "지식경영연구",
          },
          {
            year: 2023,
            type: "KCI",
            title:
              "소비자의 신뢰도 향상을 위한 제품 전략의 구전 효과: 온라인 식품 유통 플랫폼을 중심으로",
            journal: "유통연구",
          },
          {
            year: 2023,
            type: "KCI",
            title: "Understanding of the Continuance Intention to Use Chatbot Services",
            journal: "Asia Marketing Journal",
          },
          {
            year: 2023,
            type: "KCI",
            title:
              "신규 애플리케이션 출시가 기존 시장 생태계에 미치는 영향: 디지털 헬스케어 사례를 중심으로",
            journal: "한국경영과학회지",
          },
          {
            year: 2023,
            type: "KCI",
            title:
              "동영상 콘텐츠의 장르, 시청자의 디지털 네이티브 특성 및 디지털 미디어의 속성이 사전광고 회피에 미치는 영향",
            journal: "광고학연구",
          },
          {
            year: 2022,
            type: "KCI",
            title:
              "The Effect of Lockdown Repeal on Socialization: Bayesian Multilevel Difference-in-Differences Approach",
            journal: "Asia Marketing Journal",
          },
          {
            year: 2022,
            type: "KCI",
            title: "뉴스 홍보가 시청자 온라인 구전에 미치는 영향: 웹툰의 드라마화를 중심으로",
            journal: "한국콘텐츠학회논문지",
          },
          {
            year: 2020,
            type: "KCI",
            title:
              "건강식품 구매에 제품 네이밍과 고객의 제품 경험, 기업의 제품 판촉이 미치는 영향",
            journal: "유통연구",
          },
        ],
      },
      {
        nameKo: "이지연",
        nameEn: null,
        grad: "2021 석사",
        affiliation: "롯데면세점",
        title: "입사",
        path: "2021 석사 졸업",
        isFaculty: false,
        works: [], // TODO: 공저 논문 미확인. 교수님 확인 필요.
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
        nameEn: "Hyunwoo Jung",
        grad: "2025 석사",
        affiliation: "Wharton School, University of Pennsylvania",
        title: "마케팅 박사과정",
        path: "2025 진학",
        isFaculty: false,
        works: [
          {
            year: 2026,
            type: "KCI",
            title:
              "인플루언서 커뮤니케이션이 소비자의 구매 전환에 미치는 영향: 제품 유형과 지역 특성의 조절효과",
            journal: "경영정보학연구",
          },
          {
            year: 2023,
            type: "KCI",
            title:
              "Does Proximity Really Matters? Unveiling the Role of Industrial Similarity with Machine Learning",
            journal: "마케팅관리연구",
          },
          {
            year: 2022,
            type: "KCI",
            title:
              "The Effect of Lockdown Repeal on Socialization: Bayesian Multilevel Difference-in-Differences Approach",
            journal: "Asia Marketing Journal",
          },
          {
            year: 2022,
            type: "KCI",
            title:
              "간편결제 수용이 사용자의 쇼핑앱 사용에 미치는 영향: 카카오페이와 카카오선물하기의 사례를 중심으로",
            journal: "한국경영과학회지",
          },
        ],
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
        nameEn: "Hyejeong Kim",
        grad: "2024 석사",
        affiliation: "Georgia Institute of Technology",
        title: "마케팅 박사과정",
        path: "2024 진학",
        isFaculty: false,
        // TODO: 2024 KCI 1건 확인 필요 (가상 인플루언서/헬스장 폐업 논문 — 저자 미확인으로 미배정)
        works: [
          {
            year: 2025,
            type: "SSCI",
            title:
              "A Picture's Worth a Thousand Shares: An Empirical Analysis of Logo Sizes in Social Media Posts and Their Impact on Content Virality",
            journal: "Marketing Letters",
          },
          {
            year: 2022,
            type: "KCI",
            title: "뉴스 홍보가 시청자 온라인 구전에 미치는 영향: 웹툰의 드라마화를 중심으로",
            journal: "한국콘텐츠학회논문지",
          },
          {
            year: 2022,
            type: "KCI",
            title:
              "온라인 커뮤니티 이용자 참여 증진을 위한 관리자의 운영 전략: 대학별 대나무숲 분석을 중심으로",
            journal: "지식경영연구",
          },
        ],
      },
      {
        nameKo: "곽유신",
        nameEn: null,
        grad: "2022 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2022 진학",
        isFaculty: false,
        works: [
          {
            year: 2022,
            type: "KCI",
            title:
              "간편결제 수용이 사용자의 쇼핑앱 사용에 미치는 영향: 카카오페이와 카카오선물하기의 사례를 중심으로",
            journal: "한국경영과학회지",
          },
          {
            year: 2022,
            type: "KCI",
            title:
              "온라인 커뮤니티 이용자 참여 증진을 위한 관리자의 운영 전략: 대학별 대나무숲 분석을 중심으로",
            journal: "지식경영연구",
          },
        ],
      },
      {
        nameKo: "윤여홍",
        nameEn: "Yeohong Yoon",
        grad: "2021 석사",
        affiliation: "Emory University",
        title: "마케팅 박사과정",
        path: "2021 진학",
        isFaculty: false,
        works: [
          {
            year: 2024,
            type: "SSCI",
            title:
              "Surprising Consequences of Innocuous Mobile Transaction Reminders of Credit Card Use on Consumer Spending",
            journal: "Journal of Interactive Marketing",
          },
          {
            year: 2021,
            type: "SSCI",
            title:
              "Buyer-Supplier Matching in Online B2B Marketplace: An Empirical Study of Small- and Medium-Sized Enterprises (SMEs)",
            journal: "Industrial Marketing Management",
          },
          {
            year: 2019,
            type: "SSCI",
            title:
              "The Effects of eWOM Characteristics on Consumer Ratings: Evidence from TripAdvisor.com",
            journal: "International Journal of Advertising",
          },
        ],
      },
      {
        nameKo: "송혜신",
        nameEn: "Hyeasinn Song",
        grad: "2020 석사",
        affiliation: "Georgia State University",
        title: "마케팅 박사과정",
        path: "2021 진학",
        isFaculty: false,
        works: [
          {
            year: 2021,
            type: "SSCI",
            title:
              "Channel Stickiness in the Shopping Journey for Electronic Goods: Evidence from China and South Korea",
            journal: "Journal of Business Research",
          },
        ],
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
        nameEn: "Yeo Lim Yoon",
        grad: "2023 통합과정",
        affiliation: "University of Minnesota",
        title: "마케팅 박사과정",
        path: "2023 진학",
        isFaculty: false,
        works: [
          {
            year: 2021,
            type: "SSCI",
            title:
              "Buyer-Supplier Matching in Online B2B Marketplace: An Empirical Study of Small- and Medium-Sized Enterprises (SMEs)",
            journal: "Industrial Marketing Management",
          },
        ],
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
// 이름·확인된 공저 실적 외 정보(과정·이메일·사진·링크)는 넣지 않는다.
export const CURRENT_MEMBERS = [
  {
    nameKo: "김우경",
    nameEn: "Wookyoung Kim",
    works: [
      {
        year: 2026,
        type: "SSCI",
        title:
          "Push the Paw: A Field Experiment on Personalised Push Notifications and User Engagement",
        journal: "Australasian Marketing Journal",
      },
      {
        year: 2026,
        type: "KCI",
        title:
          "인플루언서 커뮤니케이션이 소비자의 구매 전환에 미치는 영향: 제품 유형과 지역 특성의 조절효과",
        journal: "경영정보학연구",
      },
      {
        year: 2023,
        type: "KCI",
        title:
          "스포츠 구단의 경기 실적 및 소셜미디어 운영이 팬덤의 인게이지먼트에 미치는 영향: 팬 토큰의 조절 효과를 중심으로",
        journal: "지식경영연구",
      },
      {
        year: 2023,
        type: "KCI",
        title:
          "신규 애플리케이션 출시가 기존 시장 생태계에 미치는 영향: 디지털 헬스케어 사례를 중심으로",
        journal: "한국경영과학회지",
      },
    ],
  },
  {
    nameKo: "황인서",
    nameEn: "Inseo Hwang",
    works: [
      {
        year: 2026,
        type: "SSCI",
        title:
          "Emotional Anthropomorphism of Notifications and App Engagement: Does the Usage Frequency Matter?",
        journal: "Journal of Research in Interactive Marketing",
      },
      {
        year: 2023,
        type: "KCI",
        title:
          "소비자의 신뢰도 향상을 위한 제품 전략의 구전 효과: 온라인 식품 유통 플랫폼을 중심으로",
        journal: "유통연구",
      },
    ],
  },
  { nameKo: "나규원", nameEn: null, works: [] }, // TODO: 공저 논문 미확인. 교수님 확인 필요.
  { nameKo: "김정현", nameEn: null, works: [] }, // TODO: 공저 논문 미확인. 교수님 확인 필요.
  { nameKo: "오가령", nameEn: null, works: [] }, // TODO: 공저 논문 미확인. 교수님 확인 필요.
];
