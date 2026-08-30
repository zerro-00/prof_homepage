import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Reveal, SectionHeading, TopStar, useAnchorScroll } from "./common.jsx";
import { CITY_PINS, CURRENT_MEMBERS, MEMBERS_PIN } from "../data/alumni.js";
import { worksForStudent } from "../data/publications.js";
import { localizeField } from "../i18n/index.js";

const WorldMap = lazy(() => import("./WorldMap.jsx"));
const PinCard = lazy(() =>
  import("./WorldMap.jsx").then((m) => ({ default: m.PinCard }))
);

function displayName(entry, lng) {
  if (lng === "ko") return { main: entry.nameKo, sub: entry.nameEn };
  return { main: entry.nameEn ?? entry.nameKo, sub: null };
}

// 소속 축약 — "Ohio State University · Fisher College of Business" → "Ohio State University"
const shortAffiliation = (s) => (s ? s.split("·")[0].trim() : "");

/* 실적 배지 — publications.js의 studentIds 매핑에서 계산.
   클릭하면 논문 섹션으로 이동해 해당 제자의 공저 논문만 필터링한다 (§5).
   외부 링크가 아니라 사이트 내 필터 이동이다. */
function WorksBadge({ works, personId, name, navigate }) {
  const { t } = useTranslation();
  if (!works || works.length === 0) return null;
  const count = (tp) => works.filter((w) => w.type === tp).length;
  const parts = [
    { key: "SSCI", label: "SSCI", n: count("SSCI"), style: { color: "var(--ssci-text)" } },
    { key: "KCI", label: "KCI", n: count("KCI"), style: { color: "var(--kci-text)" } },
    { key: null, label: t("students.book"), n: count("BOOK"), style: { color: "var(--color-gold-300)" } },
  ].filter((p) => p.n > 0);

  const go = (type) =>
    navigate?.("publications", { student: personId, type: type ?? null });

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-display text-[11px] font-semibold tabular-nums">
      {parts.map((p, i) => (
        <span key={p.label} className="inline-flex items-center">
          {i > 0 && <span aria-hidden="true" className="mr-1.5 text-ink-600">·</span>}
          {navigate ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(p.key);
              }}
              style={p.style}
              className="rounded underline-offset-2 transition-opacity hover:underline focus-visible:outline-2 focus-visible:outline-accent-400"
              aria-label={t("pubsUI.worksAria", {
                name,
                type: p.label,
                count: p.n,
              })}
            >
              {p.label} {p.n}
            </button>
          ) : (
            <span style={p.style}>
              {p.label} {p.n}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

function WorksAccordion({ works }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  if (!works || works.length === 0) return null;
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-accent-300"
        aria-expanded={open}
      >
        <span aria-hidden="true" className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}>
          ▸
        </span>
        {open
          ? t("students.worksHide", { count: works.length })
          : t("students.worksShow", { count: works.length })}
      </button>
      <Collapse open={open}>
        <ul className="mt-2.5 space-y-2 border-l border-line pl-3">
          {works.map((w, i) => (
            <li key={i} className="text-[12px] leading-snug">
              <p className="text-ink-300">
                {w.top && <TopStar className="mr-1" title={t("students.topJournal")} />}
                {w.title}
              </p>
              <p className="mt-0.5 text-ink-600">
                <span
                  style={{
                    color:
                      w.type === "SSCI"
                        ? "var(--ssci-text)"
                        : w.type === "KCI"
                          ? "var(--kci-text)"
                          : "var(--color-gold-300)",
                  }}
                >
                  {w.type === "BOOK" ? t("students.book") : w.type}
                </span>
                <span className="mx-1.5">·</span>
                {w.journal} · {w.year}
              </p>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

/* 명단 패널의 한 줄 — 지도 핀과 양방향으로 이어진다 */
function RosterRow({ person, lng, hot, onHover, onSelect, rowRef, navigate }) {
  const name = displayName(person, lng);
  const works = worksForStudent(person.personId);
  const isFaculty = !!person.isFaculty;
  return (
    <li ref={rowRef}>
      <button
        type="button"
        onMouseEnter={onHover ? () => onHover(person) : undefined}
        onFocus={onHover ? () => onHover(person) : undefined}
        onClick={onSelect ? () => onSelect(person) : undefined}
        aria-current={hot ? "true" : undefined}
        onMouseLeave={(e) => {
          if (!hot) e.currentTarget.style.background = "";
        }}
        onMouseOver={(e) => {
          if (!hot) e.currentTarget.style.background = "var(--roster-hover)";
        }}
        style={hot ? { background: "var(--roster-hot)" } : undefined}
        className="relative flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-400"
      >
        {/* 활성 표시는 좌측 바 하나로만 */}
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-0 top-1 w-[2px] rounded-full transition-opacity"
          style={{ background: "var(--pin-active)", opacity: hot ? 1 : 0 }}
        />
        <span
          aria-hidden="true"
          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: isFaculty ? "var(--pin-faculty)" : "var(--pin)" }}
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-1.5">
            <span className={`text-[13px] font-medium ${hot ? "text-ink-100" : "text-ink-300"}`}>
              {name.main}
            </span>
            {name.sub && <span className="text-[11px] text-ink-600">({name.sub})</span>}
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-ink-500">
            {shortAffiliation(localizeField(person, "affiliation", lng)) || person._city || ""}
          </span>
        </span>
        <WorksBadge
          works={works}
          personId={person.personId}
          name={name.sub ? `${name.main} (${name.sub})` : name.main}
          navigate={navigate}
        />
      </button>
    </li>
  );
}

function AlumniCard({ entry, lng, faculty = false, navigate }) {
  const name = displayName(entry, lng);
  const works = worksForStudent(entry.personId);
  return (
    <div
      className={`h-full rounded-2xl border bg-base-900/70 transition-colors ${
        faculty ? "border-gold-500/25 p-5 hover:border-gold-500/50" : "border-line p-4 hover:border-base-600"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={faculty ? "font-semibold text-ink-100" : "text-sm"}>
          <span className={faculty ? "text-gold-300" : "font-medium text-accent-300"}>
            {name.main}
          </span>
          {name.sub && <span className="text-sm font-normal text-ink-500"> ({name.sub})</span>}
          {!faculty && (
            <>
              <span className="mx-1.5 text-ink-600">·</span>
              <span className="text-[13px] text-ink-500">{localizeField(entry, "grad", lng)}</span>
            </>
          )}
        </p>
        <WorksBadge
          works={works}
          personId={entry.personId}
          name={name.sub ? `${name.main} (${name.sub})` : name.main}
          navigate={navigate}
        />
      </div>
      <p className={`text-ink-100 ${faculty ? "mt-1.5 text-sm" : "mt-1 text-[13px]"}`}>
        {localizeField(entry, "affiliation", lng)}
      </p>
      <p className={faculty ? "text-[13px] text-ink-300" : "text-[12px] text-ink-500"}>
        {localizeField(entry, "title", lng)}
        {!faculty && ` · ${entry._city}`}
      </p>
      {faculty && (
        <>
          <p className="mt-1.5 text-[12px] text-ink-500">{localizeField(entry, "path", lng)}</p>
          <p className="mt-0.5 text-[12px] text-ink-600">
            {entry._city} · {entry._country}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg border border-gold-500/40 bg-gold-500/10 px-3 text-[13px] font-medium text-gold-300 transition-colors hover:bg-gold-500/20"
              >
                {localizeField(entry, "linkLabel", lng) ?? "Link →"}
              </a>
            )}
            {entry.subLink && (
              <a
                href={entry.subLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg border border-line bg-base-800/60 px-3 text-[13px] text-ink-300 transition-colors hover:border-base-600 hover:text-ink-100"
              >
                {localizeField(entry, "subLinkLabel", lng) ?? "Link →"}
              </a>
            )}
          </div>
        </>
      )}
      <WorksAccordion works={works} />
    </div>
  );
}

// 맨 앞 "전체"(졸업생 13 + 재학생 4 = 17)가 기본 선택 (§4-2)
const MEMBER_IDS = new Set(CURRENT_MEMBERS.map((m) => m.personId));

const TAB_KEYS = ["all", "faculty", "phd", "industry", "members"];

export default function StudentsSection({ focus = null, navigate }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const scrollTo = useAnchorScroll();
  const mapRef = useRef(null);
  const rowRefs = useRef({});

  const [tab, setTab] = useState(() => (TAB_KEYS.includes(focus) ? focus : "all"));
  const [hoverPin, setHoverPin] = useState(null);
  const [pinnedPin, setPinnedPin] = useState(null);

  // 히어로 스탯 카드에서 넘어올 때 해당 탭 활성
  useEffect(() => {
    if (TAB_KEYS.includes(focus)) setTab(focus);
  }, [focus]);

  const all = useMemo(
    () =>
      CITY_PINS.flatMap((pin) =>
        pin.entries.map((e) => ({
          ...e,
          _pinId: pin.id,
          _city: localizeField(pin, "city", lng),
          _country: localizeField(pin, "country", lng),
        }))
      ),
    [lng]
  );

  const groups = useMemo(
    () => ({
      faculty: all.filter((e) => e.isFaculty),
      phd: all.filter((e) => !e.isFaculty && e.personId !== "lee-jiyeon"),
      industry: all.filter((e) => e.personId === "lee-jiyeon"),
      members: CURRENT_MEMBERS.map((m) => ({
        ...m,
        _pinId: MEMBERS_PIN.id,
        _city: localizeField(MEMBERS_PIN, "city", lng),
        _country: localizeField(MEMBERS_PIN, "country", lng),
      })),
    }),
    [all, lng]
  );

  // "전체"는 그룹 헤더로 구분해 전원을 보여준다
  const ORDER = ["faculty", "phd", "industry", "members"];
  const current = tab === "all" ? ORDER.flatMap((k) => groups[k]) : groups[tab];
  // 현재 탭에 해당하는 핀 — 지도와 명단에 같은 필터가 걸린다
  const activePinIds = useMemo(
    () => new Set(current.map((p) => p._pinId).filter(Boolean)),
    [current]
  );

  const highlightPinId = pinnedPin ?? hoverPin;
  const shownPin = useMemo(
    () => [...CITY_PINS, MEMBERS_PIN].find((p) => p.id === (pinnedPin ?? hoverPin)) ?? null,
    [pinnedPin, hoverPin]
  );

  // ESC로 고정 해제
  useEffect(() => {
    if (!pinnedPin) return;
    const onKey = (e) => e.key === "Escape" && setPinnedPin(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinnedPin]);

  const onHoverPin = useCallback((id) => {
    setHoverPin(id);
    if (!id) return;
    // 핀 → 명단 방향: 필요하면 해당 행으로 스크롤
    const row = rowRefs.current[id];
    row?.scrollIntoView?.({ block: "nearest" });
  }, []);

  const onSelectPin = useCallback((id) => setPinnedPin((cur) => (cur === id ? null : id)), []);

  const tabItems = TAB_KEYS.map((k) => ({
    key: k,
    label: t(`students.tab${k[0].toUpperCase()}${k.slice(1)}`),
    count: k === "all" ? ORDER.reduce((n, g) => n + groups[g].length, 0) : groups[k].length,
  }));

  const badges = t("map.badges", { returnObjects: true });
  const badgeTabs = ["faculty", "phd", null, "members"];

  return (
    <section id="alumni" data-surface="field" className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="03"
        label={t("sections.alumni.label")}
        title={t("sections.alumni.title")}
        desc={t("sections.alumni.desc")}
      />

      {/* 탭 — 지도와 명단에 동시에 적용 */}
      <div
        role="tablist"
        aria-label={t("sections.alumni.title")}
        className="nav-scroll mb-5 flex gap-1 border-b border-line py-1"
      >
        {tabItems.map((it) => {
          const active = it.key === tab;
          return (
            <button
              key={it.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(it.key)}
              className={`relative shrink-0 px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 ${
                active ? "text-ink-100" : "text-ink-500 hover:text-ink-300"
              }`}
            >
              {it.label}
              <span
                className={`ml-1.5 font-display text-xs tabular-nums ${
                  active ? "text-accent-300" : "text-ink-600"
                }`}
              >
                {it.count}
              </span>
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-accent-400"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 좌: 상시 명단 패널 / 우: 지도 (모바일은 지도 축약 후 명단) */}
      <div ref={mapRef} className="scroll-mt-20 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
        <div className="order-2 mt-6 lg:order-1 lg:mt-0">
          <div className="rounded-2xl border border-line bg-base-900/70 p-4">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <h3 className="font-display text-[11px] uppercase tracking-[0.2em] text-ink-500">
                {t("students.rosterTitle")}
              </h3>
              <span className="font-display text-[12px] tabular-nums text-ink-600">
                {current.length}
              </span>
            </div>
            <ul
              data-lenis-prevent
              className="thin-scroll -mx-1 max-h-[380px] overflow-y-auto px-1 lg:max-h-[420px]"
            >
              {(tab === "all" ? ORDER : [tab]).map((g) => (
                <li key={g}>
                  {tab === "all" && (
                    <p className="mb-1 mt-3 px-2.5 font-display text-[10px] uppercase tracking-[0.18em] text-ink-600 first:mt-0">
                      {t(`students.tab${g[0].toUpperCase()}${g.slice(1)}`)}
                    </p>
                  )}
                  <ul>
                    {groups[g].map((p) => (
                      <RosterRow
                        key={p.personId}
                        person={p}
                        lng={lng}
                        hot={!!p._pinId && highlightPinId === p._pinId}
                        onHover={p._pinId ? (x) => setHoverPin(x._pinId) : undefined}
                        onSelect={p._pinId ? (x) => onSelectPin(x._pinId) : undefined}
                        navigate={navigate}
                        rowRef={(el) => {
                          if (p._pinId && !rowRefs.current[p._pinId]) rowRefs.current[p._pinId] = el;
                        }}
                      />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-2 hidden px-2.5 text-[11px] leading-relaxed text-ink-600 lg:block">
              {t("students.rosterHint")}
              <br />
              {t("students.worksHint")}
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center rounded-2xl border border-line bg-base-900/70 text-sm text-ink-600">
                …
              </div>
            }
          >
            <div className="relative">
              <WorldMap
                activePinIds={activePinIds}
                highlightPinId={highlightPinId}
                onHoverPin={onHoverPin}
                onSelectPin={onSelectPin}
              />
              {/* 데스크톱: 지도 위에 카드 오버레이 */}
              {shownPin && (
                <div className="pointer-events-none absolute inset-0 hidden lg:block">
                  <div className="pointer-events-auto absolute bottom-14 right-4 max-h-[70%] w-[26rem]">
                    <PinCard pin={shownPin} lng={lng} onClose={() => setPinnedPin(null)} />
                  </div>
                </div>
              )}
            </div>
          </Suspense>
          {/* 모바일: 카드가 지도 아래에 열림 */}
          {shownPin && (
            <div className="mt-3 lg:hidden">
              <Suspense fallback={null}>
                <PinCard pin={shownPin} lng={lng} onClose={() => setPinnedPin(null)} />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      {/* 요약 배지 — 클릭 시 해당 탭으로 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((b, i) => (
          <Reveal key={b.label} delay={i * 70}>
            <button
              type="button"
              onClick={() => (badgeTabs[i] ? setTab(badgeTabs[i]) : scrollTo(mapRef))}
              className="group relative w-full cursor-pointer rounded-xl border border-line bg-base-900/70 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-[0_0_24px_var(--glow-strong)] focus-visible:outline-2 focus-visible:outline-accent-400"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold tabular-nums text-accent-300">
                  {b.value}
                </span>
                <span className="text-sm text-ink-500">{b.label}</span>
              </span>
              {b.sub ? <span className="mt-0.5 block text-[11px] text-ink-600">{b.sub}</span> : null}
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-4 font-display text-sm text-ink-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent-300"
              >
                →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* 선택 탭의 상세 카드 목록 */}
      <div className="mt-10">
        {tab === "members" && (
          <p className="mb-4 text-[13px] text-ink-500">
            {t("students.membersDesc", { n: CURRENT_MEMBERS.length })}
          </p>
        )}
        <div
          className={`grid gap-4 ${
            tab === "faculty" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {(tab === "all" ? current : current).map((e, i) => (
            <Reveal key={e.personId} delay={(i % 3) * 60} className="h-full">
              {MEMBER_IDS.has(e.personId) ? (
                <div className="h-full rounded-2xl border border-line bg-base-850/80 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-100">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="member-dot-pulse absolute inline-flex h-full w-full rounded-full bg-mint-400" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400/80" />
                      </span>
                      {displayName(e, lng).main}
                      {displayName(e, lng).sub && (
                        <span className="text-[12px] font-normal text-ink-500">
                          ({displayName(e, lng).sub})
                        </span>
                      )}
                    </span>
                    <WorksBadge
                      works={worksForStudent(e.personId)}
                      personId={e.personId}
                      name={displayName(e, lng).main}
                      navigate={navigate}
                    />
                  </div>
                  <WorksAccordion works={worksForStudent(e.personId)} />
                </div>
              ) : (
                <AlumniCard entry={e} lng={lng} faculty={!!e.isFaculty} navigate={navigate} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
