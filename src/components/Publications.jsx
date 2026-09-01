import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Reveal, SectionHeading, useAnchorScroll, useIsMobile } from "./common.jsx";
import { findPerson } from "../data/alumni.js";
import {
  ALL_PUBLICATIONS,
  KCI_COUNT_LABEL,
  BOOKS,
  KEYWORDS,
  YEAR_RANGES,
  groupJournalsByType,
  keywordRows,
  paperUrl,
  authorsWithLinks,
  METHODS,
  methodRows,
} from "../data/publications.js";

// 논문 → 제자 이동(§5-2)을 카드 깊숙한 곳까지 prop으로 끌고 내려가지 않기 위한 컨텍스트
const NavContext = createContext(null);

// 검색어(21차 §5) — 카드 안 제목·저자 하이라이트에만 쓴다
const QueryContext = createContext("");

const normalize = (v) => v.trim().toLowerCase();

/* 매칭 구간만 <mark>로 감싼다. 하이라이트는 제목·저자에만 (요약문에는 하지 않는다). */
function Highlight({ text }) {
  const query = normalize(useContext(QueryContext));
  if (!query || !text) return text;
  const lower = String(text).toLowerCase();
  const parts = [];
  let from = 0;
  for (;;) {
    const at = lower.indexOf(query, from);
    if (at === -1) break;
    if (at > from) parts.push(String(text).slice(from, at));
    parts.push(
      <mark
        key={`${at}-${parts.length}`}
        className="rounded-[3px] bg-accent-500/25 text-inherit"
      >
        {String(text).slice(at, at + query.length)}
      </mark>
    );
    from = at + query.length;
  }
  if (!parts.length) return text;
  if (from < String(text).length) parts.push(String(text).slice(from));
  return parts;
}

/* 검색 대상: 제목 · 저널명 · 저자명(원문 표기 + 제자의 한글·영문 표기) · 키워드(원문·번역) ·
   연도 · 3줄 요약(번역). 요약을 넣는 이유 — SSCI 논문은 제목이 영문뿐이라
   한국어 검색어로는 요약 말고 걸릴 데가 없다. 형태소 분석 없이 부분 일치로 충분하다. */
