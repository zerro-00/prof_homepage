import { Suspense, lazy, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Reveal, SectionHeading, TopStar, useAnchorScroll } from "./common.jsx";
import { CITY_PINS, CURRENT_MEMBERS } from "../data/alumni.js";
import { worksForStudent } from "../data/publications.js";
import { localizeField } from "../i18n/index.js";

// 지도는 무겁기 때문에 lazy 로딩
const WorldMap = lazy(() => import("./WorldMap.jsx"));

function displayName(entry, lng) {
  if (lng === "ko") return { main: entry.nameKo, sub: entry.nameEn };
  return { main: entry.nameEn ?? entry.nameKo, sub: null };
}

// 실적 배지 — "SSCI 3 · KCI 7 · 저서 1" (publications.js의 studentIds 매핑에서 계산)
function WorksBadge({ works }) {
  const { t } = useTranslation();
  if (!works || works.length === 0) return null;
  const count = (tp) => works.filter((w) => w.type === tp).length;
  const parts = [
    { label: "SSCI", n: count("SSCI"), cls: "text-accent-300" },
    { label: "KCI", n: count("KCI"), cls: "text-mint-400" },
    { label: t("students.book"), n: count("BOOK"), cls: "text-gold-300" },
  ].filter((p) => p.n > 0);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-base-850/80 px-2 py-0.5 font-display text-[11px] font-semibold">
      {parts.map((p, i) => (
        <span key={p.label} className={p.cls}>
          {i > 0 && <span className="text-ink-600 mr-1.5">·</span>}
          {p.label} {p.n}
        </span>
      ))}
    </span>
  );
}

// 실적 아코디언 — 논문 제목은 원문 유지, ★는 최상위 저널
function WorksAccordion({ works }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  if (!works || works.length === 0) return null;
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-ink-500 hover:text-accent-300 transition-colors inline-flex items-center gap-1.5"
        aria-expanded={open}
      >
        <span className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}>▸</span>
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
              <p className="text-ink-600 mt-0.5">
                <span
                  className={
                    w.type === "SSCI"
                      ? "text-accent-300"
                      : w.type === "KCI"
                        ? "text-mint-400"
                        : "text-gold-300"
                  }
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

function GroupHeading({ tone = "accent", children }) {
  const cls = tone === "gold" ? "text-gold-300" : tone === "mint" ? "text-mint-400" : "text-accent-400";
  return (
    <h3 className={`font-display text-xs tracking-[0.25em] uppercase mb-4 ${cls}`}>{children}</h3>
  );
}

