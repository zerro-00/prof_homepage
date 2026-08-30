import { useCallback, useEffect, useRef, useState } from "react";

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

// 최상위 저널(★) 표시 — 수상 섹션·제자 실적·저널 목록에서 공용으로 쓰는 단일 컴포넌트
export function TopStar({ title, className = "" }) {
  return (
    <span
      className={`text-gold-300 ${className}`}
      title={title}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      ★
    </span>
  );
}

// 접힘 영역 — max-height 트랜지션(300ms)으로 펼칠 때 레이아웃 점프를 막는다.
// 닫힌 동안에는 visibility:hidden(=탭 포커스 제외)이 300ms 뒤에 걸린다 (index.css .collapse-region).
export function Collapse({ open, children, className = "" }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      className={`collapse-region ${open ? "is-open" : ""} ${className}`}
      style={{ maxHeight: open ? height : 0 }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

// 모바일(<768px) 여부 — 저널별 보기의 아코디언 전환에 사용
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return isMobile;
}

// 섹션 내부 앵커 이동 — 상단 네비 높이는 대상의 scroll-mt-* 로 확보한다.
// lenis가 켜져 있으면 lenis 경유(휠 스크롤과 같은 엔진), 아니면 기본 scrollIntoView.
export function useAnchorScroll() {
  return useCallback((target) => {
    const el = target?.current ?? target;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduced ? "auto" : "smooth";
    if (window.__lenis && !reduced) {
      const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      window.__lenis.scrollTo(el, { offset: -offset });
      return;
    }
    el.scrollIntoView({ behavior, block: "start" });
  }, []);
}