function haystack(paper, t) {
  const names = authorsWithLinks(paper).flatMap((a) =>
    a.person ? [a.name, a.person.nameKo, a.person.nameEn] : [a.name]
  );
  return [
    paper.title,
    paper.journal,
    String(paper.year),
    t(`pubs.${paper.id}`),
    ...names,
    ...paper.keywords,
    ...paper.keywords.map((k) => t(`keywords.${k}`)),
    ...(paper.methods ?? []),
    ...(paper.methods ?? []).map((m) => t(`methods.${m}`)),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/* ---------- SSCI / KCI 타입 태그 ---------- */
/* 알약 배지를 쓰지 않는다 (22차 §2-5) — 유형 구분은 좌측 3px 바와 이 텍스트로만 한다 */
function TypeTag({ type }) {
  return (
    <span
      className="font-display text-[11px] font-semibold tracking-[0.08em]"
      style={{ color: type === "SSCI" ? "var(--ssci-text)" : "var(--kci-text)" }}
    >
      {type}
    </span>
  );
}

/* ---------- 논문 카드 — 전체가 원문 링크 (DOI 또는 검색 폴백) ---------- */
function PaperCard({ paper }) {
  const { t } = useTranslation();
  const navigate = useContext(NavContext);
  const authors = authorsWithLinks(paper);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all hover:border-accent-500/50 hover:bg-surface-3">
      {/* 좌측 SSCI/KCI 구분 바 — 텍스트와 다른 토큰(비텍스트 3:1) */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] rounded-r"
        style={{ background: paper.type === "SSCI" ? "var(--ssci-bar)" : "var(--kci-bar)" }}
      />
      <a
        href={paperUrl(paper)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("pubsUI.openPaperAria", { title: paper.title })}
        className="block p-6 pl-7 focus-visible:outline-2 focus-visible:outline-accent-400"
      >
      <div className="mb-3 flex flex-wrap items-center gap-2 pr-6">
        <TypeTag type={paper.type} />
        {paper.tier === "top" && (
          <span className="inline-flex items-center gap-1 rounded-md border border-gold-500/40 bg-gold-500/10 px-2 py-0.5 font-display text-[11px] font-semibold tracking-wide text-gold-300">
            {t("pubsUI.topJournalBadge")}
          </span>
        )}
        <span className="font-display text-[12px] text-ink-500">
          {paper.journal} · {paper.year}
        </span>
      </div>
      <h4 className="text-[15px] font-semibold leading-snug text-ink-100 transition-colors group-hover:text-accent-300 md:text-base">
        <Highlight text={paper.title} />
        {/* 원문으로 나간다는 표시 — 제목 바로 뒤 12px 아이콘 (21차 §3) */}
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1.5 inline-block shrink-0 -translate-y-px text-ink-500 transition-colors group-hover:text-accent-300"
        >
          <path d="M4.5 1.5h6v6" />
          <path d="M10.5 1.5 5 7" />
          <path d="M9 7.5v3H1.5V3h3" />
        </svg>
      </h4>
      <p className="mt-3 max-w-[74ch] text-[13px] leading-[1.7] text-ink-500 md:text-sm">
        {t(`pubs.${paper.id}`)}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {paper.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-line bg-surface-3 px-2.5 py-0.5 text-[11px] text-ink-500"
          >
            {t(`keywords.${k}`)}
          </span>
        ))}
      </div>
      </a>
      {/* §5-2 논문 → 제자. 카드 전체가 원문 링크이므로 저자 줄은 <a> 밖에 둔다
          (앵커 안에 버튼을 넣으면 마크업이 깨진다). */}
      {authors.length > 0 && (
        <p className="px-6 pb-6 pl-7 text-[12px] leading-relaxed text-ink-500">
          <span className="text-ink-600">{t("pubsUI.authorsLabel")} </span>
          {authors.map((a, i) => (
            <span key={`${a.name}-${i}`}>
              {i > 0 && <span aria-hidden="true">, </span>}
              {a.personId ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate?.("alumni", { person: a.personId });
                  }}
                  aria-label={t("pubsUI.personAria", { name: a.name })}
                  className="rounded text-accent-400 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-accent-400"
                >
                  <Highlight text={a.name} />
                </button>
              ) : (
                <Highlight text={a.name} />
              )}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

/* ---------- 필터 버튼 (연도/키워드 하위 필터 전용) ---------- */
function FilterBtn({ activeState, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
        activeState
          ? "border-accent-400 bg-accent-500/15 text-accent-300"
          : "border-line bg-surface-3 text-ink-500 hover:border-line-strong hover:text-ink-300"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- 좌측 목록 행 — 키워드별/저널별 보기가 같은 컴포넌트를 쓴다 ----------
   저널명 옆 ★ 없음, 선택 행의 편수에 밑줄 없음 (§2-2) */
function ListRow({ label, count, max, active, onSelect }) {
  const ratio = max > 0 ? Math.max(8, Math.round((count / max) * 100)) : 0;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`group relative block w-full rounded-r-lg py-2 pl-3 pr-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 ${
        active ? "bg-surface-3 text-ink-100" : "text-ink-500 hover:bg-surface-2 hover:text-ink-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 top-0 w-[3px] rounded-r transition-colors ${
          active ? "bg-accent-400" : "bg-transparent group-hover:bg-line-strong"
        }`}
      />
      <span className="flex items-baseline gap-2">
        <span className={`min-w-0 flex-1 text-[13px] leading-snug ${active ? "font-medium" : ""}`}>
          {label}
        </span>
        <span
          className={`shrink-0 font-display text-[12px] tabular-nums no-underline ${
            active ? "text-accent-300" : "text-ink-600"
          }`}
        >
          {count}
        </span>
      </span>
      <span aria-hidden="true" className="mt-1.5 block h-[3px] w-full rounded-full bg-surface-3">
        <span
          className={`block h-[3px] rounded-full transition-colors ${
            active ? "bg-accent-400" : "bg-line-strong group-hover:bg-ink-600"
          }`}
          style={{ width: `${ratio}%` }}
        />
      </span>
    </button>
  );
}

/* 좌/우 마스터-디테일 껍데기 — 두 보기가 공유 */
function MasterDetail({ listRef, detailRef, listLabel, list, children }) {
  return (
    <div className="md:grid md:grid-cols-[300px_minmax(0,1fr)] md:items-start md:gap-8">
      <nav
        ref={listRef}
        aria-label={listLabel}
        className="thin-scroll scroll-mt-20 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:pr-2"
      >
        {list}
      </nav>
      <div ref={detailRef} className="mt-8 scroll-mt-20 md:mt-0">
        {children}
      </div>
    </div>
  );
}

/* 상세 영역 머리글 — "선택 이름 · N편" */
function DetailHeading({ title, count, onBack, backLabel }) {
  const { t } = useTranslation();
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-line bg-surface-3 px-3 py-1.5 text-[12px] text-ink-500 transition-colors hover:border-line-strong hover:text-ink-100"
        >
          {backLabel}
        </button>
      )}
      <h3 className="text-base font-semibold leading-snug text-ink-100">{title}</h3>
      <span className="font-display text-[12px] text-ink-500">
        {t("pubsUI.paperCount", { count })}
      </span>
    </div>
  );
}

