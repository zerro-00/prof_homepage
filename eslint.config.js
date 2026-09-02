// 런타임 오류 방지용 최소 설정 (27차 조건 4).
// 목적은 딱 하나 — 정의되지 않은 컴포넌트·변수 참조를 빌드 단계에서 잡는 것이다.
// `npm run build`가 SearchBox 미정의를 못 잡아 논문 섹션이 흰 화면으로 나갔던 사고(27차)의 재발 방지.
// 스타일 규칙은 넣지 않는다 — 넣으면 기존 코드 전체가 걸려 빌드가 막힌다.
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["src/**/*.{js,jsx}", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // react-hooks는 규칙을 켜지 않고 등록만 한다 —
    // 코드에 남아 있는 eslint-disable 주석의 규칙 이름을 해석하기 위해서다.
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      "no-undef": "error",
      "react/jsx-no-undef": "error",
    },
  },
];