function AlumniCard({ entry, lng, faculty = false }) {
  const name = displayName(entry, lng);
  const works = worksForStudent(entry.personId);
  return (
    <div
      className={`h-full rounded-2xl border bg-base-900/70 transition-colors ${
        faculty
          ? "border-gold-500/25 hover:border-gold-500/50 p-5"
          : "border-line hover:border-base-600 p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={faculty ? "font-semibold text-ink-100" : "text-sm"}>
          <span className={faculty ? "text-gold-300" : "text-accent-300 font-medium"}>
            {name.main}
          </span>
          {name.sub && (
            <span className="text-ink-500 font-normal text-sm"> ({name.sub})</span>
          )}
          {!faculty && (
            <>
              <span className="text-ink-600 mx-1.5">·</span>
              <span className="text-ink-500 text-[13px]">{localizeField(entry, "grad", lng)}</span>
            </>
          )}
        </p>
        <WorksBadge works={works} />
      </div>
      <p className={`text-ink-100 ${faculty ? "text-sm mt-1.5" : "text-[13px] mt-1"}`}>
        {localizeField(entry, "affiliation", lng)}
      </p>
      <p className={faculty ? "text-[13px] text-ink-300" : "text-[12px] text-ink-500"}>
        {localizeField(entry, "title", lng)}
        {!faculty && ` · ${entry._city}`}
      </p>
      {faculty && (
        <>
          <p className="text-[12px] text-ink-500 mt-1.5">{localizeField(entry, "path", lng)}</p>
          <p className="text-[12px] text-ink-600 mt-0.5">
            {entry._city} · {entry._country}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-3 py-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 transition-colors font-medium"
              >
                {localizeField(entry, "linkLabel", lng) ?? "Link →"}
              </a>
            )}
            {entry.subLink && (
              <a
                href={entry.subLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-3 py-1.5 rounded-lg border border-line bg-base-800/60 text-ink-300 hover:text-ink-100 hover:border-base-600 transition-colors"
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

export default function StudentsSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const mapRef = useRef(null);
  const facultyRef = useRef(null);
  const phdRef = useRef(null);
  const membersRef = useRef(null);

  const all = CITY_PINS.flatMap((pin) =>
    pin.entries.map((e) => ({
      ...e,
      _city: localizeField(pin, "city", lng),
      _country: localizeField(pin, "country", lng),
    }))
  );
  const faculty = all.filter((e) => e.isFaculty);
  const phd = all.filter((e) => !e.isFaculty && e.personId !== "lee-jiyeon");
  const industry = all.filter((e) => e.personId === "lee-jiyeon");

  const badges = t("map.badges", { returnObjects: true });
  const badgeTargets = [facultyRef, phdRef, mapRef, membersRef];
  const scrollTo = useAnchorScroll();

  return (
    <section id="alumni" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="03"
        label={t("sections.alumni.label")}
        title={t("sections.alumni.title")}
        desc={t("sections.alumni.desc")}
      />

      <div ref={mapRef} className="scroll-mt-20">
        <Suspense
          fallback={
            <div className="h-72 rounded-2xl border border-line bg-base-900/70 flex items-center justify-center text-ink-600 text-sm">
              …
            </div>
          }
        >
          <WorldMap />
        </Suspense>
      </div>

      {/* 요약 배지 — 클릭 시 해당 그룹으로 이동 (히어로 스탯 카드와 동일한 인터랙션 언어) */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((b, i) => (
          <Reveal key={b.label} delay={i * 70}>
            <button
              type="button"
              onClick={() => scrollTo(badgeTargets[i])}
              className="group relative w-full cursor-pointer rounded-xl border border-line bg-base-900/70 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-[0_0_24px_var(--glow-strong)] focus-visible:outline-2 focus-visible:outline-accent-400"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-accent-300 tabular-nums">
                  {b.value}
                </span>
                <span className="text-sm text-ink-500">{b.label}</span>
              </span>
              {b.sub ? (
                <span className="mt-0.5 block text-[11px] text-ink-600">{b.sub}</span>
              ) : null}
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-4 font-display text-sm text-ink-600 transition-all duration-200 group-hover:text-accent-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* 교수 임용 */}
      <div ref={facultyRef} className="mt-10 scroll-mt-20">
        <GroupHeading tone="gold">{t("students.facultyHeading")}</GroupHeading>
        <div className="grid md:grid-cols-2 gap-4">
          {faculty.map((e) => (
            <Reveal key={e.personId}>
              <AlumniCard entry={e} lng={lng} faculty />
            </Reveal>
          ))}
        </div>
      </div>

      {/* 박사과정 진학 */}
      <div ref={phdRef} className="mt-10 scroll-mt-20">
        <GroupHeading>{t("students.phdHeading")}</GroupHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {phd.map((e, i) => (
            <Reveal key={e.personId} delay={(i % 3) * 60}>
              <AlumniCard entry={e} lng={lng} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* 기업 진출 */}
      <div className="mt-10">
        <GroupHeading>{t("students.industryHeading")}</GroupHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industry.map((e) => (
            <Reveal key={e.personId}>
              <AlumniCard entry={e} lng={lng} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* 재학생 */}
      <div ref={membersRef} className="mt-12 scroll-mt-20">
        <Reveal>
          <div className="rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <div className="flex items-baseline gap-3 mb-1.5">
              <h3 className="font-display text-xs tracking-[0.25em] uppercase text-mint-400">
                {t("students.membersTitle")}
              </h3>
              <span className="text-sm font-semibold text-ink-100">
                {t("students.membersSub")}
              </span>
            </div>
            <p className="text-[13px] text-ink-500 mb-4">
              {t("students.membersDesc", { n: CURRENT_MEMBERS.length })}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CURRENT_MEMBERS.map((m) => {
                const name = displayName(m, lng);
                const works = worksForStudent(m.personId);
                return (
                  <div key={m.personId} className="rounded-xl border border-line bg-base-850/80 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-sm text-ink-100 font-medium">
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                          <span className="member-dot-pulse absolute inline-flex h-full w-full rounded-full bg-mint-400" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400/80" />
                        </span>
                        {name.main}
                        {name.sub && (
                          <span className="text-ink-500 font-normal text-[12px]">({name.sub})</span>
                        )}
                      </span>
                      <WorksBadge works={works} />
                    </div>
                    <WorksAccordion works={works} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
