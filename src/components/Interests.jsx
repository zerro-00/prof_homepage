import { Reveal, SectionHeading, Chip } from "./common.jsx";
import { TEACHING, RESEARCH_DOMAINS, RESEARCH_METHODS } from "../data/profile.js";

export default function Interests() {
  return (
    <section id="interests" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="02"
        label="Skill Set"
        title="관심분야"
        desc="강의와 연구가 향하는 곳 — 디지털 시장의 문제를 데이터로 푸는 데 필요한 도메인과 방법론."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
        {/* 강의 */}
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              Teaching · 강의관심분야
            </h3>
            <ul className="space-y-5">
              {TEACHING.map((t) => (
                <li key={t.level}>
                  <p className="text-sm font-semibold text-ink-100 mb-2">{t.level}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.courses.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* 연구 — 스킬 세트 */}
        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              Research · 연구관심분야
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm font-semibold text-ink-100">연구 도메인</p>
                  <span className="font-display text-[11px] tracking-widest text-ink-600 uppercase">
                    Domain
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH_DOMAINS.map((d) => (
                    <Chip key={d} tone="accent">
                      {d}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="h-px bg-line" />
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm font-semibold text-ink-100">방법론</p>
                  <span className="font-display text-[11px] tracking-widest text-ink-600 uppercase">
                    Method
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH_METHODS.map((m) => (
                    <Chip key={m} tone="mint">
                      {m}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
