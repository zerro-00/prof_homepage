import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Reveal, SectionHeading, TopStar, useAnchorScroll, useIsMobile } from "./common.jsx";
import {
  ALL_PUBLICATIONS,
  KCI_COUNT_LABEL,
  BOOKS,
  KEYWORDS,
  YEAR_RANGES,
  groupJournalsByType,
  paperUrl,
} from "../data/publications.js";

/* ---------- SSCI / KCI 타입 태그 ---------- */
function TypeTag({ type }) {
  const styles =
    type === "SSCI"
      ? "border-accent-500/40 bg-accent-500/10 text-accent-300"
      : "border-mint-400/40 bg-mint-400/10 text-mint-400";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 font-display text-[10px] font-semibold tracking-wide ${styles}`}
    >
      {type}
    </span>
  );
}

/* ---------- 논문 카드 — 전체가 원문 링크 (DOI 또는 검색 폴백) ---------- */
function PaperCard({ paper }) {
  const { t } = useTranslation();
  return (
    <a
      href={paperUrl(paper)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${paper.title} — ${t("pubsUI.openLink")}`}
      className="group relative block rounded-2xl border border-line bg-base-900/70 p-5 md:p-6 transition-all hover:border-accent-500/50 hover:shadow-[0_0_20px_var(--glow-soft)] focus-visible:outline-2 focus-visible:outline-accent-400"
    >
      {/* 우상단 외부링크 아이콘 */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 font-display text-sm text-ink-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-accent-300 group-focus-visible:opacity-100"
      >
        ↗
      </span>
      <div className="flex flex-wrap items-center gap-2 mb-3 pr-6">
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
      <h4 className="text-[15px] md:text-base font-semibold leading-snug text-ink-100 group-hover:text-accent-300 transition-colors">
        {paper.title}
      </h4>
      <p className="mt-3 text-[13px] md:text-sm leading-relaxed text-ink-300">
        {t(`pubs.${paper.id}`)}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {paper.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-line bg-base-800/60 px-2.5 py-0.5 text-[11px] text-ink-500"
          >
            {t(`keywords.${k}`)}
          </span>
        ))}
      </div>
    </a>
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
function KeywordView({ pool }) {
  const { t } = useTranslation();
  const available = useMemo(
    () => KEYWORDS.filter((k) => pool.some((p) => p.keywords.includes(k))),
    [pool]
  );
  const [keyword, setKeyword] = useState(available[0]);
  const papers = useMemo(
    () => pool.filter((p) => p.keywords.includes(keyword)),
    [pool, keyword]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {available.map((k) => {
          const count = pool.filter((p) => p.keywords.includes(k)).length;
          return (
            <FilterBtn key={k} activeState={keyword === k} onClick={() => setKeyword(k)}>
              {t(`keywords.${k}`)} <span className="opacity-60 font-display">{count}</span>
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

/* ---------- 저널별 보기 (15차 §2 — SSCI/KCI 2단 그룹 + 마스터-디테일) ---------- */

// URL 해시의 ?journal= 동기화 — 새로고침·뒤로가기에서 선택이 유지된다.
// history.replaceState를 쓰므로 저널을 바꿔도 뒤로가기 기록이 쌓이지 않는다(뒤로가기 = 이전 섹션).
const journalFromHash = () => {
  const query = window.location.hash.split("?")[1];
  return query ? new URLSearchParams(query).get("journal") : null;
};

const syncJournalHash = (journal) => {
  const base = window.location.hash.split("?")[0] || "#publications";
  const next = journal ? `${base}?journal=${encodeURIComponent(journal)}` : base;
  if (window.location.hash !== next) window.history.replaceState(null, "", next);
};

// 저널 목록 행 — 칩이 아니라 프로필 섹션과 같은 리스트 언어 (저널명 · 편수 · 얇은 비율 바)
function JournalRow({ item, max, active, onSelect }) {
  const { t } = useTranslation();
  const ratio = max > 0 ? Math.max(8, Math.round((item.count / max) * 100)) : 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.journal)}
      aria-current={active ? "true" : undefined}
      className={`group relative block w-full py-2 pl-3 pr-1 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 ${
        active ? "text-ink-100" : "text-ink-500 hover:text-ink-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full transition-colors ${
          active ? "bg-accent-400" : "bg-transparent group-hover:bg-base-600"
        }`}
      />
      <span className="flex items-baseline gap-2">
        <span className={`min-w-0 flex-1 text-[13px] leading-snug ${active ? "font-medium" : ""}`}>
          {item.journal}
          {item.hasTop && <TopStar className="ml-1" title={t("students.topJournal")} />}
        </span>
        <span
          className={`shrink-0 font-display text-[12px] tabular-nums ${
            active ? "text-accent-300" : "text-ink-600"
          }`}
        >
          {item.count}
        </span>
      </span>
      <span aria-hidden="true" className="mt-1.5 block h-[3px] w-full rounded-full bg-base-800">
        <span
          className={`block h-[3px] rounded-full transition-colors ${
            active ? "bg-accent-400" : "bg-base-600 group-hover:bg-ink-600"
          }`}
          style={{ width: `${ratio}%` }}
        />
      </span>
    </button>
  );
}

// 그룹(SSCI / KCI) — 데스크톱은 항상 펼침, 모바일(<768px)은 아코디언
function JournalGroup({ group, journal, onSelect, isMobile, open, onToggleGroup }) {
  const { t } = useTranslation();
  const [restOpen, setRestOpen] = useState(false);
  const heading = t(group.type === "SSCI" ? "pubsUI.groupSsci" : "pubsUI.groupKci");
  const expanded = !isMobile || open;

  const rows = (list) =>
    list.map((item) => (
      <JournalRow
        key={item.journal}
        item={item}
        max={group.max}
        active={journal === item.journal}
        onSelect={onSelect}
      />
    ));

  const headingContent = (
    <>
      <span className="font-display text-[11px] tracking-[0.22em] uppercase text-ink-500">
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
              <button
                type="button"
                onClick={() => setRestOpen((v) => !v)}
                aria-expanded={restOpen}
                className="mt-1 inline-flex items-center gap-1.5 pl-3 py-2 text-[12px] text-ink-600 transition-colors hover:text-accent-300"
              >
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform ${restOpen ? "rotate-90" : ""}`}
                >
                  ▸
                </span>
                {restOpen
                  ? t("pubsUI.lessJournals")
                  : t("pubsUI.moreJournals", { count: group.rest.length })}
              </button>
              <Collapse open={restOpen}>{rows(group.rest)}</Collapse>
            </>
          )}
        </div>
      </Collapse>
    </div>
  );
}

function JournalView({ pool }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollToAnchor = useAnchorScroll();
  const listRef = useRef(null);
  const detailRef = useRef(null);

  const groups = useMemo(() => groupJournalsByType(pool), [pool]);
  const allJournals = useMemo(
    () => groups.flatMap((g) => [...g.primary, ...g.rest]),
    [groups]
  );
  // 초기 선택: 편수 최다 저널. 단 URL에 ?journal=이 있고 현재 풀에 존재하면 그것을 우선.
  const [journal, setJournal] = useState(() => {
    const fromHash = journalFromHash();
    if (allJournals.some((j) => j.journal === fromHash)) return fromHash;
    return allJournals.reduce((best, j) => (!best || j.count > best.count ? j : best), null)
      ?.journal ?? null;
  });
  const [openGroups, setOpenGroups] = useState(() => new Set());
  const [subMode, setSubMode] = useState("keyword");
  const [subKeyword, setSubKeyword] = useState(null);
  const [subRange, setSubRange] = useState(null);

  useEffect(() => {
    syncJournalHash(journal);
  }, [journal]);
  // 키워드별 보기로 돌아가거나 섹션을 떠나면 ?journal= 제거
  useEffect(() => () => syncJournalHash(null), []);

  const current = useMemo(
    () => allJournals.find((j) => j.journal === journal) ?? null,
    [allJournals, journal]
  );
  const currentPapers = current?.papers ?? [];

  const availableKeywords = useMemo(
    () => KEYWORDS.filter((k) => currentPapers.some((p) => p.keywords.includes(k))),
    [currentPapers]
  );
  const availableRanges = useMemo(
    () =>
      YEAR_RANGES.filter((r) => currentPapers.some((p) => p.year >= r.from && p.year <= r.to)),
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
    if (isMobile) {
      // 모바일: 아코디언을 닫고 논문 목록으로 이동
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

  const backToJournalList = () => {
    setOpenGroups(new Set(groups.map((g) => g.type)));
    requestAnimationFrame(() => scrollToAnchor(listRef));
  };

  return (
    <div className="md:grid md:grid-cols-[320px_minmax(0,1fr)] md:gap-8 md:items-start">
      {/* 좌측: 저널 목록 (데스크톱 sticky) */}
      <nav
        ref={listRef}
        aria-label={t("pubsUI.journalListLabel")}
        data-lenis-prevent
        className="scroll-mt-20 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:pr-2 thin-scroll"
      >
        {groups.map((g) => (
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
      </nav>

      {/* 우측: 선택 저널의 논문 목록 */}
      <div ref={detailRef} className="mt-8 md:mt-0 scroll-mt-20">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          {isMobile && (
            <button
              type="button"
              onClick={backToJournalList}
              className="rounded-lg border border-line bg-base-800/60 px-3 py-1.5 text-[12px] text-ink-500 transition-colors hover:text-ink-100 hover:border-base-600"
            >
              {t("pubsUI.backToJournals")}
            </button>
          )}
          <h3 className="text-base font-semibold leading-snug text-ink-100">
            {current?.hasTop && <TopStar className="mr-1.5" title={t("students.topJournal")} />}
            {journal}
          </h3>
          <span className="font-display text-[12px] text-ink-500">
            {t("pubsUI.paperCount", { count: currentPapers.length })}
          </span>
        </div>

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
              {t("pubsUI.filterKeyword")}
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
              {t("pubsUI.filterYear")}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {subMode === "keyword" ? (
              <>
                <FilterBtn activeState={subKeyword === null} onClick={() => setSubKeyword(null)}>
                  {t("pubsUI.all")}
                </FilterBtn>
                {availableKeywords.map((k) => (
                  <FilterBtn
                    key={k}
                    activeState={subKeyword === k}
                    onClick={() => setSubKeyword(k)}
                  >
                    {t(`keywords.${k}`)}
                  </FilterBtn>
                ))}
              </>
            ) : (
              <>
                <FilterBtn activeState={subRange === null} onClick={() => setSubRange(null)}>
                  {t("pubsUI.all")}
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

        <div className="grid gap-4">
          {filtered.map((p) => (
            <PaperCard key={p.id} paper={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-ink-600 py-8 text-center">{t("pubsUI.none")}</p>
        )}
      </div>
    </div>
  );
}

/* ---------- KCI 안내 + 저서 ---------- */
function KciAndBooks() {
  const { t } = useTranslation();
  return (
    <div className="mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
      <Reveal>
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display text-3xl font-bold text-ink-100">
              {KCI_COUNT_LABEL}
            </span>
            <h3 className="text-sm font-semibold text-ink-300">{t("pubsUI.kciTitle")}</h3>
          </div>
          <p className="text-[13px] text-ink-500 leading-relaxed">{t("pubsUI.kciDesc")}</p>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
          <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-4">
            {t("pubsUI.booksTitle")}
          </h3>
          <ul className="space-y-3.5">
            {BOOKS.map((b) => (
              <li key={b.id} className="text-sm">
                <p className="text-ink-100 font-medium leading-snug">
                  『{b.title}』
                  {b.badge && (
                    <span className="ml-2 inline-flex items-center rounded-md border border-gold-500/40 bg-gold-500/10 px-1.5 py-0.5 align-middle font-display text-[10px] font-semibold tracking-wide text-gold-300">
                      {t("pubsUI.badgeStudentCoauthor")}
                    </span>
                  )}
                </p>
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
export default function Publications({ focus = null }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState("keyword");
  const [typeFilter, setTypeFilter] = useState(
    focus === "kci" ? "KCI" : focus === "ssci" ? "SSCI" : "ALL"
  );

  const pool = useMemo(
    () =>
      typeFilter === "ALL"
        ? ALL_PUBLICATIONS
        : ALL_PUBLICATIONS.filter((p) => p.type === typeFilter),
    [typeFilter]
  );

  return (
    <section id="publications" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="04"
        label={t("sections.publications.label")}
        title={t("sections.publications.title")}
        desc={t("sections.publications.desc")}
      />

      <Reveal className="mb-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-line bg-base-850/80 p-1">
          {[
            { key: "keyword", label: t("pubsUI.viewKeyword") },
            { key: "journal", label: t("pubsUI.viewJournal") },
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
        <div className="inline-flex rounded-xl border border-line bg-base-850/80 p-1">
          {[
            { key: "ALL", label: t("pubsUI.all") },
            { key: "SSCI", label: "SSCI" },
            { key: "KCI", label: "KCI" },
          ].map((tp) => (
            <button
              key={tp.key}
              type="button"
              onClick={() => setTypeFilter(tp.key)}
              className={`rounded-lg px-3.5 md:px-4 py-2 text-sm font-medium transition-colors ${
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

      {mode === "keyword" ? (
        <KeywordView key={typeFilter} pool={pool} />
      ) : (
        <JournalView key={typeFilter} pool={pool} />
      )}

      <KciAndBooks />
    </section>
  );
}