/* ---------- 서브 필터 (22차 §3-3) ----------
   세 뷰가 같은 컴포넌트를 쓴다. 뷰마다 다르게 만들지 말 것.
   좌측 선택이 바뀌면 상위에서 reset()을 불러 초기화한다. */
function useSubFilter(papers, primaryKind) {
  const [mode, setMode] = useState(primaryKind);
  const [pick, setPick] = useState(null);
  const [range, setRange] = useState(null);

  const options = useMemo(() => {
    if (primaryKind === "keyword") return KEYWORDS.filter((k) => papers.some((p) => p.keywords.includes(k)));
    return [...new Set(papers.map((p) => p.journal))].sort((a, b) => a.localeCompare(b, "ko"));
  }, [papers, primaryKind]);

  const ranges = useMemo(
    () => YEAR_RANGES.filter((r) => papers.some((p) => p.year >= r.from && p.year <= r.to)),
    [papers]
  );

  const filtered = useMemo(() => {
    if (mode === primaryKind && pick)
      return papers.filter((p) => (primaryKind === "keyword" ? p.keywords.includes(pick) : p.journal === pick));
    if (mode === "year" && range) return papers.filter((p) => p.year >= range.from && p.year <= range.to);
    return papers;
  }, [papers, mode, pick, range, primaryKind]);

  const reset = useCallback(() => {
    setPick(null);
    setRange(null);
  }, []);

  return { mode, setMode, pick, setPick, range, setRange, options, ranges, filtered, reset, primaryKind };
}

function SubFilterBar({ st }) {
  const { t } = useTranslation();
  const primaryLabel = st.primaryKind === "keyword" ? t("pubsUI.filterKeyword") : t("pubsUI.filterJournal");
  const tab =
    "rounded-md px-2.5 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-accent-400";
  return (
    <div className="mb-6 rounded-xl border border-line bg-surface-1 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="mr-1 font-display text-[11px] uppercase tracking-[0.2em] text-ink-600">
          Filter
        </span>
        <button
          type="button"
          onClick={() => {
            st.setMode(st.primaryKind);
            st.setRange(null);
          }}
          className={`${tab} ${
            st.mode === st.primaryKind ? "bg-accent-500/15 text-accent-300" : "text-ink-500 hover:text-ink-300"
          }`}
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            st.setMode("year");
            st.setPick(null);
          }}
          className={`${tab} ${
            st.mode === "year" ? "bg-accent-500/15 text-accent-300" : "text-ink-500 hover:text-ink-300"
          }`}
        >
          {t("pubsUI.filterYear")}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {st.mode === "year" ? (
          <>
            <FilterBtn activeState={st.range === null} onClick={() => st.setRange(null)}>
              {t("pubsUI.all")}
            </FilterBtn>
            {st.ranges.map((r) => (
              <FilterBtn key={r.label} activeState={st.range?.label === r.label} onClick={() => st.setRange(r)}>
                {r.label}
              </FilterBtn>
            ))}
          </>
        ) : (
          <>
            <FilterBtn activeState={st.pick === null} onClick={() => st.setPick(null)}>
              {t("pubsUI.all")}
            </FilterBtn>
            {st.options.map((o) => (
              <FilterBtn key={o} activeState={st.pick === o} onClick={() => st.setPick(o)}>
                {st.primaryKind === "keyword" ? t(`keywords.${o}`) : o}
              </FilterBtn>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- 검색창 (21차 §5) ---------- */
function SearchBox({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-600"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5 14 14" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onChange("");
          }
        }}
        placeholder={t("pubsUI.searchPlaceholder")}
        aria-label={t("pubsUI.searchPlaceholder")}
        className="w-full rounded-xl border border-line bg-surface-2 py-3 pl-10 pr-10 text-[15px] text-ink-100 placeholder:text-ink-600 transition-colors focus:border-accent-400 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t("pubsUI.clearSearch")}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-surface-3 hover:text-ink-100 focus-visible:outline-2 focus-visible:outline-accent-400"
        >
          ×
        </button>
      )}
    </div>
  );
}

/* ---------- 논문 목록 + 페이지네이션 (21차 §4) ----------
   79편을 한 화면에 쏟으면 아래 저서 영역까지 스크롤하기가 너무 힘들다.
   한 페이지 5편으로 끊고, 페이지 이동 시 "목록 상단"으로만 부드럽게 이동한다
   (페이지 최상단으로 튀지 않게). 저서 섹션은 페이지네이션 대상이 아니다. */
const PAGE_SIZE = 4;

const readViewParam = () => {
  const v = new URLSearchParams(window.location.search).get("view");
  return v === "journal" || v === "method" ? v : "keyword";
};

const readMethodParam = () => {
  const m = new URLSearchParams(window.location.search).get("method");
  return METHODS.includes(m) ? m : null;
};

