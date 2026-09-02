// 학생별 실적 무결성 검사 — publications.js의 authors/studentIds 매핑이 14차 확정표(§3)와 일치하는지 검증
// 사용: node scripts/check-authorship.mjs (npm run build에 포함)
//
// 검증 규칙 (14차 지령 §3-7)
//  1. 전체 편수: SSCI 37 · KCI 42 · 저서 4
//  2. 학생별 SSCI/KCI/저서 편수 = EXPECTED (§3-6 확정표)
//  3. studentIds가 있는데 authorSource가 없는 논문 → 실패 (근거 없는 배정 차단)
//  4. studentIds에 미등록 id → 실패
//  5. studentIds의 인물 이름이 authors에 실제 표기로 들어 있지 않으면 실패
//  6. wu-jialing(오가령)이 배정된 논문의 authors에 반드시 오가령/Wu Jialing이 있을 것
//     (이예령 Li Yiling과 혼동 방지 — 두 사람은 완전히 다른 인물)
//  7. 그룹 합계 = 졸업생 총원 (교수 임용 5 + 박사과정 7 + 기업 1 = 13)
//     지도 배지 숫자와 실제 명단이 어긋나는 것을 기계적으로 차단한다
//  8. priorWorks(연구실 합류 전 연구)가 교수님 논문 목록(79편)에 섞이지 않을 것

import { CITY_PINS, CURRENT_MEMBERS } from "../src/data/alumni.js";
import {
  ALL_PUBLICATIONS,
  SSCI_PUBLICATIONS,
  KCI_PUBLICATIONS,
  BOOKS,
} from "../src/data/publications.js";

// 인물별 "허용되는 저자 표기" — 이 목록과 정확히 일치하는 표기만 본인으로 인정한다.
// ⚠️ 15차: 김정현·나규원은 진출처 미확인으로 인물 id 삭제 (명단·지도·실적 어디에도 넣지 않음).
//    2026 아식스 논문의 authors에 "김정현"은 사실 그대로 남아 있으나 studentIds에는 없다.
// ⚠️ 김연정(kim-yeonjeong)은 확인된 공저 논문이 없어 표기를 등록하지 않는다.
// ⚠️ 'Jikyung (Jeanne) Kim'(IE Univ.) · 'Hye-jin Kim' · 'Jae Yeon Yoon' · 'Sang Jin Kim'
//    그리고 이니셜 표기('J. Kim', 'Y. Yoon', 'H. Kim')는 어느 인물에게도 인정하지 않는다.
const PERSON_NAMES = {
  "li-yiling": ["이예령", "Li Yiling", "Yiling Li"],
  "wu-jialing": ["오가령", "Wu Jialing"],
  "kim-wookyoung": ["김우경", "Wookyoung Kim"],
  "hwang-inseo": ["황인서", "Inseo Hwang"],
  "jung-hyunwoo": ["정현우", "Hyunwoo Jung"],
  "kim-hyejeong": ["김혜정", "Hyejeong Kim"],
  "yoon-yeolim": ["윤여림", "Yeo Lim Yoon"],
  "kwak-yushin": ["곽유신", "Youshin Kwak"],
  "yoon-yeohong": ["윤여홍", "Yeohong Yoon"],
  "lee-jiyeon": ["이지연"],
  "song-hyeasinn": ["송혜신", "Hyeasinn Song"],
  "kim-sanghwa": ["김상화", "Sanghwa Kim"],
  "jiang-yan": ["장연", "Jiang Yan", "Yan Jiang"],
  "jo-wooyong": ["조우용", "Wooyong Jo"],
  "kim-mingyung": ["김민경", "Mingyung Kim"],
  "kim-jeeyeon": ["김지연", "Jeeyeon Kim"],
};

