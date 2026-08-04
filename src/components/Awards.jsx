import { useState } from "react";
import { Reveal, SectionHeading } from "./common.jsx";
import { AWARDS, GRANTS } from "../data/awards.js";

function TimelineItem({ item, gold = false }) {
  return (
    <li className="relative pl-8 pb-8 last:pb-0">
      {/* 세로 라인 */}
      <span className="absolute left-[5px] top-2 bottom-0 w-px bg-line" aria-hidden="true" />
      {/* 노드 */}
      <span
        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
          gold
            ? "border-gold-400 bg-gold-500/30 shadow-[0_0_10px_rgba(217,178,92,0.4)]"
            : "border-accent-400 bg-accent-500/30"
        }`}
        aria-hidden="true"
      />
      <p className="font-display text-xs tabular-nums text-ink-600 mb-1">
        {item.year ?? item.period}
      </p>
      <p className="text-[15px] font-semibold text-ink-100 leading-snug">{item.title}</p>
      {(item.org || item.note) && (
        <p className="text-[13px] text-ink-500 mt-1">
          {[item.org, item.note].filter(Boolean).join(" — ")}
        </p>
      )}
    </li>
  );
}

export default function Awards() {
  const [showAll, setShowAll] = useState(false);
  const highlights = AWARDS.filter((a) => a.highlight);
  const rest = AWARDS.filter((a) => !a.highlight);

  return (
    <section id="awards" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="05"
        label="Trophy Room"
        title="수상 & 연구비"
        desc="세계 마케팅 학계가 인정한 수상 이력과, 장기간 이어져 온 대형 연구 지원."
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* 수상 */}
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-8">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-gold-300 mb-6">
              Honors · 수상
            </h3>
            <ul>
              {highlights.map((a) => (
                <TimelineItem key={a.title} item={a} gold />
              ))}
              {showAll && rest.map((a) => <TimelineItem key={a.title} item={a} gold />)}
            </ul>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-5 text-xs text-ink-500 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
              aria-expanded={showAll}
            >
              <span className={`inline-block transition-transform ${showAll ? "rotate-90" : ""}`}>
                ▸
              </span>
              {showAll ? "접기" : `그 외 수상 ${rest.length}건 더보기`}
            </button>
          </div>
        </Reveal>

        {/* 연구비 */}
        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-8">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-6">
              Grants · 연구비
            </h3>
            <ul>
              {GRANTS.map((g) => (
                <TimelineItem key={g.title} item={g} />
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-line bg-base-850/60 p-4 text-[13px] leading-relaxed text-ink-500">
              한국연구재단 SSK 사업을 2011년부터 2027년까지 다수 회차 연속 수행 —
              장기 대형 과제를 안정적으로 이끌어 온 연구실입니다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
