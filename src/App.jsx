import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Hero from "./components/Hero.jsx";
import Interests from "./components/Interests.jsx";
import StudentsSection from "./components/StudentsSection.jsx";
import Publications from "./components/Publications.jsx";
import Awards from "./components/Awards.jsx";

const SECTIONS = [
  { id: "profile", label: "프로필" },
  { id: "interests", label: "관심분야" },
  { id: "alumni", label: "제자 진출" },
  { id: "publications", label: "논문·저서" },
  { id: "awards", label: "수상·연구비" },
];

const getSectionFromHash = () => {
  const h = window.location.hash.replace("#", "");
  return SECTIONS.some((s) => s.id === h) ? h : "profile";
};

export default function App() {
  const [section, setSection] = useState(getSectionFromHash);
  const [payload, setPayload] = useState(null);
  const payloadRef = useRef(null);
  const reduced = useReducedMotion();

  // 스탯 카드 등에서 호출 — 해시를 바꾸면 hashchange 핸들러가 섹션을 교체
  const navigate = useCallback((id, pl = null) => {
    payloadRef.current = pl;
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    } else {
      setPayload(pl);
    }
  }, []);

  // URL 해시 동기화 — 뒤로가기/새로고침 대응
  useEffect(() => {
    const onHash = () => {
      setSection(getSectionFromHash());
      setPayload(payloadRef.current);
      payloadRef.current = null;
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // 섹션 전환 시 항상 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [section]);

  const content = {
    profile: <Hero navigate={navigate} />,
    interests: <Interests />,
    alumni: <StudentsSection />,
    publications: <Publications focus={payload?.focus} />,
    awards: <Awards />,
  }[section];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 내비게이션 */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-base-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("profile")}
            className="font-display text-sm font-semibold tracking-wide"
          >
            <span className="text-accent-300">JC</span>
            <span className="text-ink-500 ml-2 hidden sm:inline">Jeonghye Choi Lab</span>
          </button>
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto thin-scroll">
            {SECTIONS.map((n) => {
              const isActive = section === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => navigate(n.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative shrink-0 rounded-lg px-2.5 md:px-3 py-1.5 text-[13px] transition-colors ${
                    isActive
                      ? "text-ink-100"
                      : "text-ink-500 hover:text-ink-100 hover:bg-base-800/70"
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-2 right-2 -bottom-[3px] h-[2px] rounded-full bg-accent-400 shadow-[0_0_10px_rgba(77,163,255,0.9)]"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 섹션 전환 영역 */}
      <main className="flex-1 pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: reduced ? { duration: 0 } : { duration: 0.35, ease: "easeOut" },
            }}
            exit={
              reduced
                ? { opacity: 1, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    y: -20,
                    filter: "blur(4px)",
                    transition: { duration: 0.25, ease: "easeIn" },
                  }
            }
            className="relative"
          >
            {/* 전환 시 지나가는 스캔라인 */}
            {!reduced && (
              <motion.div
                key={`scan-${section}`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent shadow-[0_0_18px_2px_rgba(77,163,255,0.35)]"
                initial={{ top: "0%", opacity: 0.7 }}
                animate={{ top: "100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
            {content}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-line/60 py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[13px] text-ink-600">
          <p>© {new Date().getFullYear()} Jeonghye Choi · Yonsei School of Business</p>
          <p>경영관 537 · 02-2123-6575 · jeonghye@yonsei.ac.kr</p>
        </div>
      </footer>
    </div>
  );
}