const writeViewParams = (view, method) => {
  const url = new URL(window.location.href);
  if (view && view !== "keyword") url.searchParams.set("view", view);
  else url.searchParams.delete("view");
  if (view === "method" && method) url.searchParams.set("method", method);
  else url.searchParams.delete("method");
  window.history.replaceState(null, "", url.toString());
};

const readQueryParam = () => new URLSearchParams(window.location.search).get("q") ?? "";

const writeQueryParam = (q) => {
  const url = new URL(window.location.href);
  if (q.trim()) url.searchParams.set("q", q.trim());
  else url.searchParams.delete("q");
  window.history.replaceState(null, "", url.toString());
};

const readPageParam = () => {
  const n = Number.parseInt(new URLSearchParams(window.location.search).get("page") ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const writePageParam = (page) => {
  const url = new URL(window.location.href);
  if (page > 1) url.searchParams.set("page", String(page));
  else url.searchParams.delete("page");
  window.history.replaceState(null, "", url.toString());
};

// 현재 페이지 앞뒤 2개 + 첫·마지막은 항상. 사이가 벌어지면 "…"으로 축약.
// 모바일은 앞뒤 1개만 노출한다.
function pageItems(current, total, span) {
  const keep = new Set([1, total]);
  for (let i = current - span; i <= current + span; i += 1) {
    if (i >= 1 && i <= total) keep.add(i);
  }
  const sorted = [...keep].sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev && n - prev > 1) out.push({ gap: true, key: `gap-${prev}` });
    out.push({ page: n, key: `p-${n}` });
    prev = n;
  }
  return out;
}

function Pagination({ current, total, onGo }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  if (total <= 1) return null;
  const items = pageItems(current, total, isMobile ? 1 : 2);
  const btn =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 font-display text-[13px] tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-accent-400";
  return (
    <nav
      aria-label={t("pubsUI.pageNavLabel")}
      className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => onGo(current - 1)}
        disabled={current === 1}
        className={`${btn} border-line text-ink-500 hover:border-line-strong hover:text-ink-100 disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-500`}
      >
        {t("pubsUI.prevPage")}
      </button>
      {items.map((it) =>
        it.gap ? (
          <span key={it.key} aria-hidden="true" className="px-1 text-[13px] text-ink-600">
            …
          </span>
        ) : (
          <button
            key={it.key}
            type="button"
            onClick={() => onGo(it.page)}
            aria-current={it.page === current ? "page" : undefined}
            aria-label={t("pubsUI.pageAria", { page: it.page })}
            className={`${btn} ${
              it.page === current
                ? "border-accent-400 bg-accent-500/20 text-accent-300"
                : "border-line text-ink-500 hover:border-line-strong hover:text-ink-100"
            }`}
          >
            {it.page}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onGo(current + 1)}
        disabled={current === total}
        className={`${btn} border-line text-ink-500 hover:border-line-strong hover:text-ink-100 disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-500`}
      >
        {t("pubsUI.nextPage")}
      </button>
    </nav>
  );
}

/* 논문 카드 목록 — 범위 표시 + 페이지네이션을 한 곳에서 담당한다.
   resetKey(필터·검색어·보기 조합)가 바뀌면 1페이지로 되돌린다. */
function PaperList({ papers, resetKey }) {
  const { t } = useTranslation();
  const scrollToAnchor = useAnchorScroll();
  const topRef = useRef(null);
  const [page, setPage] = useState(readPageParam);

  const total = Math.max(1, Math.ceil(papers.length / PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), total); // 범위를 벗어나면 끌어당긴다

  // 필터가 바뀌면 1페이지로. 첫 렌더에서는 URL의 page를 존중한다.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setPage(1);
  }, [resetKey]);

  useEffect(() => {
    writePageParam(current);
    if (page !== current) setPage(current);
  }, [current, page]);

  const start = (current - 1) * PAGE_SIZE;
  const shown = papers.slice(start, start + PAGE_SIZE);

  const go = (next) => {
    const clamped = Math.min(Math.max(next, 1), total);
    if (clamped === current) return;
    setPage(clamped);
    requestAnimationFrame(() => scrollToAnchor(topRef));
  };

  if (papers.length === 0) return null;

  return (
    <div ref={topRef} className="scroll-mt-24">
      <p className="mb-3 font-display text-[12px] tabular-nums text-ink-600">
        {t("pubsUI.pageRange", {
          from: start + 1,
          to: start + shown.length,
          total: papers.length,
        })}
      </p>
      <div className="grid gap-5">
        {shown.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </div>
      <Pagination current={current} total={total} onGo={go} />
    </div>
  );
}

