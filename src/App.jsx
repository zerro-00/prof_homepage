import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LANGS } from "./i18n/index.js";
import Hero from "./components/Hero.jsx";
import Interests from "./components/Interests.jsx";
import StudentsSection from "./components/StudentsSection.jsx";
import Publications from "./components/Publications.jsx";
import Awards from "./components/Awards.jsx";

const SECTION_IDS = ["profile", "interests", "alumni", "publications", "awards"];

const getSectionFromHash = () => {
  const h = window.location.hash.replace("#", "");
  return SECTION_IDS.includes(h) ? h : "profile";
};

function LangSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div
      className="inline-flex rounded-lg border border-line bg-base-850/80 p-0.5"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => i18n.changeLanguage(l.code)}
          aria-pressed={i18n.language === l.code}
          className={`rounded-md px-2 py-1 text-[12px] font-display font-semibold transition-colors ${
            i18n.language === l.code
              ? "bg-accent-500/20 text-accent-300"
              : "text-ink-500 hover:text-ink-300"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [section, setSection] = useState(getSectionFromHash);
  const [payload, setPayload] = useState(null);
  const payloadRef = useRef(null);
  const reduced = useReducedMotion();

  const navigate = useCallback((id, pl = null) => {
    payloadRef.current = pl;
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    } else {
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
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-base-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("profile")}
            className="font-display text-sm font-semibold tracking-wide shrink-0"
          >
            <span className="text-accent-300">JC</span>
            <span className="text-ink-500 ml-2 hidden lg:inline">{t("nav.brand")}</span>
          </button>
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto thin-scroll">
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
          <div className="shrink-0">
            <LangSwitcher />
          </div>
        </div>
      </nav>

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
          <p>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p>{t("footer.contact")}</p>
        </div>
      </footer>
    </div>
  );
}
