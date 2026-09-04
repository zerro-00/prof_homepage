import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Reveal, SectionHeading, TopStar } from "./common.jsx";
import { AWARDS, GRANTS } from "../data/awards.js";
import { localizeField } from "../i18n/index.js";

const VISIBLE_COUNT = 8;

// 프로필 섹션과 동일한 2단 나열 행
function Row({ item, lng, star = false, last = false }) {
  const title = localizeField(item, "title", lng);
  const org = localizeField(item, "org", lng);
  const period = localizeField(item, "period", lng) ?? item.year;
  return (
    <li className={`flex gap-3 text-sm py-2 border-line/50 ${last ? "" : "border-b"}`}>
      <span className="font-display text-ink-600 tabular-nums shrink-0 w-32">{period}</span>
      <span className="min-w-0">
        <span className={star ? "text-ink-100 font-semibold" : "text-ink-100"}>
          {star && <TopStar className="mr-1.5" />}
          {title}
        </span>
        {org && <span className="block text-[12px] text-ink-500 mt-0.5">{org}</span>}
      </span>
    </li>
  );
}

export default function Awards() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const [showAll, setShowAll] = useState(false);
  // 상시 노출분과 접힘분을 분리 — 접힘분은 Collapse로 펼쳐 레이아웃 점프를 막는다.
  const visible = AWARDS.slice(0, VISIBLE_COUNT);
  const hidden = AWARDS.slice(VISIBLE_COUNT);

  return (
    <section id="awards" data-surface="field" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="04"
        label={t("sections.awards.label")}
        title={t("sections.awards.title")}
        desc={t("sections.awards.desc")}
      />

      <div className="grid lg:grid-cols-2 gap-5 items-start">
        {/* 수상 */}
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-gold-300 mb-4">
              {t("awardsUI.awardsTitle")}
              <span className="ml-2 rounded-full bg-surface-3 px-2 py-0.5 text-[11px] text-ink-500 tracking-normal">
                {AWARDS.length}
              </span>
            </h3>
            <ul>
              {visible.map((a, i) => (
                <Row
                  key={`${a.year}-${i}`}
                  item={a}
                  lng={lng}
                  star={a.star}
                  last={!showAll && i === visible.length - 1}
                />
              ))}
            </ul>
            <Collapse open={showAll}>
              <ul>
                {hidden.map((a, i) => (
                  <Row
                    key={`${a.year}-${VISIBLE_COUNT + i}`}
                    item={a}
                    lng={lng}
                    star={a.star}
                    last={i === hidden.length - 1}
                  />
                ))}
              </ul>
            </Collapse>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-5 text-xs text-ink-500 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
              aria-expanded={showAll}
            >
              <span className={`inline-block transition-transform ${showAll ? "rotate-90" : ""}`}>
                ▸
              </span>
              {showAll ? t("awardsUI.showLess") : t("awardsUI.showAll", { n: AWARDS.length })}
            </button>
          </div>
        </Reveal>

        {/* 연구비 */}
        <Reveal delay={80}>
          <div className="rounded-2xl border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-4">
              {t("awardsUI.grantsTitle")}
              <span className="ml-2 rounded-full bg-surface-3 px-2 py-0.5 text-[11px] text-ink-500 tracking-normal">
                {GRANTS.length}
              </span>
            </h3>
            <ul>
              {GRANTS.map((g, i) => (
                <Row key={i} item={g} lng={lng} last={i === GRANTS.length - 1} />
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-line bg-surface-1 p-4 text-[13px] leading-relaxed text-ink-500">
              {t("awardsUI.grantNote")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
