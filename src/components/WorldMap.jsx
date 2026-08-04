import { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Reveal } from "./common.jsx";
import { CITY_PINS, MAP_BADGES, LAB_STAT_LINE } from "../data/students.js";
import geoData from "../data/countries-110m.json";

export default function WorldMap() {
  const [active, setActive] = useState(null); // 선택/hover된 핀 id
  const activePin = CITY_PINS.find((p) => p.id === active) ?? null;

  // 모바일: 탭 토글, 데스크톱: hover
  const toggle = useCallback(
    (id) => setActive((cur) => (cur === id ? null : id)),
    []
  );

  return (
    <div>
      <div
        className="relative rounded-2xl border border-line bg-base-900/70 overflow-hidden"
        onMouseLeave={() => setActive(null)}
      >
        {/* 은은한 글로우 */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(47,127,242,0.08),transparent)]"
          aria-hidden="true"
        />
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 165, center: [15, 8] }}
          width={980}
          height={470}
          style={{ width: "100%", height: "auto" }}
          aria-label="제자 진출 세계지도"
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== "Antarctica")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#131e33"
                    stroke="#1e2a44"
                    strokeWidth={0.6}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#182642" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>

          {CITY_PINS.map((pin) => {
            const isActive = active === pin.id;
            return (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onMouseEnter={() => setActive(pin.id)}
                onClick={() => toggle(pin.id)}
                style={{ default: { cursor: "pointer" } }}
              >
                <g className="cursor-pointer">
                  {/* pulse ring */}
                  <circle r={6} fill="none" stroke="#4da3ff" strokeWidth={1.2} className="pin-pulse" />
                  {/* 거점 코어 */}
                  <circle
                    r={isActive ? 6 : 4.5}
                    fill={isActive ? "#7cc5ff" : "#2f7ff2"}
                    stroke="#0a101d"
                    strokeWidth={1.5}
                    style={{ transition: "all .2s" }}
                  />
                  {pin.entries.length > 1 && (
                    <text
                      textAnchor="middle"
                      y={-9}
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        fill: "#7cc5ff",
                      }}
                    >
                      ×{pin.entries.length}
                    </text>
                  )}
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* 툴팁 카드 — 지도 하단 고정 오버레이 (모바일 대응이 쉬운 방식) */}
        {activePin && (
          <div className="absolute left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-96 rounded-xl border border-accent-500/30 bg-base-850/95 backdrop-blur p-4 shadow-2xl shadow-black/50">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <p className="font-semibold text-ink-100">
                {activePin.city}
                <span className="ml-2 text-xs text-ink-500">{activePin.country}</span>
              </p>
              <button
                type="button"
                className="text-ink-600 hover:text-ink-300 text-sm md:hidden"
                onClick={() => setActive(null)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {activePin.entries.map((e, i) => (
                <li key={i} className="text-[13px] leading-snug">
                  <span className="text-accent-300">{e.name}</span>
                  <span className="text-ink-600 mx-1.5">·</span>
                  <span className="text-ink-500">{e.grad}</span>
                  <p className="text-ink-300 mt-0.5">{e.placement}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 pt-2.5 border-t border-line text-[11px] font-display tracking-wide text-gold-300">
              {LAB_STAT_LINE}
            </p>
          </div>
        )}

        {/* 좌상단 HUD 라벨 */}
        <div className="absolute left-4 top-4 font-display text-[11px] tracking-[0.3em] uppercase text-ink-600">
          Alumni World Map
        </div>
      </div>

      {/* 요약 배지 */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MAP_BADGES.map((b, i) => (
          <Reveal key={b.label} delay={i * 70}>
            <div className="rounded-xl border border-line bg-base-900/70 px-5 py-4 flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-accent-300 tabular-nums">
                {b.value}
              </span>
              <span className="text-sm text-ink-500">{b.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-4 text-xs text-ink-600">
        핀에 마우스를 올리거나 탭하면 진출 상세를 볼 수 있습니다. 일부 졸업생은 익명 처리되었습니다.
      </p>
    </div>
  );
}
