# 논문 저자 전수 재검증 결과 (21차 §2)

> **이 문서는 검증 결과 보고서다. 사이트 데이터(`publications.js`)는 아직 고치지 않았다.**
> 사용자 승인 후에 `publications.js`와 `check-authorship.mjs`의 EXPECTED를 갱신한다.

## 검증 방법

- **Crossref REST API**로 79편의 저자 전체 이름(given/family)을 받아왔다. Google Scholar의 `Y Kwak` 같은
  이니셜 문제가 여기서 해결된다.
- DOI가 있으면 `/works/{doi}`로 정확 조회, 없으면 `query.bibliographic` 검색 후
  **제목·저널·연도가 모두 맞을 때만** 채택했다.
- ⚠️ **국내 학술지는 Crossref에 영문 제목으로 등록돼 있어** 한글 제목으로는 자동 매칭이 되지 않는다.
  그래서 `query.author=Jeonghye Choi`로 교수님 명의 레코드 91건을 따로 모아, 저널·연도·저자를
  하나씩 눈으로 대조해 DOI를 확정했다. 그 대조표는 이 문서의 `출처` 열에 DOI로 남아 있다.
- 이름 매칭은 21차 §2-3 표에 **정확히 일치**할 때만 배정했다. 애매하면 배정하지 않았다.
- 배정 금지 표기(`Jikyung (Jeanne) Kim`, `Alex Jiyoung Kim`, `Jae Yeon Yoon`, `Hye-jin Kim`,
  `Sang Jin Kim`)는 표에서 ✖로 표시했다.

### KCI 포털을 쓰지 못한 이유

KCI 포털(`poArtiSearList.kci`)은 검색 결과를 JavaScript로 렌더링해 서버 응답 HTML에 결과가 없고,
브라우저로 열어도 URL 쿼리 파라미터가 적용되지 않았다. 2회 시도 후 중단하고 Crossref로 대체했다.
남은 미확인 12편(대부분 `지식경영연구`)은 KCI OpenAPI 키를 받거나 포털에서 직접 확인해야 한다.

## 요약

| | 전체 | Crossref로 확인 | 미확인 |
|---|---|---|---|
| SSCI | 37 | 36 | 1 |
| KCI | 42 | 30 | 12 |
| 저서 | 4 | 0 (Crossref 대상 아님) | 3 (1권은 기존 확인분 유지) |

미확인 13편 중 5편은 이전 차수에서 이미 사람이 확인해 `authorSource`가 붙어 있다 — 기존 배정을 그대로 둔다.
따라서 **저자가 확인된 논문은 71편**(기존 55편 → +16편)이 된다.

## SSCI

