import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./ko.json";

// 나머지 언어는 필요할 때만 내려받는다 (초기 번들에서 3개 언어 ~80KB 제거)
const LOADERS = {
  en: () => import("./en.json"),
  zh: () => import("./zh.json"),
  ja: () => import("./ja.json"),
};

export const LANGS = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
  { code: "ja", label: "日" },
];

const SUPPORTED = LANGS.map((l) => l.code);

// 초기 언어: URL 쿼리(?lang=) 우선, 없으면 브라우저 언어 감지, 최종 폴백 ko
function detectInitialLang() {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED.includes(q)) return q;
  const nav = (navigator.language || "ko").toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("en")) return "en";
  return "ko";
}

i18n.use(initReactI18next).init({
  resources: { ko: { translation: ko } },
  lng: "ko",
  fallbackLng: "ko",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

// 중국어·일본어 웹폰트는 해당 언어를 실제로 볼 때만 주입한다 (초기 로드에서 ~180KB 제거)
const CJK_FONT = {
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap",
  ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap",
};
const fontLoaded = new Set();
function ensureFont(lng) {
  const href = CJK_FONT[lng];
  if (!href || fontLoaded.has(lng)) return;
  fontLoaded.add(lng);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

// 아직 안 실린 언어를 실어 오고 전환한다 — 언어 선택 UI는 이 함수만 호출하면 된다
const loaded = new Set(["ko"]);
export async function ensureLanguage(lng) {
  if (!SUPPORTED.includes(lng)) return;
  ensureFont(lng);
  if (!loaded.has(lng) && LOADERS[lng]) {
    const mod = await LOADERS[lng]();
    i18n.addResourceBundle(lng, "translation", mod.default ?? mod, true, true);
    loaded.add(lng);
  }
  if (i18n.language !== lng) await i18n.changeLanguage(lng);
}

// 초기 언어가 한국어가 아니면 로드 후 전환
const initial = detectInitialLang();
if (initial !== "ko") ensureLanguage(initial);

// 언어 변경 시 <html lang> 속성과 URL 쿼리(?lang=) 동기화
function syncLang(lng) {
  const htmlLang = i18n.t("meta.htmlLang");
  document.documentElement.lang = htmlLang;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lng);
  window.history.replaceState(null, "", url.toString());
}
i18n.on("languageChanged", syncLang);
syncLang(i18n.language);

// 데이터 파일의 lang 오버라이드 헬퍼 — entry.lang[lng][field] 우선, 없으면 기본값
export function localizeField(obj, field, lng) {
  return obj?.lang?.[lng]?.[field] ?? obj?.[field];
}

export default i18n;
