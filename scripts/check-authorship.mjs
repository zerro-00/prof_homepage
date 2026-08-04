// 학생별 실적 무결성 검사 — publications.js의 studentIds 매핑이 10차 지령 1-3 확정표와 일치하는지 검증
// 사용: node scripts/check-authorship.mjs (npm run build에 포함)
//
// ⚠️ 기대값은 지령 1-3 "논문 → 저자 확정표"에서 기계적으로 도출한 값이다.
//    지령 1-4 검증표는 이예령(li-yiling)의 KCI를 7편으로 적었으나, 1-3 확정표에는
//    이예령이 연결된 KCI가 9편(스포츠구단·소비자신뢰·Chatbot·신규앱·동영상 장르·
//    뉴스홍보·Lockdown·식품광고 타겟팅·건강식품) 명시되어 있어 1-3표를 우선한다.
//    // TODO: 이예령 KCI 편수(7 vs 9) 교수님 확인 필요.

import {
  ALL_PUBLICATIONS,
  SSCI_PUBLICATIONS,
  KCI_PUBLICATIONS,
  BOOKS,
} from "../src/data/publications.js";

const EXPECTED = {
  "li-yiling": { ssci: 3, kci: 9, book: 0 }, // 1-3 확정표 기준 (1-4표는 kci 7 — 상단 주석 참고)
  "kim-jeeyeon": { ssci: 5, kci: 3, book: 1 },
  "jo-wooyong": { ssci: 5, kci: 3, book: 0 },
  "kim-wookyoung": { ssci: 1, kci: 3, book: 0 },
  "jung-hyunwoo": { ssci: 0, kci: 4, book: 0 },
  "kim-sanghwa": { ssci: 1, kci: 3, book: 0 },
  "kim-mingyung": { ssci: 1, kci: 2, book: 1 },
  "yoon-yeohong": { ssci: 3, kci: 0, book: 0 },
  "kim-hyejeong": { ssci: 1, kci: 2, book: 0 },
  "kwak-yushin": { ssci: 0, kci: 2, book: 0 },
  "jiang-yan": { ssci: 1, kci: 1, book: 0 },
  "hwang-inseo": { ssci: 1, kci: 1, book: 0 },
  "yoon-yeolim": { ssci: 1, kci: 1, book: 0 },
  "song-hyeasinn": { ssci: 1, kci: 0, book: 0 },
  "wu-jialing": { ssci: 0, kci: 0, book: 0 },
  "lee-jiyeon": { ssci: 0, kci: 0, book: 0 },
  "na-gyuwon": { ssci: 0, kci: 0, book: 0 },
  "kim-junghyun": { ssci: 0, kci: 0, book: 0 },
};

let failed = false;

// 전체 편수 검증
if (SSCI_PUBLICATIONS.length !== 37) {
  console.error(`✗ SSCI 편수: ${SSCI_PUBLICATIONS.length} (기대 37)`);
  failed = true;
}
if (KCI_PUBLICATIONS.length !== 42) {
  console.error(`✗ KCI 편수: ${KCI_PUBLICATIONS.length} (기대 42)`);
  failed = true;
}
if (BOOKS.length !== 4) {
  console.error(`✗ 저서: ${BOOKS.length} (기대 4)`);
  failed = true;
}

// 등록되지 않은 studentId 사용 검사
const knownIds = new Set(Object.keys(EXPECTED));
for (const p of [...ALL_PUBLICATIONS, ...BOOKS]) {
  for (const sid of p.studentIds ?? []) {
    if (!knownIds.has(sid)) {
      console.error(`✗ 미등록 studentId "${sid}" — ${p.id}`);
      failed = true;
    }
  }
}

// 학생별 편수 검증
for (const [sid, exp] of Object.entries(EXPECTED)) {
  const ssci = ALL_PUBLICATIONS.filter(
    (p) => p.type === "SSCI" && p.studentIds?.includes(sid)
  ).length;
  const kci = ALL_PUBLICATIONS.filter(
    (p) => p.type === "KCI" && p.studentIds?.includes(sid)
  ).length;
  const book = BOOKS.filter((b) => b.studentIds?.includes(sid)).length;
  if (ssci !== exp.ssci || kci !== exp.kci || book !== exp.book) {
    console.error(
      `✗ ${sid}: SSCI ${ssci}/${exp.ssci}, KCI ${kci}/${exp.kci}, BOOK ${book}/${exp.book}`
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log(
  `✓ authorship OK — SSCI ${SSCI_PUBLICATIONS.length} · KCI ${KCI_PUBLICATIONS.length} · 저서 ${BOOKS.length}, ${Object.keys(EXPECTED).length}명 검증 통과`
);