| 연도 | 제목(앞 60자) | 저널 | 확인된 저자 (원문 순서) | 제자 id | 출처 |
|---|---|---|---|---|---|
| 2026 | Free Versus Paid Over-the-Top Video Streaming Services and t | Journal of Business Research | Chang Hee Park, Jikyung (Jeanne) Kim✖, Youshin Kwak→kwak-yushin, Jeonghye Choi | `kwak-yushin` | DOI 10.1016/j.jbusres.2026.116256 |
| 2026 | The Price of Prestige: When Do Price Premiums Drive or Deter | Journal of Interactive Marketing | Hyunwoo Jung→jung-hyunwoo, Wooyong Jo→jo-wooyong, Jeonghye Choi | `jung-hyunwoo`, `jo-wooyong` | 제목 일치 (DOI 10.1177/10949968251385583) |
| 2026 | Weathering the Digital Shift: How Interaction Spaces and Wea | Journal of Research in Interactive Marketing | Yiling Li→li-yiling, Jeonghye Choi, Jeeyeon Kim→kim-jeeyeon | `li-yiling`, `kim-jeeyeon` | DOI 10.1108/JRIM-04-2025-0234 |
| 2026 | Push the Paw: A Field Experiment on Personalised Push Notifi | Australasian Marketing Journal | Jeeyeon Kim→kim-jeeyeon, Wookyoung Kim→kim-wookyoung, Jeonghye Choi | `kim-jeeyeon`, `kim-wookyoung` | DOI 10.1177/14413582251356702 |
| 2026 | Emotional Anthropomorphism of Notifications and App Engageme | Journal of Research in Interactive Marketing | Yiling Li→li-yiling, Inseo Hwang→hwang-inseo, Jeonghye Choi | `li-yiling`, `hwang-inseo` | DOI 10.1108/JRIM-10-2024-0488 |
| 2025 | In the Company of Strangers: Social Influence from Anonymous | Journal of Consumer Research | Wooyong Jo→jo-wooyong, Sarang Sunder, Jeonghye Choi, Minakshi Trivedi | `jo-wooyong` | DOI 10.1093/jcr/ucae075 |
| 2025 | Click, Sign-up and Purchase: Consumer Responses to Real-Time | International Journal of Advertising | Yeohong Yoon→yoon-yeohong, Hyejeong Kim→kim-hyejeong, Jeonghye Choi, Hyewon Cho | `yoon-yeohong`, `kim-hyejeong` | DOI 10.1080/02650487.2024.2444857 |
| 2025 | A Picture's Worth a Thousand Shares: An Empirical Analysis o | Marketing Letters | Wooyong Jo→jo-wooyong, Hyejeong Kim→kim-hyejeong, Jeonghye Choi | `jo-wooyong`, `kim-hyejeong` | DOI 10.1007/s11002-024-09736-4 |
| 2025 | Liability of Foreignness in Immersive Technologies: Evidence | Journal of International Business Studies | Hyoryung Nam, Yiling Li→li-yiling, P. K. Kannan, Jeonghye Choi | `li-yiling` | 제목 일치 (DOI 10.1057/s41267-024-00756-w) |
| 2024 | Surprising Consequences of Innocuous Mobile Transaction Remi | Journal of Interactive Marketing | Jikyung (Jeanne) Kim✖, Yeohong Yoon→yoon-yeohong, Jeonghye Choi, Hang Dong, Dilip Soman | `yoon-yeohong` | 제목 일치 (DOI 10.1177/10949968231189505) |
| 2024 | The Impact of Offline Store Presence on Digital Sales: The M | Journal of Retailing and Consumer Services | Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi, Sue Ryung Chang, Minakshi Trivedi | `kim-jeeyeon` | 제목 일치 (DOI 10.1016/j.jretconser.2024.103754) |
| 2024 | Older Adult Consumers and Local Competition in the Healthcar | International Journal of Consumer Studies | Jeeyeon Kim→kim-jeeyeon, Wooyong Jo→jo-wooyong, Alex Jiyoung Kim✖, Jeonghye Choi | `kim-jeeyeon`, `jo-wooyong` | 제목 일치 (DOI 10.1111/ijcs.13007) |
| 2023 | Privacy Concern and Information Technology: A Meta-analysis | Technological Forecasting and Social Change | Yeolib Kim, Seung Hyun Kim, Robert A. Peterson, Jeonghye Choi | — | 제목·저널·연도 대조 (DOI 10.1016/j.techfore.2023.122789) |
| 2023 | A Recommendation System with Dynamic Preferences: Its Applic | Journal of Business Research | Joonho Bae, Jinkyoo Park, Jeonghye Choi, Seung Bum Soh | — | 제목·저널·연도 대조 (DOI 10.1016/j.jbusres.2023.114079) |
| 2022 | Do Handwritten Notes Benefit Online Retailers? A Field Exper | Journal of Interactive Marketing | Sanghwa Kim→kim-sanghwa, Jeonghye Choi, Seung Hyun Kim | `kim-sanghwa` | 제목 일치 (DOI 10.1177/10949968221102306) |
| 2022 | The Effect of Emotion in Thumbnails and Titles of Video Clip | Journal of Business Research | Yiling Li→li-yiling, Hye-jin Kim✖, Boram Do, Jeonghye Choi | `li-yiling` | 제목 일치 (DOI 10.1016/j.jbusres.2022.06.051) |
| 2022 | The Effect of Social Media Apps on Shopping Apps | Journal of Business Research | Jae Yeon Yoon✖, Chaehyeon Lee, Jeonghye Choi, Sue Ryung Chang, Jikyung Kim✖ | — | 제목 일치 (DOI 10.1016/j.jbusres.2022.04.021) |
| 2022 | Sentiment Change and Negative Herding: Evidence from Microbl | Journal of Business Research | Jikyung (Jeanne) Kim✖, Hang Dong, Jeonghye Choi, Sue Ryung Chang | — | 제목 일치 (DOI 10.1016/j.jbusres.2021.12.055) |
| 2022 | Opening up OTC Drug Market: Incumbent Firms' Performance and | International Journal of Research in Marketing | Wooyong Jo→jo-wooyong, Hyoryung Nam, Jeonghye Choi | `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.1016/j.ijresmar.2021.10.001) |
| 2021 | Understanding Digital Consumers' Well-being in Asia: The Mod | Journal of Consumer Affairs | Youshin Kwak→kwak-yushin, Jeeyeon Kim→kim-jeeyeon, Yeolib Kim, Jeonghye Choi | `kwak-yushin`, `kim-jeeyeon` | 제목·저널·연도 대조 (DOI 10.1111/joca.12389) |
| 2021 | Channel Stickiness in the Shopping Journey for Electronic Go | Journal of Business Research | Jikyung (Jeanne) Kim✖, Hyeasinn Song→song-hyeasinn, Jeonghye Choi, Yongseob Kim, Jeonghan Hong | `song-hyeasinn` | 제목 일치 (DOI 10.1016/j.jbusres.2019.11.015) |
| 2021 | Buyer-Supplier Matching in Online B2B Marketplace: An Empiri | Industrial Marketing Management | Yeo Lim Yoon→yoon-yeolim, Yeohong Yoon→yoon-yeohong, Hyoryung Nam, Jeonghye Choi | `yoon-yeolim`, `yoon-yeohong` | 제목 일치 (DOI 10.1016/j.indmarman.2020.12.010) |
| 2021 | Who Are the Multichannel Shoppers and How Can Retailers Use  | Asia Pacific Journal of Marketing and Logistics | Wooyong Jo→jo-wooyong, Jikyung (Jeanne) Kim✖, Jeonghye Choi | `jo-wooyong` | 제목 일치 (DOI 10.1108/apjml-05-2019-0317) |
| 2020 | Purchase Now and Consume Later: Do Online and Offline Enviro | Journal of Business Research | Jikyung (Jeanne) Kim✖, Sanghwa Kim→kim-sanghwa, Jeonghye Choi | `kim-sanghwa` | 제목 일치 (DOI 10.1016/j.jbusres.2019.09.021) |
| 2020 | From Clicks to Bricks: The Impact of Product Launches in Off | Journal of Business Research | Yan Jiang→jiang-yan, Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi, Moon Young Kang | `jiang-yan`, `kim-jeeyeon` | 제목 일치 (DOI 10.1016/j.jbusres.2019.08.025) |
| 2020 | Protecting Consumers from Themselves: Assessing Consequences | Marketing Science | Wooyong Jo→jo-wooyong, Sarang Sunder, Jeonghye Choi, Minakshi Trivedi | `jo-wooyong` | 제목 일치 (DOI 10.1287/mksc.2019.1174) |
| 2019 | The Effects of eWOM Characteristics on Consumer Ratings: Evi | International Journal of Advertising | Yeohong Yoon→yoon-yeohong, Alex Jiyoung Kim✖, Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi | `yoon-yeohong`, `kim-jeeyeon` | DOI 10.1080/02650487.2018.1541391 |
| 2019 | The Effect of Celebrity Endorsement on Sustainable Firm Valu | International Journal of Advertising | Moon Young Kang, Yonglim Choi, Jeonghye Choi | — | 제목·저널·연도 대조 (DOI 10.1080/02650487.2019.1601910) |
| 2019 | Offline Social Interactions and Online Shopping Demand: Does | Journal of Business Research | Jeeyeon Kim→kim-jeeyeon, Mingyung Kim→kim-mingyung, Jeonghye Choi, Minakshi Trivedi | `kim-jeeyeon`, `kim-mingyung` | 제목·저널·연도 대조 (DOI 10.1016/j.jbusres.2017.09.022) |
| 2019 | The Role of Design Innovation in Understanding Purchase Beha | Journal of Business Research | Sang Jin Kim✖, Kyung Hoon Kim, Jeonghye Choi | — | 제목 일치 (DOI 10.1016/j.jbusres.2017.09.047) |
| 2017 | Social Interactions and Monetary Incentives in Driving Consu | Journal of Marketing Research | Kamer Toker-Yildiz, Minakshi Trivedi, Jeonghye Choi, Sue Ryung Chang | — | DOI 10.1509/jmr.13.0482 |
| 2017 | Mobile Shopping through Applications: Understanding Applicat | Journal of Interactive Marketing | Mingyung Kim→kim-mingyung, Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi, Minakshi Trivedi | `kim-mingyung`, `kim-jeeyeon` | DOI 10.1016/j.intmar.2017.02.001 |
| 2017 | Linking Online Niche Sales to Offline Brand Conditions | Journal of Business Research | Jungmin Son, Jikyung (Jeanne) Kim✖, Jeonghye Choi, Mingyung Kim→kim-mingyung | `kim-mingyung` | 제목 일치 (DOI 10.1016/j.jbusres.2016.07.004) |
| 2012 | Traditional and IS-Enabled Customer Acquisition on the Inter | Management Science | Jeonghye Choi, David R. Bell, Leonard M. Lodish | — | 제목 일치 (DOI 10.1287/mnsc.1110.1447) |
| 2011 | Preference Minorities and the Internet | Journal of Marketing Research | Jeonghye Choi, David R. Bell | — | DOI 10.1509/jmkr.48.4.670 |
| 2010 | Spatiotemporal Analysis of Imitation Behavior across New Buy | Journal of Marketing Research | Jeonghye Choi, Sam K. Hui, David R. Bell | — | 제목 일치 (DOI 10.1509/jmkr.47.1.75) |

