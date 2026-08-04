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
    alumni.js         # { nameKo, nameEn, institution, city, lat, lng, year, track, link, linkLabel, isFaculty }
    profile.js        # 약력·경력·수상 등
  components/
  App.jsx
```

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

## 논문 섹션 규칙

`키워드별 보기` / `저널별 보기` 토글 2개.
- 키워드별: 키워드 칩 → 해당 논문 카드 목록
- 저널별: 저널 선택 → 그 안에서 키워드 필터 또는 연도 필터 (두 경로 모두 동작)
- 논문 카드는 두 뷰에서 동일 컴포넌트 재사용

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

교수로 임용된 제자 4명 — 검증 완료. 지도에서 골드 핀으로 강조:

| 이름 | 소속 | 경로 |
|---|---|---|
| 김민경 (Mingyung Kim) | Ohio State University, Fisher — Asst. Prof. of Marketing | 2015 학사 → Wharton 박사 → 2024 임용 |
| 조우용 (Wooyong Jo) | Purdue University, Daniels School — Asst. Prof. of Marketing | 2017 석사 → Emory 박사(2022) → 임용 |
| 김상화 (Sanghwa Kim) | McMaster University, DeGroote — Asst. Prof. of Marketing | 2019 석사 → Maryland 박사(2024) → 임용 |
| 김지연 (Jeeyeon Kim) | La Trobe University, LBS — Lecturer of Marketing | 2014 석사 → 연세 박사(2018) → 대만 국립중산대 → 임용 |

박사과정 진학: 장연(Jiang Yan, Houston 2024), 이예령(Li Yiling, 연세 박사 2025), 그 외 익명 졸업생 다수(Wharton·Georgia Tech·Minnesota·Emory×2·Georgia State).
애틀랜타에 4명이 겹치므로 핀 하나로 묶어 툴팁에 목록 표시.

## 현재 미완 항목 (TODO)

- KCI 논문 약 50편: 데이터 미확보. `publications.js`에 SSCI와 동일 스키마로 추가 예정. 지금은 카운터 + 접이식 플레이스홀더.
- 저서 4건: 원본 페이지 인코딩 문제로 정확한 서명 미확인. 확인 후 교체 필요.
- 김지연(Jeeyeon Kim) 링크: 현재 ORCID. La Trobe Scholars 공식 프로필 URL로 교체 필요.
- 이름 미확인 제자 다수: 교수님 확인 후 실명 반영 예정.

## 작업 방식

- 큰 변경 전에는 무엇을 바꿀지 먼저 요약해서 알려줄 것.
- 데이터와 UI 변경은 가능하면 분리해서 커밋.
- 커밋 메시지는 한국어로 간결하게.
