import { useEffect, useMemo, useRef, useState } from "react";
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
} from "../data/publications.js";

/* ---------- SSCI / KCI 타입 태그 ---------- */
function TypeTag({ type }) {
  return (
    <span
      className="inline-flex items-center rounded-md border px-1.5 py-0.5 font-display text-[10px] font-semibold tracking-wide"
      style={{
        color: type === "SSCI" ? "var(--ssci-text)" : "var(--kci-text)",
        borderColor: type === "SSCI" ? "var(--ssci-bar)" : "var(--kci-bar)",
      }}
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
      className="group relative block overflow-hidden rounded-2xl border border-line bg-base-900/70 p-5 pl-6 transition-all hover:border-accent-500/50 hover:shadow-[0_0_20px_var(--glow-soft)] focus-visible:outline-2 focus-visible:outline-accent-400 md:p-6 md:pl-7"
    >
      {/* 좌측 SSCI/KCI 구분 바 — 텍스트와 다른 토큰(비텍스트 3:1) */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: paper.type === "SSCI" ? "var(--ssci-bar)" : "var(--kci-bar)" }}
      />
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 font-display text-sm text-ink-600 opacity-0 transition-all duration-200 group-hover:text-accent-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        ↗
      </span>
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
        {paper.title}
      </h4>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-300 md:text-sm">
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

/* ---------- 필터 버튼 (연도/키워드 하위 필터 전용) ---------- */
function FilterBtn({ activeState, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
        activeState
          ? "border-accent-400 bg-accent-500/15 text-accent-300"
          : "border-line bg-base-800/50 text-ink-500 hover:border-base-600 hover:text-ink-300"
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
      className={`group relative block w-full py-2 pl-3 pr-1 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 ${
        active ? "text-ink-100" : "text-ink-500 hover:text-ink-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1.5 left-0 top-1.5 w-[2px] rounded-full transition-colors ${
          active ? "bg-accent-400" : "bg-transparent group-hover:bg-base-600"
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
          className="rounded-lg border border-line bg-base-800/60 px-3 py-1.5 text-[12px] text-ink-500 transition-colors hover:border-base-600 hover:text-ink-100"
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

/* ---------- 키워드별 보기 (§2-1 — 칩 제거, 마스터-디테일) ---------- */
const ALL_KEY = "__all__";

function KeywordView({ pool }) {
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

  const select = (k) => {
    setKeyword(k);
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
            className="w-full rounded-xl border border-line bg-base-850 px-4 py-3 text-[15px] text-ink-100"
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
          <div className="grid gap-4">
            {papers.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
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
      <div className="grid gap-4">
        {papers.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </div>
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

function JournalView({ pool }) {
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
  const [subMode, setSubMode] = useState("keyword");
  const [subKeyword, setSubKeyword] = useState(null);
  const [subRange, setSubRange] = useState(null);

  useEffect(() => {
    syncJournalHash(journal);
  }, [journal]);
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
    () => YEAR_RANGES.filter((r) => currentPapers.some((p) => p.year >= r.from && p.year <= r.to)),
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

      <div className="mb-6 rounded-xl border border-line bg-base-850/60 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="mr-1 font-display text-[11px] uppercase tracking-[0.2em] text-ink-600">
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
                <FilterBtn key={k} activeState={subKeyword === k} onClick={() => setSubKeyword(k)}>
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
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
          <div className="mb-2 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-ink-100">{KCI_COUNT_LABEL}</span>
            <h3 className="text-sm font-semibold text-ink-300">{t("pubsUI.kciTitle")}</h3>
          </div>
          <p className="text-[13px] leading-relaxed text-ink-500">{t("pubsUI.kciDesc")}</p>
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
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
export default function Publications({ focus = null, studentFilter = null, onClearStudent }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const [mode, setMode] = useState("keyword");
  const [typeFilter, setTypeFilter] = useState(
    focus === "kci" ? "KCI" : focus === "ssci" ? "SSCI" : "ALL"
  );

  // 실적 배지에서 유형까지 지정해 들어온 경우 (§5)
  useEffect(() => {
    if (studentFilter?.type) setTypeFilter(studentFilter.type);
  }, [studentFilter]);

  const person = studentFilter?.student ? findPerson(studentFilter.student) : null;
  const personName = person
    ? lng === "ko"
      ? `${person.nameKo}${person.nameEn ? ` (${person.nameEn})` : ""}`
      : (person.nameEn ?? person.nameKo)
    : null;

  const pool = useMemo(() => {
    let list = ALL_PUBLICATIONS;
    if (studentFilter?.student)
      list = list.filter((p) => p.studentIds?.includes(studentFilter.student));
    if (typeFilter !== "ALL") list = list.filter((p) => p.type === typeFilter);
    return list;
  }, [typeFilter, studentFilter]);

  return (
    <section id="publications" data-surface="paper" className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="04"
        label={t("sections.publications.label")}
        title={t("sections.publications.title")}
        desc={t("sections.publications.desc")}
      />

      {person && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-accent-400/40 bg-base-850/70 px-4 py-3">
          <span className="text-[14px] text-ink-100">
            {t("pubsUI.studentFilter", { name: personName, count: pool.length })}
          </span>
          <button
            type="button"
            onClick={onClearStudent}
            className="rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-500 transition-colors hover:border-base-600 hover:text-ink-100"
          >
            {t("pubsUI.clearFilter")}
          </button>
        </div>
      )}

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
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
                mode === m.key ? "bg-accent-500/20 text-accent-300" : "text-ink-500 hover:text-ink-300"
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

      {mode === "keyword" ? (
        <KeywordView key={typeFilter} pool={pool} />
      ) : (
        <JournalView key={typeFilter} pool={pool} />
      )}

      <KciAndBooks studentId={studentFilter?.student ?? null} />
    </section>
  );
}
