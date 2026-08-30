import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal, CountUp } from "./common.jsx";
import { BASIC_INFO, HERO_STATS } from "../data/profile.js";

function StatCard({ stat, delay, navigate }) {
  const { t } = useTranslation();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => navigate(stat.section, stat.focus ? { focus: stat.focus } : null)}
        className="group relative w-full cursor-pointer rounded-xl border border-line bg-base-850/80 px-5 py-4 text-left backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-[0_0_24px_var(--glow-strong)] focus-visible:outline-2 focus-visible:outline-accent-400"
        aria-label={`${t(`hero.stats.${stat.key}`)} — ${t("hero.statAria")}`}
      >
        <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded bg-gradient-to-b from-accent-400 to-accent-600/20" />
        <span className="flex items-baseline gap-0.5 leading-none">
          <CountUp
            value={stat.value}
            className="font-display text-3xl md:text-4xl font-bold text-ink-100 tabular-nums leading-none"
          />
          <span className="text-xl md:text-2xl font-bold text-ink-100 leading-none">
            {t(`hero.suffix.${stat.suffixKey}`)}
          </span>
        </span>
        <span className="mt-2 block text-[13px] text-ink-500">{t(`hero.stats.${stat.key}`)}</span>
        {stat.hasSub && (
          <span className="block text-[11px] text-ink-600 mt-0.5">{t("hero.stats.alumniSub")}</span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-4 font-display text-sm text-ink-600 transition-all duration-200 group-hover:text-accent-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>
    </Reveal>
  );
}

function InfoCard({ title, children, className = "", delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6">
        <h2 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-4">
          {title}
        </h2>
        {children}
      </div>
    </Reveal>
  );
}

function Row({ label, children }) {
  return (
    <li className="flex gap-3 text-sm">
      <span className="font-display text-ink-600 tabular-nums shrink-0 w-28">{label}</span>
      <span className="text-ink-300">{children}</span>
    </li>
  );
}

function GroupLabel({ children }) {
  return (
    <p className="mt-5 mb-2 first:mt-0 text-[11px] font-display tracking-[0.2em] uppercase text-ink-600">
      {children}
    </p>
  );
}

