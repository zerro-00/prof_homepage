import { Suspense, lazy, useState } from "react";
import { Reveal, SectionHeading } from "./common.jsx";
import { CITY_PINS, CURRENT_MEMBERS } from "../data/alumni.js";

// 지도는 무겁기 때문에 lazy 로딩
const WorldMap = lazy(() => import("./WorldMap.jsx"));

// 실적 배지 — "SSCI 3 · KCI 7 · 저서 1" (SSCI/KCI 분리 표기)
function WorksBadge({ works }) {
  if (!works || works.length === 0) return null;
  const count = (t) => works.filter((w) => w.type === t).length;
  const parts = [
    { label: "SSCI", n: count("SSCI"), cls: "text-accent-300" },
    { label: "KCI", n: count("KCI"), cls: "text-mint-400" },
    { label: "저서", n: count("BOOK"), cls: "text-gold-300" },
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

// 실적 아코디언 — 연도·타입·제목·저널, ★는 최상위 저널
function WorksAccordion({ works }) {
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
        연구실 공저 실적 {works.length}편 {open ? "접기" : "보기"}
      </button>
      {open && (
        <ul className="mt-2.5 space-y-2 border-l border-line pl-3">
          {works.map((w, i) => (
            <li key={i} className="text-[12px] leading-snug">
              <p className="text-ink-300">
                {w.top && (
                  <span className="text-gold-300 mr-1" title="최상위 저널">
                    ★
                  </span>
                )}
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
                  {w.type === "BOOK" ? "저서" : w.type}
                </span>
                <span className="mx-1.5">·</span>
                {w.journal} · {w.year}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 지도를 볼 수 없는 환경을 위한 카드형 제자 리스트
function AlumniList() {
  const all = CITY_PINS.flatMap((pin) =>
    pin.entries.map((e) => ({ ...e, city: pin.city, country: pin.country }))
  );
  const faculty = all.filter((e) => e.isFaculty);
  const others = all.filter((e) => !e.isFaculty);

  return (
    <div className="mt-10">
      <h3 className="font-display text-xs tracking-[0.25em] uppercase text-gold-300 mb-4">
        Faculty Placements · 교수 임용
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {faculty.map((e) => (
          <Reveal key={e.nameKo + e.affiliation}>
            <div className="h-full rounded-2xl border border-gold-500/25 bg-base-900/70 p-5 hover:border-gold-500/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-ink-100">
                  <span className="text-gold-300">{e.nameKo}</span>
                  {e.nameEn && (
                    <span className="text-ink-500 font-normal text-sm"> ({e.nameEn})</span>
                  )}
                </p>
                <WorksBadge works={e.works} />
              </div>
              <p className="text-sm text-ink-100 mt-1.5">{e.affiliation}</p>
              <p className="text-[13px] text-ink-300">{e.title}</p>
              <p className="text-[12px] text-ink-500 mt-1.5">{e.path}</p>
              <p className="text-[12px] text-ink-600 mt-0.5">
                {e.city} · {e.country}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] px-3 py-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 transition-colors font-medium"
                  >
                    {e.linkLabel ?? "홈페이지 →"}
                  </a>
                )}
                {e.subLink && (
                  <a
                    href={e.subLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] px-3 py-1.5 rounded-lg border border-line bg-base-800/60 text-ink-300 hover:text-ink-100 hover:border-base-600 transition-colors"
                  >
                    {e.subLinkLabel ?? "개인 사이트 →"}
                  </a>
                )}
              </div>
              <WorksAccordion works={e.works} />
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="font-display text-xs tracking-[0.25em] uppercase text-accent-400 mt-10 mb-4">
        Ph.D. & Industry · 박사과정 진학 및 기업 진출
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {others.map((e, i) => (
          <Reveal key={e.nameKo + e.grad} delay={(i % 3) * 60}>
            <div className="h-full rounded-xl border border-line bg-base-900/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm">
                  <span className="text-accent-300 font-medium">{e.nameKo}</span>
                  {e.nameEn && <span className="text-ink-500"> ({e.nameEn})</span>}
                  <span className="text-ink-600 mx-1.5">·</span>
                  <span className="text-ink-500 text-[13px]">{e.grad}</span>
                </p>
                <WorksBadge works={e.works} />
              </div>
              <p className="text-[13px] text-ink-100 mt-1">{e.affiliation}</p>
              <p className="text-[12px] text-ink-500">
                {e.title} · {e.city}
              </p>
              <WorksAccordion works={e.works} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// 현재 연구실 구성원 — 이름 + 확인된 공저 실적. 링크·상세정보 없음
function CurrentMembers() {
  return (
    <Reveal className="mt-12">
      <div className="rounded-2xl border border-line bg-base-900/70 p-6 md:p-7">
        <div className="flex items-baseline gap-3 mb-1.5">
          <h3 className="font-display text-xs tracking-[0.25em] uppercase text-mint-400">
            Active Members
          </h3>
          <span className="text-sm font-semibold text-ink-100">현재 연구실 구성원</span>
        </div>
        <p className="text-[13px] text-ink-500 mb-4">
          현재 {CURRENT_MEMBERS.length}명의 대학원생이 연구실에서 함께 연구하고 있습니다.
          재학 중에 이미 국제 학술지(SSCI) 공저 실적을 낸 구성원도 있습니다.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURRENT_MEMBERS.map((m) => (
            <div key={m.nameKo} className="rounded-xl border border-line bg-base-850/80 p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-sm text-ink-100 font-medium">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="member-dot-pulse absolute inline-flex h-full w-full rounded-full bg-mint-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400/80" />
                  </span>
                  {m.nameKo}
                  {m.nameEn && (
                    <span className="text-ink-500 font-normal text-[12px]">({m.nameEn})</span>
                  )}
                </span>
                <WorksBadge works={m.works} />
              </div>
              <WorksAccordion works={m.works} />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function StudentsSection() {
  return (
    <section id="alumni" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="03"
        label="World Map"
        title="제자들이 진출한 세계"
        desc="이 연구실을 거쳐 간 학생들은 지금 세계 곳곳의 대학과 기업에서 다음 세대를 이끌고 있습니다."
      />
      <Suspense
        fallback={
          <div className="h-72 rounded-2xl border border-line bg-base-900/70 flex items-center justify-center text-ink-600 text-sm">
            지도를 불러오는 중…
          </div>
        }
      >
        <WorldMap />
      </Suspense>
      <AlumniList />
      <CurrentMembers />
    </section>
  );
}
