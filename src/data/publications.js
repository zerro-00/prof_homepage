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
  "프라이버시·정책",
];

export const SSCI_PUBLICATIONS = [
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

// ---------------------------------------------------------------
// KCI(국문) 논문 — 약 50편.
// TODO: KCI 논문 데이터 추가 (원문 페이지 인코딩 문제로 제목 전문 미확보.
//       확보되는 대로 SSCI와 동일한 스키마로 아래 배열에 추가하면
//       그대로 화면에 렌더링됩니다.)
// 주제 예: 소셜미디어, 라이브커머스, OTT, 헬스케어, 크리에이터, 브랜드, 코로나19 소비행동 등
export const KCI_COUNT_LABEL = "50+";
export const KCI_PUBLICATIONS = [
  // { id: "kci-0001", title: "...", journal: "...", year: 2024, keywords: [], summary: "...", tier: null },
];

// ---------------------------------------------------------------
// 저서 및 역서
// TODO: 일부 서지 정보가 인코딩 문제로 미확보 — 확보 시 title/publisher 보완
export const BOOKS = [
  {
    id: "book-2020",
    title: "디지털 시대 다르게 건강하게 소통: ICT와 사회",
    role: "공저",
    publisher: "한국학술정보",
    year: 2020,
  },
  {
    id: "book-2016",
    title: "자동차 산업 관련 고용영향평가",
    role: "공저",
    publisher: "한국노동연구원",
    year: 2016,
  },
  {
    id: "book-2015",
    title: "정보통신 관련 저서", // TODO: 정확한 서명 확인 후 교체
    role: "공저",
    publisher: "",
    year: 2015,
  },
  {
    id: "book-2013",
    title: "디지털 네트워크 관련 역서", // TODO: 정확한 서명 확인 후 교체 (David L. Rogers 저)
    role: "공역 (David L. Rogers 저)",
    publisher: "",
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
