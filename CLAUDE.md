# CLAUDE.md

연세대학교 경영대학 **최정혜 교수(마케팅 전공)** 연구실 홈페이지 프로젝트.
기존 학교 기본 템플릿(https://ysb.yonsei.ac.kr/faculty.asp?mid=m02&uid=92)을 대체하는 독립 사이트.

## 목표

처음 방문한 사람(예비 대학원생, 기업 관계자, 언론)이 3초 안에 "이 연구실 대단하다"고 느끼게 만드는 것.
특히 **제자 진출 세계지도**와 **논문 탐색 UI** 두 가지가 이 사이트의 핵심 자산.

## 기술 스택 / 명령어

- Vite + React + Tailwind CSS
- framer-motion (섹션 전환), react-simple-maps (세계지도)
- 정적 사이트. **백엔드·DB·외부 API 키 없음.** Supabase 등 붙이지 말 것.

```bash
npm run dev      # 로컬 개발
npm run build    # 배포 전 반드시 통과 확인
npm run preview  # 빌드 결과 확인
```

배포: GitHub(`zerro-00/prof_homepage`) main 브랜치 push → Vercel 자동 재배포.
작업 완료 시 build 통과 확인 후 commit & push까지 진행할 것.

## 구조

```
src/
  data/          # 모든 콘텐츠 데이터. 컴포넌트와 반드시 분리 유지
    publications.js   # { id, title, journal, year, keywords[], summary, tier }
    alumni.js         # 아래 "alumni.js 실제 스키마" 참고
    profile.js        # 기본정보·학력·경력·관심분야 등
    awards.js         # 수상·연구비
  components/
  App.jsx
```

### alumni.js 실제 스키마

도시 단위 핀(`CITY_PINS`) 안에 인원(`entries`)이 묶이는 2단 구조. 같은 도시에 여러 명이면 핀 하나에 목록으로 표시된다.

```js
// 핀(도시) 단위
{
  id: "columbus",              // 고유 슬러그
  city: "콜럼버스",
  country: "미국",
  coordinates: [-83.0007, 39.9612],  // [경도, 위도] 순서 주의 (lat/lng 아님)
  label: "김민경",             // 지도 위 상시 노출 라벨 (데스크톱만)
  labelDx: 10, labelDy: 4,     // 라벨 오프셋(px)
  entries: [ /* 아래 인원 스키마 */ ],
}

// 인원(entry) 단위
{
  nameKo: "김민경",
  nameEn: "Mingyung Kim",      // 없으면 null
  grad: "2015 학사",           // 본 연구실 학위·연도
  affiliation: "Ohio State University · Fisher College of Business",
  title: "Assistant Professor of Marketing",
  path: "2015 학사 → 2017 Wharton School 마케팅 박사 → 2024 Ohio State 임용",
  isFaculty: true,             // true면 골드 핀 + 이중 pulse 링 + 교수 임용 카드
  link: "https://...",         // 공식 프로필 (기본 링크). 없으면 생략/null
  linkLabel: "교수 홈페이지 →",
  subLink: "https://...",      // 개인 사이트 (보조 링크). 없으면 null
  subLinkLabel: "개인 사이트 →",
}
```

지도 하단 요약 배지는 같은 파일의 `MAP_BADGES`, 툴팁 하단 연구실 실적 문구는 `LAB_STAT_LINE`에서 수정한다.

콘텐츠 추가·수정은 **항상 `src/data/` 안에서**. 컴포넌트에 데이터를 하드코딩하지 말 것.

## 섹션 구성 (순서 고정)

1. 히어로 + 프로필 (기본정보·학력·경력·사외이사·학술활동·산관연협력 + 클릭 가능한 스탯 카드 4개)
2. 관심분야 (강의 / 연구)
3. 제자 진출 세계지도
4. 주요 연구 논문 및 저서
5. 수상 & 연구비

**별도의 연락처 섹션이나 대학원생 모집 섹션은 만들지 않는다.** 연락처는 히어로 프로필 안에만.

## 네비게이션 동작

- 한 번에 한 섹션만 렌더링. 스크롤 앵커 방식 아님.
- framer-motion `AnimatePresence mode="wait"` — 나감 250ms(y-20px, blur 4px) / 들어옴 350ms ease-out
- URL 해시 동기화 (뒤로가기·새로고침 정상 동작), 전환 시 스크롤 최상단
- `prefers-reduced-motion: reduce` 이면 애니메이션 없이 즉시 전환
- 전체 전환은 600ms 이내로 유지

## 디자인 원칙

**컨셉: 고급 게임 UI의 "구조"를 차용하되, 비주얼은 포트폴리오급으로.**
스탯 카드, 업적 카운터, 월드맵, 스킬 태그 같은 게임적 구조는 쓰되 다음은 절대 금지:

- 픽셀아트, 도트 그래픽, 8비트, 만화체
- 원색 남발, 무지개 그라디언트
- 이모지 남발

색: 딥 네이비/차콜 다크 베이스 + 포인트 컬러 1~2개. 연세 블루(#003876) 계열을 포인트로.
타이포: 한글 Pretendard, 숫자·영문 Space Grotesk. 큰 숫자는 임팩트 있게.
"MZ 감성" = 요즘 잘 만든 스타트업/에이전시 사이트 감성. 밈이나 유행어 아님.

모바일 대응 필수. 지도 핀 툴팁의 링크는 탭 영역을 넉넉히.

## 4개국어(i18n) 규칙

- `react-i18next` + 정적 번역 파일: `src/i18n/ko.json / en.json / zh.json / ja.json` (중국어는 간체 zh-CN).
- **런타임 자동번역(Google Translate 등) 절대 금지.** 모든 문자열은 사람이 작성한 번역으로 관리.
- 언어 선택은 상단 네비 우측(KO/EN/中/日), URL 쿼리 `?lang=` 동기화, `<html lang>` 자동 변경. 브라우저 언어 자동 감지하되 사용자 선택 우선.
- 데이터 파일(`alumni.js`, `awards.js`)의 항목별 번역은 `lang: { en/zh/ja: {...} }` 오버라이드 + `localizeField()` 헬퍼 사용.
- **번역하지 않는 항목 (모든 언어에서 원문 유지)**: 논문 제목(SSCI 영문/KCI 국문 원제), 저널명, 사람 이름(한국어 화면은 한글+영문 병기, 그 외 영문 표기·영문 미확인자는 한글 유지), 기관 공식 영문명, 학위·직함 약어(Ph.D., SSCI, KCI, MSI, BK21 등).
- 용어 통일은 `src/i18n/glossary.md` 용어집 기준. 확신 없는 번역은 원문 유지 + TODO (추측 번역 금지).
- 키 무결성: `scripts/check-i18n.mjs`가 4개 파일의 키 일치를 검증하며 `npm run build`에 포함되어 있음. 번역 키 추가 시 4개 파일 모두 갱신할 것.

## 논문 링크 규칙

- 논문 카드 전체가 원문 링크 (`<a target="_blank">`). `paperUrl()` (`src/data/publications.js`) 사용.
- DOI가 있으면 `https://doi.org/{doi}`, 없으면 폴백: KCI → KCI 포털 검색, SSCI → Google Scholar 검색.
- **DOI를 추측해서 만들지 말 것.** 확인된 DOI만 `doi` 필드에 추가 (현재 10건 확인).

## 논문 섹션 규칙

`키워드별 보기` / `저널별 보기` 토글 2개 + `전체 / SSCI / KCI` 타입 토글 (기본 `전체`).
- SSCI·KCI가 같은 스키마(`type` 필드로 구분)로 두 뷰에서 함께 검색·필터링됨
- 키워드별: 키워드 칩 → 해당 논문 카드 목록
- 저널별: 저널 선택 → 그 안에서 키워드 필터 또는 연도 필터 (두 경로 모두 동작)
- 논문 카드는 두 뷰에서 동일 컴포넌트 재사용, SSCI/KCI 태그 색 구분

**논문 3줄 요약은 비전공자(고등학생 수준)가 이해할 수 있는 쉬운 한국어로.**

## 절대 하지 말 것 (중요)

- **논문 요약에 없는 내용을 지어내지 말 것.** 제목과 저널 성격에서 합리적으로 읽히는 수준까지만. 구체적 수치·결론·효과 크기를 창작 금지.
- **제자 이름·소속·링크를 추측해서 만들지 말 것.** 확인되지 않은 제자는 "졸업생"으로 익명 유지. URL을 임의로 조합하거나 추정하지 말 것.
- 제자의 이메일·전화번호·사진 게재 금지. 공개된 학교 공식 프로필 링크만.
- 연세대 로고·엠블럼 사용 금지. 텍스트로만 "Yonsei School of Business" 표기.
- 교수 프로필 사진은 `/public/profile.jpg` 플레이스홀더 유지. 외부 이미지 가져다 쓰지 말 것.

## 확정된 사실 (임의 변경 금지)

교수 프로필:
- Ph.D. Wharton School, University of Pennsylvania / M.S., B.S. KAIST
- 경영관 537 · 02-2123-6575 · jeonghye@yonsei.ac.kr

졸업생 13명 전원 — 연세대 공식 페이지에서 실명 확인 완료 (연도 역순):

| 이름 | 졸업 | 진출 | isFaculty |
|---|---|---|---|
| 이예령 (Li Yiling) | 2025 박사 | 교수 임용 — **소속 미확정** (고려대 디지털경영 / 화성의과학대 의료경영, 페이지 간 불일치. 임의 확정 금지, 확정 전까지 일반 핀) | 잠정 false |
| 정현우 | 2025 석사 | Wharton School, Univ. of Pennsylvania 마케팅 박사 진학 (2025) | false |
| 김혜정 | 2024 석사 | Georgia Institute of Technology 마케팅 박사 진학 (2024) | false |
| 윤여림 | 2023 통합과정 | University of Minnesota 마케팅 박사 진학 (2023) | false |
| 곽유신 | 2022 석사 | Emory University 마케팅 박사 진학 (2022) | false |
| 윤여홍 | 2021 석사 | Emory University 마케팅 박사 진학 (2021) | false |
| 이지연 | 2021 석사 | 롯데면세점 입사 | false |
| 송혜신 | 2020 석사 | Georgia State University 마케팅 박사 진학 (2021) | false |
| 김상화 (Sanghwa Kim) | 2019 석사 | Maryland 박사 → **McMaster University, DeGroote — Asst. Prof. of Marketing** | true |
| 장연 (Jiang Yan) | 2018 석사 | University of Houston 마케팅 박사 진학 (2024) | false |
| 조우용 (Wooyong Jo) | 2017 석사 | Emory 박사(2022) → **Purdue University, Daniels School — Asst. Prof. of Marketing** | true |
| 김민경 (Mingyung Kim) | 2015 학사 | Wharton 박사(2017 진학) → **Ohio State University, Fisher — Asst. Prof. of Marketing** | true |
| 김지연 (Jeeyeon Kim) | 2014 석사, 2018 박사 | 대만 국립중산대 → **La Trobe University, LBS — Lecturer of Marketing** | true |

교수 임용 4명은 지도에서 골드 핀으로 강조. 애틀랜타 4명(김혜정·곽유신·윤여홍·송혜신)은 핀 하나로 묶어 툴팁에 목록 표시. 서울 핀 2명(이예령·이지연).

재학생 (현재 연구실 구성원) 5명 — 학교 페이지 기준(2026.08):
**김우경, 황인서, 나규원, 김정현, 오가령**
링크·사진·과정·이메일 등 상세정보 금지 (이름 + 확인된 공저 실적만). 지도 핀·배출 카운트에 포함하지 않음.

### 한국어 ↔ 영문 이름 매핑 (검증 완료)

| 한국어 | 영문 표기 | 한국어 | 영문 표기 |
|---|---|---|---|
| 김민경 | Mingyung Kim | 송혜신 | Hyeasinn Song |
| 조우용 | Wooyong Jo | 김우경 | Wookyoung Kim |
| 김상화 | Sanghwa Kim | 황인서 | Inseo Hwang |
| 김지연 | Jeeyeon Kim | 정현우 | Hyunwoo Jung |
| 이예령 | Yiling Li | 곽유신 | 미확인 |
| 장연 | Yan Jiang | 이지연 | 미확인 |
| 김혜정 | Hyejeong Kim | 나규원 | 미확인 |
| 윤여홍 | Yeohong Yoon | 김정현 | 미확인 |
| 윤여림 | Yeo Lim Yoon | 오가령 | 미확인 |

### 수상·연구비 (확정)

수상 **정확히 23건**, 연구비 **7건** — `src/data/awards.js`에 전체 수록 (연도 내림차순, 반올림 금지).
히어로 스탯 카드도 `수상 23건`으로 표기. 국제 수상 ★ 강조는 MSI Young Scholar(2015)·Buzzell MSI Best Paper(2013)·AMA TechSIG(2011)·Ackoff Award(2007–2009) 4건만.
한국어 수상명의 영문 표기는 잠정 번역 — `// TODO: 공식 영문 명칭 확인 후 교체` (glossary.md 참고).

### ⚠️ 동명이인 경고 (중요)

논문의 `Kim, Jikyung (Jeanne)`은 **제자 김지연(Jeeyeon Kim)이 아니다.** IE University 소속 외부 공동연구자.
해당 논문(Channel Stickiness 2021, Purchase Now and Consume Later 2020, Sentiment Change 2022,
Surprising Consequences 2024 등)을 김지연 실적에 배정하지 말 것.
또한 저자 표기가 이니셜뿐인 논문(예: 'Yoon, Y.' — 윤여홍/윤여림 불명, 'Kim, J.' — 김지연/김정현 불명)은
어느 학생에게도 배정하지 않는다.

## 현재 미완 항목 (TODO)

- KCI 전체 목록 미확보(33/50): 확인된 33편은 `publications.js`에 수록 완료. 나머지는 교수님 CV 확보 후 보완. 카운터는 "50+" 유지.
- 김혜정 2024 KCI 1건, 정현우 외 이니셜 저자 논문 등 배정 불확실 건: 교수님 확인 필요 (`alumni.js` 상단 주석 참고).
- 김지연(Jeeyeon Kim) 링크: 현재 ORCID. La Trobe Scholars 공식 프로필 URL로 교체 필요.
- 이예령 교수 소속 확정 필요 (고려대 디지털경영 / 화성의과학대 의료경영 — 학교 페이지 간 불일치). 확정 시 골드 핀 + 교수 카드로 승격.
- 재학생 명단 교수님 확인 후 갱신.

## 작업 방식

- 큰 변경 전에는 무엇을 바꿀지 먼저 요약해서 알려줄 것.
- 데이터와 UI 변경은 가능하면 분리해서 커밋.
- 커밋 메시지는 한국어로 간결하게.
