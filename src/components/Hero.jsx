import { useState } from "react";
import { Reveal, CountUp } from "./common.jsx";
import {
  BASIC_INFO,
  HERO_STATS,
  EDUCATION,
  CAREER_MAIN,
  CAREER_ADJUNCT,
  BOARD,
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

// 2단 나열 공통 행 — 좌측 라벨(연도/구분) + 우측 내용
function Row({ label, children }) {
  return (
    <li className="flex gap-3 text-sm">
      <span className="font-display text-ink-600 tabular-nums shrink-0 w-28">{label}</span>
      <span className="text-ink-300">{children}</span>
    </li>
  );
}

// 그룹 소제목 (예: 재직 / 겸직·특훈)
function GroupLabel({ children }) {
  return (
    <p className="mt-5 mb-2 first:mt-0 text-[11px] font-display tracking-[0.2em] uppercase text-ink-600">
      {children}
    </p>
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
          {/* ---- 좌(데스크톱)/상단(모바일): 프로필 사진 — 항상 밝은 원본 컬러 유지 ---- */}
          <Reveal delay={60} className="justify-self-center md:justify-self-start">
            <div className="group relative transition-transform duration-300 hover:-translate-y-0.5">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent-500/35 via-transparent to-mint-400/20 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-64 w-52 md:h-80 md:w-60 overflow-hidden rounded-2xl border border-accent-500/25">
                <img
                  src="/profile.jpg"
                  alt="최정혜 교수"
                  loading="eager"
                  className="h-full w-full object-cover"
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
              </div>
            </div>
          </Reveal>

          {/* ---- 이름/직함/소개/연락처 ---- */}
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
                  Jeonghye Choi · Professor of Marketing
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
                  <span className="font-display font-semibold text-ink-100 shrink-0 w-28">
                    {e.degree}
                  </span>
                  <span className="text-ink-300">{e.detail}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Positions · 주요경력" delay={60}>
            <GroupLabel>재직</GroupLabel>
            <ul className="space-y-2.5">
              {CAREER_MAIN.map((c) => (
                <Row key={c.role} label={c.period}>
                  {c.role}
                </Row>
              ))}
            </ul>
            <GroupLabel>겸직 · 특훈</GroupLabel>
            <ul className="space-y-2.5">
              {CAREER_ADJUNCT.map((c) => (
                <Row key={c.role} label={c.period}>
                  {c.role}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Board · 사외이사" delay={90}>
            <ul className="space-y-2.5">
              {BOARD.map((b) => (
                <Row key={b.org} label={b.period}>
                  {b.org}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Academic Service · 학술활동" delay={120}>
            <ul className="space-y-2.5">
              {ACADEMIC_SERVICE.map((a, i) => (
                <Row key={a} label={i === 0 ? "현재" : ""}>
                  {a}
                </Row>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Industry & Public · 산관연협력" delay={150} className="md:col-span-2">
            <ul className="space-y-2.5">
              {INDUSTRY_CURRENT.map((c, i) => (
                <Row key={c} label={i === 0 ? "현재" : ""}>
                  {c}
                </Row>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 text-sm">
              <span className="font-display text-ink-600 shrink-0 w-28">과거</span>
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
                  협력 기관 {INDUSTRY_PAST.length}곳 {showPast ? "접기" : "모두 보기"}
                </button>
                {showPast && (
                  <p className="mt-2 leading-relaxed text-ink-300">
                    {INDUSTRY_PAST.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </header>
  );
}