## KCI

| 연도 | 제목(앞 60자) | 저널 | 확인된 저자 (원문 순서) | 제자 id | 출처 |
|---|---|---|---|---|---|
| 2026 | 인플루언서 커뮤니케이션이 소비자의 구매 전환에 미치는 영향: 제품 유형과 지역 특성의 조절효과 | 경영정보학연구 | Yiling Li→li-yiling, Jialing Wu→wu-jialing, Jeonghye Choi | `li-yiling`, `wu-jialing` | DOI 10.14329/isr.2026.28.1.417 |
| 2026 | 리셀 시장 내 재활용 소재 활용 제품의 가격 프리미엄 형성: 아식스(Asics) 브랜드를 중심으로 | 마케팅관리연구 | Inseo Hwang→hwang-inseo, Jung Hyun Kim, Jeonghye Choi | `hwang-inseo` | DOI 10.37202/KMMR.2026.31.2.75 |
| 2025 | 음식 배달 앱 수용에 대한 사회적 영향력 분석 | 마케팅관리연구 | Wookyoung Kim→kim-wookyoung, Hyunwoo Jung→jung-hyunwoo, Jeonghye Choi | `kim-wookyoung`, `jung-hyunwoo` | 제목·저널·연도 대조 (DOI 10.37202/kmmr.2025.30.3.1) |
| 2025 | 메타버스 마케팅과 소비자의 브랜드 참여: 럭셔리 패션 브랜드를 중심으로 | 서비스마케팅저널 | Yiling Li→li-yiling, Jeeyeon Kim→kim-jeeyeon, Jeonghye Cho | `li-yiling`, `kim-jeeyeon` | 제목·저널·연도 대조 (DOI 10.56352/smj.2025.18.1.10) |
| 2024 | 가상 인플루언서의 얼굴 특성이 소셜 미디어 이용자 반응에 미치는 영향 | 한국콘텐츠학회논문지 | Hyejeong Kim→kim-hyejeong, Jeonghye Choi, Chang-Hee Park, Jeeyeon Kim→kim-jeeyeon | `kim-hyejeong`, `kim-jeeyeon` | 제목·저널·연도 대조 (DOI 10.5392/jkca.2024.24.08.189) |
| 2024 | 감염병 확산 상황에서 지역별 헬스장 폐업: 위험요인노출과 보상소비지출의 차별적 영향 | 마케팅관리연구 | Hyejeong Kim→kim-hyejeong, Inseo Hwang→hwang-inseo, Jeonghye Choi | `kim-hyejeong`, `hwang-inseo` | 제목·저널·연도 대조 (DOI 10.37202/kmmr.2024.29.1.53) |
| 2023 | Does Proximity Really Matters? Unveiling the Role of Industr | 마케팅관리연구 | Hyunwoo Jung→jung-hyunwoo, Jeonghye Choi | `jung-hyunwoo` | 제목·저널·연도 대조 (DOI 10.37202/kmmr.2023.28.4.1) |
| 2023 | 소비자의 신뢰도 향상을 위한 제품 전략의 구전 효과: 온라인 식품 유통 플랫폼을 중심으로 | 유통연구 | Inseo Hwang→hwang-inseo, Yiling Li→li-yiling, Jeonghye Choi | `hwang-inseo`, `li-yiling` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2023.10.31.1) |
| 2023 | Understanding of the Continuance Intention to Use Chatbot Se | Asia Marketing Journal | Jeeyeon Kim→kim-jeeyeon, Yiling Li→li-yiling, Jeonghye Choi | `kim-jeeyeon`, `li-yiling` | 제목·저널·연도 대조 (DOI 10.53728/2765-6500.1613) |
| 2023 | 신규 애플리케이션 출시가 기존 시장 생태계에 미치는 영향: 디지털 헬스케어 사례를 중심으로 | 한국경영과학회지 | Yiling Li→li-yiling, Wookyoung Kim→kim-wookyoung, Jeonghye Choi | `li-yiling`, `kim-wookyoung` | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2023.48.2.031) |
| 2023 | 동영상 콘텐츠의 장르, 시청자의 디지털 네이티브 특성 및 디지털 미디어의 속성이 사전광고 회피에 미치는 영향 | 광고학연구 | Li Yiling→li-yiling, Jeonghye Choi | `li-yiling` | 제목·저널·연도 대조 (DOI 10.14377/kja.2023.2.28.7) |
| 2023 | 직장 내 스트레스원과 긍정 정서에 대한 모바일 앱 사용의 조절 효과 연구 | 한국콘텐츠학회논문지 | Taenyeon Kim, Yeo-Lim Yoon→yoon-yeolim, Jeonghye Choi, Boram Do | `yoon-yeolim` | 제목·저널·연도 대조 (DOI 10.5392/jkca.2023.23.01.464) |
| 2022 | 뉴스 홍보가 시청자 온라인 구전에 미치는 영향: 웹툰의 드라마화를 중심으로 | 한국콘텐츠학회논문지 | Hyejeong Kim→kim-hyejeong, Yiling Li→li-yiling, Jeonghye Choi | `kim-hyejeong`, `li-yiling` | 제목·저널·연도 대조 (DOI 10.5392/jkca.2022.22.12.341) |
| 2022 | The Effect of Lockdown Repeal on Socialization: Bayesian Mul | Asia Marketing Journal | Hyunwoo Jung→jung-hyunwoo, Yiling Li→li-yiling, Jeonghye Choi | `jung-hyunwoo`, `li-yiling` | 제목·저널·연도 대조 (DOI 10.53728/2765-6500.1592) |
| 2022 | 간편결제 수용이 사용자의 쇼핑앱 사용에 미치는 영향: 카카오페이와 카카오선물하기의 사례를 중심으로 | 한국경영과학회지 | Hyunwoo Jung→jung-hyunwoo, Youshin Kwak→kwak-yushin, Jeonghye Choi | `jung-hyunwoo`, `kwak-yushin` | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2022.47.3.033) |
| 2022 | 동영상 플랫폼상의 식품 광고 타겟팅의 효과: PC와 모바일 비교를 중심으로 | 유통연구 | Yiling Li→li-yiling, Boram Do, Sue Ryung Chang, Jeonghye Choi | `li-yiling` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2022.1.31.59) |
| 2022 | Who Considers Leaving a Job in a Pandemic?: Determinants of  | 전문경영인연구 | Boram Do, Yeo Lim Yoon→yoon-yeolim, Hye-jin Kim✖, Jeonghye Choi | `yoon-yeolim` | 제목·저널·연도 대조 (DOI 10.37674/ceoms.25.4.1) |
| 2020 | 크래프트 브루어리의 스타트업 전략: 어메이징 브루잉 컴퍼니의 사례를 중심으로 | 연세경영연구 | Sunghyun Jang, Subin Im, Jeonghye Choi | — | 제목·저널·연도 대조 (DOI 10.55125/ybr.2020.10.57.3.73) |
| 2020 | 건강식품 구매에 제품 네이밍과 고객의 제품 경험, 기업의 제품 판촉이 미치는 영향 | 유통연구 | Yiling Li→li-yiling, Sanghwa Kim→kim-sanghwa, Moo Jeon Kim, Jeonghye Choi | `li-yiling`, `kim-sanghwa` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2020.07.31.2) |
| 2020 | 날씨불쾌감과 쇼핑선호도가 소매점 선택에 미치는 영향 | 유통연구 | Jiyeon Lee→lee-jiyeon, Yeohong Yoon→yoon-yeohong, Jeonghye Choi, Yerim Chung | `lee-jiyeon`, `yoon-yeohong` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2020.01.31.1) |
| 2018 | 럭셔리 브랜드의 판매 성과와 제품, 고객, 구색의 영향: 매장 유형의 조절 효과를 중심으로 | 유통연구 | Jiang Yan→jiang-yan, Sanghwa Kim→kim-sanghwa, Wooyong Jo→jo-wooyong, Jeonghye Choi | `jiang-yan`, `kim-sanghwa`, `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2018.04.30.1) |
| 2016 | 온라인상의 기업 및 소비자 텍스트 분석과 이를 활용한 온라인 매출 증진 전략 | 한국경영과학회지 | Jeeyeon Kim→kim-jeeyeon, Wooyong Jo→jo-wooyong, Jeonghye Choi, Yerim Chung | `kim-jeeyeon`, `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2016.41.2.081) |
| 2016 | B2B 기업의 마케팅 활동과 고객의 시장 환경이 매출 성과에 미치는 영향 | 한국경영과학회지 | Sanghwa Kim→kim-sanghwa, Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi, Yerim Chung | `kim-sanghwa`, `kim-jeeyeon` | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2016.41.4.055) |
| 2016 | 온라인 게임 규제와 청소년의 시선: 규제 대상자들의 반발심과 또래문화를 중심으로 | 한국콘텐츠학회논문지 | Yeohong Yoon→yoon-yeohong, Wooyong Jo→jo-wooyong, Jeonghye Choi, Yerim Chung | `yoon-yeohong`, `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.5392/jkca.2016.16.11.223) |
| 2016 | 매장 내·외부 환경과 지역 시장 환경이 매장 성과에 미치는 영향 | 유통연구 | Jeeyeon Kim→kim-jeeyeon, Jeonghye Choi, Yerim Chung | `kim-jeeyeon` | 제목·저널·연도 대조 (DOI 10.17657/jcr.2016.07.31.2) |
| 2016 | 게임 머니와 캐시 머니 소비에 관한 실증 연구: 경험, 성취, 지역적 격차를 중심으로 | 한국콘텐츠학회논문지 | Wooyong Jo→jo-wooyong, Jeonghye Choi | `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.5392/jkca.2016.16.02.295) |
| 2015 | 오프라인 환경 변화가 틈새 제품의 온라인 수요에 미치는 영향 | 마케팅연구 | Jungmin Son, Mingyung Kim→kim-mingyung, Jeonghye Choi | `kim-mingyung` | 제목·저널·연도 대조 (DOI 10.15830/kmr.2015.30.4.45) |
| 2015 | 소비자의 지역 이주가 온라인 브랜드 선호변화차이에 미치는 영향 | 경영학연구 | Jungmin Son, Mingyung Kim→kim-mingyung, Jeonghye Choi | `kim-mingyung` | 제목·저널·연도 대조 (DOI 10.17287/kmr.2015.44.6.1609) |
| 2014 | 인터넷 포탈에 대한 자원 의존성이 온라인 쇼핑몰기업의 성장에 미치는 영향 | 한국경영과학회지 | Kyung Min Park, Hee Jin Mun, Sunju Park, Seungwha Chung, Jeonghye Choi | — | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2014.39.2.141) |
| 2014 | 온라인 게임의 고객 유형별 이탈 요인: 신규 고객과 기존 고객을 중심으로 | 한국경영과학회지 | Jungmin Son, Wooyong Jo→jo-wooyong, Jeonghye Choi | `jo-wooyong` | 제목·저널·연도 대조 (DOI 10.7737/jkorms.2014.39.4.115) |

