import { useEffect, useRef, useState } from "react";

// 스크롤 진입 시 페이드업 — IntersectionObserver 기반 (외부 라이브러리 불필요)
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

// 뷰포트 진입 시 숫자 카운트업
export function CountUp({ value, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

// 섹션 공통 헤딩 — 게임 UI의 "퀘스트 카테고리" 라벨 느낌을 은은하게
export function SectionHeading({ index, label, title, desc }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display text-xs tracking-[0.3em] text-accent-400 uppercase">
          {index}
        </span>
        <span className="h-px w-10 bg-accent-500/40" />
        <span className="font-display text-xs tracking-[0.3em] text-ink-500 uppercase">
          {label}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-100">
        {title}
      </h2>
      {desc && <p className="mt-3 text-ink-500 max-w-2xl leading-relaxed">{desc}</p>}
    </Reveal>
  );
}

export function Chip({ children, tone = "default" }) {
  const tones = {
    default: "border-line bg-base-800/60 text-ink-300",
    accent: "border-accent-500/30 bg-accent-500/10 text-accent-300",
    gold: "border-gold-500/30 bg-gold-500/10 text-gold-300",
    mint: "border-mint-400/30 bg-mint-400/10 text-mint-400",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-[13px] leading-relaxed ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
