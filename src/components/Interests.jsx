import { useTranslation } from "react-i18next";
import { Reveal, SectionHeading } from "./common.jsx";

/* 2단 리스트 행 — 라벨 컬럼 120px 고정 + 내용(가운뎃점 구분, max 68ch) */
function Row({ label, items }) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:gap-6">
      <span className="w-[120px] shrink-0 font-display text-[13px] text-ink-600">{label}</span>
      <span className="min-w-0 max-w-[68ch] text-[15px] leading-relaxed text-ink-300">
        {items.join(" · ")}
      </span>
    </li>
  );
}

function Block({ title, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div>
        <h3 className="mb-5 font-display text-xs uppercase tracking-[0.25em] text-accent-400">
          {title}
        </h3>
        <ul className="space-y-4">{children}</ul>
      </div>
    </Reveal>
  );
}

export default function Interests() {
  const { t } = useTranslation();
  const teaching = t("interests.teaching", { returnObjects: true });
  const domains = t("interests.domains", { returnObjects: true });
  const methods = t("interests.methods", { returnObjects: true });

  return (
    <section id="interests" data-surface="paper" className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="02"
        label={t("sections.interests.label")}
        title={t("sections.interests.title")}
        desc={t("sections.interests.desc")}
      />

      {/* 세로 스택 — 블록 사이 48px, 1px 구분선 (§2-4) */}
      <div className="rounded-2xl border border-line bg-surface-2 p-6 md:p-8">
        <Block title={t("interests.teachingTitle")}>
          {teaching.map((tc) => (
            <Row key={tc.level} label={tc.level} items={tc.courses} />
          ))}
        </Block>

        <div className="my-12 h-px bg-line" aria-hidden="true" />

        <Block title={t("interests.researchTitle")} delay={80}>
          <Row label={t("interests.domain")} items={domains} />
          <Row label={t("interests.method")} items={methods} />
        </Block>
      </div>
    </section>
  );
}
