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
        <span className="font-display text-xs uppercase tracking-[0.18em] text-accent-400">
          {index}
        </span>
        <span className="h-px w-10 bg-accent-500/40" />
        <span className="font-display text-xs uppercase tracking-[0.18em] text-ink-500">
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
    default: "border-line bg-surface-3 text-ink-300",
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
//
// ⚠️ 30차 §1 — 내용이 잘리던 원인과 처방 (되돌리지 말 것):
//  ① 안쪽 래퍼는 `display: flow-root`여야 한다. 그냥 블록이면 첫 자식의 위 마진
//     (`mt-2.5` = 10px)이 래퍼 밖으로 **마진 상쇄**돼 `scrollHeight`에 잡히지 않는다.
//     그 결과 max-height가 실제 필요 높이보다 ~10px 모자라 마지막 줄이 반쯤 잘렸다.
//  ② 소수점 높이(예: 61.5px)가 내림되지 않게 `Math.ceil`로 올린다.
//  ③ 펼침 트랜지션이 끝나면 높이 고정을 풀고(`max-height: none`) `overflow: visible`로
//     되돌린다 — 폰트 로드·언어 전환·줄바꿈 변화로 내용이 나중에 커져도 잘리지 않는다.
export function Collapse({ open, children, className = "" }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);
  // 펼침이 끝난 뒤에만 true. 닫힐 때는 다시 false가 되어 px 높이에서 0으로 트랜지션한다.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(Math.ceil(el.getBoundingClientRect().height));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    if (!open) {
      setSettled(false);
      return;
    }
    const t = setTimeout(() => setSettled(true), 340); // 트랜지션 300ms + 여유
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div
      className={`collapse-region ${open ? "is-open" : ""} ${settled ? "is-settled" : ""} ${className}`}
      style={{ maxHeight: open ? (settled ? "none" : height) : 0 }}
    >
      <div ref={innerRef} style={{ display: "flow-root" }}>
        {children}
      </div>
    </div>
  );
}

// prefers-reduced-motion (framer-motion의 useReducedMotion 대체)
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
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
// §4: 관성 스크롤 엔진 없이 브라우저 기본 scrollIntoView만 쓴다.
export function useAnchorScroll() {
  return useCallback((target) => {
    const el = target?.current ?? target;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);
}