## 저서

| 연도 | 제목 | 발행처 | 확인된 저자 | 제자 id | 출처 |
|---|---|---|---|---|---|
| 2020 | 비대면 시대 바르고 건강하게 살기: '빠른'을 넘어 '바른' ICT로 | 한국학술정보 | 미확인 | — | — |
| 2016 | 자동차 자율주행 규제 완화 고용영향평가 연구 | 한국노동연구원 | 미확인 | — | — |
| 2015 | 기술혁신에 따른 지역간 정보격차 | 집문당 | 최정혜, 김지연, 김민경 | `kim-jeeyeon`, `kim-mingyung` | 출판사 서지 (14차 확정표) |
| 2013 | 고객네트워크전략 | 박영사 | 미확인 | — | — |

저서는 Crossref 대상이 아니다. `기술혁신에 따른 지역간 정보격차`(2015)만 이전 차수에서 저자 3인을
확인해 두었고, 나머지 3권은 저자 명단을 확인하지 못했다 — **기존 상태 그대로 둔다.**

## 미확인 목록

| 유형 | 연도 | 제목 | 저널 | 실패 이유 | 기존 배정 |
|---|---|---|---|---|---|
| SSCI | 2012 | What Matters Most in Internet Retailing | MIT Sloan Management Review | Crossref에 레코드 없음 (SMR 미등록) | — |
| KCI | 2026 | 상권 내 유통 채널 경쟁이 PB 판매 성과에 미치는 영향: 편의점–프랜차이즈 슈 | 프랜차이징저널 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2026 | 프랜차이즈 가맹 본부의 위기가 포트폴리오 성과에 미치는 영향 분석 | 프랜차이징저널 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2023 | 스포츠 구단의 경기 실적 및 소셜미디어 운영이 팬덤의 인게이지먼트에 미치는 영향 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | `kim-wookyoung`, `li-yiling` (기존 확인분 유지) |
| KCI | 2022 | 숏폼 브랜디드 콘텐츠 노출 유형이 소비자 반응에 미치는 영향: 인지된 소속감의  | 한국콘텐츠학회논문지 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2022 | 온라인 커뮤니티 이용자 참여 증진을 위한 관리자의 운영 전략: 대학별 대나무숲  | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | `kim-hyejeong`, `kwak-yushin` (기존 확인분 유지) |
| KCI | 2021 | 소셜미디어와 소비자 구매 결정과의 관계: 서울 공유 자전거에 대한 시계열 분석을 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2021 | 코로나19 상황에서 직무만족도와 모바일 생산활동: 결정요인 연구 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | `yoon-yeolim` (기존 확인분 유지) |
| KCI | 2016 | 지역 특수성에 따른 오프라인·온라인 채널 성과의 이해 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2015 | 모바일 VOD 콘텐츠 구매 요인에 관한 실증 연구 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | `kim-mingyung`, `jo-wooyong` (기존 확인분 유지) |
| KCI | 2015 | 오프라인과 온라인 채널상의 기존제품과 신제품의 판매 성과: 경험재에 대한 시계열 | 지식경영연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2014 | 소셜미디어 연구동향 분석: 사회과학 분야를 중심으로 | 정보통신정책연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |
| KCI | 2013 | 이용자 생산 콘텐츠 플랫폼 사이트 내에서 생산자 참여가 소비자 선택과 몰입에 미 | 경영학연구 | Crossref에 레코드 없음 (해당 학술지 미등록) | — |

