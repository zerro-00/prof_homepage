import Hero from "./components/Hero.jsx";
import Interests from "./components/Interests.jsx";
import StudentsSection from "./components/StudentsSection.jsx";
import Publications from "./components/Publications.jsx";
import Awards from "./components/Awards.jsx";

const NAV = [
  { href: "#profile", label: "프로필" },
  { href: "#interests", label: "관심분야" },
  { href: "#alumni", label: "제자 진출" },
  { href: "#publications", label: "논문·저서" },
  { href: "#awards", label: "수상·연구비" },
];

export default function App() {
  return (
    <div className="min-h-screen">
      {/* 상단 내비게이션 */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-base-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between">
          <a href="#profile" className="font-display text-sm font-semibold tracking-wide">
            <span className="text-accent-300">JC</span>
            <span className="text-ink-500 ml-2 hidden sm:inline">Jeonghye Choi Lab</span>
          </a>
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto thin-scroll">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="shrink-0 rounded-lg px-2.5 md:px-3 py-1.5 text-[13px] text-ink-500 hover:text-ink-100 hover:bg-base-800/70 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-line to-transparent" />
        <Interests />
        <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-line to-transparent" />
        <StudentsSection />
        <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-line to-transparent" />
        <Publications />
        <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-line to-transparent" />
        <Awards />
      </main>

      <footer className="border-t border-line/60 py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[13px] text-ink-600">
          <p>
            © {new Date().getFullYear()} Jeonghye Choi · Yonsei School of Business
          </p>
          <p>경영관 537 · 02-2123-6575 · jeonghye@yonsei.ac.kr</p>
        </div>
      </footer>
    </div>
  );
}