export default function Hero({ navigate }) {
  const { t, i18n } = useTranslation();
  const [showPast, setShowPast] = useState(false);
  const isKo = i18n.language === "ko";

  const education = t("profile.education", { returnObjects: true });
  const careerMain = t("profile.careerMain", { returnObjects: true });
  const careerAdjunct = t("profile.careerAdjunct", { returnObjects: true });
  const board = t("profile.board", { returnObjects: true });
  const academic = t("profile.academic", { returnObjects: true });
  const industryCurrent = t("profile.industryCurrent", { returnObjects: true });
  const industryPast = t("profile.industryPast", { returnObjects: true });

  return (
    <header id="profile" className="relative overflow-hidden">
      <div className="absolute inset-0 hud-grid" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-accent-600/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-24 md:pt-32 pb-16">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
          {/* 프로필 사진 — 항상 밝은 원본 컬러 유지 */}
          <Reveal delay={60} className="justify-self-center md:justify-self-start">
            <div className="group relative transition-transform duration-300 hover:-translate-y-0.5">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent-500/35 via-transparent to-mint-400/20 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-64 w-52 md:h-80 md:w-60 overflow-hidden rounded-2xl border border-accent-500/25">
                <picture>
                  {/* 모바일에서는 208~256px로만 표시되므로 작은 소스를 따로 준다 */}
                  <source
                    type="image/webp"
                    srcSet="/profile-small.webp 427w, /profile.webp 800w"
                    sizes="(max-width: 767px) 208px, 240px"
                  />
                  <img
                    src="/profile.jpg"
                    srcSet="/profile-small.jpg 427w, /profile.jpg 800w"
                    sizes="(max-width: 767px) 208px, 240px"
                    alt={t("hero.photoAlt")}
                    width={800}
                    height={1200}
                    loading="eager"
                    fetchpriority="high"
                    className="h-full w-full object-cover object-[center_top]"
                    onError={(e) => {
                      e.currentTarget.closest("picture").style.display = "none";
                      e.currentTarget.closest("picture").nextElementSibling.style.display = "flex";
                    }}
                  />
                </picture>
                <div
                  className="hidden h-full w-full bg-base-800 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-4xl font-bold text-accent-300/60">JC</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 이름/직함/소개/연락처 */}
          <div>
            <Reveal>
              <p className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-accent-300/90">
                {t("hero.kicker")}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className={`mt-4 font-extrabold tracking-tight leading-[1.05] ${
                  isKo ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"
                }`}
              >
                {t("hero.name")}
                <span className="block mt-2 font-display text-xl md:text-2xl font-medium text-ink-500 tracking-normal">
                  {t("hero.subtitle")}
                </span>
              </h1>
            </Reveal>
            {/* 한 줄 소개 — 영문 직함 줄과 연락처 사이 (통합 핸드오프 §1-6, 문장 변경 금지) */}
            <Reveal delay={160}>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-ink-500 md:text-[17px]">
                {t("hero.tagline")}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-8 space-y-1.5 text-sm text-ink-500">
                <li>
                  <span className="text-ink-600 mr-2">{t("hero.officeLabel")}</span>
                  {t("hero.office")}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">{t("hero.phoneLabel")}</span>
                  {BASIC_INFO.phone}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">{t("hero.emailLabel")}</span>
                  <a
                    href={`mailto:${BASIC_INFO.email}`}
                    className="text-accent-300 hover:text-accent-400 transition-colors"
                  >
                    {BASIC_INFO.email}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* 스탯 카운터 */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {HERO_STATS.map((s, i) => (
            <StatCard key={s.key} stat={s} delay={i * 90} navigate={navigate} />
          ))}
        </div>

        {/* 프로필 상세 그리드 */}
        <div className="mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
          <InfoCard title={t("hero.cards.education")}>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.detail} className="flex gap-3 text-sm">
                  <span className="font-display font-semibold text-ink-100 shrink-0 w-28">
                    {e.degree}
                  </span>
                  <span className="text-ink-300">{e.detail}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={t("hero.cards.positions")} delay={60}>
            <GroupLabel>{t("hero.positionsMain")}</GroupLabel>
            <ul className="space-y-2.5">
              {careerMain.map((c) => (
                <Row key={c.role} label={c.period}>
                  {c.role}
                </Row>
              ))}
            </ul>
            <GroupLabel>{t("hero.positionsAdjunct")}</GroupLabel>
            <ul className="space-y-2.5">
              {careerAdjunct.map((c) => (
                <Row key={c.role} label={c.period}>
                  {c.role}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={t("hero.cards.board")} delay={90}>
            <ul className="space-y-2.5">
              {board.map((b) => (
                <Row key={b.org} label={b.period}>
                  {b.org}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={t("hero.cards.academic")} delay={120}>
            <ul className="space-y-2.5">
              {academic.map((a, i) => (
                <Row key={a} label={i === 0 ? t("hero.current") : ""}>
                  {a}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title={t("hero.cards.industry")} delay={150} className="md:col-span-2">
            <ul className="space-y-2.5">
              {industryCurrent.map((c, i) => (
                <Row key={c} label={i === 0 ? t("hero.current") : ""}>
                  {c}
                </Row>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 text-sm">
              <span className="font-display text-ink-600 shrink-0 w-28">{t("hero.past")}</span>
              <div className="text-ink-300 min-w-0">
                <button
                  type="button"
                  onClick={() => setShowPast((v) => !v)}
                  className="text-xs text-ink-500 hover:text-accent-300 transition-colors inline-flex items-center gap-1.5"
                  aria-expanded={showPast}
                >
                  <span
                    className={`inline-block transition-transform ${showPast ? "rotate-90" : ""}`}
                  >
                    ▸
                  </span>
                  {showPast
                    ? t("hero.pastToggleClose", { n: industryPast.length })
                    : t("hero.pastToggleOpen", { n: industryPast.length })}
                </button>
                {showPast && (
                  <p className="mt-2 leading-relaxed text-ink-300">{industryPast.join(" · ")}</p>
                )}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </header>
  );
}