// §3-6 최종 검증표
const EXPECTED = {
  "li-yiling": { ssci: 4, kci: 11, book: 0 },
  "kim-jeeyeon": { ssci: 9, kci: 6, book: 1 },
  "jo-wooyong": { ssci: 7, kci: 6, book: 0 },
  "kim-sanghwa": { ssci: 2, kci: 3, book: 0 },
  "kim-mingyung": { ssci: 3, kci: 3, book: 1 },
  "kim-hyejeong": { ssci: 2, kci: 4, book: 0 },
  "hwang-inseo": { ssci: 1, kci: 3, book: 0 },
  "kim-wookyoung": { ssci: 1, kci: 3, book: 0 },
  "jung-hyunwoo": { ssci: 1, kci: 4, book: 0 },
  "yoon-yeohong": { ssci: 4, kci: 2, book: 0 },
  "yoon-yeolim": { ssci: 1, kci: 3, book: 0 },
  "kwak-yushin": { ssci: 1, kci: 2, book: 0 },
  "jiang-yan": { ssci: 1, kci: 1, book: 0 },
  "song-hyeasinn": { ssci: 1, kci: 0, book: 0 },
  "wu-jialing": { ssci: 0, kci: 1, book: 0 },
  "lee-jiyeon": { ssci: 0, kci: 0, book: 0 },
  // 김연정(재학생) — 교수님과의 공저 논문이 확인되지 않아 현재 0편.
  // PERSON_NAMES에 표기를 등록하지 않았으므로 어떤 논문을 배정해도 규칙 5에서 실패한다(의도된 잠금).
  // TODO: 본인 KCI 연구자번호(KRI) 또는 CV로 공저 논문이 확인되면 PERSON_NAMES/EXPECTED를 함께 갱신할 것.
  "kim-yeonjeong": { ssci: 0, kci: 0, book: 0 },
};

let failed = false;
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  failed = true;
};

const EVERYTHING = [...ALL_PUBLICATIONS, ...BOOKS];

// 1. 전체 편수
if (SSCI_PUBLICATIONS.length !== 37) fail(`SSCI 편수: ${SSCI_PUBLICATIONS.length} (기대 37)`);
if (KCI_PUBLICATIONS.length !== 42) fail(`KCI 편수: ${KCI_PUBLICATIONS.length} (기대 42)`);
if (BOOKS.length !== 4) fail(`저서: ${BOOKS.length} (기대 4)`);

// 3~6. 논문 단위 검증
const knownIds = new Set(Object.keys(EXPECTED));
for (const p of EVERYTHING) {
  const sids = p.studentIds ?? [];
  if (sids.length === 0) continue;

  // 3. 근거(authorSource) 없는 배정 금지
  if (!p.authorSource) fail(`authorSource 없이 studentIds 배정 — ${p.id}`);

  const authors = p.authors ?? [];
  for (const sid of sids) {
    // 4. 미등록 id
    if (!knownIds.has(sid)) {
      fail(`미등록 studentId "${sid}" — ${p.id}`);
      continue;
    }
    // 5. 저자 표기 실재 확인
    const allowed = PERSON_NAMES[sid] ?? [];
    if (!authors.some((a) => allowed.includes(a))) {
      fail(`"${sid}"의 확정 표기가 authors에 없음 — ${p.id} [${authors.join(", ")}]`);
    }
  }

  // 6. 오가령/이예령 혼동 방지 (이중 확인)
  if (sids.includes("wu-jialing") && !authors.some((a) => a === "오가령" || a === "Wu Jialing")) {
    fail(`wu-jialing(오가령) 배정 논문에 오가령/Wu Jialing 표기 없음 — ${p.id}`);
  }
}

// 2. 학생별 편수
for (const [sid, exp] of Object.entries(EXPECTED)) {
  const ssci = ALL_PUBLICATIONS.filter((p) => p.type === "SSCI" && p.studentIds?.includes(sid)).length;
  const kci = ALL_PUBLICATIONS.filter((p) => p.type === "KCI" && p.studentIds?.includes(sid)).length;
  const book = BOOKS.filter((b) => b.studentIds?.includes(sid)).length;
  if (ssci !== exp.ssci || kci !== exp.kci || book !== exp.book) {
    fail(`${sid}: SSCI ${ssci}/${exp.ssci}, KCI ${kci}/${exp.kci}, BOOK ${book}/${exp.book}`);
  }
}

