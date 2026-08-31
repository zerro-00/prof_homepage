import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./components/common.jsx";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { LANGS, ensureLanguage } from "./i18n/index.js";
import Hero from "./components/Hero.jsx";

// 첫 화면(히어로) 외 섹션은 필요할 때 받는다 — 초기 번들을 줄이기 위한 분할
const Interests = lazy(() => import("./components/Interests.jsx"));
const StudentsSection = lazy(() => import("./components/StudentsSection.jsx"));
const Publications = lazy(() => import("./components/Publications.jsx"));
const Awards = lazy(() => import("./components/Awards.jsx"));

const SECTION_IDS = ["profile", "interests", "alumni", "publications", "awards"];

// 해시는 "#publications?journal=..." 형태를 가질 수 있다 (논문 섹션의 저널 선택 유지).
// 섹션 판정은 "?" 앞부분만 본다.
// 실적 배지 → 논문 필터 (§5). ?student=li-yiling&type=SSCI 형태로 URL에 남겨
// 새로고침·공유해도 필터가 유지된다.
const readStudentFilter = () => {
  const q = new URLSearchParams(window.location.search);
  const student = q.get("student");
  const type = q.get("type");
  return student ? { student, type: type === "SSCI" || type === "KCI" ? type : null } : null;
};

const writeStudentFilter = (filter) => {
  const url = new URL(window.location.href);
  if (filter?.student) {
    url.searchParams.set("student", filter.student);
    if (filter.type) url.searchParams.set("type", filter.type);
    else url.searchParams.delete("type");
  } else {
    url.searchParams.delete("student");
    url.searchParams.delete("type");
  }
  window.history.replaceState(null, "", url.toString());
};

