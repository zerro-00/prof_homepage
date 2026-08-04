import { useState } from "react";
import { Reveal, CountUp, Chip } from "./common.jsx";
import {
  BASIC_INFO,
  HERO_STATS,
  EDUCATION,
  CAREER,
  OUTSIDE_DIRECTOR,
  ACADEMIC_SERVICE,
  INDUSTRY_CURRENT,
  INDUSTRY_PAST,
} from "../data/profile.js";

function StatCard({ stat, delay, navigate }) {
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => navigate(stat.section, stat.focus ? { focus: stat.focus } : null)}
        className="group relative w-full cursor-pointer rounded-xl border border-line bg-base-850/80 px-5 py-4 text-left backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-[0_0_24px_rgba(47,127,242,0.25)] focus-visible:outline-2 focus-visible:outline-accent-400"
        aria-label={`${stat.label} — 해당 섹션으로 이동`}
      >
        <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded bg-gradient-to-b from-accent-400 to-accent-600/20" />
        {/* 숫자와 단위를 분리해 폰트 겹침 방지 (leading-none + baseline 정렬) */}
        <span className="flex items-baseline gap-0.5 leading-none">
          <CountUp
            value={stat.value}
            className="font-display text-3xl md:text-4xl font-bold text-ink-100 tabular-nums leading-none"
          />
          <span className="text-xl md:text-2xl font-bold text-ink-100 leading-none">
            {stat.suffix}
          </span>
        </span>
        <span className="mt-2 block text-[13px] text-ink-500">{stat.label}</span>
        {stat.sub && <span className="block text-[11px] text-ink-600 mt-0.5">{stat.sub}</span>}
        {/* 클릭 가능 신호 — 우측 하단 화살표 */}
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
        <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-4">
          {title}
        </h3>
        {children}
      </div>
    </Reveal>
  );
}

export default function Hero({ navigate }) {
  const [showPast, setShowPast] = useState(false);

  return (
    <header id="profile" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 hud-grid" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-accent-600/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-24 md:pt-32 pb-16">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
          {/* ---- 좌(데스크톱)/상단(모바일): 프로필 사진 ---- */}
          <Reveal delay={60} className="justify-self-center md:justify-self-start">
            <div className="group relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent-500/35 via-transparent to-mint-400/20 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
              <div className="relative h-64 w-52 md:h-80 md:w-60 overflow-hidden rounded-2xl border border-accent-500/25">
                <img
                  src="/profile.jpg"
                  alt="최정혜 교수"
                  loading="eager"
                  className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                {/* fallback — 이미지 없을 때 이니셜 블록 */}
                <div
                  className="hidden h-full w-full bg-base-800 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-4xl font-bold text-accent-300/60">JC</span>
                </div>
                {/* 은은한 다크 그라디언트 오버레이 */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-950/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- 이름/소개/연락처 ---- */}
          <div>
            <Reveal>
              <p className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-accent-300/90">
                Yonsei School of Business · Marketing
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                최정혜
                <span className="block mt-2 font-display text-xl md:text-2xl font-medium text-ink-500 tracking-normal">
                  Jeonghye Choi, Ph.D.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg md:text-xl text-ink-300 max-w-xl leading-relaxed">
                {BASIC_INFO.tagline}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-8 space-y-1.5 text-sm text-ink-500">
                <li>
                  <span className="text-ink-600 mr-2">직위</span>
                  {BASIC_INFO.position}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">학위</span>
                  {BASIC_INFO.degree}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">연구실</span>
                  {BASIC_INFO.office}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">전화</span>
                  {BASIC_INFO.phone}
                </li>
                <li>
                  <span className="text-ink-600 mr-2">이메일</span>
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

        {/* ---- 스탯 카운터 ---- */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {HERO_STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 90} navigate={navigate} />
          ))}
        </div>

        {/* ---- 프로필 상세 그리드 ---- */}
        <div className="mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
          <InfoCard title="Education · 학력">
            <ul className="space-y-3">
              {EDUCATION.map((e) => (
                <li key={e.detail} className="flex gap-3 text-sm">
                  <span className="font-display font-semibold text-ink-100 shrink-0 w-20">
                    {e.degree}
                  </span>
                  <span className="text-ink-300">{e.detail}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Positions · 주요경력" delay={60}>
            <ul className="space-y-2.5">
              {CAREER.map((c) => (
                <li key={c.role} className="flex gap-3 text-sm">
                  <span className="font-display text-ink-600 tabular-nums shrink-0 w-28">
                    {c.period}
                  </span>
                  <span className="text-ink-300">{c.role}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Board · 사외이사" delay={90}>
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-ink-600 text-xs shrink-0">현재</span>
                {OUTSIDE_DIRECTOR.current.map((c) => (
                  <Chip key={c} tone="accent">
                    {c}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-ink-600 text-xs shrink-0">역임</span>
                {OUTSIDE_DIRECTOR.past.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Academic Service · 학술활동" delay={120}>
            <div className="flex flex-wrap gap-2">
              {ACADEMIC_SERVICE.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Industry & Public · 산관연협력" delay={150} className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-ink-600 mb-2">현재 협력 중</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_CURRENT.map((c) => (
                    <Chip key={c} tone="mint">
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setShowPast((v) => !v)}
                  className="text-xs text-ink-500 hover:text-accent-300 transition-colors mb-2 inline-flex items-center gap-1.5"
                  aria-expanded={showPast}
                >
                  <span
                    className={`inline-block transition-transform ${showPast ? "rotate-90" : ""}`}
                  >
                    ▸
                  </span>
                  과거 협력 기관 {INDUSTRY_PAST.length}곳 {showPast ? "접기" : "모두 보기"}
                </button>
                {showPast && (
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRY_PAST.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </header>
  );
}
