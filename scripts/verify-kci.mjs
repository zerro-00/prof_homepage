// KCI 논문 저자 확인 스크립트 (22차 §1-2)
//
// 사용:  KCI_API_KEY=<발급받은 키> node scripts/verify-kci.mjs
//        node scripts/verify-kci.mjs --crossref     (키 없이 Crossref만 사용)
//
// ⚠️ 이 스크립트는 npm run build에 포함하지 않는다. 필요할 때만 손으로 돌린다.
// ⚠️ KCI 포털(poArtiSearList.kci)은 검색 결과를 JavaScript로 렌더링해
//    서버 응답 HTML에 결과가 없다. 브라우저로 열어도 URL 쿼리가 적용되지 않는다.
//    **오픈API 키 없이 포털을 다시 긁으려 하지 말 것.**
//
// KCI 오픈API 신청: https://www.kci.go.kr → 정보마당 → OpenAPI 안내
// 발급 후 KCI_API_KEY 환경변수로 넣으면 아래 fetchFromKci()가 동작한다.

import { KCI_PUBLICATIONS } from "../src/data/publications.js";

const KEY = process.env.KCI_API_KEY ?? "";
const CROSSREF_ONLY = process.argv.includes("--crossref");
const MAILTO = "zerro@yonsei.ac.kr";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, " ")
    .trim();

/** KCI 오픈API — 키가 있을 때만 쓴다. 응답은 XML이라 저자 노드만 성기게 뽑는다. */
async function fetchFromKci(paper) {
  const url =
    `https://open.kci.go.kr/po/openapi/openApiSearch.kci` +
    `?apiCode=articleSearch&key=${encodeURIComponent(KEY)}` +
    `&title=${encodeURIComponent(paper.title)}&displayCount=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`KCI HTTP ${res.status}`);
  const xml = await res.text();
  const records = xml.split("<record>").slice(1);
  for (const rec of records) {
    const title = (rec.match(/<article-title[^>]*>([\s\S]*?)<\/article-title>/) ?? [])[1] ?? "";
    if (!norm(title).includes(norm(paper.title).slice(0, 20))) continue;
    const authors = [...rec.matchAll(/<author-name[^>]*>([\s\S]*?)<\/author-name>/g)].map((m) =>
      m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim()
    );
    if (authors.length) return { via: "KCI OpenAPI", authors };
  }
  return null;
}

/** Crossref 폴백 — 국내 학술지는 영문 제목으로 등록돼 있어 저널·연도·저자로 교차 확인한다. */
async function fetchFromCrossref(paper) {
  const url =
    `https://api.crossref.org/works?query.bibliographic=${encodeURIComponent(paper.title)}` +
    `&rows=5&select=title,author,container-title,issued,DOI&mailto=${MAILTO}`;
  const res = await fetch(url, { headers: { "User-Agent": `prof-homepage/1.0 (mailto:${MAILTO})` } });
  if (!res.ok) throw new Error(`Crossref HTTP ${res.status}`);
  const items = (await res.json()).message?.items ?? [];
  for (const it of items) {
    const year = it.issued?.["date-parts"]?.[0]?.[0];
    const authors = (it.author ?? []).map((a) => a.name ?? `${a.given ?? ""} ${a.family ?? ""}`.trim());
    // 교수님이 모든 논문의 공저자라는 사실을 교차 확인에 쓴다
    const hasChoi = authors.some((n) => /jeonghye ch(oi|o)/i.test(n) || n.includes("최정혜"));
    if (!hasChoi) continue;
    if (year === undefined || Math.abs(year - paper.year) > 1) continue;
    return { via: `Crossref DOI ${it.DOI}`, authors };
  }
  return null;
}

if (!KEY && !CROSSREF_ONLY) {
  console.error(
    "KCI_API_KEY가 없다. 키를 넣거나 --crossref 로 실행할 것.\n" +
      "  KCI_API_KEY=xxx node scripts/verify-kci.mjs\n" +
      "  node scripts/verify-kci.mjs --crossref"
  );
  process.exit(1);
}

const found = [];
const missing = [];
for (const p of KCI_PUBLICATIONS) {
  let hit = null;
  try {
    if (KEY && !CROSSREF_ONLY) hit = await fetchFromKci(p);
    if (!hit) hit = await fetchFromCrossref(p);
  } catch (e) {
    console.error(`  ! ${p.year} ${p.title.slice(0, 30)} — ${e.message}`);
  }
  if (hit) {
    found.push({ id: p.id, ...hit });
    console.log(`ok       ${p.year} ${p.title.slice(0, 42).padEnd(44)} ${hit.authors.join(" / ")}`);
  } else {
    missing.push(p);
    console.log(`미확인   ${p.year} ${p.title.slice(0, 42)}`);
  }
  await sleep(300);
}

console.log(`\n확인 ${found.length} / ${KCI_PUBLICATIONS.length}, 미확인 ${missing.length}`);
console.log(
  "\n⚠️ 결과를 자동으로 반영하지 않는다. 22차 §2-3 이름 표에 정확히 일치하는 표기만\n" +
    "   사람이 확인한 뒤 publications.js의 authors/studentIds/authorSource에 넣을 것."
);
