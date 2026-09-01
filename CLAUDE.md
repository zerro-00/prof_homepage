# CLAUDE.md

연세대학교 경영대학 **최정혜 교수(마케팅 전공)** 연구실 홈페이지 프로젝트.
기존 학교 기본 템플릿(https://ysb.yonsei.ac.kr/faculty.asp?mid=m02&uid=92)을 대체하는 독립 사이트.

## 설계 원칙 (교수님 피드백 — 모든 판단의 기준)

1. **이 사이트의 목적은 예쁨이 아니라 정보 전달이다.**
2. 방문자 대부분은 "이 사람은 무엇을 하는 사람인가"를 알러 온다.
   그다음이 산학협력 주제, 연구 분야, 제자 진로다.
3. 전달할 인상 네 가지: ① 유능한 학자 ② 연구를 잘한다 ③ 학생을 잘 키운다 ④ 산학협력이 활발하다
4. **어두운 배경은 글이 눈에 띄지 않아 정보 전달을 방해한다** → 밝은 배경으로 간다(24차).
5. 새 요소를 넣기 전 판단 기준은 하나다: **"이것이 정보 전달을 돕는가?"**
   아니면 넣지 않는다. 장식을 위한 장식을 추가하지 말 것.

기준 레퍼런스: 학교 공식 페이지 https://ysb.yonsei.ac.kr/faculty.asp?mid=m02&uid=92
— 흰 바탕 + 검정 본문 + 연세 블루 포인트, **면적을 색으로 칠하지 않는 구성.**

## 목표

처음 방문한 사람(예비 대학원생, 기업 관계자, 언론)이 이 연구실이 무엇을 하는 곳인지
빠르게 파악하게 하는 것. **제자 진출 세계지도**와 **논문 탐색 UI**가 핵심 자산이다.

## 기술 스택 / 명령어

- Vite + React + Tailwind CSS
- framer-motion (섹션 전환), react-simple-maps (세계지도), lenis (부드러운 휠 스크롤)
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

지도 하단 요약 배지 문구와 툴팁 하단 연구실 실적 문구는 i18n(`map.badges`, `map.statLine`)에서 수정한다.
각 인물(entry)에는 `personId`가 있으며, 실적은 `publications.js`의 `studentIds` 매핑으로만 계산된다 (수기 works 배열 금지).
지도 위 상시 텍스트는 지역명(`region`, 영문 공통) + 인원수(×N)만 — 사람 이름 라벨 금지.

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

## 스크롤 규칙 (19차 §4)

- `html { scroll-behavior: smooth }` + `prefers-reduced-motion` 예외 (index.css)
- **섹션 전환 시 최상단 이동은 `behavior: "instant"`** — 전환 애니메이션과 겹치지 않게. smooth 금지
- **섹션 내부 앵커 이동만 smooth** — `useAnchorScroll()` (common.jsx) 사용, 대상에 `scroll-mt-20`
  (통계 카드 → 제자 목록, 저널 선택 → 논문 목록)
- **관성 스크롤 라이브러리(lenis 등)를 쓰지 않는다 (19차 §4).** 브라우저 기본 휠 스크롤만.
  `scroll-snap`·커스텀 휠 핸들러·스크롤 위치에 연동된 transform(패럴랙스)도 만들지 말 것.
  섹션 진입 페이드(`.reveal`)는 IntersectionObserver 기반이라 스크롤 연동이 아니다 — 유지.
- 접힘 영역(수상 전체보기, 제자 실적, 저널 `그 외`)은 `Collapse` 컴포넌트 —
  `max-height` 300ms 전환 + 닫힌 동안 `visibility: hidden`(탭 포커스 제외)

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
- 단복수가 갈리는 문구(논문 편수, 공저 실적 수)는 i18next 단복수 키(`_one`/`_other`)를 쓰고
  `t(key, { count })`로 호출한다. 4개 언어 모두 두 키를 두어야 키 검사를 통과한다.
- **15차에서 EN/ZH/JA 전수 검수 완료.** 언어별 관례어·직위·표기 규칙은 `glossary.md`의
  "언어별 표기 규칙" 절을 기준으로 삼는다. 학회·기관·건물 공식 영문명은 같은 파일 "확인 완료" 표 참조.

## 논문 링크 규칙

- 논문 카드 전체가 원문 링크 (`<a target="_blank">`). `paperUrl()` (`src/data/publications.js`) 사용.
- DOI가 있으면 `https://doi.org/{doi}`, 없으면 폴백: KCI → KCI 포털 검색, SSCI → Google Scholar 검색.
- **DOI를 추측해서 만들지 말 것.** 확인된 DOI만 `doi` 필드에 추가 (현재 10건 확인).

## 논문 섹션 규칙

`키워드별 보기` / `저널별 보기` 토글 2개 + `전체 / SSCI / KCI` 타입 토글 (기본 `전체`).
- SSCI·KCI가 같은 스키마(`type` 필드로 구분)로 두 뷰에서 함께 검색·필터링됨
- 키워드별: 키워드 칩 → 해당 논문 카드 목록
- 논문 카드는 두 뷰에서 동일 컴포넌트 재사용, SSCI/KCI 태그 색 구분

### 저널별 보기 구조 (15차 확정 — 칩 나열로 되돌리지 말 것)

**SSCI / KCI 2단 그룹 + 좌측 목록 / 우측 논문 마스터-디테일.** 데이터는 `groupJournalsByType()`.
- 그룹은 `type`으로 나누고 헤더에 그룹 총 편수 표시
- 각 그룹에서 **3편 이상(`PRIMARY_MIN_COUNT`)은 편수 내림차순 상시 노출**,
  2편 이하는 `그 외 N개` 접힘 항목(펼치면 가나다·알파벳순)
- 행 = 저널명 · 편수 · 얇은 비율 바(그룹 내 최대 편수 대비). **칩/알약 테두리 금지** — 프로필과 같은 리스트 언어
- `tier: "top"` 논문이 실린 저널은 저널명 옆에 골드 ★ (`TopStar` — 수상 섹션·제자 실적과 동일 컴포넌트)
- 선택 행은 좌측 포인트 컬러 바 + 텍스트 강조. 우측 상단에 `저널명 · N편` + 기존 연도/키워드 필터
- 타입 토글은 좌측 그룹을 필터링. 초기 선택은 편수 최다 저널(JBR)
- 선택은 URL 해시 `#publications?journal=...`로 유지(`history.replaceState` — 뒤로가기는 이전 섹션으로).
  `getSectionFromHash()`는 `?` 앞부분만 보고 섹션을 판정한다.
- **모바일(<768px)**: 좌측 목록이 SSCI/KCI 아코디언 2개가 되고, 저널을 고르면 아코디언이 닫히며
  논문 목록으로 스크롤. `← 저널 목록` 버튼으로 복귀

**논문 3줄 요약은 비전공자(고등학생 수준)가 이해할 수 있는 쉬운 한국어로.**

## 절대 하지 말 것 (중요)

- **논문 요약에 없는 내용을 지어내지 말 것.** 제목과 저널 성격에서 합리적으로 읽히는 수준까지만. 구체적 수치·결론·효과 크기를 창작 금지.
- **제자 이름·소속·링크를 추측해서 만들지 말 것.** 확인되지 않은 제자는 "졸업생"으로 익명 유지. URL을 임의로 조합하거나 추정하지 말 것.
- 제자의 이메일·전화번호·사진 게재 금지. 공개된 학교 공식 프로필 링크만.
- 연세대 로고·엠블럼 사용 금지. 텍스트로만 "Yonsei School of Business" 표기.
- 교수 프로필 사진은 **교수님 제공 사진(2026.08)** 사용, 임의 교체 금지. 외부 이미지 가져다 쓰지 말 것.
  `public/profile.jpg`(800×1200, q90) + `public/profile.webp`를 `<picture>`로 webp 우선 제공.
  그레이스케일·어두운 오버레이 금지 — 항상 풀컬러. `object-fit: cover; object-position: center top`.

## 확정된 사실 (임의 변경 금지)

교수 프로필:
- Ph.D. Wharton School, University of Pennsylvania / M.S., B.S. KAIST
- 경영관 537 · 02-2123-6575 · jeonghye@yonsei.ac.kr

졸업생 13명 전원 — 연세대 공식 페이지에서 실명 확인 완료 (연도 역순):

| 이름 | 졸업 | 진출 | isFaculty |
|---|---|---|---|
| 이예령 (Li Yiling / Yiling Li) | 2025 박사 | **고려대학교 세종캠퍼스 융합경영학부 디지털경영전공 — 교수** (학교 공식 교수소개 확인, 2026.08.31) | true |
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

교수 임용 **5명**(해외 4 · 국내 1)은 지도에서 골드 핀으로 강조. 애틀랜타 4명(김혜정·곽유신·윤여홍·송혜신)은 핀 하나로 묶어 툴팁에 목록 표시.
이예령은 **세종 핀**(SEJONG, KOREA · 골드), 서울 핀은 이지연 1명. 서울↔세종은 투영 좌표상 3.7px로 겹쳐
지도에서 6px 벌리고 1px 선으로 실제 좌표와 연결한다.
화면 그룹 인원: 교수 임용 5 · 박사과정 7 · 기업 1 (합계 13) — `check-authorship.mjs` 규칙 7이 강제.

재학생 (현재 연구실 구성원) **4명** — 교수님 확인 완료(2026.08.31, 15차):
**김우경, 황인서, 오가령, 김연정**
링크·사진·과정·이메일 등 상세정보 금지 (이름 + 확인된 공저 실적만). 지도 핀·배출 카운트에 포함하지 않음.

⚠️ **김정현·나규원은 인물 id 자체가 삭제됐다(15차).** 진출처가 확인되지 않아 명단·지도·실적 어디에도 넣지 않는다.
단 김정현은 2026 아식스 논문(마케팅관리연구)의 실제 공저자이므로 해당 논문의 `authors`에는 사실 그대로 남아 있고,
`studentIds`에는 `hwang-inseo`만 들어간다. 교수님 확인 전까지 되살리지 말 것.

⚠️ **김연정(`kim-yeonjeong`) 실적은 0편이다.** 동명이인이 매우 많아 KCI/DBpia로 특정할 수 없어 어떤 논문도 배정하지 않았다.
`check-authorship.mjs`의 `PERSON_NAMES`에 표기를 등록하지 않았으므로 배정을 시도하면 규칙 5에서 빌드가 실패한다(의도된 잠금).
본인 KCI 연구자번호(KRI) 또는 CV로 **교수님과의 공저** 논문이 확인되면 그때 `PERSON_NAMES`/`EXPECTED`를 함께 갱신할 것.
가톨릭대 재학 시절 단독·타 교수 공저 논문은 이 사이트(교수님 논문 목록)의 범위 밖이다.

### 한국어 ↔ 영문 이름 매핑 및 인물 id (검증 완료)

| 한국어 | 영문 표기 | id | 한국어 | 영문 표기 | id |
|---|---|---|---|---|---|
| 김민경 | Mingyung Kim | `kim-mingyung` | 송혜신 | Hyeasinn Song | `song-hyeasinn` |
| 조우용 | Wooyong Jo | `jo-wooyong` | 김우경 | Wookyoung Kim | `kim-wookyoung` |
| 김상화 | Sanghwa Kim | `kim-sanghwa` | 황인서 | Inseo Hwang | `hwang-inseo` |
| 김지연 | Jeeyeon Kim | `kim-jeeyeon` | 정현우 | Hyunwoo Jung | `jung-hyunwoo` |
| 이예령 | **Li Yiling** | `li-yiling` | **오가령** | **Wu Jialing** | `wu-jialing` |
| 장연 | Yan Jiang | `jiang-yan` | 곽유신 | 미확인 | `kwak-yushin` |
| 김혜정 | Hyejeong Kim | `kim-hyejeong` | 이지연 | 미확인 | `lee-jiyeon` |
| 윤여홍 | Yeohong Yoon | `yoon-yeohong` | 윤여림 | Yeo Lim Yoon | `yoon-yeolim` |
| **김연정** (재학생) | 미확인 | `kim-yeonjeong` | | | |

### 학생 실적 연결 원칙 (중요)

**학생 실적은 `publications.js`의 논문별 `authors` 배열 + `studentIds`(id 매칭)로만 연결한다. 이름 문자열 추론 절대 금지.**
- `authors`/`studentIds`가 없는 논문은 저자 미확인 → 어떤 학생에게도 연결하지 않음
- **`studentIds`가 있으면 `authorSource`(저자 표기를 확인한 출처)가 반드시 있어야 한다.** 근거 없는 배정은 빌드 실패.
- 화면의 실적은 `worksForStudent(personId)`로 계산 (수기 works 배열 없음)
- `scripts/check-authorship.mjs`가 `npm run build`에서 다음 6가지를 강제한다:
  1. 전체 편수 SSCI 37 · KCI 42 · 저서 4
  2. 학생별 SSCI/KCI/저서 편수 = 아래 확정 편수표
  3. `studentIds`가 있는데 `authorSource`가 없으면 실패
  4. 미등록 `studentId` 사용 시 실패
  5. `studentIds`의 인물이 스크립트 내 `PERSON_NAMES`의 **확정 표기 그대로** `authors`에 있어야 함
     (→ `Jikyung (Jeanne) Kim`을 김지연으로 배정하는 등 동명이인 오배정이 기계적으로 차단됨)
  6. `wu-jialing`(오가령) 배정 논문에는 반드시 `오가령`/`Wu Jialing` 표기가 있을 것

#### 학생별 확정 편수 (14차 §3-6 + 15차 명단 정리 — 임의 변경 금지)

| 학생 | id | SSCI | KCI | 저서 | 합계 |
|---|---|---|---|---|---|
| 이예령 | `li-yiling` | 4 | 10 | 0 | 14 |
| 김지연 | `kim-jeeyeon` | 5 | 4 | 1 | 10 |
| 조우용 | `jo-wooyong` | 5 | 3 | 0 | 8 |
| 김상화 | `kim-sanghwa` | 2 | 3 | 0 | 5 |
| 김민경 | `kim-mingyung` | 2 | 2 | 1 | 5 |
| 김혜정 | `kim-hyejeong` | 1 | 4 | 0 | 5 |
| 황인서 (재학생) | `hwang-inseo` | 1 | 3 | 0 | 4 |
| 김우경 (재학생) | `kim-wookyoung` | 1 | 2 | 0 | 3 |
| 정현우 | `jung-hyunwoo` | 0 | 3 | 0 | 3 |
| 윤여홍 | `yoon-yeohong` | 3 | 0 | 0 | 3 |
| 윤여림 | `yoon-yeolim` | 1 | 2 | 0 | 3 |
| 곽유신 | `kwak-yushin` | 0 | 2 | 0 | 2 |
| 장연 | `jiang-yan` | 1 | 1 | 0 | 2 |
| 송혜신 | `song-hyeasinn` | 1 | 0 | 0 | 1 |
| 오가령 (재학생) | `wu-jialing` | 0 | 1 | 0 | 1 |
| 이지연 | `lee-jiyeon` | 0 | 0 | 0 | 0 |
| 김연정 (재학생) | `kim-yeonjeong` | 0 | 0 | 0 | 0 |

저자 확정 논문은 총 55건(SSCI 28 · KCI 26 · 저서 1). 나머지는 저자 미확인 → 배정 금지.

### 수상·연구비 (확정)

수상 **정확히 23건**, 연구비 **7건** — `src/data/awards.js`에 전체 수록 (연도 내림차순, 반올림 금지).
히어로 스탯 카드도 `수상 23건`으로 표기. 국제 수상 ★ 강조는 MSI Young Scholar(2015)·Buzzell MSI Best Paper(2013)·AMA TechSIG(2011)·Ackoff Award(2007–2009) 4건만.
한국어 수상명의 영문 표기는 잠정 번역 — `// TODO: 공식 영문 명칭 확인 후 교체` (glossary.md 참고).

### ⚠️ 동명이인 경고 (중요)

- **이예령(Li Yiling, 졸업생 2025 박사)과 오가령(Wu Jialing, 재학생)은 완전히 다른 인물이다. 절대 섞지 말 것.**
- 논문의 `Kim, Jikyung (Jeanne)`은 **제자 김지연(Jeeyeon Kim)이 아니다.** IE University 소속 외부 공동연구자.
  해당 논문(Channel Stickiness 2021, Purchase Now and Consume Later 2020, Sentiment Change 2022,
  Surprising Consequences 2024 등)을 김지연 실적에 배정하지 말 것.
- 저자 표기가 이니셜뿐인 논문(예: 'Y. Yoon' — 윤여홍/윤여림 불명, 'J. Kim' — 특정 불가)은
  어느 학생에게도 배정하지 않는다.
- 그 외 배정 금지 표기: `Hye-jin Kim`(김혜정과 다를 수 있음) · `Jae Yeon Yoon`(윤여홍·윤여림 아님) ·
  `Sang Jin Kim`(김상화 아님) · `H. Kim`.
- 2026 인플루언서 논문(경영정보학연구)의 저자는 **이예령·오가령·최정혜**다. 김우경·정현우가 아니다.
- **김연정(재학생)과 김지연(`kim-jeeyeon`, La Trobe 교수)은 다른 인물이다.** 김연정에게는 어떤 논문도 배정하지 않는다.

## 확정 편수 (임의 변경 금지)

**SSCI 37편 · KCI 42편 · 저서 4권. 수상 23건 · 연구비 7건.**
히어로 카운터는 정확 편수 표기 (`40+`, `50+` 같은 어림 표기 금지).

## 현재 미완 항목 (TODO)

- **저자 미확인 논문 25편** — `authorSource` 없는 항목. 확인 시 `authors`/`studentIds`/`authorSource`를 함께 추가하고
  `check-authorship.mjs`의 EXPECTED를 그만큼 올릴 것.
  - SSCI 9편: Free Versus Paid OTT(2026), The Price of Prestige(2026), Opening up OTC(2022),
    Digital Consumers' Well-being(2021), Celebrity Endorsement(2019), Offline Social Interactions(2019),
    Traditional and IS-Enabled(2012), What Matters Most(2012), Spatiotemporal Analysis(2010)
  - KCI 16편: 상권 내 유통 채널 경쟁 PB(2026), 프랜차이즈 가맹 본부 위기(2026), 음식 배달 앱(2025),
    메타버스 마케팅(2025), Who Considers Leaving a Job(2022), 날씨불쾌감(2020), 온라인 게임 규제(2016),
    지역 특수성(2016), 매장 내·외부 환경(2016), 게임 머니와 캐시 머니(2016), 소비자의 지역 이주(2015),
    오프라인과 온라인 채널상의 기존제품(2015), 소셜미디어 연구동향(2014), 인터넷 포탈(2014),
    온라인 게임 고객 유형별 이탈(2014), 이용자 생산 콘텐츠 플랫폼(2013)
  - 참고: `Click, Sign-up and Purchase`(2025)는 저자가 이니셜 표기라 `authors`는 있으나 학생 배정 없음.
- **`직장 내 스트레스원과 긍정 정서…` 발행연도**: 학교 페이지 2023 / 공저자(도보람 교수) 공식 페이지 2022 22(1).
  현재 2023 유지 + 코드에 TODO. KCI 포털 권호 확인 필요.
- **고려대 공식 프로필 URL**: 이예령 `link: null`. 확인 후 추가 (URL 추측 금지).
- 김지연(Jeeyeon Kim) 링크: 현재 ORCID. La Trobe Scholars 공식 프로필 URL로 교체 필요.
- ~~재학생 명단~~ → **15차에서 4명(김우경·황인서·오가령·김연정)으로 확정. 해소됨.**
- **김연정 공저 실적**: 현재 0편. 본인 KCI 연구자번호(KRI) 또는 CV 확보 후 교수님과의 공저 논문만 추가.
- **김정현·나규원 진출처**: 미확인이라 인물 id를 삭제했다. 확인되면 졸업생/재학생 어느 쪽인지부터 정하고 복원할 것.
- **지도 배지 `해외 박사과정 진학 8명`**: 이예령이 교수로 승격되면서 실제 박사과정 그룹은 7명이 됐다.
  14차 지령이 8을 명시해 그대로 뒀고 15차에서도 지시가 없어 유지. 배지 ↔ 목록 불일치. 교수님 확인 후 7로 조정 검토.
- **대학·학회 내부 시상의 공식 영문명**: 우수교수상·우수강의상·연세학술상·초헌학술상·상전유통학술상 등은
  공개된 공식 영문명을 찾지 못해 잠정 표기 유지 (15차 확인). 학회·NRF·건물명은 확인 완료(glossary.md).
- **상공회의소 유통물류진흥원 영문명**: 상위기관 KCCI만 공식 확인. 진흥원 자체 영문명은 대외적으로
  "GS1 Korea"만 노출돼 서술형(`Distribution & Logistics Promotion Institute, KCCI`) 유지.

## 작업 방식

- 큰 변경 전에는 무엇을 바꿀지 먼저 요약해서 알려줄 것.
- 데이터와 UI 변경은 가능하면 분리해서 커밋.
- 커밋 메시지는 한국어로 간결하게.

## ⚠️ 이 브랜치는 `design-dark` — 다크 비교본

교수님께 밝은 버전(`main`)과 나란히 보여드리기 위한 **색 비교본**이다.

- **`main`과 컴포넌트·데이터·i18n이 100% 동일하고 `src/index.css`만 다르다.**
  `git diff main design-dark --stat`이 `src/index.css` + `CLAUDE.md`만 나와야 한다.
- 기능·구조 변경은 **반드시 `main`에서 먼저 하고 여기로 머지**한다.
  ⚠️ **머지가 fast-forward로 처리되면 다크 팔레트까지 덮인다.**
  머지 후 반드시 `git checkout <직전 다크 커밋> -- src/index.css`로 색을 되돌리고
  `--color-surface-0`이 `#041a33`인지 확인할 것.
- 다크 팔레트: 표면 `#041A33` / `#072744` / `#0C3055` / `#12406E`,
  본문 `#F5F7FA`, 보조 `#A8BCD2`, 포인트 `#8FC3F0`, 골드 `#C6A15B`,
  그레인 2.8% + 비네트 8%.
- **한쪽에만 반영하고 끝내지 말 것** — 두 링크의 내용이 어긋나면 비교가 불가능하다.

## 보류 항목 (24차 §9 — 교수님 확인 후 별도 진행)

지금 하지 않는다. 지시 없이 착수하지 말 것.
- **산학협력 독립 섹션 신설** — 기업 담당자가 가장 찾는 정보이나 현재는 프로필 안에 숫자로만 있다.
  학교 페이지에 있는 내용만으로 섹션을 만들 수 있는지 먼저 확인해야 한다.
- **섹션 순서 변경** (산학협력을 앞으로 올리는 안)
- **영문 kicker 문구 변경** (`SKILL SET` → `연구·강의 분야` 등)

### data-surface 훅

`Hero`(히어로 field / 프로필 상세 paper) · `Interests`(paper) · `StudentsSection`(field) ·
`Publications`(paper) · `Awards`(field) · `footer`(deep)에 `data-surface` 속성이 있다.
**v1에서는 아무 스타일도 붙지 않아 겉모습에 영향이 없다.** v3가 이 훅만으로 면을 칠한다.

## 색 토큰 규칙

컴포넌트에는 hex·rgba를 **직접 쓰지 않는다.** `src/index.css`의 `@theme`(Tailwind 유틸리티)과
`:root`(SVG 지도·글로우·명단 패널 등 var() 전용) 두 블록이 색의 유일한 출처다.
지도 SVG도 `style={{ fill: "var(--map-land)" }}` 형태로 토큰을 참조한다.

### 팔레트 — 학교 페이지 계열 (24차 §4)

**컴포넌트는 토큰만 참조한다.** `src/index.css`의 `@theme`과 `:root`가 색의 유일한 출처다.

| 토큰 | 값 | 용도 | 대비 |
|---|---|---|---|
| `--color-surface-0` | `#FFFFFF` | 페이지 배경 | — |
| `--color-surface-1` | `#F7F8FA` | 섹션 교대 면 (아주 옅게) | — |
| `--color-surface-2` | `#FFFFFF` | 카드 — 괘선으로만 구분 | — |
| `--color-surface-3` | `#F0F4F9` | 카드 hover·선택 행 | — |
| `--color-line` | `#E2E6EB` | 1px 괘선 | — |
| `--color-line-strong` | `#C8CFD8` | 강한 괘선·비율 바 | — |
| `--color-ink-100/300` | `#1A1A1A` | 본문 | **16.1:1** |
| `--color-ink-500/600` | `#5A6472` | 보조 | **5.9:1** |
| `--color-accent-300/400` | `#003876` | 연세 블루 — 제목 강조·링크·활성 언더라인 | **11.6:1** |
| `--color-accent-500` | `#0A4A85` | hover | **9.0:1** |
| `--color-accent-600` | `#E8EEF5` | 선택 행 배경 — 비텍스트 | — |
| `--color-gold-*` | `#7A6031` | 교수 임용·수상 강조 | **5.9:1** |

**적용 규칙**
- **큰 면을 파랑으로 칠하지 말 것.** 파랑은 글자·선·아이콘에만 쓴다.
- **네비**: 흰 바탕 + 하단 1px 괘선 + 검정 글씨. 활성 탭은 `#003876` 2px 언더라인. 푸터도 흰 바탕.
- **카드**: 배경색 없음, 1px 괘선으로만 구분. **그림자 없음.** hover는 `#F0F4F9` 배경 전환.
- **논문 좌측 목록**: 선택 행 배경 `#E8EEF5` + 좌측 3px `#003876` 바.
- **SSCI/KCI**: SSCI `#003876`, KCI `#7A6031`. 알약 배지 대신 좌측 3px 바 + 텍스트.
- **지도**: 대륙 `#E8EEF5`, 국경 `#C8CFD8`, 일반 핀 `#003876`, 교수 핀 `#7A6031`.
- ⚠️ **밝은 골드 `#C6A15B` 사용 금지** — 흰 배경에서 2.4:1로 읽히지 않는다. 반드시 `#7A6031`.
- 위 대비값은 실측치다. **재계산하지 말 것.**

### 밝은 배경에서 걷어낸 효과 (24차 §5 — 되살리지 말 것)

어두운 배경을 전제로 넣었던 표현들이다. 흰 바탕에서는 얼룩처럼 보여 전부 껐다.

| 제거한 것 | 처리 방식 |
|---|---|
| 그레인(노이즈) 오버레이 | `--grain-opacity: 0` |
| 비네트 | `--vignette: transparent` |
| 히어로 글로우 | `--hero-glow: transparent` |
| 히어로 사진 뒤 발광 원 | `.blur-md { display: none }` |
| 카드 hover 발광 | 컴포넌트에서 `hover:bg-surface-3` 배경 전환으로 교체 |
| 카드 그림자 | `box-shadow: none` |
| 배경 그라디언트 | `body`는 `surface-0` 단색 |
| 섹션 경계 골드 헤어라인 | 제거 (1px 괘선만 남김) |
| 지도 호 순차 드로잉 | 선은 남기고 애니메이션만 정지 (`.arc-line`, `.pin-pop`) |

**히어로 그리드 패턴은 `#F0F3F7` 선으로 아주 옅게 남겼다** — 히어로에만 있고,
본문 가독성을 해치지 않는 선에서 여백이 허전해 보이지 않게 하는 최소한의 장치다.

## 논문 탐색 3뷰 (22차 §3)

상단 토글 `키워드별 | 저널별 | 방법론별`. **세 뷰가 `MasterDetail`·`ListRow`·`PaperList`·
`SubFilterBar`를 그대로 공유한다.** 뷰마다 레이아웃을 다르게 만들지 말 것.

- 서브 필터는 `useSubFilter(papers, primaryKind)` + `SubFilterBar` 하나로 통일 —
  키워드 뷰는 `저널 · 연도`, 저널·방법론 뷰는 `키워드 · 연도`
- **드롭다운 2개 한 줄(높이 40px)이다. 알약 나열로 되돌리지 말 것 (24차 §6)** —
  저널이 30개라 알약으로 펼치면 화면을 뒤덮어 첫 논문 카드가 화면 밖으로 밀린다.
  항목마다 편수를 붙이고(저널·키워드는 편수 내림차순, 연도는 최신순),
  선택하면 우측에 해제용 칩이 붙는다. 두 필터는 독립이고 AND로 걸린다.
- 좌측 선택이 바뀌면 `sub.reset()`으로 서브 필터 초기화
- URL: `?view=method&method=field-experiment` (`readViewParam`/`writeViewParams`)
- 검색어는 세 뷰 모두에 AND로 걸리고, 검색 대상에 방법론 이름이 포함된다
- 페이지당 **4편** (`PAGE_SIZE`). 저서는 페이지네이션 대상이 아니다

### 방법론 taxonomy 9종 (22차 §3-2 — 새 값을 만들지 말 것)

`METHODS`(`src/data/publications.js`). 논문의 `methods: []` + `methodSource`로 관리한다.

| 키 | 한국어 |
|---|---|
| `field-experiment` | 현장실험 |
| `causal-inference` | 인과추론 |
| `econometric-model` | 계량모형·회귀분석 |
| `machine-learning` | 머신러닝·예측모형 |
| `text-image-analysis` | 텍스트·이미지 분석 |
| `log-panel-data` | 로그·패널 데이터 분석 |
| `survey-lab-experiment` | 설문·실험실 실험 |
| `meta-analysis` | 메타분석 |
| `case-study` | 사례연구 |

**분류 규칙 (중요)**
- **제목·초록·기존 요약문에 명시된 근거가 있을 때만** 부여한다. 추측 금지
- 근거는 `methodSource`에 짧게 남긴다 — 예: `"제목 명시(A Field Experiment)"`
- 근거가 없으면 **빈 배열이 정답**이다. 억지로 채우지 말 것
- 빈 배열 편수는 좌측 목록 맨 아래에 `분류 예정 N편`으로 **감추지 않고** 보여준다
- 22차 기준: 분류 22편(로그·패널 7 · 텍스트·이미지 5 · 계량 4 · 현장실험 2 · 머신러닝 2 ·
  인과추론 1 · 메타분석 1 · 사례연구 1) / **분류 예정 57편**

## 저널 위상 정렬 (§2-2)

`JOURNAL_RANK`(`src/data/publications.js`)로 저널을 rank 1~3으로 나눈다.
정렬은 **rank 오름차순 → 편수 내림차순 → 가나다/알파벳순**. 목록에 없는 저널은 rank 3 + 콘솔 경고.
- 저널명 옆 **★를 쓰지 않는다.** 위상은 "위에 있다"는 순서로만 표현한다.
  (논문의 `tier` 필드는 카드 배지에서 계속 사용하므로 건드리지 말 것)
- 그룹별 상위 6개 노출, 나머지는 `그 외 N개 학술지`로 접는다.
- **접힘 버튼은 DOM에서 접힘 목록 뒤에 둔다** — 펼쳐도 버튼이 항상 목록 맨 아래에 남아야 한다.

## 제자 진출 지도 (19차 §3 — 확대 규격)

- **투영**: `geoNaturalEarth1`, viewBox **1120×650**, `scale: 240`, `center: [15, 12]`.
  남극(Antarctica)은 `Geographies`에서 필터링한다.
  이 값에서 모든 핀이 여백 안에 든다 (휴스턴 x172 ~ 멜버른 x998, y185~536).
  ⚠️ 투영·scale·center를 바꾸면 라벨 오프셋도 전부 다시 잡아야 한다.
- **full-bleed**: `xl`(1280px) 이상에서 `mx-[calc(50%-50vw)]`로 컨테이너 마진을 풀고
  남는 폭을 지도가 전부 가져간다. 명단 패널은 **260px**.
  지도 영역 최소 높이 `xl` 620px / 1440px 이상 720px, 모바일 340px.
  (body가 `overflow-x: hidden`이라 50vw 계산으로 가로 스크롤이 생기지 않는다)
- **도시 라벨 15px**(weight 500, 1px 외곽), 색 `--map-label`. 핀 반지름 7px /
  교수 임용 8px + 외곽 링 11px / hover 9.5px. 겹침 판정 11px · 분리 8px.
  ⚠️ 라벨이 커져 미 동부(오하이오·인디애나·온타리오·펜실베이니아·조지아)가 쉽게 겹친다.
  `alumni.js`의 `labelDx/labelDy`는 15px 기준으로 손으로 배치한 값이다 —
  폰트 크기나 투영을 바꾸면 렌더 후 경계상자로 겹침을 다시 확인할 것.
- **호(arc)**: 서울 → 해외 8개 도시. 가까운 곳부터 120ms 간격, 500ms씩 그려 총 1.34초.
  선 1.2px / 기본 28%(교수 임용 36%), hover 시 해당 선만 60% 나머지 8%.
  국내(서울·세종·연세)는 거리가 짧아 호를 그리지 않는다.
  `sessionStorage("alumni-arcs-drawn")`로 재진입 시 생략, `prefers-reduced-motion`이면 즉시 최종 상태.
- ⚠️ **대권(geoInterpolate)을 쓰지 말 것.** 서울↔북미 대권이 북극을 지나
  NaturalEarth1 투영에서 지도 밖으로 빠져나가 가로줄처럼 잘린다.
  투영 좌표에서 중점을 들어 올리는 2차 베지에를 쓴다.
- ⚠️ **드로잉을 rAF 상태 전환으로 만들지 말 것.** 배경 탭에서 rAF가 멈추면 선이 아예 안 그려진다.
  CSS 애니메이션(`.arc-line`, `.pin-pop`)으로 처리한다.
- **탭**: `전체 17`(졸업생 13 + 재학생 4)이 기본 선택. 전체일 때 명단은 그룹 헤더로 구분.
- **재학생 핀**: `MEMBERS_PIN`(연세대 신촌)에 외곽선만 있는 중공 원.
  졸업생 집계(`CITY_PINS`)에는 넣지 않는다 — `check-authorship` 규칙 7이 13명을 강제한다.
- 겹치는 핀은 벌리고 1px 선으로 실제 좌표와 연결한다.
  이때 **라벨 오프셋도 이동 방향 바깥으로 밀어야** 두 라벨이 교차하지 않는다(서울↔세종·연세).

## 실적 → 논문 필터 링크 (§5)

명단·카드의 실적 배지는 버튼이고, 클릭하면 논문 섹션으로 이동해 해당 제자의 공저 논문만 남긴다.
**외부 URL을 만들지 않는다. 사이트 내 필터 이동이다.**
- URL 규칙: `?lang=ko&student=<personId>[&type=SSCI|KCI]#publications`
- `App.jsx`의 `readStudentFilter`/`writeStudentFilter`가 파싱·기록을 담당하고 `history.replaceState`로 남긴다
- 첫 진입 URL에 `student`가 있으면 논문 섹션을 연다
- 저서 블록도 필터를 따르며, 해당 제자의 저서가 없으면 숨긴다

## 논문 → 제자 링크 (19차 §5-2)

논문 카드의 **저자 목록에서 제자 이름만 버튼**이고, 클릭하면 제자 진출 섹션으로 이동해
명단 행과 지도 핀을 강조한다. 외부 공동연구자는 일반 텍스트다.
- URL 규칙: `?lang=ko&person=<personId>#alumni` (`readPersonFocus`/`writePersonFocus`, `replaceState`)
- 링크 판정은 `publications.js`의 `authorsWithLinks(paper)` —
  **이름 문자열로 추론하지 않는다.** 이미 확정된 `studentIds`에 든 인물에 한해,
  그 인물의 `nameKo`/`nameEn`(영문은 성-이름 순서가 뒤바뀐 표기까지)과
  **정확히 일치하는** 저자 문자열만 링크가 된다.
  → `Jikyung (Jeanne) Kim` 같은 동명이인은 구조적으로 링크되지 않는다.
- 논문 카드는 전체가 원문 링크(`<a>`)이므로 **저자 줄은 앵커 바깥**에 둔다
  (앵커 안에 버튼을 넣으면 마크업이 깨진다).
- 안내문은 명단 하단(`students.worksHint`)과 논문 섹션 하단(`pubsUI.authorHint`)에 4개 국어로.
  논문 섹션 하단에는 저자 확인 범위 각주(`pubsUI.authorNote`)도 함께 둔다.

## 공유 메타데이터 (19차 §10-①)

학교 공식 프로필에서 링크되므로 카톡·메일·SNS 미리보기가 비면 안 된다.
- `index.html`에 한국어 기준 `title`·`description`·OG·Twitter Card·`canonical`·`hreflang`(4개 언어)·
  JSON-LD `Person`이 정적으로 들어 있고, 언어를 바꾸면 `src/i18n/index.js`의 `syncMeta()`가
  `meta.title`/`meta.description`/`meta.ogLocale` 키로 다시 쓴다.
- `public/og-image.png`(1200×630)는 히어로 사진 + 이름 + 소속으로 만든 정적 이미지다.
  프로필 사진을 교체하면 이 이미지도 다시 만들 것.
- favicon은 `public/favicon.svg`(연세 블루 배경에 `JC`) + `favicon-32.png` + `apple-touch-icon.png`.

## 인쇄 (19차 §10-③)

`index.css`의 `@media print` — 배경·발광 제거, 검정 텍스트, 네비/푸터/버튼/지도 숨김,
접힘 영역 전체 펼침, 외부 링크 뒤에 URL 표기.

## 새 논문 추가 체크리스트 (19차 §10-⑤)

1. **원문(출판사 페이지·Crossref)에서 저자 full name 확인.** 이니셜만 있으면 학생 배정 금지.
2. `authorSource`에 확인 출처를 남긴다 — 없으면 `check-authorship` 규칙 3에서 빌드 실패.
3. `authors`(원문 표기 그대로) + `studentIds`(확정 인물만) 기입.
   `PERSON_NAMES`에 등록된 표기와 정확히 일치해야 규칙 5를 통과한다.
4. 저널이 `JOURNAL_RANK`에 있는지 확인. 없으면 rank 3 + 콘솔 경고가 뜬다.
5. `check-authorship.mjs`의 전체 편수와 `EXPECTED` 학생별 편수를 함께 갱신.
6. `npm run build`로 `check-authorship`·`check-i18n`을 모두 통과시킨다.

## 저서 링크 (§6-3)

실제로 열리는 페이지만 링크했다. **추측 URL 금지.**

| 저서 | 링크 | 확인 |
|---|---|---|
| 비대면 시대 바르고 건강하게 살기 (2020) | 알라딘 `ItemId=261794617` | 저자 13인 일치. 알라딘 표기 발행처는 이담북스(한국학술정보 임프린트) |
| 자동차 자율주행 규제 완화 고용영향평가 연구 (2016) | KLI Repository `2021.oak/9392` | 저자 4인·ISBN 9791126001422 확인. 봇 요청을 403으로 막아 브라우저로 확인 |
| 기술혁신에 따른 지역간 정보격차 (2015) | 알라딘 `ItemId=55881815` | 집문당 2015, 저자 3인 확인 |
| 고객네트워크전략 (2013) | 알라딘 `ItemId=25048829` | 박영사 2013, ISBN 9788964543597 확인 |

## 남은 TODO

- **김연정 영문 표기 미확인** — `nameEn: null` 유지. 추측 금지.
  (곽유신은 JBR 2026 OTT 논문의 Crossref 메타데이터에서 `Youshin Kwak`으로 확정됐다 — 해소)
- **김연정 공저 실적 0편** — 가톨릭대 재학 시절 논문을 찾으려 했으나 동명이인이 많아 특정 불가.
  DBpia 저자 페이지 목록은 "추정"이라 다른 분야 논문이 섞여 있어 근거로 쓸 수 없다.
  KCI 연구자번호 또는 논문 제목이 확보되면 추가하되, **교수님 공저가 아니므로 논문 목록 섹션에는 넣지 않는다**
  (그 섹션은 교수님 논문 목록이다). 명단에 `이전 연구 N편` 형태 표기를 검토.
  `check-authorship.mjs`의 `PERSON_NAMES`에 표기를 등록하지 않아 임의 배정은 빌드에서 실패한다.
### 저자 미확인 13편 (22차 §1-2 — 제목 그대로)

Crossref에 레코드가 없어 저자를 확인하지 못했다. `authorSource` 없이 두고 **`studentIds`를 배정하지 않는다.**
자세한 근거는 `docs/authorship-verification.md`.

| 유형 | 연도 | 제목 | 저널 |
|---|---|---|---|
| SSCI | 2012 | What Matters Most in Internet Retailing | MIT Sloan Management Review |
| KCI | 2026 | 상권 내 유통 채널 경쟁이 PB 판매 성과에 미치는 영향: 편의점–프랜차이즈 슈퍼마켓을 중심으로 | 프랜차이징저널 |
| KCI | 2026 | 프랜차이즈 가맹 본부의 위기가 포트폴리오 성과에 미치는 영향 분석 | 프랜차이징저널 |
| KCI | 2023 | 스포츠 구단의 경기 실적 및 소셜미디어 운영이 팬덤의 인게이지먼트에 미치는 영향: 팬 토큰의 조절 효과를 중심으로 | 지식경영연구 |
| KCI | 2022 | 숏폼 브랜디드 콘텐츠 노출 유형이 소비자 반응에 미치는 영향: 인지된 소속감의 매개 효과를 중심으로 | 한국콘텐츠학회논문지 |
| KCI | 2022 | 온라인 커뮤니티 이용자 참여 증진을 위한 관리자의 운영 전략: 대학별 대나무숲 분석을 중심으로 | 지식경영연구 |
| KCI | 2021 | 소셜미디어와 소비자 구매 결정과의 관계: 서울 공유 자전거에 대한 시계열 분석을 중심으로 | 지식경영연구 |
| KCI | 2021 | 코로나19 상황에서 직무만족도와 모바일 생산활동: 결정요인 연구 | 지식경영연구 |
| KCI | 2016 | 지역 특수성에 따른 오프라인·온라인 채널 성과의 이해 | 지식경영연구 |
| KCI | 2015 | 모바일 VOD 콘텐츠 구매 요인에 관한 실증 연구 | 지식경영연구 |
| KCI | 2015 | 오프라인과 온라인 채널상의 기존제품과 신제품의 판매 성과: 경험재에 대한 시계열 분석을 중심으로 | 지식경영연구 |
| KCI | 2014 | 소셜미디어 연구동향 분석: 사회과학 분야를 중심으로 | 정보통신정책연구 |
| KCI | 2013 | 이용자 생산 콘텐츠 플랫폼 사이트 내에서 생산자 참여가 소비자 선택과 몰입에 미치는 차별적 영향 | 경영학연구 |

이 중 5편(스포츠 구단 · 온라인 커뮤니티 · 코로나19 직무만족도 · 모바일 VOD · 숏폼 브랜디드)은
이전 차수에서 사람이 확인해 `authorSource`가 붙어 있으므로 기존 배정을 유지한다.

### KCI 오픈API 준비 상태

`scripts/verify-kci.mjs` — **키가 생기면 바로 쓸 수 있게 정리해 둔 1회성 조회 스크립트**다.
`npm run build`에 포함하지 않는다.

```bash
KCI_API_KEY=<발급받은 키> node scripts/verify-kci.mjs   # KCI 오픈API + Crossref 폴백
node scripts/verify-kci.mjs --crossref                  # 키 없이 Crossref만
```

⚠️ **키가 없는 상태에서 KCI 포털(`poArtiSearList.kci`)을 다시 긁으려 하지 말 것.**
검색 결과를 JavaScript로 렌더링해 서버 응답 HTML에 결과가 없고, 브라우저로 열어도
URL 쿼리 파라미터가 적용되지 않는다 (22차에서 2회 시도 후 중단).

- **저자 미확인 논문 13편** — 위 표. 위 「새 논문 추가 체크리스트」를 따를 것. 확인 시 `authors`/`studentIds`/`authorSource`를
  함께 추가하고 EXPECTED를 그만큼 올릴 것.
- **`직장 내 스트레스원…` 발행연도** — 학교 페이지 2023 / 공저자(도보람 교수) 페이지 2022 22(1).
  KCI 포털 권호 확인 필요. 현재 2023 유지 + 코드에 TODO.
- **김정현·나규원 진출처 미확인** — 인물 id를 삭제했다. 확인되면 졸업생/재학생 구분부터 정하고 복원할 것.
  (김정현은 2026 아식스 논문의 실제 공저자라 `authors`에는 이름이 남아 있다)
- 김지연(Jeeyeon Kim) 링크: 현재 ORCID. La Trobe Scholars 공식 프로필 URL로 교체 필요.
- 대학·학회 내부 시상의 공식 영문명 — 공개 자료가 없어 잠정 표기 유지 (glossary.md).

## 작업 방식

- 큰 변경 전에는 무엇을 바꿀지 먼저 요약해서 알려줄 것.
- 데이터와 UI 변경은 가능하면 분리해서 커밋.
- 커밋 메시지는 한국어로 간결하게.
