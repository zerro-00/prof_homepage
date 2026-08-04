import { useTranslation } from "react-i18next";
import { Reveal, SectionHeading } from "./common.jsx";

// 프로필·수상과 동일한 2단 나열 행 — 좌측 라벨 + 가운뎃점으로 이어진 문단 (칩 금지, 클릭 불가)
function Row({ label, items }) {
  return (
    <li className="flex gap-3 text-sm">
      <span className="font-display text-ink-600 shrink-0 w-24 md:w-28">{label}</span>
      <span className="text-ink-300 leading-relaxed min-w-0">{items.join(" · ")}</span>
    </li>
  );
}

export default function Interests() {
  const { t } = useTranslation();
  const teaching = t("interests.teaching", { returnObjects: true });
  const domains = t("interests.domains", { returnObjects: true });
  const methods = t("interests.methods", { returnObjects: true });

  return (
    <section id="interests" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="02"
        label={t("sections.interests.label")}
        title={t("sections.interests.title")}
        desc={t("sections.interests.desc")}
      />

      <div className="grid lg:grid-cols-2 gap-5 items-start">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              {t("interests.teachingTitle")}
            </h3>
            <ul className="space-y-4">
              {teaching.map((tc) => (
                <Row key={tc.level} label={tc.level} items={tc.courses} />
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              {t("interests.researchTitle")}
            </h3>
            <ul className="space-y-4">
              <Row label={t("interests.domain")} items={domains} />
              <Row label={t("interests.method")} items={methods} />
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