/* ---------- 키워드별 보기 (§2-1 — 칩 제거, 마스터-디테일) ---------- */
const ALL_KEY = "__all__";

function KeywordView({ pool, searchKey = "" }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollToAnchor = useAnchorScroll();
  const listRef = useRef(null);
  const detailRef = useRef(null);
  const [keyword, setKeyword] = useState(ALL_KEY);

  const rows = useMemo(() => keywordRows(pool), [pool]);
  const max = rows.reduce((m, r) => Math.max(m, r.count), 0);
  // 선택한 키워드가 현재 풀(전체/SSCI/KCI)에 없으면 전체로 되돌린다
  const active = keyword !== ALL_KEY && !rows.some((r) => r.key === keyword) ? ALL_KEY : keyword;

  const papers = useMemo(
    () => (active === ALL_KEY ? pool : pool.filter((p) => p.keywords.includes(active))),
    [pool, active]
  );
  const sub = useSubFilter(papers, "journal");

  const select = (k) => {
    setKeyword(k);
    sub.reset();
    if (isMobile) requestAnimationFrame(() => scrollToAnchor(detailRef));
  };

  const title = active === ALL_KEY ? t("pubsUI.allPapers") : t(`keywords.${active}`);

  // 모바일: 좌측 목록 대신 드롭다운 하나
  if (isMobile) {
    return (
      <div>
        <label className="block">
          <span className="sr-only">{t("pubsUI.pickKeyword")}</span>
          <select
            value={active}
            onChange={(e) => select(e.target.value)}
            className="w-full rounded-xl border border-line bg-surface-1 px-4 py-3 text-[15px] text-ink-100"
          >
            <option value={ALL_KEY}>
              {t("pubsUI.allPapers")} ({pool.length})
            </option>
            {rows.map((r) => (
              <option key={r.key} value={r.key}>
                {t(`keywords.${r.key}`)} ({r.count})
              </option>
            ))}
          </select>
        </label>
        <div ref={detailRef} className="mt-6 scroll-mt-20">
          <DetailHeading title={title} count={papers.length} />
          <SubFilterBar st={sub} />
          <PaperList
            papers={sub.filtered}
            resetKey={`kw-${active}-${sub.pick ?? ""}-${sub.range?.label ?? ""}-${searchKey}-${pool.length}`}
          />
        </div>
      </div>
    );
  }

  return (
    <MasterDetail
      listRef={listRef}
      detailRef={detailRef}
      listLabel={t("pubsUI.keywordListLabel")}
      list={
        <div className="pt-1">
          <ListRow
            label={t("pubsUI.allPapers")}
            count={pool.length}
            max={pool.length}
            active={active === ALL_KEY}
            onSelect={() => select(ALL_KEY)}
          />
          <div className="my-2 h-px bg-line" aria-hidden="true" />
          {rows.map((r) => (
            <ListRow
              key={r.key}
              label={t(`keywords.${r.key}`)}
              count={r.count}
              max={max}
              active={active === r.key}
              onSelect={() => select(r.key)}
            />
          ))}
        </div>
      }
    >
      <DetailHeading title={title} count={papers.length} />
      <SubFilterBar st={sub} />
      <PaperList
        papers={sub.filtered}
        resetKey={`kw-${active}-${sub.pick ?? ""}-${sub.range?.label ?? ""}-${searchKey}-${pool.length}`}
      />
    </MasterDetail>
  );
}

/* ---------- 방법론별 보기 (22차 §3) ----------
   키워드별·저널별 보기와 레이아웃·간격·행 스타일이 완전히 동일하다.
   근거 없이 분류된 논문은 없고, 미분류 편수는 목록 맨 아래에 정직하게 노출한다. */
