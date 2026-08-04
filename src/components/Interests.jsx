import { useTranslation } from "react-i18next";
import { Reveal, SectionHeading, Chip } from "./common.jsx";

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

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              {t("interests.teachingTitle")}
            </h3>
            <ul className="space-y-5">
              {teaching.map((tc) => (
                <li key={tc.level}>
                  <p className="text-sm font-semibold text-ink-100 mb-2">{tc.level}</p>
                  <div className="flex flex-wrap gap-2">
                    {tc.courses.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mb-5">
              {t("interests.researchTitle")}
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm font-semibold text-ink-100">{t("interests.domain")}</p>
                  <span className="font-display text-[11px] tracking-widest text-ink-600 uppercase">
                    Domain
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {domains.map((d) => (
                    <Chip key={d} tone="accent">
                      {d}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="h-px bg-line" />
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm font-semibold text-ink-100">{t("interests.method")}</p>
                  <span className="font-display text-[11px] tracking-widest text-ink-600 uppercase">
                    Method
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {methods.map((m) => (
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
