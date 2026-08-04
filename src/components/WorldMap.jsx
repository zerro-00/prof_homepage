import { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Reveal } from "./common.jsx";
import { CITY_PINS, MAP_BADGES, LAB_STAT_LINE } from "../data/alumni.js";
import geoData from "../data/countries-110m.json";

function EntryLinks({ entry, small = false }) {
  if (!entry.link && !entry.subLink) return null;
  const base = small
    ? "text-[12px] px-2.5 py-1"
    : "text-[13px] px-3 py-1.5";
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {entry.link && (
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 transition-colors font-medium`}
          onClick={(e) => e.stopPropagation()}
        >
          {entry.linkLabel ?? "홈페이지 →"}
        </a>
      )}
      {entry.subLink && (
        <a
          href={entry.subLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} rounded-lg border border-line bg-base-800/60 text-ink-300 hover:text-ink-100 hover:border-base-600 transition-colors`}
          onClick={(e) => e.stopPropagation()}
        >
          {entry.subLinkLabel ?? "개인 사이트 →"}
        </a>
      )}
    </div>
  );
}

function TooltipEntry({ entry }) {
  return (
    <li className="text-[13px] leading-snug">
      <p>
        <span className={entry.isFaculty ? "text-gold-300 font-semibold" : "text-accent-300"}>
          {entry.nameKo}
          {entry.nameEn && <span className="font-normal"> ({entry.nameEn})</span>}
        </span>
        <span className="text-ink-600 mx-1.5">·</span>
        <span className="text-ink-500">{entry.grad}</span>
      </p>
      <p className="text-ink-100 mt-0.5">{entry.affiliation}</p>
      <p className="text-ink-300">{entry.title}</p>
      {entry.path && <p className="text-ink-500 text-[12px] mt-0.5">{entry.path}</p>}
      <EntryLinks entry={entry} small />
    </li>
  );
}

export default function WorldMap() {
  const [active, setActive] = useState(null);
  const activePin = CITY_PINS.find((p) => p.id === active) ?? null;

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
            const isFaculty = pin.entries.some((e) => e.isFaculty);
            const core = isFaculty ? "#d9b25c" : "#2f7ff2";
            const coreActive = isFaculty ? "#e8c877" : "#7cc5ff";
            const ring = isFaculty ? "#e8c877" : "#4da3ff";
            return (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onMouseEnter={() => setActive(pin.id)}
                onClick={() => toggle(pin.id)}
              >
                <g className="cursor-pointer">
                  {/* pulse ring — 교수 임용 거점은 이중 링으로 강조 */}
                  <circle r={6} fill="none" stroke={ring} strokeWidth={1.2} className="pin-pulse" />
                  {isFaculty && (
                    <circle
                      r={6}
                      fill="none"
                      stroke={ring}
                      strokeWidth={1.4}
                      className="pin-pulse"
                      style={{ animationDelay: "0.8s" }}
                    />
                  )}
                  <circle
                    r={isActive ? 6 : isFaculty ? 5.2 : 4.5}
                    fill={isActive ? coreActive : core}
                    stroke="#0a101d"
                    strokeWidth={1.5}
                    style={{ transition: "all .2s" }}
                  />
                  {/* 이름 라벨 — 데스크톱에서만 상시 노출 */}
                  <text
                    x={pin.labelDx ?? 10}
                    y={pin.labelDy ?? 4}
                    textAnchor={(pin.labelDx ?? 10) < 0 ? "end" : "start"}
                    className="hidden md:block pointer-events-none select-none"
                    style={{
                      fontFamily:
                        "'Pretendard Variable', Pretendard, sans-serif",
                      fontSize: 10.5,
                      fontWeight: 600,
                      fill: isFaculty ? "#e8c877" : "#8b98b0",
                      paintOrder: "stroke",
                      stroke: "#0a101d",
                      strokeWidth: 3,
                    }}
                  >
                    {pin.label}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* 툴팁 카드 — 지도 하단 고정 오버레이 */}
        {activePin && (
          <div className="absolute left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-[26rem] max-h-[70%] overflow-y-auto thin-scroll rounded-xl border border-accent-500/30 bg-base-850/95 backdrop-blur p-4 shadow-2xl shadow-black/50">
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
            <ul className="space-y-3.5">
              {activePin.entries.map((e, i) => (
                <TooltipEntry key={i} entry={e} />
              ))}
            </ul>
            <p className="mt-3 pt-2.5 border-t border-line text-[11px] font-display tracking-wide text-gold-300">
              {LAB_STAT_LINE}
            </p>
          </div>
        )}

        <div className="absolute left-4 top-4 font-display text-[11px] tracking-[0.3em] uppercase text-ink-600">
          Alumni World Map
        </div>
        {/* 범례 */}
        <div className="absolute right-4 top-4 hidden md:flex items-center gap-4 text-[11px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-400 inline-block" /> 교수 임용
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-500 inline-block" /> 박사과정·기업
          </span>
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
        핀에 마우스를 올리거나 탭하면 진출 상세를 볼 수 있습니다. 이름이 확인되지 않은
        졸업생은 익명 처리되었습니다.
      </p>
    </div>
  );
}