function MethodView({ pool, searchKey = "", method, onSelectMethod }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollToAnchor = useAnchorScroll();
  const listRef = useRef(null);
  const detailRef = useRef(null);

  const { rows, unclassified } = useMemo(() => methodRows(pool), [pool]);
  const max = rows.reduce((m, r) => Math.max(m, r.count), 0);
  const active = rows.some((r) => r.key === method) ? method : (rows[0]?.key ?? null);

  const papers = useMemo(
    () => (active ? pool.filter((p) => (p.methods ?? []).includes(active)) : []),
    [pool, active]
  );
  const sub = useSubFilter(papers, "keyword");

  const select = (m) => {
    onSelectMethod(m);
    sub.reset();
    if (isMobile) requestAnimationFrame(() => scrollToAnchor(detailRef));
  };

  const title = active ? t(`methods.${active}`) : t("pubsUI.none");

  const list = (
    <div className="pt-1">
      {rows.map((r) => (
        <ListRow
          key={r.key}
          label={t(`methods.${r.key}`)}
          count={r.count}
          max={max}
          active={active === r.key}
          onSelect={() => select(r.key)}
        />
      ))}
      {unclassified > 0 && (
        <p className="mt-3 border-t border-line px-3 pt-3 text-[12px] text-ink-600">
          {t("pubsUI.methodUnclassified", { count: unclassified })}
        </p>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div>
        <label className="block">
          <span className="sr-only">{t("pubsUI.pickMethod")}</span>
          <select
            value={active ?? ""}
            onChange={(e) => select(e.target.value)}
            className="w-full rounded-xl border border-line bg-surface-1 px-4 py-3 text-[15px] text-ink-100"
          >
            {rows.map((r) => (
              <option key={r.key} value={r.key}>
                {t(`methods.${r.key}`)} ({r.count})
              </option>
            ))}
          </select>
        </label>
        {unclassified > 0 && (
          <p className="mt-2 text-[12px] text-ink-600">
            {t("pubsUI.methodUnclassified", { count: unclassified })}
          </p>
        )}
        <div ref={detailRef} className="mt-6 scroll-mt-20">
          <DetailHeading title={title} count={papers.length} />
          <SubFilterBar st={sub} />
          <PaperList
            papers={sub.filtered}
            resetKey={`mt-${active}-${sub.pick ?? ""}-${sub.range?.label ?? ""}-${searchKey}-${pool.length}`}
          />
        </div>
      </div>
    );
  }

  return (
    <MasterDetail
      listRef={listRef}
      detailRef={detailRef}
      listLabel={t("pubsUI.methodListLabel")}
      list={list}
    >
      <DetailHeading title={title} count={papers.length} />
      <SubFilterBar st={sub} />
      <PaperList
        papers={sub.filtered}
        resetKey={`mt-${active}-${sub.pick ?? ""}-${sub.range?.label ?? ""}-${searchKey}-${pool.length}`}
      />
    </MasterDetail>
  );
}

/* ---------- 저널별 보기 (§2-2 — rank 순, ★ 없음, 접힘 버튼은 항상 맨 아래) ---------- */
const journalFromHash = () => {
  const query = window.location.hash.split("?")[1];
  return query ? new URLSearchParams(query).get("journal") : null;
};

const syncJournalHash = (journal) => {
  const base = window.location.hash.split("?")[0] || "#publications";
  const next = journal ? `${base}?journal=${encodeURIComponent(journal)}` : base;
  if (window.location.hash !== next) window.history.replaceState(null, "", next);
};

function JournalGroup({ group, journal, onSelect, isMobile, open, onToggleGroup }) {
  const { t } = useTranslation();
  const [restOpen, setRestOpen] = useState(false);
  const heading = t(group.type === "SSCI" ? "pubsUI.groupSsci" : "pubsUI.groupKci");
  const expanded = !isMobile || open;

  const rows = (list) =>
    list.map((item) => (
      <ListRow
        key={item.journal}
        label={item.journal}
        count={item.count}
        max={group.max}
        active={journal === item.journal}
        onSelect={() => onSelect(item.journal)}
      />
    ));

  const headingContent = (
    <>
      <span className="font-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
        {heading}
      </span>
      <span className="font-display text-[12px] tabular-nums text-ink-600">{group.total}</span>
    </>
  );

  return (
    <div className="mb-6 last:mb-0">
      {isMobile ? (
        <button
          type="button"
          onClick={onToggleGroup}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-2 border-b border-line pb-2"
        >
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`inline-block text-ink-600 transition-transform ${open ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            {headingContent}
          </span>
        </button>
      ) : (
        <div className="flex items-baseline justify-between gap-2 border-b border-line pb-2">
          {headingContent}
        </div>
      )}

      <Collapse open={expanded}>
        <div className="pt-1.5">
          {rows(group.primary)}
          {group.rest.length > 0 && (
            <>
              {/* 접힌 목록이 먼저, 버튼이 나중 — 펼쳐도 버튼은 항상 맨 아래에 남는다 */}
              <Collapse open={restOpen}>{rows(group.rest)}</Collapse>
              <button
                type="button"
                onClick={() => setRestOpen((v) => !v)}
                aria-expanded={restOpen}
                className="mt-1 inline-flex items-center gap-1.5 py-2 pl-3 text-[12px] text-ink-600 transition-colors hover:text-accent-300"
              >
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform ${restOpen ? "rotate-90" : ""}`}
                >
                  ▸
                </span>
                {restOpen
                  ? t("pubsUI.lessJournals")
                  : t("pubsUI.moreJournalsAll", { count: group.rest.length })}
              </button>
            </>
          )}
        </div>
      </Collapse>
    </div>
  );
}