## 검증 후 제자별 편수

| 제자 | id | SSCI | KCI | 저서 | 합계 | 이전 합계 | 변화 |
|---|---|---|---|---|---|---|---|
| 김지연 | `kim-jeeyeon` | 9 | 6 | 1 | **16** | 10 | **+6** |
| 이예령 | `li-yiling` | 4 | 11 | 0 | **15** | 14 | **+1** |
| 조우용 | `jo-wooyong` | 7 | 6 | 0 | **13** | 8 | **+5** |
| 김민경 | `kim-mingyung` | 3 | 3 | 1 | **7** | 5 | **+2** |
| 김혜정 | `kim-hyejeong` | 2 | 4 | 0 | **6** | 5 | **+1** |
| 윤여홍 | `yoon-yeohong` | 4 | 2 | 0 | **6** | 3 | **+3** |
| 김상화 | `kim-sanghwa` | 2 | 3 | 0 | **5** | 5 | — |
| 정현우 | `jung-hyunwoo` | 1 | 4 | 0 | **5** | 3 | **+2** |
| 황인서 | `hwang-inseo` | 1 | 3 | 0 | **4** | 4 | — |
| 김우경 | `kim-wookyoung` | 1 | 3 | 0 | **4** | 3 | **+1** |
| 윤여림 | `yoon-yeolim` | 1 | 3 | 0 | **4** | 3 | **+1** |
| 곽유신 | `kwak-yushin` | 2 | 2 | 0 | **4** | 3 | **+1** |
| 장연 | `jiang-yan` | 1 | 1 | 0 | **2** | 2 | — |
| 송혜신 | `song-hyeasinn` | 1 | 0 | 0 | **1** | 1 | — |
| 오가령 | `wu-jialing` | 0 | 1 | 0 | **1** | 1 | — |
| 이지연 | `lee-jiyeon` | 0 | 1 | 0 | **1** | 0 | **+1** |
| 김연정 | `kim-yeonjeong` | 0 | 0 | 0 | **0** | 0 | — |