const getSectionFromHash = () => {
  const h = window.location.hash.replace(/^#/, "").split("?")[0];
  return SECTION_IDS.includes(h) ? h : "profile";
};

// 언어 표기는 해당 언어 자체 표기 사용
const LANG_NAMES = { ko: "한국어", en: "English", zh: "中文", ja: "日本語" };

function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openMenu = () => {
    const idx = LANGS.findIndex((l) => l.code === i18n.language);
    setFocusIdx(idx < 0 ? 0 : idx);
    setOpen(true);
  };

  useEffect(() => {
    if (open) itemRefs.current[focusIdx]?.focus();
  }, [open, focusIdx]);

  const onMenuKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((i) => (i + 1) % LANGS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((i) => (i - 1 + LANGS.length) % LANGS.length);
    }
  };

  const select = (code) => {
    ensureLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${LANG_NAMES[current.code]}`}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-ink-500 transition-colors hover:bg-base-800/70 hover:text-ink-100 focus-visible:outline-2 focus-visible:outline-accent-400"
      >
        <Globe size={15} strokeWidth={1.8} aria-hidden="true" />
        <span className="font-display text-[10px] font-semibold tracking-wide">
          {current.label === "中" ? "ZH" : current.label === "日" ? "JA" : current.label}
        </span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label={`Language: ${LANG_NAMES[current.code]}`}
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-line bg-base-850/95 backdrop-blur p-1 shadow-2xl shadow-black/50"
        >
          {LANGS.map((l, i) => {
            const isCurrent = i18n.language === l.code;
            return (
              <button
                key={l.code}
                ref={(el) => (itemRefs.current[i] = el)}
                type="button"
                role="menuitemradio"
                aria-checked={isCurrent}
                tabIndex={i === focusIdx ? 0 : -1}
                onClick={() => select(l.code)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors ${
                  isCurrent
                    ? "text-accent-300 bg-accent-500/10"
                    : "text-ink-300 hover:bg-base-800/80 hover:text-ink-100"
                }`}
              >
                {LANG_NAMES[l.code]}
                {isCurrent && <Check size={14} strokeWidth={2} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [section, setSection] = useState(getSectionFromHash);
  const [payload, setPayload] = useState(null);
  const [studentFilter, setStudentFilter] = useState(readStudentFilter);
  const payloadRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  // 화면에 실제로 그려지는 섹션 — 나가는 애니메이션이 끝난 뒤 교체한다
  const [shown, setShown] = useState(section);
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    if (section === shown) return;
    if (reduced) {
      setShown(section);
      return;
    }
    setPhase("out");
    const timer = setTimeout(() => {
      setShown(section);
      setPhase("enter");
    }, 250);
    return () => clearTimeout(timer);
  }, [section, shown, reduced]);

  const navigate = useCallback((id, pl = null) => {
    if (id === "publications") {
      const next = pl?.student ? { student: pl.student, type: pl.type ?? null } : null;
      if (pl?.student || pl?.clearStudent) {
        setStudentFilter(next);
        writeStudentFilter(next);
      }
    }
    payloadRef.current = pl;
    // 현재 해시에 ?journal= 같은 쿼리가 붙어 있어도 섹션이 같으면 해시를 다시 쓰지 않는다.
    if (window.location.hash.replace(/^#/, "").split("?")[0] !== id) {
      window.location.hash = id;
    } else {
      payloadRef.current = null;
      setPayload(pl);
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      setSection(getSectionFromHash());
      setPayload(payloadRef.current);
      payloadRef.current = null;
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // 첫 진입 URL에 ?student= 가 있으면 논문 섹션을 연다
  useEffect(() => {
    if (readStudentFilter() && getSectionFromHash() !== "publications") {
      window.location.hash = "publications";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 섹션 전환 시 최상단 이동은 즉시(instant) — 전환 애니메이션과 겹치지 않게 한다.
  // 섹션 "내부" 앵커 이동만 smooth (common.jsx의 useAnchorScroll).
  // §4: 관성 스크롤 라이브러리를 쓰지 않는다. 브라우저 기본 스크롤 + scroll-behavior만.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [shown]);

  const content = {
    profile: <Hero navigate={navigate} />,
    interests: <Interests />,
    alumni: <StudentsSection focus={payload?.focus} navigate={navigate} />,
    publications: (
      <Publications
        focus={payload?.focus}
        studentFilter={studentFilter}
        onClearStudent={() => {
          setStudentFilter(null);
          writeStudentFilter(null);
        }}
      />
    ),
    awards: <Awards />,
  }[shown];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-base-950/92 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("profile")}
            className="font-display text-sm font-semibold tracking-wide shrink-0"
          >
            <span className="text-accent-300">JC</span>
            <span className="text-ink-500 ml-2 hidden lg:inline">{t("nav.brand")}</span>
          </button>
          <div className="flex items-center gap-1 md:gap-2 py-1.5 nav-scroll">
            {SECTION_IDS.map((id) => {
              const isActive = section === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigate(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative shrink-0 rounded-lg px-2.5 md:px-3 py-1.5 text-[13px] transition-colors ${
                    isActive
                      ? "text-ink-100"
                      : "text-ink-500 hover:text-ink-100 hover:bg-base-800/70"
                  }`}
                >
                  {t(`nav.${id}`)}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[3px] left-2 right-2 h-[2px] rounded-full bg-accent-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="shrink-0">
            <LangSwitcher />
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-14">
        {/* 섹션 전환 — 나감 250ms(y-20px, blur 4px) → 들어옴 350ms ease-out.
            framer-motion 대신 CSS로 처리한다(초기 번들 129KB 절감). */}
        <div key={shown} className={phase === "out" ? "section-exit" : "section-enter"}>
          <Suspense fallback={<div className="min-h-[60vh]" />}>{content}</Suspense>
        </div>
      </main>

      <footer data-surface="deep" className="border-t border-line/60 py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[13px] text-ink-600">
          <p>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p>{t("footer.contact")}</p>
        </div>
      </footer>
    </div>
  );
}