function JournalView({ pool, searchKey = "" }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollToAnchor = useAnchorScroll();
  const listRef = useRef(null);
  const detailRef = useRef(null);

  const groups = useMemo(() => groupJournalsByType(pool), [pool]);
  const allJournals = useMemo(() => groups.flatMap((g) => [...g.primary, ...g.rest]), [groups]);
  const [journal, setJournal] = useState(() => {
    const fromHash = journalFromHash();
    if (allJournals.some((j) => j.journal === fromHash)) return fromHash;
    return allJournals[0]?.journal ?? null; // rank 정렬이므로 첫 항목이 최상위 저널
  });
  const [openGroups, setOpenGroups] = useState(() => new Set());

  useEffect(() => {
    syncJournalHash(journal);
  }, [journal]);
  useEffect(() => () => syncJournalHash(null), []);

  const current = useMemo(
    () => allJournals.find((j) => j.journal === journal) ?? null,
    [allJournals, journal]
  );
  const currentPapers = current?.papers ?? [];

  const sub = useSubFilter(currentPapers, "keyword");
  const filtered = sub.filtered;

  const selectJournal = (j) => {
    setJournal(j);
    sub.reset();
    if (isMobile) {
      setOpenGroups(new Set());
      requestAnimationFrame(() => scrollToAnchor(detailRef));
    }
  };

  const toggleGroup = (type) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });

  return (
    <MasterDetail
      listRef={listRef}
      detailRef={detailRef}
      listLabel={t("pubsUI.journalListLabel")}
      list={groups.map((g) => (
        <JournalGroup
          key={g.type}
          group={g}
          journal={journal}
          onSelect={selectJournal}
          isMobile={isMobile}
          open={openGroups.has(g.type)}
          onToggleGroup={() => toggleGroup(g.type)}
        />
      ))}
    >
      <DetailHeading
        title={journal}
        count={currentPapers.length}
        onBack={
          isMobile
            ? () => {
                setOpenGroups(new Set(groups.map((g) => g.type)));
                requestAnimationFrame(() => scrollToAnchor(listRef));
              }
            : null
        }
        backLabel={t("pubsUI.backToJournals")}
      />

      <SubFilterBar st={sub} />

      <PaperList
        papers={filtered}
        resetKey={`jn-${journal}-${sub.pick ?? ""}-${sub.range?.label ?? ""}-${searchKey}-${pool.length}`}
      />
      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-ink-600">{t("pubsUI.none")}</p>
      )}
    </MasterDetail>
  );
}

