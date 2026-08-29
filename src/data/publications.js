// 논문 데이터 스키마: { id, title, journal, year, keywords: [], summary, tier }
// tier: "top"  → ★ Top Journal 배지 표시
// summary: 비전공자도 이해할 수 있는 쉬운 한국어 요약 (제목·저널에서 합리적으로 유추 가능한 수준까지만 서술)

export const KEYWORDS = [
  "모바일·앱",
  "소셜미디어",
  "온라인 리테일·이커머스",
  "게임",
  "OTT·미디어",
  "광고·프로모션",
  "헬스케어·제약",
  "소비자 행동",
  "플랫폼·B2B",
  "데이터분석·AI",
  "옴니채널(온-오프라인)",
  "유통·프랜차이즈",
  "프라이버시·정책",
];

const _SSCI = [
  // ---------- 2026 ----------
  {
    id: "ssci-2026-01",
    title:
      "Free Versus Paid Over-the-Top Video Streaming Services and the Influence of Social Media",
    journal: "Journal of Business Research",
    year: 2026,
    keywords: ["OTT·미디어", "소셜미디어", "소비자 행동"],
    summary:
      "넷플릭스 같은 유료 OTT와 광고 기반 무료 OTT, 사람들은 어떻게 갈라질까? 소셜미디어에서 오가는 이야기가 무료·유료 스트리밍 서비스 이용에 어떤 영향을 주는지 살펴본 연구.",
    tier: null,
  },
  {
    id: "ssci-2026-02",
    title:
      "The Price of Prestige: When Do Price Premiums Drive or Deter Demand on Luxury Resale Platforms?",
    journal: "Journal of Interactive Marketing",
    year: 2026,
    keywords: ["플랫폼·B2B", "온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "명품 리셀 플랫폼에서는 '비싸서 더 사고 싶은' 순간과 '비싸서 안 사는' 순간이 공존한다. 프리미엄 가격이 언제 수요를 끌어올리고 언제 밀어내는지 그 조건을 밝힌 연구.",
    tier: null,
  },
  {
    id: "ssci-2026-03",
    authors: ["Yiling Li", "Jeonghye Choi", "J. Kim"],
    studentIds: ["li-yiling"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1108/JRIM-04-2025-0234",
    title:
      "Weathering the Digital Shift: How Interaction Spaces and Weather Conditions Shape Mobile App Engagement",
    journal: "Journal of Research in Interactive Marketing",
    year: 2026,
    keywords: ["모바일·앱", "소비자 행동", "데이터분석·AI"],
    summary:
      "비 오는 날엔 앱을 더 많이 열게 될까? 사람들이 머무는 공간과 그날의 날씨가 모바일 앱 사용에 어떤 영향을 주는지 데이터를 통해 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2026-04",
    authors: ["Jeeyeon Kim", "Wookyoung Kim", "Jeonghye Choi"],
    studentIds: ["kim-jeeyeon", "kim-wookyoung"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1177/14413582251356702",
    title:
      "Push the Paw: A Field Experiment on Personalised Push Notifications and User Engagement",
    journal: "Australasian Marketing Journal",
    year: 2026,
    keywords: ["모바일·앱", "광고·프로모션", "데이터분석·AI"],
    summary:
      "똑같은 푸시 알림도 '내 얘기'처럼 느껴지면 반응이 달라진다. 개인화된 푸시 알림이 실제로 사용자의 앱 참여를 끌어올리는지 현장실험(필드 실험)으로 검증한 연구.",
    tier: null,
  },
  {
    id: "ssci-2026-05",
    authors: ["Yiling Li", "Inseo Hwang", "Jeonghye Choi"],
    studentIds: ["li-yiling", "hwang-inseo"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1108/JRIM-10-2024-0488",
    title:
      "Emotional Anthropomorphism of Notifications and App Engagement: Does the Usage Frequency Matter?",
    journal: "Journal of Research in Interactive Marketing",
    year: 2026,
    keywords: ["모바일·앱", "소비자 행동"],
    summary:
      "알림이 사람처럼 감정을 담아 말을 걸면 앱을 더 쓰게 될까? 감정을 입힌 의인화 알림의 효과가 사용자의 앱 사용 빈도에 따라 어떻게 달라지는지 살펴본 연구.",
    tier: null,
  },

  // ---------- 2021–2025 ----------
  {
    id: "ssci-2025-01",
    authors: ["Wooyong Jo", "Sarang Sunder", "Jeonghye Choi", "Minakshi Trivedi"],
    studentIds: ["jo-wooyong"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1093/jcr/ucae075",
    title:
      "In the Company of Strangers: Social Influence from Anonymous Peers in Online Game Settings",
    journal: "Journal of Consumer Research",
    year: 2025,
    keywords: ["게임", "소비자 행동", "소셜미디어"],
    summary:
      "게임에서 모르는 사람들과 함께 플레이하면 지갑이 더 열릴까? 이름도 얼굴도 모르는 익명의 타인조차 우리의 소비에 영향을 준다는 것을 실제 온라인 게임 데이터로 밝힌 연구.",
    tier: "top",
  },
  {
    id: "ssci-2025-02",
    authors: ["Y. Yoon", "H. Kim", "Jeonghye Choi", "H. Cho"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1080/02650487.2024.2444857",
    title:
      "Click, Sign-up and Purchase: Consumer Responses to Real-Time Mobile Offers along the Consumer Decision Journey",
    journal: "International Journal of Advertising",
    year: 2025,
    keywords: ["모바일·앱", "광고·프로모션", "소비자 행동"],
    summary:
      "클릭 → 가입 → 구매. 소비자가 결정을 내리는 여정의 단계마다 실시간 모바일 혜택(오퍼)에 다르게 반응한다는 점을 분석해, 언제 어떤 제안을 보내야 하는지에 대한 시사점을 준 연구.",
    tier: null,
  },
  {
    id: "ssci-2025-03",
    authors: ["Wooyong Jo", "Hyejeong Kim", "Jeonghye Choi"],
    studentIds: ["jo-wooyong", "kim-hyejeong"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1007/s11002-024-09736-4",
    title:
      "A Picture's Worth a Thousand Shares: An Empirical Analysis of Logo Sizes in Social Media Posts and Their Impact on Content Virality",
    journal: "Marketing Letters",
    year: 2025,
    keywords: ["소셜미디어", "광고·프로모션", "데이터분석·AI"],
    summary:
      "브랜드 로고를 크게 박으면 홍보가 잘 될까, 오히려 공유를 막을까? 소셜미디어 게시물 속 로고 크기가 콘텐츠 확산(바이럴)에 미치는 영향을 실증적으로 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2025-04",
    authors: ["Hyoryung Nam", "Yiling Li", "P. K. Kannan", "Jeonghye Choi"],
    studentIds: ["li-yiling"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Liability of Foreignness in Immersive Technologies: Evidence from Extended Reality Innovations",
    journal: "Journal of International Business Studies",
    year: 2025,
    keywords: ["데이터분석·AI", "플랫폼·B2B"],
    summary:
      "VR·AR 같은 확장현실(XR) 기술 혁신에서 '외국 기업'이라는 꼬리표는 득일까 실일까? 몰입형 기술 시장에서 외국계라는 지위가 만들어내는 불리함을 국제경영 관점에서 분석한 연구.",
    tier: "top",
  },
  {
    id: "ssci-2024-01",
    authors: ["Jikyung (Jeanne) Kim", "Yeohong Yoon", "Jeonghye Choi", "Dilip Soman", "Hang Dong"],
    studentIds: ["yoon-yeohong"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Surprising Consequences of Innocuous Mobile Transaction Reminders of Credit Card Use on Consumer Spending",
    journal: "Journal of Interactive Marketing",
    year: 2024,
    keywords: ["모바일·앱", "소비자 행동", "프라이버시·정책"],
    summary:
      "'○○원 결제되었습니다' — 무심코 받는 카드 결제 알림이 우리의 소비를 바꿀 수 있다. 사소해 보이는 모바일 거래 알림이 소비 지출에 미치는 뜻밖의 결과를 밝힌 연구.",
    tier: null,
  },
  {
    id: "ssci-2024-02",
    authors: ["Jeeyeon Kim", "Jeonghye Choi", "Sue Ryung Chang", "Minakshi Trivedi"],
    studentIds: ["kim-jeeyeon"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "The Impact of Offline Store Presence on Digital Sales: The Moderating Role of Product Functionality",
    journal: "Journal of Retailing and Consumer Services",
    year: 2024,
    keywords: ["옴니채널(온-오프라인)", "온라인 리테일·이커머스"],
    summary:
      "동네에 매장이 있으면 온라인 매출도 오를까? 오프라인 매장의 존재가 디지털 판매에 주는 영향이 제품의 기능적 특성에 따라 달라진다는 점을 보여준 연구.",
    tier: null,
  },
  {
    id: "ssci-2024-03",
    authors: ["Jeeyeon Kim", "Wooyong Jo", "Alex Jiyoung Kim", "Jeonghye Choi"],
    studentIds: ["kim-jeeyeon", "jo-wooyong"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Older Adult Consumers and Local Competition in the Healthcare Service",
    journal: "International Journal of Consumer Studies",
    year: 2024,
    keywords: ["헬스케어·제약", "소비자 행동"],
    summary:
      "고령 소비자는 병원을 어떻게 고를까? 지역 내 의료 서비스 경쟁 구도 속에서 고령층의 선택이 어떤 의미를 갖는지 살펴본, 고령화 시대에 맞닿아 있는 연구.",
    tier: null,
  },
  {
    id: "ssci-2023-01",
    authors: ["Yeolib Kim", "Seung Hyun Kim", "Robert A. Peterson", "Jeonghye Choi"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    title: "Privacy Concern and Information Technology: A Meta-analysis",
    journal: "Technological Forecasting and Social Change",
    year: 2023,
    keywords: ["프라이버시·정책", "데이터분석·AI"],
    summary:
      "'내 정보가 새면 어쩌지'라는 불안은 기술 사용을 얼마나 막을까? 프라이버시 우려와 정보기술 수용에 관한 수많은 선행 연구를 메타분석으로 종합해 큰 그림을 그린 연구.",
    tier: null,
  },
  {
    id: "ssci-2023-02",
    authors: ["Joonho Bae", "Jinkyoo Park", "Seung Bum Soh", "Jeonghye Choi"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "A Recommendation System with Dynamic Preferences: Its Application in the Mobile Game Industry",
    journal: "Journal of Business Research",
    year: 2023,
    keywords: ["게임", "데이터분석·AI", "모바일·앱"],
    summary:
      "사람의 취향은 고정된 것이 아니라 계속 변한다. 시시각각 변하는 선호를 반영하는 추천 시스템을 설계하고, 이를 모바일 게임 산업에 실제로 적용해 본 연구.",
    tier: null,
  },
  {
    id: "ssci-2022-01",
    authors: ["Sanghwa Kim", "Jeonghye Choi", "Seung Hyun Kim"],
    studentIds: ["kim-sanghwa"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Do Handwritten Notes Benefit Online Retailers? A Field Experiment",
    journal: "Journal of Interactive Marketing",
    year: 2022,
    keywords: ["온라인 리테일·이커머스", "소비자 행동", "광고·프로모션"],
    summary:
      "택배 상자 속 손글씨 메모 한 장, 정말 효과가 있을까? 온라인 쇼핑몰이 보내는 손편지가 고객 반응에 미치는 영향을 실제 현장실험으로 검증한 연구.",
    tier: null,
  },
  {
    id: "ssci-2022-02",
    authors: ["Yiling Li", "Hye-jin Kim", "Boram Do", "Jeonghye Choi"],
    studentIds: ["li-yiling"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "The Effect of Emotion in Thumbnails and Titles of Video Clips on Pre-roll Advertising Effectiveness",
    journal: "Journal of Business Research",
    year: 2022,
    keywords: ["OTT·미디어", "광고·프로모션", "데이터분석·AI"],
    summary:
      "영상 썸네일과 제목에 담긴 감정이 그 앞에 붙는 광고의 운명을 바꾼다? 시청 전 광고(프리롤)의 효과가 콘텐츠의 감정 톤에 따라 어떻게 달라지는지 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2022-03",
    authors: ["Jae Yeon Yoon", "Chaehyeon Lee", "Jeonghye Choi", "Sue Ryung Chang", "Jikyung (Jeanne) Kim"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    title: "The Effect of Social Media Apps on Shopping Apps",
    journal: "Journal of Business Research",
    year: 2022,
    keywords: ["소셜미디어", "모바일·앱", "온라인 리테일·이커머스"],
    summary:
      "인스타그램을 오래 보면 쇼핑 앱도 더 열게 될까? 스마트폰 안에서 소셜미디어 앱 사용이 쇼핑 앱 사용으로 이어지는 연결 고리를 데이터로 추적한 연구.",
    tier: null,
  },
  {
    id: "ssci-2022-04",
    authors: ["Jikyung (Jeanne) Kim", "Hang Dong", "Jeonghye Choi", "Sue Ryung Chang"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Sentiment Change and Negative Herding: Evidence from Microblogging and News",
    journal: "Journal of Business Research",
    year: 2022,
    keywords: ["소셜미디어", "데이터분석·AI", "소비자 행동"],
    summary:
      "나쁜 소식은 더 빨리, 더 크게 번진다. 트위터류 마이크로블로그와 뉴스 데이터를 분석해, 여론의 감정 변화와 '부정적 쏠림(herding)' 현상을 실증한 연구.",
    tier: null,
  },
  {
    id: "ssci-2022-05",
    title:
      "Opening up OTC Drug Market: Incumbent Firms' Performance and Responses to Market Deregulation",
    journal: "International Journal of Research in Marketing",
    year: 2022,
    keywords: ["헬스케어·제약", "프라이버시·정책"],
    summary:
      "약국 밖(편의점 등)에서도 상비약을 팔 수 있게 되면 기존 제약·유통 기업들은 어떻게 될까? 일반의약품(OTC) 시장 규제 완화가 기존 기업의 성과와 대응 전략에 미친 영향을 분석한 연구.",
    tier: "top",
  },
  {
    id: "ssci-2021-01",
    title:
      "Understanding Digital Consumers' Well-being in Asia: The Moderating Roles of Digital Natives and Privacy Concern",
    journal: "Journal of Consumer Affairs",
    year: 2021,
    keywords: ["프라이버시·정책", "소비자 행동"],
    summary:
      "디지털 세상에서 사는 것이 우리를 더 행복하게 할까? 아시아 소비자를 대상으로, 디지털 네이티브 여부와 프라이버시 우려가 디지털 웰빙에 어떤 역할을 하는지 살펴본 연구.",
    tier: null,
  },
  {
    id: "ssci-2021-02",
    authors: ["Jikyung (Jeanne) Kim", "Hyeasinn Song", "Jeonghye Choi", "Yongsup Kim", "Junghan Hong"],
    studentIds: ["song-hyeasinn"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Channel Stickiness in the Shopping Journey for Electronic Goods: Evidence from China and South Korea",
    journal: "Journal of Business Research",
    year: 2021,
    keywords: ["옴니채널(온-오프라인)", "소비자 행동", "온라인 리테일·이커머스"],
    summary:
      "가전제품을 살 때 한 번 이용한 채널(온라인/매장)을 계속 고집하게 될까? 한국과 중국 소비자 데이터를 비교하며 쇼핑 여정에서 나타나는 '채널 접착성'을 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2021-03",
    authors: ["Yeo Lim Yoon", "Yeohong Yoon", "Hyoryung Nam", "Jeonghye Choi"],
    studentIds: ["yoon-yeolim", "yoon-yeohong"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Buyer-Supplier Matching in Online B2B Marketplace: An Empirical Study of Small- and Medium-Sized Enterprises (SMEs)",
    journal: "Industrial Marketing Management",
    year: 2021,
    keywords: ["플랫폼·B2B", "데이터분석·AI"],
    summary:
      "중소기업은 온라인 B2B 장터에서 어떻게 거래 상대를 만날까? 온라인 B2B 마켓플레이스에서 구매기업과 공급기업이 짝을 이루는 매칭 과정을 실증 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2021-04",
    authors: ["Wooyong Jo", "Jikyung (Jeanne) Kim", "Jeonghye Choi"],
    studentIds: ["jo-wooyong"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Who Are the Multichannel Shoppers and How Can Retailers Use Them? Evidence from the French Apparel Industry",
    journal: "Asia Pacific Journal of Marketing and Logistics",
    year: 2021,
    keywords: ["옴니채널(온-오프라인)", "온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "매장과 온라인을 넘나들며 쇼핑하는 사람들은 누구일까? 프랑스 패션 산업 데이터를 바탕으로 멀티채널 쇼퍼의 특성과, 리테일러가 이들을 어떻게 활용할 수 있는지 살펴본 연구.",
    tier: null,
  },

  // ---------- 2016–2020 ----------
  {
    id: "ssci-2020-01",
    authors: ["Jikyung (Jeanne) Kim", "Sanghwa Kim", "Jeonghye Choi"],
    studentIds: ["kim-sanghwa"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Purchase Now and Consume Later: Do Online and Offline Environments Drive Online Social Interactions and Sales?",
    journal: "Journal of Business Research",
    year: 2020,
    keywords: ["옴니채널(온-오프라인)", "소셜미디어", "온라인 리테일·이커머스"],
    summary:
      "지금 사고 나중에 즐기는 상품(공연 티켓 등)은 온·오프라인 환경의 영향을 함께 받는다. 온라인과 오프라인 환경이 온라인상의 사회적 상호작용과 매출을 어떻게 이끄는지 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2020-02",
    authors: ["Yan Jiang", "J. Kim", "Jeonghye Choi", "M. Y. Kang"],
    studentIds: ["jiang-yan"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "From Clicks to Bricks: The Impact of Product Launches in Offline Stores for Digital Retailers",
    journal: "Journal of Business Research",
    year: 2020,
    keywords: ["옴니채널(온-오프라인)", "온라인 리테일·이커머스"],
    summary:
      "온라인에서 시작한 브랜드가 오프라인 매장을 여는 이유가 있다. 디지털 리테일러가 오프라인 매장에서 신제품을 선보일 때 어떤 효과가 생기는지 분석한, '클릭에서 벽돌로' 연구.",
    tier: null,
  },
  {
    id: "ssci-2020-03",
    authors: ["Wooyong Jo", "Sarang Sunder", "Jeonghye Choi", "et al."],
    studentIds: ["jo-wooyong"],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "Protecting Consumers from Themselves: Assessing Consequences of Usage Restriction Laws on Online Game Usage and Spending",
    journal: "Marketing Science",
    year: 2020,
    keywords: ["게임", "프라이버시·정책", "소비자 행동"],
    summary:
      "'게임 셧다운제' 같은 이용 제한 규제는 정말 효과가 있을까? 게임 이용 제한 법이 실제 이용 시간과 지출에 가져온 결과를 데이터로 평가해, 규제 정책 논의에 근거를 더한 연구.",
    tier: "top",
  },
  {
    id: "ssci-2019-01",
    authors: ["Yeohong Yoon", "Alex Jiyoung Kim", "Jeeyeon Kim", "Jeonghye Choi"],
    studentIds: ["yoon-yeohong", "kim-jeeyeon"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1080/02650487.2018.1541391",
    title:
      "The Effects of eWOM Characteristics on Consumer Ratings: Evidence from TripAdvisor.com",
    journal: "International Journal of Advertising",
    year: 2019,
    keywords: ["소셜미디어", "소비자 행동", "데이터분석·AI"],
    summary:
      "먼저 달린 리뷰가 다음 사람의 별점을 바꾼다? 트립어드바이저의 리뷰 데이터를 분석해, 온라인 입소문(eWOM)의 특성이 소비자 평점에 미치는 영향을 살펴본 연구.",
    tier: null,
  },
  {
    id: "ssci-2019-02",
    title:
      "The Effect of Celebrity Endorsement on Sustainable Firm Value: Evidence from the Korean Telecommunication Industry",
    journal: "International Journal of Advertising",
    year: 2019,
    keywords: ["광고·프로모션"],
    summary:
      "유명인 광고 모델은 기업 가치까지 끌어올릴까? 한국 통신 산업 사례를 통해 셀러브리티 광고가 기업의 지속가능한 가치에 미치는 효과를 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2019-03",
    title:
      "Offline Social Interactions and Online Shopping Demand: Does the Degree of Social Interactions Matter?",
    journal: "Journal of Business Research",
    year: 2019,
    keywords: ["옴니채널(온-오프라인)", "소비자 행동", "온라인 리테일·이커머스"],
    summary:
      "이웃과의 왕래가 잦은 동네일수록 온라인 쇼핑도 다를까? 오프라인에서의 사회적 교류 정도가 온라인 쇼핑 수요에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "ssci-2019-04",
    authors: ["Sang Jin Kim", "Kyung Hoon Kim", "Jeonghye Choi"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    title:
      "The Role of Design Innovation in Understanding Purchase Behavior of Augmented Products",
    journal: "Journal of Business Research",
    year: 2019,
    keywords: ["소비자 행동", "데이터분석·AI"],
    summary:
      "기능이 더해진 신제품, 소비자는 무엇을 보고 살까? 디자인 혁신이 증강 제품(기능이 확장된 제품)의 구매 행동을 이해하는 데 어떤 역할을 하는지 살펴본 연구.",
    tier: null,
  },
  {
    id: "ssci-2017-01",
    authors: ["Kamer Toker-Yildiz", "Minakshi Trivedi", "Jeonghye Choi", "Sue Ryung Chang"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1509/jmr.13.0482",
    title:
      "Social Interactions and Monetary Incentives in Driving Consumer Repeat Behavior",
    journal: "Journal of Marketing Research",
    year: 2017,
    keywords: ["소비자 행동", "광고·프로모션", "소셜미디어"],
    summary:
      "고객이 다시 찾아오게 만드는 힘은 '돈(할인·보상)'일까 '사람(주변의 영향)'일까? 사회적 상호작용과 금전적 인센티브가 소비자의 재구매 행동을 이끄는 방식을 비교 분석한 연구.",
    tier: "top",
  },
  {
    id: "ssci-2017-02",
    authors: ["Mingyung Kim", "Jeeyeon Kim", "Jeonghye Choi", "Minakshi Trivedi"],
    studentIds: ["kim-mingyung", "kim-jeeyeon"],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1016/j.intmar.2017.02.001",
    title:
      "Mobile Shopping through Applications: Understanding Application Possession and Mobile Purchase",
    journal: "Journal of Interactive Marketing",
    year: 2017,
    keywords: ["모바일·앱", "온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "쇼핑 앱을 깔았다고 다 사는 것은 아니다. 앱을 '보유'하는 단계와 실제 모바일 '구매'로 이어지는 단계를 구분해, 모바일 쇼핑 행동의 구조를 이해하려 한 연구.",
    tier: null,
  },
  {
    id: "ssci-2017-03",
    authors: ["Jungmin Son", "Jikyung (Jeanne) Kim", "Jeonghye Choi", "Mingyung Kim"],
    studentIds: ["kim-mingyung"],
    authorSource: "출판사 원문 (14차 확정표)",
    title: "Linking Online Niche Sales to Offline Brand Conditions",
    journal: "Journal of Business Research",
    year: 2017,
    keywords: ["옴니채널(온-오프라인)", "온라인 리테일·이커머스"],
    summary:
      "온라인에서 팔리는 틈새(니치) 상품의 성적표는 오프라인 브랜드 환경과 연결되어 있다. 오프라인에서의 브랜드 여건이 온라인 니치 상품 판매에 미치는 영향을 분석한 연구.",
    tier: null,
  },

  // ---------- 2010–2015 ----------
  {
    id: "ssci-2012-01",
    title: "Traditional and IS-Enabled Customer Acquisition on the Internet",
    journal: "Management Science",
    year: 2012,
    keywords: ["온라인 리테일·이커머스", "데이터분석·AI", "광고·프로모션"],
    summary:
      "인터넷에서 새 고객은 어떻게 얻어질까? 전통적 방식과 정보시스템(IS) 기반 방식의 고객 획득을 비교 분석해, 온라인 고객 확보 전략의 기초를 다진 연구.",
    tier: "top",
  },
  {
    id: "ssci-2012-02",
    title: "What Matters Most in Internet Retailing",
    journal: "MIT Sloan Management Review",
    year: 2012,
    keywords: ["온라인 리테일·이커머스"],
    summary:
      "인터넷 쇼핑 사업에서 정말 중요한 것은 무엇인가? 온라인 리테일 성공의 핵심 요인을 경영자의 눈높이에서 정리해, 실무에 직접 시사점을 준 연구.",
    tier: "top",
  },
  {
    id: "ssci-2011-01",
    authors: ["Jeonghye Choi", "David R. Bell"],
    studentIds: [],
    authorSource: "출판사 원문 (14차 확정표)",
    doi: "10.1509/jmkr.48.4.670",
    title: "Preference Minorities and the Internet",
    journal: "Journal of Marketing Research",
    year: 2011,
    keywords: ["온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "내 취향이 동네에서 '소수파'라면 인터넷이 더 소중해진다. 오프라인에서 원하는 상품을 구하기 어려운 '선호 소수자'일수록 온라인 쇼핑에 더 의존하게 된다는 것을 보여준 연구.",
    tier: "top",
  },
  {
    id: "ssci-2010-01",
    title:
      "Spatiotemporal Analysis of Imitation Behavior across New Buyers at an Online Grocery Retailer",
    journal: "Journal of Marketing Research",
    year: 2010,
    keywords: ["온라인 리테일·이커머스", "소비자 행동", "데이터분석·AI"],
    summary:
      "온라인 장보기도 이웃 따라 시작한다? 온라인 식료품몰의 신규 구매자들이 시간과 공간에 걸쳐 서로를 모방하며 퍼져나가는 패턴을 분석한 연구.",
    tier: "top",
  },
];

export const SSCI_PUBLICATIONS = _SSCI.map((p) => ({ ...p, type: "SSCI" }));

// ---------------------------------------------------------------
// KCI(국문) 논문
// TODO: KCI 논문 전체 목록 미확보(약 33/50편). 교수님 CV 확보 후 보완.
// 없는 논문을 지어내서 채우지 말 것 — 카운터는 "50+" 유지, 목록 하단에 안내 문구 표시.
export const KCI_COUNT_LABEL = "42";

const _KCI = [
  // ---------- 2026 ----------
  {
    id: "kci-2026-01",
    authors: ["이예령", "오가령", "최정혜"],
    studentIds: ["li-yiling", "wu-jialing"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    doi: "10.14329/isr.2026.28.1.417",
    title:
      "인플루언서 커뮤니케이션이 소비자의 구매 전환에 미치는 영향: 제품 유형과 지역 특성의 조절효과",
    journal: "경영정보학연구",
    year: 2026,
    keywords: ["소셜미디어", "광고·프로모션", "소비자 행동"],
    summary:
      "인플루언서의 말 한마디는 정말 구매로 이어질까? 인플루언서 커뮤니케이션이 구매 전환에 미치는 효과가 제품 유형과 지역 특성에 따라 어떻게 달라지는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2026-02",
    title:
      "상권 내 유통 채널 경쟁이 PB 판매 성과에 미치는 영향: 편의점–프랜차이즈 슈퍼마켓을 중심으로",
    journal: "프랜차이징저널",
    year: 2026,
    keywords: ["유통·프랜차이즈", "옴니채널(온-오프라인)"],
    summary:
      "동네 편의점과 슈퍼마켓이 경쟁하면 자체 브랜드(PB) 상품은 더 팔릴까? 상권 안 유통 채널 간 경쟁 구도가 PB 판매 성과에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2026-03",
    title: "프랜차이즈 가맹 본부의 위기가 포트폴리오 성과에 미치는 영향 분석",
    journal: "프랜차이징저널",
    year: 2026,
    keywords: ["유통·프랜차이즈"],
    summary:
      "가맹 본부에 위기가 터지면 그 본부가 운영하는 여러 브랜드는 어떻게 될까? 프랜차이즈 본부의 위기가 브랜드 포트폴리오 전체의 성과에 미치는 파급을 분석한 연구.",
    tier: null,
  },

  // ---------- 2025 ----------
  {
    id: "kci-2025-01",
    title: "음식 배달 앱 수용에 대한 사회적 영향력 분석",
    journal: "마케팅관리연구",
    year: 2025,
    keywords: ["모바일·앱", "소비자 행동"],
    summary:
      "배달 앱을 처음 깔게 만드는 힘은 어디서 올까? 주변 사람들의 이용이라는 사회적 영향력이 음식 배달 앱 수용에 어떤 역할을 하는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2025-02",
    title: "메타버스 마케팅과 소비자의 브랜드 참여: 럭셔리 패션 브랜드를 중심으로",
    journal: "서비스마케팅저널",
    year: 2025,
    keywords: ["소비자 행동", "광고·프로모션"],
    summary:
      "명품 브랜드는 왜 메타버스에 매장을 열까? 가상 공간에서의 마케팅이 럭셔리 패션 브랜드에 대한 소비자의 참여를 어떻게 끌어올리는지 살펴본 연구.",
    tier: null,
  },

  // ---------- 2024 ----------
  {
    id: "kci-2024-01",
    authors: ["김혜정", "최정혜", "박창희", "김지연"],
    studentIds: ["kim-hyejeong", "kim-jeeyeon"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "가상 인플루언서의 얼굴 특성이 소셜 미디어 이용자 반응에 미치는 영향",
    journal: "한국콘텐츠학회논문지",
    year: 2024,
    keywords: ["소셜미디어", "데이터분석·AI"],
    summary:
      "사람이 아닌 가상 인플루언서, 어떤 얼굴이어야 통할까? 가상 인플루언서의 얼굴 특성이 소셜미디어 이용자의 반응에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2024-02",
    authors: ["김혜정", "황인서", "최정혜"],
    studentIds: ["kim-hyejeong", "hwang-inseo"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "감염병 확산 상황에서 지역별 헬스장 폐업: 위험요인노출과 보상소비지출의 차별적 영향",
    journal: "마케팅관리연구",
    year: 2024,
    keywords: ["헬스케어·제약", "소비자 행동", "프라이버시·정책"],
    summary:
      "팬데믹 때 어떤 동네의 헬스장이 더 많이 문을 닫았을까? 감염 위험 노출과 보복소비 성격의 지출이 지역별 헬스장 폐업에 서로 다른 영향을 준다는 것을 보여준 연구.",
    tier: null,
  },

  // ---------- 2023 ----------
  {
    id: "kci-2023-01",
    authors: ["김우경", "Li Yiling", "최정혜"],
    studentIds: ["kim-wookyoung", "li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "스포츠 구단의 경기 실적 및 소셜미디어 운영이 팬덤의 인게이지먼트에 미치는 영향: 팬 토큰의 조절 효과를 중심으로",
    journal: "지식경영연구",
    year: 2023,
    keywords: ["소셜미디어", "소비자 행동", "데이터분석·AI"],
    summary:
      "팬심은 성적순일까, 소통순일까? 구단의 경기 실적과 소셜미디어 운영이 팬덤 참여에 미치는 영향과, 팬 토큰이 그 관계를 어떻게 바꾸는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2023-02",
    authors: ["정현우", "최정혜"],
    studentIds: ["jung-hyunwoo"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "Does Proximity Really Matters? Unveiling the Role of Industrial Similarity with Machine Learning",
    journal: "마케팅관리연구",
    year: 2023,
    keywords: ["데이터분석·AI", "플랫폼·B2B"],
    summary:
      "기업 간 거리가 가까우면 정말 유리할까? 머신러닝으로 산업 간 유사성의 역할을 파헤쳐, 물리적 근접성에 대한 통념을 다시 살펴본 연구.",
    tier: null,
  },
  {
    id: "kci-2023-03",
    authors: ["황인서", "Li Yiling", "최정혜"],
    studentIds: ["hwang-inseo", "li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "소비자의 신뢰도 향상을 위한 제품 전략의 구전 효과: 온라인 식품 유통 플랫폼을 중심으로",
    journal: "유통연구",
    year: 2023,
    keywords: ["온라인 리테일·이커머스", "소셜미디어", "소비자 행동"],
    summary:
      "온라인에서 처음 보는 식품, 뭘 믿고 살까? 신뢰를 높이는 제품 전략이 온라인 식품 플랫폼에서 입소문(구전)으로 이어지는 효과를 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2023-04",
    authors: ["김지연", "Li Yiling", "최정혜"],
    studentIds: ["kim-jeeyeon", "li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "Understanding of the Continuance Intention to Use Chatbot Services",
    journal: "Asia Marketing Journal",
    year: 2023,
    keywords: ["데이터분석·AI", "모바일·앱", "소비자 행동"],
    summary:
      "챗봇을 한 번 써본 사람이 계속 쓰게 만드는 것은 무엇일까? 챗봇 서비스를 계속 이용하려는 의도(지속 사용 의도)를 결정하는 요인을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2023-05",
    authors: ["Li Yiling", "김우경", "최정혜"],
    studentIds: ["li-yiling", "kim-wookyoung"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "신규 애플리케이션 출시가 기존 시장 생태계에 미치는 영향: 디지털 헬스케어 사례를 중심으로",
    journal: "한국경영과학회지",
    year: 2023,
    keywords: ["모바일·앱", "헬스케어·제약", "플랫폼·B2B"],
    summary:
      "새 앱 하나가 시장 전체를 흔들 수 있을까? 디지털 헬스케어 분야에서 신규 앱 출시가 기존 앱 생태계에 가져오는 변화를 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2023-06",
    authors: ["Li Yiling", "최정혜"],
    studentIds: ["li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "동영상 콘텐츠의 장르, 시청자의 디지털 네이티브 특성 및 디지털 미디어의 속성이 사전광고 회피에 미치는 영향",
    journal: "광고학연구",
    year: 2023,
    keywords: ["OTT·미디어", "광고·프로모션"],
    summary:
      "'광고 건너뛰기'를 누르는 손가락은 무엇에 좌우될까? 영상 장르, 시청자의 디지털 네이티브 성향, 미디어 속성이 시청 전 광고 회피에 미치는 영향을 분석한 연구.",
    tier: null,
  },

  // ---------- 2022 ----------
  {
    id: "kci-2022-01",
    authors: ["김규리", "최정혜", "박경민"],
    studentIds: [],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "숏폼 브랜디드 콘텐츠 노출 유형이 소비자 반응에 미치는 영향: 인지된 소속감의 매개 효과를 중심으로",
    journal: "한국콘텐츠학회논문지",
    year: 2022,
    keywords: ["소셜미디어", "광고·프로모션", "소비자 행동"],
    summary:
      "짧은 영상 속 브랜드 콘텐츠, 어떻게 보여줘야 통할까? 숏폼 브랜디드 콘텐츠의 노출 방식이 소비자 반응으로 이어지는 과정에서 '소속감'이 다리 역할을 한다는 것을 보여준 연구.",
    tier: null,
  },
  {
    id: "kci-2022-02",
    authors: ["김혜정", "Li Yiling", "최정혜"],
    studentIds: ["kim-hyejeong", "li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "뉴스 홍보가 시청자 온라인 구전에 미치는 영향: 웹툰의 드라마화를 중심으로",
    journal: "한국콘텐츠학회논문지",
    year: 2022,
    keywords: ["OTT·미디어", "소셜미디어"],
    summary:
      "웹툰이 드라마가 될 때 뉴스 기사는 얼마나 힘이 될까? 웹툰 원작 드라마의 뉴스 홍보가 시청자들의 온라인 입소문에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2022-03",
    authors: ["정현우", "Li Yiling", "최정혜"],
    studentIds: ["jung-hyunwoo", "li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "The Effect of Lockdown Repeal on Socialization: Bayesian Multilevel Difference-in-Differences Approach",
    journal: "Asia Marketing Journal",
    year: 2022,
    keywords: ["프라이버시·정책", "데이터분석·AI", "소비자 행동"],
    summary:
      "봉쇄가 풀리면 사람들은 바로 다시 어울릴까? 베이지안 다층 이중차분 기법으로 봉쇄 해제가 사람들의 사회 활동에 가져온 변화를 정밀하게 측정한 연구.",
    tier: null,
  },
  {
    id: "kci-2022-04",
    authors: ["정현우", "곽유신", "최정혜"],
    studentIds: ["jung-hyunwoo", "kwak-yushin"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "간편결제 수용이 사용자의 쇼핑앱 사용에 미치는 영향: 카카오페이와 카카오선물하기의 사례를 중심으로",
    journal: "한국경영과학회지",
    year: 2022,
    keywords: ["모바일·앱", "온라인 리테일·이커머스"],
    summary:
      "결제가 쉬워지면 쇼핑도 늘어날까? 카카오페이·카카오선물하기 사례로 간편결제 수용이 쇼핑 앱 사용에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2022-05",
    authors: ["김혜정", "황승엽", "곽유신", "최정혜"],
    studentIds: ["kim-hyejeong", "kwak-yushin"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "온라인 커뮤니티 이용자 참여 증진을 위한 관리자의 운영 전략: 대학별 대나무숲 분석을 중심으로",
    journal: "지식경영연구",
    year: 2022,
    keywords: ["소셜미디어", "플랫폼·B2B"],
    summary:
      "커뮤니티가 살아나려면 관리자는 무엇을 해야 할까? 대학 '대나무숲' 커뮤니티들을 분석해 이용자 참여를 끌어올리는 운영 전략을 도출한 연구.",
    tier: null,
  },
  {
    id: "kci-2022-06",
    authors: ["Li Yiling", "도보람", "장수령", "최정혜"],
    studentIds: ["li-yiling"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "동영상 플랫폼상의 식품 광고 타겟팅의 효과: PC와 모바일 비교를 중심으로",
    journal: "유통연구",
    year: 2022,
    keywords: ["광고·프로모션", "OTT·미디어", "모바일·앱"],
    summary:
      "같은 광고도 PC와 스마트폰에서 효과가 다를까? 동영상 플랫폼의 식품 광고 타겟팅 효과를 기기별로 비교 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2022-07",
    title:
      "Who Considers Leaving a Job in a Pandemic?: Determinants of Online Job Search Behavior in COVID-19",
    journal: "전문경영인연구",
    year: 2022,
    keywords: ["데이터분석·AI", "소비자 행동"],
    summary:
      "팬데믹 속에서 누가 이직을 고민했을까? 코로나19 시기의 온라인 구직 행동 데이터를 통해 이직 탐색을 결정하는 요인을 분석한 연구.",
    tier: null,
  },

  // ---------- 2021 ----------
  {
    id: "kci-2021-01",
    authors: ["한수현", "장정화", "장수령", "최정혜"],
    studentIds: [],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "소셜미디어와 소비자 구매 결정과의 관계: 서울 공유 자전거에 대한 시계열 분석을 중심으로",
    journal: "지식경영연구",
    year: 2021,
    keywords: ["소셜미디어", "데이터분석·AI"],
    summary:
      "SNS에서 화제가 되면 실제 이용도 늘어날까? 서울 공유 자전거(따릉이) 시계열 데이터를 통해 소셜미디어와 소비자의 이용 결정 사이의 관계를 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2021-02",
    authors: ["도보람", "윤여림", "김태년", "최정혜"],
    studentIds: ["yoon-yeolim"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "코로나19 상황에서 직무만족도와 모바일 생산활동: 결정요인 연구",
    journal: "지식경영연구",
    year: 2021,
    keywords: ["모바일·앱", "데이터분석·AI"],
    summary:
      "재택과 거리두기의 시대, 일의 만족도는 무엇이 좌우했을까? 코로나19 상황에서 직무만족도와 모바일 기반 생산활동의 결정요인을 분석한 연구.",
    tier: null,
  },

  // ---------- 2020 ----------
  {
    id: "kci-2020-01",
    authors: ["장성현", "임수빈", "최정혜"],
    studentIds: [],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "크래프트 브루어리의 스타트업 전략: 어메이징 브루잉 컴퍼니의 사례를 중심으로",
    journal: "연세경영연구",
    year: 2020,
    keywords: ["유통·프랜차이즈"],
    summary:
      "작은 수제맥주 회사는 어떻게 시장을 뚫었을까? 어메이징 브루잉 컴퍼니 사례를 통해 크래프트 브루어리 스타트업의 성장 전략을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2020-02",
    authors: ["Li Yiling", "김상화", "김무전", "최정혜"],
    studentIds: ["li-yiling", "kim-sanghwa"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "건강식품 구매에 제품 네이밍과 고객의 제품 경험, 기업의 제품 판촉이 미치는 영향",
    journal: "유통연구",
    year: 2020,
    keywords: ["헬스케어·제약", "광고·프로모션", "소비자 행동"],
    summary:
      "건강식품은 이름이 절반일까? 제품 이름 짓기(네이밍), 고객의 사용 경험, 기업의 판촉 활동이 건강식품 구매에 각각 어떤 영향을 주는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2020-03",
    title: "날씨불쾌감과 쇼핑선호도가 소매점 선택에 미치는 영향",
    journal: "유통연구",
    year: 2020,
    keywords: ["유통·프랜차이즈", "소비자 행동"],
    summary:
      "덥고 습한 날엔 어디로 장 보러 갈까? 날씨가 주는 불쾌감과 개인의 쇼핑 선호가 어떤 소매점을 고르게 만드는지 분석한 연구.",
    tier: null,
  },

  // ---------- 2018 ----------
  {
    id: "kci-2018-01",
    authors: ["Jiang Yan", "김상화", "조우용", "최정혜"],
    studentIds: ["jiang-yan", "kim-sanghwa", "jo-wooyong"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title:
      "럭셔리 브랜드의 판매 성과와 제품, 고객, 구색의 영향: 매장 유형의 조절 효과를 중심으로",
    journal: "유통연구",
    year: 2018,
    keywords: ["유통·프랜차이즈", "소비자 행동"],
    summary:
      "같은 명품도 어떤 매장에서 파느냐에 따라 성적이 다르다? 제품·고객·상품 구색이 럭셔리 브랜드 판매에 미치는 영향이 매장 유형에 따라 달라진다는 것을 보여준 연구.",
    tier: null,
  },

  // ---------- 2016 ----------
  {
    id: "kci-2016-01",
    authors: ["김지연", "조우용", "최정혜", "정예림"],
    studentIds: ["kim-jeeyeon", "jo-wooyong"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "온라인상의 기업 및 소비자 텍스트 분석과 이를 활용한 온라인 매출 증진 전략",
    journal: "한국경영과학회지",
    year: 2016,
    keywords: ["데이터분석·AI", "온라인 리테일·이커머스"],
    summary:
      "기업이 쓰는 글과 소비자가 남기는 글, 그 속에 매출의 힌트가 있다. 온라인 텍스트 데이터를 분석해 매출을 끌어올리는 전략을 도출한 연구.",
    tier: null,
  },
  {
    id: "kci-2016-02",
    authors: ["김상화", "김지연", "최정혜", "정예림"],
    studentIds: ["kim-sanghwa", "kim-jeeyeon"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "B2B 기업의 마케팅 활동과 고객의 시장 환경이 매출 성과에 미치는 영향",
    journal: "한국경영과학회지",
    year: 2016,
    keywords: ["플랫폼·B2B", "데이터분석·AI"],
    summary:
      "기업 간 거래(B2B)에서도 마케팅이 통할까? B2B 기업의 마케팅 활동과 고객사가 처한 시장 환경이 매출 성과에 미치는 영향을 분석한 연구.",
    tier: null,
  },

  // ---------- 2015 ----------
  {
    id: "kci-2015-01",
    authors: ["손정민", "김민경", "최정혜"],
    studentIds: ["kim-mingyung"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "오프라인 환경 변화가 틈새 제품의 온라인 수요에 미치는 영향",
    journal: "마케팅연구",
    year: 2015,
    keywords: ["옴니채널(온-오프라인)", "온라인 리테일·이커머스"],
    summary:
      "동네 가게가 사라지면 온라인에서 틈새 상품이 더 팔릴까? 오프라인 환경의 변화가 틈새(니치) 제품의 온라인 수요에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2015-02",
    authors: ["최정혜", "정예림", "김민경", "조우용"],
    studentIds: ["kim-mingyung", "jo-wooyong"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    title: "모바일 VOD 콘텐츠 구매 요인에 관한 실증 연구",
    journal: "지식경영연구",
    year: 2015,
    keywords: ["모바일·앱", "OTT·미디어"],
    summary:
      "스마트폰으로 영상을 '구매'하게 만드는 것은 무엇일까? 모바일 VOD 콘텐츠 구매를 이끄는 요인을 실제 데이터로 검증한 연구.",
    tier: null,
  },

  // ---------- 2014 ----------
  {
    id: "kci-2014-01",
    title: "소셜미디어 연구동향 분석: 사회과학 분야를 중심으로",
    journal: "정보통신정책연구",
    year: 2014,
    keywords: ["소셜미디어", "데이터분석·AI"],
    summary:
      "소셜미디어 연구는 어디까지 왔을까? 사회과학 분야의 소셜미디어 연구들을 모아 흐름과 공백을 정리한 연구동향 분석.",
    tier: null,
  },
  {
    id: "kci-2014-02",
    title: "인터넷 포탈에 대한 자원 의존성이 온라인 쇼핑몰기업의 성장에 미치는 영향",
    journal: "한국경영과학회지",
    year: 2014,
    keywords: ["온라인 리테일·이커머스", "플랫폼·B2B"],
    summary:
      "포털에 기대는 쇼핑몰은 얼마나 클 수 있을까? 인터넷 포털에 대한 자원 의존이 온라인 쇼핑몰 기업의 성장에 미치는 영향을 분석한 연구.",
    tier: null,
  },

  // ---------- 10차 추가분 (연도별) ----------
  {
    id: "kci-2026-04",
    authors: ["황인서", "김정현", "최정혜"],
    studentIds: ["hwang-inseo", "kim-junghyun"],
    authorSource: "KCI 포털 원문 (14차 확정표)",
    doi: "10.37202/KMMR.2026.31.2.75",
    title:
      "리셀 시장 내 재활용 소재 활용 제품의 가격 프리미엄 형성: 아식스(Asics) 브랜드를 중심으로",
    journal: "마케팅관리연구",
    year: 2026,
    keywords: ["온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "재활용 소재로 만든 운동화는 리셀 시장에서 더 비싸게 팔릴까? 아식스 사례로 친환경 소재 제품의 가격 프리미엄이 어떻게 형성되는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2023-07",
    authors: ["김태년", "윤여림", "최정혜", "도보람"],
    studentIds: ["yoon-yeolim"],
    authorSource: "공저자 공식 프로필(도보람 교수 페이지) (14차 확정표)",
    title: "직장 내 스트레스원과 긍정 정서에 대한 모바일 앱 사용의 조절 효과 연구",
    journal: "한국콘텐츠학회논문지",
    // TODO: 발행연도 확인(2022 vs 2023) — 학교 페이지는 2023, 공저자(도보람 교수) 공식 페이지는 2022 22(1)
    year: 2023,
    keywords: ["모바일·앱", "소비자 행동"],
    summary:
      "직장 스트레스가 쌓일 때 스마트폰 앱은 독일까 약일까? 직장 내 스트레스 요인과 긍정 정서 사이에서 모바일 앱 사용이 어떤 조절 역할을 하는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2016-03",
    title:
      "온라인 게임 규제와 청소년의 시선: 규제 대상자들의 반발심과 또래문화를 중심으로",
    journal: "한국콘텐츠학회논문지",
    year: 2016,
    keywords: ["게임", "프라이버시·정책"],
    summary:
      "게임 규제를 정작 청소년들은 어떻게 바라볼까? 규제 대상인 청소년들의 반발심과 또래문화를 중심으로, 온라인 게임 규제를 당사자의 시선에서 살펴본 연구.",
    tier: null,
  },
  {
    id: "kci-2016-04",
    title: "지역 특수성에 따른 오프라인·온라인 채널 성과의 이해",
    journal: "지식경영연구",
    year: 2016,
    keywords: ["옴니채널(온-오프라인)", "데이터분석·AI"],
    summary:
      "같은 브랜드라도 지역마다 온·오프라인 성적이 다르다. 지역의 특수성이 오프라인과 온라인 채널의 성과에 어떤 차이를 만드는지 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2016-05",
    title: "매장 내·외부 환경과 지역 시장 환경이 매장 성과에 미치는 영향",
    journal: "유통연구",
    year: 2016,
    keywords: ["유통·프랜차이즈"],
    summary:
      "장사가 잘되는 매장은 무엇이 다를까? 매장 안팎의 환경과 그 매장이 속한 지역 시장 환경이 매장 성과에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2016-06",
    title:
      "게임 머니와 캐시 머니 소비에 관한 실증 연구: 경험, 성취, 지역적 격차를 중심으로",
    journal: "한국콘텐츠학회논문지",
    year: 2016,
    keywords: ["게임", "소비자 행동"],
    summary:
      "게임 속 화폐와 현금 결제, 사람들은 언제 무엇을 쓸까? 게임 머니와 캐시 머니 소비를 경험·성취·지역 격차의 관점에서 실증 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2015-03",
    title: "소비자의 지역 이주가 온라인 브랜드 선호변화차이에 미치는 영향",
    journal: "경영학연구",
    year: 2015,
    keywords: ["온라인 리테일·이커머스", "소비자 행동"],
    summary:
      "이사를 가면 온라인에서 사는 브랜드도 바뀔까? 소비자의 지역 이주가 온라인 브랜드 선호의 변화에 미치는 영향을 분석한 연구.",
    tier: null,
  },
  {
    id: "kci-2015-04",
    title:
      "오프라인과 온라인 채널상의 기존제품과 신제품의 판매 성과: 경험재에 대한 시계열 분석을 중심으로",
    journal: "지식경영연구",
    year: 2015,
    keywords: ["옴니채널(온-오프라인)", "데이터분석·AI"],
    summary:
      "신제품과 기존제품은 파는 곳(온라인/오프라인)에 따라 성적이 달라진다. 경험재의 시계열 데이터를 분석해 채널별 판매 성과의 차이를 살펴본 연구.",
    tier: null,
  },
  {
    id: "kci-2014-03",
    title: "온라인 게임의 고객 유형별 이탈 요인: 신규 고객과 기존 고객을 중심으로",
    journal: "한국경영과학회지",
    year: 2014,
    keywords: ["게임", "데이터분석·AI", "소비자 행동"],
    summary:
      "게임을 떠나는 이유는 새 유저와 오래된 유저가 다르다. 온라인 게임에서 고객 유형별로 이탈을 부르는 요인을 분석한 연구.",
    tier: null,
  },

  // ---------- 2013 ----------
  {
    id: "kci-2013-01",
    title:
      "이용자 생산 콘텐츠 플랫폼 사이트 내에서 생산자 참여가 소비자 선택과 몰입에 미치는 차별적 영향",
    journal: "경영학연구",
    year: 2013,
    keywords: ["플랫폼·B2B", "소셜미디어", "소비자 행동"],
    summary:
      "창작자가 활발히 움직이는 플랫폼은 무엇이 다를까? 이용자 생산 콘텐츠(UGC) 플랫폼에서 생산자의 참여가 소비자의 선택과 몰입에 서로 다른 영향을 준다는 것을 보여준 연구.",
    tier: null,
  },
];

export const KCI_PUBLICATIONS = _KCI
  .map((p) => ({ ...p, type: "KCI" }))
  .sort((a, b) => b.year - a.year);

// SSCI + KCI 통합 목록 — 논문 섹션의 전체/키워드/저널 필터가 이 목록을 사용
export const ALL_PUBLICATIONS = [...SSCI_PUBLICATIONS, ...KCI_PUBLICATIONS];

// ---------------------------------------------------------------
// 학생별 실적 — 논문의 studentIds(명시적 id 매핑)로만 계산. 이름 문자열 추론 절대 금지.
// authors/studentIds가 없는 논문은 저자 미확인 → 어떤 학생에게도 연결하지 않음.
// TODO: 저자 미확인 논문(authors 필드 없는 항목)은 확인 후 authors/studentIds 추가.
export function worksForStudent(studentId) {
  const papers = ALL_PUBLICATIONS.filter((p) => p.studentIds?.includes(studentId)).map((p) => ({
    year: p.year,
    type: p.type,
    title: p.title,
    journal: p.journal,
    top: p.tier === "top",
  }));
  const books = BOOKS.filter((b) => b.studentIds?.includes(studentId)).map((b) => ({
    year: b.year,
    type: "BOOK",
    title: b.title,
    journal: b.publisher,
    top: false,
  }));
  return [...papers, ...books].sort((a, b) => b.year - a.year);
}

// 논문 원문 링크 — DOI가 있으면 doi.org, 없으면 검색 폴백 (DOI 추측 생성 금지)
// KCI 논문은 KCI 포털 검색, SSCI 논문은 Google Scholar 검색으로 폴백
export function paperUrl(p) {
  if (p.doi) return `https://doi.org/${p.doi}`;
  if (p.type === "KCI")
    return `https://www.kci.go.kr/kciportal/po/search/poSereArtiSearList.kci?searchQuery=${encodeURIComponent(p.title)}`;
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${p.title}" Jeonghye Choi`)}`;
}

// ---------------------------------------------------------------
// 저서 및 역서 (서지 정보 확정 완료)
// badge: 카드에 표시할 특별 뱃지 (예: 제자 공저)
export const BOOKS = [
  {
    id: "book-2020",
    title: "비대면 시대 바르고 건강하게 살기: '빠른'을 넘어 '바른' ICT로",
    role: "김범수·김승현·김재엽·도보람·박경기·양희동·오주현·장대연·장재영·최강식·최정혜·한치훈·한영애 공저",
    publisher: "한국학술정보",
    year: 2020,
  },
  {
    id: "book-2016",
    title: "자동차 자율주행 규제 완화 고용영향평가 연구",
    role: "박경민·최정혜·김태완·김주만, 고용영향평가 연구시리즈",
    publisher: "한국노동연구원",
    year: 2016,
  },
  {
    id: "book-2015",
    authors: ["최정혜", "김지연", "김민경"],
    studentIds: ["kim-jeeyeon", "kim-mingyung"],
    authorSource: "출판사 서지 (14차 확정표)",
    title: "기술혁신에 따른 지역간 정보격차",
    role: "최정혜·김지연·김민경 공저",
    publisher: "집문당",
    year: 2015,
    badge: "제자 공저", // 공저자 김지연(La Trobe)·김민경(Ohio State)은 현재 교수가 된 제자
  },
  {
    id: "book-2013",
    title: "고객네트워크전략",
    role: "David L. Rogers 저, 최정혜·오윤조 공역",
    publisher: "박영사",
    year: 2013,
  },
];

// 저널별 그룹핑 유틸
export function groupByJournal(pubs) {
  const map = new Map();
  for (const p of pubs) {
    if (!map.has(p.journal)) map.set(p.journal, []);
    map.get(p.journal).push(p);
  }
  return [...map.entries()]
    .map(([journal, papers]) => ({ journal, papers }))
    .sort((a, b) => b.papers.length - a.papers.length || a.journal.localeCompare(b.journal));
}

export const YEAR_RANGES = [
  { label: "2010–2015", from: 2010, to: 2015 },
  { label: "2016–2020", from: 2016, to: 2020 },
  { label: "2021–2025", from: 2021, to: 2025 },
  { label: "2026–", from: 2026, to: 9999 },
];