합계: SSCI 39 · KCI 53 · 저서 2 (연인원 기준, 한 논문에 여러 제자가 들어간다)

### 새로 연결된 논문 16편

| 유형 | 연도 | 제목 | 새로 연결된 제자 |
|---|---|---|---|
| SSCI | 2026 | The Price of Prestige: When Do Price Premiums Drive  | 정현우, 조우용 |
| SSCI | 2026 | Weathering the Digital Shift: How Interaction Spaces | 김지연 |
| SSCI | 2025 | Click, Sign-up and Purchase: Consumer Responses to R | 윤여홍, 김혜정 |
| SSCI | 2022 | Opening up OTC Drug Market: Incumbent Firms' Perform | 조우용 |
| SSCI | 2021 | Understanding Digital Consumers' Well-being in Asia: | 곽유신, 김지연 |
| SSCI | 2020 | From Clicks to Bricks: The Impact of Product Launche | 김지연 |
| SSCI | 2019 | Offline Social Interactions and Online Shopping Dema | 김지연, 김민경 |
| KCI | 2025 | 음식 배달 앱 수용에 대한 사회적 영향력 분석 | 김우경, 정현우 |
| KCI | 2025 | 메타버스 마케팅과 소비자의 브랜드 참여: 럭셔리 패션 브랜드를 중심으로 | 이예령, 김지연 |
| KCI | 2022 | Who Considers Leaving a Job in a Pandemic?: Determin | 윤여림 |
| KCI | 2020 | 날씨불쾌감과 쇼핑선호도가 소매점 선택에 미치는 영향 | 이지연, 윤여홍 |
| KCI | 2016 | 온라인 게임 규제와 청소년의 시선: 규제 대상자들의 반발심과 또래문화를 중심으로 | 윤여홍, 조우용 |
| KCI | 2016 | 매장 내·외부 환경과 지역 시장 환경이 매장 성과에 미치는 영향 | 김지연 |
| KCI | 2016 | 게임 머니와 캐시 머니 소비에 관한 실증 연구: 경험, 성취, 지역적 격차를 중심으로 | 조우용 |
| KCI | 2015 | 소비자의 지역 이주가 온라인 브랜드 선호변화차이에 미치는 영향 | 김민경 |
| KCI | 2014 | 온라인 게임의 고객 유형별 이탈 요인: 신규 고객과 기존 고객을 중심으로 | 조우용 |

**기존 배정이 빠진 논문은 한 건도 없다** — Crossref에 레코드가 있는 66편 모두, 기존 배정이 그대로 확인됐다.

## 승인 후 할 일

1. `publications.js`의 해당 논문에 `authors`(원문 표기 그대로) · `studentIds` · `authorSource` 추가
2. `check-authorship.mjs`의 전체 편수(SSCI 37 · KCI 42 · 저서 4는 불변)와 `EXPECTED` 학생별 편수 갱신
3. `npm run build`로 `check-authorship`·`check-i18n` 통과 확인
4. CLAUDE.md의 확정 편수표 갱신
