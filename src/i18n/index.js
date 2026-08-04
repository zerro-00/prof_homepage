import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./ko.json";
import en from "./en.json";
import zh from "./zh.json";
import ja from "./ja.json";

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
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    zh: { translation: zh },
    ja: { translation: ja },
  },
  lng: detectInitialLang(),
  fallbackLng: "ko",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

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
