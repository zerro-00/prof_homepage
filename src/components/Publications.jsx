import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal, SectionHeading } from "./common.jsx";
import {
  ALL_PUBLICATIONS,
  KCI_COUNT_LABEL,
  BOOKS,
  KEYWORDS,
  YEAR_RANGES,
  groupByJournal,
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
      className="group relative block rounded-2xl border border-line bg-base-900/70 p-5 md:p-6 transition-all hover:border-accent-500/50 hover:shadow-[0_0_20px_rgba(47,127,242,0.15)] focus-visible:outline-2 focus-visible:outline-accent-400"
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

function PartialNote({ show }) {
  const { t } = useTranslation();
  if (!show) return null;
  return <p className="mt-6 text-center text-xs text-ink-600">{t("pubsUI.partial")}</p>;
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
  const hasKci = pool.some((p) => p.type === "KCI");

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
      <PartialNote show={hasKci} />
    </div>
  );
}

/* ---------- 저널별 보기 ---------- */
function JournalView({ pool }) {
  const { t } = useTranslation();
  const journals = useMemo(() => groupByJournal(pool), [pool]);
  const [journal, setJournal] = useState(journals[0]?.journal ?? null);
  const [subMode, setSubMode] = useState("keyword");
  const [subKeyword, setSubKeyword] = useState(null);
  const [subRange, setSubRange] = useState(null);

  const currentPapers = useMemo(
    () => journals.find((j) => j.journal === journal)?.papers ?? [],
    [journals, journal]
  );

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
  const hasKci = pool.some((p) => p.type === "KCI");

  return (
    <div>
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

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-ink-600 py-8 text-center">{t("pubsUI.none")}</p>
      )}
      <PartialNote show={hasKci} />
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
