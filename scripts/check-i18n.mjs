// i18n 번역 파일 키 무결성 검사 — 4개 언어 파일의 키 경로가 완전히 일치하는지 확인
// 사용: node scripts/check-i18n.mjs  (npm run build 시 자동 실행)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LANGS = ["ko", "en", "zh", "ja"];

function collectKeys(obj, prefix = "") {
  const keys = [];
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => {
      const p = `${prefix}[${i}]`;
      if (v && typeof v === "object") keys.push(...collectKeys(v, p));
      else keys.push(p);
    });
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object") keys.push(...collectKeys(v, p));
      else keys.push(p);
    }
  }
  return keys;
}

const keySets = {};
for (const lang of LANGS) {
  const data = JSON.parse(readFileSync(join(root, "src", "i18n", `${lang}.json`), "utf8"));
  keySets[lang] = new Set(collectKeys(data));
}

const base = keySets.ko;
let failed = false;
for (const lang of LANGS.slice(1)) {
  const missing = [...base].filter((k) => !keySets[lang].has(k));
  const extra = [...keySets[lang]].filter((k) => !base.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`✗ ${lang}.json — missing: ${missing.length}, extra: ${extra.length}`);
    missing.slice(0, 10).forEach((k) => console.error(`  missing: ${k}`));
    extra.slice(0, 10).forEach((k) => console.error(`  extra:   ${k}`));
  } else {
    console.log(`✓ ${lang}.json — ${keySets[lang].size} keys, matches ko.json`);
  }
}
console.log(`ko.json — ${base.size} keys (base)`);
if (failed) process.exit(1);