/* ---------- KCI 안내 + 저서 ---------- */
function KciAndBooks({ studentId = null }) {
  const { t } = useTranslation();
  const books = studentId ? BOOKS.filter((b) => b.studentIds?.includes(studentId)) : BOOKS;
  if (studentId && books.length === 0) return null;
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
      <Reveal>
        <div className="h-full rounded-2xl border border-line bg-surface-2 p-6">
          <div className="mb-2 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-ink-100">{KCI_COUNT_LABEL}</span>
            <h3 className="text-sm font-semibold text-ink-300">{t("pubsUI.kciTitle")}</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-ink-500">{t("pubsUI.kciDesc")}</p>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div className="h-full rounded-2xl border border-line bg-surface-2 p-6">
          <h3 className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-accent-400">
            {t("pubsUI.booksTitle")}
          </h3>
          <ul className="space-y-3.5">
            {books.map((b) => (
              <li key={b.id} className="text-sm">
                <p className="font-medium leading-snug text-ink-100">
                  {b.link ? (
                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 transition-colors hover:text-accent-300 hover:underline"
                    >
                      『{b.title}』
                      <span aria-hidden="true" className="ml-1 font-display text-[11px] text-ink-600">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <>『{b.title}』</>
                  )}
                  {b.badge && (
                    <span className="ml-2 inline-flex items-center rounded-md border border-gold-500/40 bg-gold-500/10 px-1.5 py-0.5 align-middle font-display text-[10px] font-semibold tracking-wide text-gold-300">
                      {t("pubsUI.badgeStudentCoauthor")}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[12px] text-ink-500">
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
export default function Publications({ focus = null, studentFilter = null, onClearStudent, navigate }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const [mode, setMode] = useState(readViewParam);
  const [method, setMethod] = useState(readMethodParam);
  // 검색 (21차 §5) — 입력은 즉시 반영하고, 실제 필터링은 200ms 디바운스
  const [searchInput, setSearchInput] = useState(readQueryParam);
  const [query, setQuery] = useState(() => readQueryParam().trim());
  const [typeFilter, setTypeFilter] = useState(
    focus === "kci" ? "KCI" : focus === "ssci" ? "SSCI" : "ALL"
  );

  // 실적 배지에서 유형까지 지정해 들어온 경우 (§5)
  useEffect(() => {
    if (studentFilter?.type) setTypeFilter(studentFilter.type);
  }, [studentFilter]);

  useEffect(() => {
    writeViewParams(mode, method);
  }, [mode, method]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = searchInput.trim();
      setQuery(next);
      writeQueryParam(next);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const person = studentFilter?.student ? findPerson(studentFilter.student) : null;
  const personName = person
    ? lng === "ko"
      ? `${person.nameKo}${person.nameEn ? ` (${person.nameEn})` : ""}`
      : (person.nameEn ?? person.nameKo)
    : null;

  // 검색어는 기존 필터와 AND로 함께 걸린다
  const pool = useMemo(() => {
    let list = ALL_PUBLICATIONS;
    if (studentFilter?.student)
      list = list.filter((p) => p.studentIds?.includes(studentFilter.student));
    if (typeFilter !== "ALL") list = list.filter((p) => p.type === typeFilter);
    const q = normalize(query);
    if (q) list = list.filter((p) => haystack(p, t).includes(q));
    return list;
  }, [typeFilter, studentFilter, query, t]);

  const clearAll = () => {
    setSearchInput("");
    setTypeFilter("ALL");
    if (studentFilter?.student) onClearStudent?.();
  };

  return (
    <section id="publications" data-surface="paper" className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="04"
        label={t("sections.publications.label")}
        title={t("sections.publications.title")}
        desc={t("sections.publications.desc")}
      />

      {person && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-accent-400/40 bg-surface-1 px-4 py-3">
          <span className="text-[14px] text-ink-100">
            {t("pubsUI.studentFilter", { name: personName, count: pool.length })}
          </span>
          <button
            type="button"
            onClick={onClearStudent}
            className="rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-500 transition-colors hover:border-line-strong hover:text-ink-100"
          >
            {t("pubsUI.clearFilter")}
          </button>
        </div>
      )}

      <Reveal className="mb-5">
        <SearchBox value={searchInput} onChange={setSearchInput} />
      </Reveal>

      {query && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-accent-400/40 bg-surface-1 px-4 py-3">
          <span className="text-[14px] text-ink-100">
            {t("pubsUI.searchResult", { query, count: pool.length })}
          </span>
          <button
            type="button"
            onClick={() => setSearchInput("")}
            className="rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-500 transition-colors hover:border-line-strong hover:text-ink-100"
          >
            {t("pubsUI.clearSearch")}
          </button>
        </div>
      )}

      <Reveal className="mb-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-line bg-surface-1 p-1">
          {[
            { key: "keyword", label: t("pubsUI.viewKeyword") },
            { key: "journal", label: t("pubsUI.viewJournal") },
            { key: "method", label: t("pubsUI.viewMethod") },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
                mode === m.key ? "bg-accent-500/20 text-accent-300" : "text-ink-500 hover:text-ink-300"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-xl border border-line bg-surface-1 p-1">
          {[
            { key: "ALL", label: t("pubsUI.all") },
            { key: "SSCI", label: "SSCI" },
            { key: "KCI", label: "KCI" },
          ].map((tp) => (
            <button
              key={tp.key}
              type="button"
              onClick={() => setTypeFilter(tp.key)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors md:px-4 ${
                typeFilter === tp.key
                  ? "bg-accent-500/20 text-accent-300"
                  : "text-ink-500 hover:text-ink-300"
              }`}
            >
              {tp.label}
            </button>
          ))}
        </div>
      </Reveal>

      <NavContext.Provider value={navigate}>
        <QueryContext.Provider value={query}>
          {pool.length === 0 ? (
            <div className="rounded-2xl border border-line bg-surface-2 px-6 py-14 text-center">
              <p className="text-[15px] text-ink-300">{t("pubsUI.noResults")}</p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 rounded-lg border border-line px-4 py-2 text-[13px] text-ink-500 transition-colors hover:border-line-strong hover:text-ink-100"
              >
                {t("pubsUI.clearAllFilters")}
              </button>
            </div>
          ) : mode === "keyword" ? (
            <KeywordView key={typeFilter} pool={pool} searchKey={query} />
          ) : mode === "journal" ? (
            <JournalView key={typeFilter} pool={pool} searchKey={query} />
          ) : (
            <MethodView
              key={typeFilter}
              pool={pool}
              searchKey={query}
              method={method}
              onSelectMethod={setMethod}
            />
          )}

          <KciAndBooks studentId={studentFilter?.student ?? null} />
        </QueryContext.Provider>
      </NavContext.Provider>

      {/* §5-2 안내 + §10② 저자 확인 범위 각주 */}
      <p className="mt-10 border-t border-line pt-5 text-[12px] leading-relaxed text-ink-600">
        {t("pubsUI.authorHint")}
        <br />
        {t("pubsUI.authorNote")}
      </p>
    </section>
  );
}