// 7. 그룹 합계 = 졸업생 총원
const alumni = CITY_PINS.flatMap((p) => p.entries);
const facultyN = alumni.filter((e) => e.isFaculty).length;
const industryN = alumni.filter((e) => e.personId === "lee-jiyeon").length;
const phdN = alumni.length - facultyN - industryN;
const GROUPS = { total: 13, faculty: 5, phd: 7, industry: 1, members: 4 };
if (alumni.length !== GROUPS.total)
  fail(`졸업생 총원: ${alumni.length} (기대 ${GROUPS.total})`);
if (facultyN !== GROUPS.faculty) fail(`교수 임용: ${facultyN} (기대 ${GROUPS.faculty})`);
if (phdN !== GROUPS.phd) fail(`박사과정 진학: ${phdN} (기대 ${GROUPS.phd})`);
if (industryN !== GROUPS.industry) fail(`기업 진출: ${industryN} (기대 ${GROUPS.industry})`);
if (CURRENT_MEMBERS.length !== GROUPS.members)
  fail(`재학생: ${CURRENT_MEMBERS.length} (기대 ${GROUPS.members})`);
if (facultyN + phdN + industryN !== alumni.length)
  fail(`그룹 합계(${facultyN + phdN + industryN}) ≠ 졸업생 총원(${alumni.length})`);

// 8. priorWorks(연구실 합류 전 연구)는 교수님 논문 목록과 완전히 분리돼 있어야 한다 (28차 §2).
//    최정혜 교수님 공저가 아니므로 ALL_PUBLICATIONS에 섞이면 안 되고,
//    제자 실적 편수(위 규칙 2)에도 합산되지 않아야 한다.
const norm = (x) => x.replace(/\s+/g, " ").trim().toLowerCase();
const pubTitles = new Set(EVERYTHING.map((p) => norm(p.title)));
const everyone = [...CITY_PINS.flatMap((p) => p.entries), ...CURRENT_MEMBERS];
let priorN = 0;
for (const person of everyone) {
  for (const w of person.priorWorks ?? []) {
    priorN += 1;
    if (pubTitles.has(norm(w.title)))
      fail(`priorWorks가 교수님 논문 목록과 중복: ${person.nameKo} — ${w.title}`);
    if (!w.url || !w.source)
      fail(`priorWorks에 url/source 없음: ${person.nameKo} — ${w.title}`);
  }
}
// priorWorks는 studentIds 기반 집계와 무관하다 — 논문 총 편수 79(SSCI 37 + KCI 42)와
// 저서 4권이 그대로여야 한다.
const paperN = SSCI_PUBLICATIONS.length + KCI_PUBLICATIONS.length;
if (paperN !== 79)
  fail(`교수님 논문 총 편수: ${paperN} (기대 79 — priorWorks를 섞지 말 것)`);
if (BOOKS.length !== 4) fail(`저서: ${BOOKS.length} (기대 4)`);

if (failed) process.exit(1);

const sourced = EVERYTHING.filter((p) => p.authorSource).length;
console.log(
  `✓ authorship OK — SSCI ${SSCI_PUBLICATIONS.length} · KCI ${KCI_PUBLICATIONS.length} · 저서 ${BOOKS.length}, ` +
    `저자 확정 ${sourced}건, ${Object.keys(EXPECTED).length}명 편수 검증 통과, ` +
    `그룹 ${facultyN}+${phdN}+${industryN}=${alumni.length} · 재학생 ${CURRENT_MEMBERS.length}, ` +
    `합류 전 연구 ${priorN}편(목록 미포함)`
);
