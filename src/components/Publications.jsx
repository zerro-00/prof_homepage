import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal, SectionHeading } from "./common.jsx";
import {
  SSCI_PUBLICATIONS,
  KCI_PUBLICATIONS,
  KCI_COUNT_LABEL,
  BOOKS,
  KEYWORDS,
  YEAR_RANGES,
  groupByJournal,
} from "../data/publications.js";

/* ---------- 논문 카드 (키워드별/저널별 공용) ---------- */
function PaperCard({ paper }) {
  return (
    <article className="group rounded-2xl border border-line bg-base-900/70 p-5 md:p-6 transition-colors hover:border-accent-500/40">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {paper.tier === "top" && (
          <span className="inline-flex items-center gap-1 rounded-md border border-gold-500/40 bg-gold-500/10 px-2 py-0.5 font-display text-[11px] font-semibold tracking-wide text-gold-300">
            ★ Top Journal
          </span>
        )}
        <span className="font-display text-[12px] text-ink-500">
          {paper.journal} · {paper.year}
        </span>
      </div>
      <h4 className="text-[15px] md:text-base font-semibold leading-snug text-ink-100 group-hover:text-accent-300 transition-colors">
        {paper.title}
      </h4>
      <p className="mt-3 text-[13px] md:text-sm leading-relaxed text-ink-300">
        {paper.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {paper.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-line bg-base-800/60 px-2.5 py-0.5 text-[11px] text-ink-500"
          >
            {k}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ---------- 필터 버튼 ---------- */
function FilterBtn({ activeState, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
        activeState
          ? "border-accent-400 bg-accent-500/15 text-accent-300"
          : "border-line bg-base-800/50 text-ink-500 hover:text-ink-300 hover:border-base-600"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- 키워드별 보기 ---------- */
function KeywordView() {
  const [keyword, setKeyword] = useState(KEYWORDS[0]);
  const papers = useMemo(
    () => SSCI_PUBLICATIONS.filter((p) => p.keywords.includes(keyword)),
    [keyword]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {KEYWORDS.map((k) => {
          const count = SSCI_PUBLICATIONS.filter((p) => p.keywords.includes(k)).length;
          return (
            <FilterBtn key={k} activeState={keyword === k} onClick={() => setKeyword(k)}>
              {k} <span className="opacity-60 font-display">{count}</span>
            </FilterBtn>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {papers.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------- 저널별 보기 ---------- */
function JournalView() {
  const journals = useMemo(() => groupByJournal(SSCI_PUBLICATIONS), []);
  const [journal, setJournal] = useState(journals[0].journal);
  const [subMode, setSubMode] = useState("keyword"); // 'keyword' | 'year'
  const [subKeyword, setSubKeyword] = useState(null);
  const [subRange, setSubRange] = useState(null);

  const currentPapers = useMemo(
    () => journals.find((j) => j.journal === journal)?.papers ?? [],
    [journals, journal]
  );

  // 해당 저널에 존재하는 키워드/연도 구간만 필터 버튼으로 노출
  const availableKeywords = useMemo(
    () => KEYWORDS.filter((k) => currentPapers.some((p) => p.keywords.includes(k))),
    [currentPapers]
  );
  const availableRanges = useMemo(
    () =>
      YEAR_RANGES.filter((r) =>
        currentPapers.some((p) => p.year >= r.from && p.year <= r.to)
      ),
    [currentPapers]
  );

  const filtered = useMemo(() => {
    if (subMode === "keyword" && subKeyword)
      return currentPapers.filter((p) => p.keywords.includes(subKeyword));
    if (subMode === "year" && subRange)
      return currentPapers.filter((p) => p.year >= subRange.from && p.year <= subRange.to);
    return currentPapers;
  }, [currentPapers, subMode, subKeyword, subRange]);

  const selectJournal = (j) => {
    setJournal(j);
    setSubKeyword(null);
    setSubRange(null);
  };

  return (
    <div>
      {/* 저널 선택 (논문 수 내림차순) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {journals.map(({ journal: j, papers }) => (
          <FilterBtn key={j} activeState={journal === j} onClick={() => selectJournal(j)}>
            {j}{" "}
            <span
              className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 font-display text-[11px] ${
                journal === j ? "bg-accent-500/25" : "bg-base-700/70"
              }`}
            >
              {papers.length}
            </span>
          </FilterBtn>
        ))}
      </div>

      {/* 저널 내부 2차 필터: 키워드 / 연도 */}
      <div className="rounded-xl border border-line bg-base-850/60 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display text-[11px] tracking-[0.2em] uppercase text-ink-600 mr-1">
            Filter
          </span>
          <button
            type="button"
            onClick={() => {
              setSubMode("keyword");
              setSubRange(null);
            }}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              subMode === "keyword"
                ? "bg-accent-500/15 text-accent-300"
                : "text-ink-500 hover:text-ink-300"
            }`}
          >
            키워드
          </button>
          <button
            type="button"
            onClick={() => {
              setSubMode("year");
              setSubKeyword(null);
            }}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              subMode === "year"
                ? "bg-accent-500/15 text-accent-300"
                : "text-ink-500 hover:text-ink-300"
            }`}
          >
            연도
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subMode === "keyword" ? (
            <>
              <FilterBtn activeState={subKeyword === null} onClick={() => setSubKeyword(null)}>
                전체
              </FilterBtn>
              {availableKeywords.map((k) => (
                <FilterBtn
                  key={k}
                  activeState={subKeyword === k}
                  onClick={() => setSubKeyword(k)}
                >
                  {k}
                </FilterBtn>
              ))}
            </>
          ) : (
            <>
              <FilterBtn activeState={subRange === null} onClick={() => setSubRange(null)}>
                전체
              </FilterBtn>
              {availableRanges.map((r) => (
                <FilterBtn
                  key={r.label}
                  activeState={subRange?.label === r.label}
                  onClick={() => setSubRange(r)}
                >
                  {r.label}
                </FilterBtn>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-ink-600 py-8 text-center">해당 조건의 논문이 없습니다.</p>
      )}
    </div>
  );
}

/* ---------- KCI + 저서 ---------- */
function KciAndBooks({ focusKci = false }) {
  const [openKci, setOpenKci] = useState(focusKci);
  const kciRef = useRef(null);

  // 히어로 KCI 스탯 카드에서 진입한 경우, 섹션 전환이 끝난 뒤 KCI 영역으로 스크롤
  useEffect(() => {
    if (!focusKci || !kciRef.current) return;
    const t = setTimeout(() => {
      kciRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 450);
    return () => clearTimeout(t);
  }, [focusKci]);

  return (
    <div ref={kciRef} className="mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
      {/* KCI */}
      <Reveal>
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display text-3xl font-bold text-ink-100">
              {KCI_COUNT_LABEL}
            </span>
            <h3 className="text-sm font-semibold text-ink-300">KCI 국문 논문</h3>
          </div>
          <p className="text-[13px] text-ink-500 leading-relaxed">
            소셜미디어, 라이브커머스, OTT, 헬스케어, 크리에이터, 브랜드, 코로나19
            소비행동 등 국내 시장 최전선의 주제를 다룬 국문 논문 50여 편.
          </p>
          <button
            type="button"
            onClick={() => setOpenKci((v) => !v)}
            className="mt-4 text-xs text-ink-500 hover:text-accent-300 transition-colors inline-flex items-center gap-1.5"
            aria-expanded={openKci}
          >
            <span className={`inline-block transition-transform ${openKci ? "rotate-90" : ""}`}>
              ▸
            </span>
            목록 {openKci ? "접기" : "펼치기"}
          </button>
          {openKci && (
            <div className="mt-4 rounded-xl border border-dashed border-line p-4 text-[13px] text-ink-600">
              {KCI_PUBLICATIONS.length === 0 ? (
                <>
                  전체 목록 준비 중입니다.
                  {/* TODO: KCI 논문 데이터 추가 — src/data/publications.js 의
                      KCI_PUBLICATIONS 배열에 SSCI와 동일 스키마로 추가하면 이 영역에 렌더링됩니다. */}
                </>
              ) : (
                <div className="grid gap-3">
                  {KCI_PUBLICATIONS.map((p) => (
                    <PaperCard key={p.id} paper={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Reveal>

      {/* 저서 */}
      <Reveal delay={70}>
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
          <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-4">
            Books · 저서/역서
          </h3>
          <ul className="space-y-3.5">
            {BOOKS.map((b) => (
              <li key={b.id} className="text-sm">
                <p className="text-ink-100 font-medium leading-snug">『{b.title}』</p>
                <p className="text-[12px] text-ink-500 mt-0.5">
                  {b.role}
                  {b.publisher && ` · ${b.publisher}`} · {b.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- 메인 ---------- */
// focus: 'ssci' → 기본(SSCI 목록 상단) / 'kci' → KCI 영역 펼침 + 스크롤
export default function Publications({ focus = null }) {
  const [mode, setMode] = useState("keyword"); // 'keyword' | 'journal'

  return (
    <section id="publications" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="04"
        label="Research Archive"
        title="주요 연구 논문 및 저서"
        desc="SSCI 국제 학술지 논문 전체. 키워드로 탐색하거나 저널별로 모아 볼 수 있으며, 모든 논문에 비전공자를 위한 쉬운 요약을 담았습니다."
      />

      {/* 보기 모드 토글 */}
      <Reveal className="mb-8">
        <div className="inline-flex rounded-xl border border-line bg-base-850/80 p-1">
          {[
            { key: "keyword", label: "키워드별 보기" },
            { key: "journal", label: "저널별 보기" },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={`rounded-lg px-4 md:px-5 py-2 text-sm font-medium transition-colors ${
                mode === m.key
                  ? "bg-accent-500/20 text-accent-300"
                  : "text-ink-500 hover:text-ink-300"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </Reveal>

      {mode === "keyword" ? <KeywordView /> : <JournalView />}

      <KciAndBooks focusKci={focus === "kci"} />
    </section>
  );
}
