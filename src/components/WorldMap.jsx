import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { CITY_PINS } from "../data/alumni.js";
import { localizeField } from "../i18n/index.js";
import { worksForStudent } from "../data/publications.js";
import geoData from "../data/countries-110m.json";

function displayName(entry, lng) {
  if (lng === "ko") return { main: entry.nameKo, sub: entry.nameEn };
  return { main: entry.nameEn ?? entry.nameKo, sub: null };
}

function EntryLinks({ entry, lng }) {
  if (!entry.link && !entry.subLink) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {entry.link && (
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] px-2.5 py-1 rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 transition-colors font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          {localizeField(entry, "linkLabel", lng) ?? "Link →"}
        </a>
      )}
      {entry.subLink && (
        <a
          href={entry.subLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] px-2.5 py-1 rounded-lg border border-line bg-base-800/60 text-ink-300 hover:text-ink-100 hover:border-base-600 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {localizeField(entry, "subLinkLabel", lng) ?? "Link →"}
        </a>
      )}
    </div>
  );
}

function TooltipEntry({ entry, lng }) {
  const name = displayName(entry, lng);
  const works = worksForStudent(entry.personId);
  return (
    <li className="text-[13px] leading-snug">
      <p>
        <span className={entry.isFaculty ? "text-gold-300 font-semibold" : "text-accent-300"}>
          {name.main}
          {name.sub && <span className="font-normal"> ({name.sub})</span>}
        </span>
        <span className="text-ink-600 mx-1.5">·</span>
        <span className="text-ink-500">{localizeField(entry, "grad", lng)}</span>
        {works.length > 0 && (
          <span className="ml-2 font-display text-[11px] text-ink-600">
            SSCI {works.filter((w) => w.type === "SSCI").length} · KCI{" "}
            {works.filter((w) => w.type === "KCI").length}
          </span>
        )}
      </p>
      <p className="text-ink-100 mt-0.5">{localizeField(entry, "affiliation", lng)}</p>
      <p className="text-ink-300">{localizeField(entry, "title", lng)}</p>
      {entry.path && (
        <p className="text-ink-500 text-[12px] mt-0.5">{localizeField(entry, "path", lng)}</p>
      )}
      <EntryLinks entry={entry} lng={lng} />
    </li>
  );
}

export default function WorldMap() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
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
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, var(--map-glow), transparent)",
          }}
          aria-hidden="true"
        />
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 165, center: [15, 8] }}
          width={980}
          height={470}
          style={{ width: "100%", height: "auto" }}
          aria-label={t("map.svgLabel")}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== "Antarctica")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    strokeWidth={0.6}
                    style={{
                      default: {
                        outline: "none",
                        fill: "var(--map-land)",
                        stroke: "var(--map-stroke)",
                      },
                      hover: {
                        outline: "none",
                        fill: "var(--map-land-hover)",
                        stroke: "var(--map-stroke)",
                      },
                      pressed: { outline: "none", fill: "var(--map-land-hover)" },
                    }}
                  />
                ))
            }
          </Geographies>

          {CITY_PINS.map((pin) => {
            const isActive = active === pin.id;
            const isFaculty = pin.entries.some((e) => e.isFaculty);
            const core = isFaculty ? "var(--pin-faculty)" : "var(--pin)";
            const coreActive = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-active)";
            const ring = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-ring)";
            return (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onMouseEnter={() => setActive(pin.id)}
                onClick={() => toggle(pin.id)}
              >
                <g className="cursor-pointer">
                  <circle r={6} fill="none" strokeWidth={1.2} className="pin-pulse" style={{ stroke: ring }} />
                  {isFaculty && (
                    <circle
                      r={6}
                      fill="none"
                      strokeWidth={1.4}
                      className="pin-pulse"
                      style={{ stroke: ring, animationDelay: "0.8s" }}
                    />
                  )}
                  <circle
                    r={isActive ? 6 : isFaculty ? 5.2 : 4.5}
                    strokeWidth={1.5}
                    style={{
                      fill: isActive ? coreActive : core,
                      stroke: "var(--pin-stroke)",
                      transition: "all .2s",
                    }}
                  />
                  {/* 인원수 표시 (핀 위) — 사람 이름 라벨은 넣지 않는다 */}
                  {pin.entries.length > 1 && (
                    <text
                      textAnchor="middle"
                      y={-10}
                      className="pointer-events-none select-none"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 9.5,
                        fontWeight: 700,
                        fill: isFaculty ? "var(--pin-faculty-active)" : "var(--pin-active)",
                        paintOrder: "stroke",
                        stroke: "var(--pin-stroke)",
                        strokeWidth: 3,
                      }}
                    >
                      ×{pin.entries.length}
                    </text>
                  )}
                  {/* 지역명 라벨 — 영문, 전 언어 공통, 데스크톱만 */}
                  <text
                    x={pin.labelDx ?? 10}
                    y={pin.labelDy ?? 4}
                    textAnchor={(pin.labelDx ?? 10) < 0 ? "end" : "start"}
                    className="hidden md:block pointer-events-none select-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      fill: "var(--map-label)",
                      paintOrder: "stroke",
                      stroke: "var(--pin-stroke)",
                      strokeWidth: 3,
                    }}
                  >
                    {pin.region}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {activePin && (
          <div
            data-lenis-prevent
            className="absolute left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:w-[26rem] max-h-[70%] overflow-y-auto thin-scroll rounded-xl border border-accent-500/30 bg-base-850/95 backdrop-blur p-4 shadow-2xl shadow-black/50"
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <p className="font-semibold text-ink-100">
                {localizeField(activePin, "city", lng)}
                <span className="ml-2 text-xs text-ink-500">
                  {localizeField(activePin, "country", lng)}
                </span>
              </p>
              <button
                type="button"
                className="text-ink-600 hover:text-ink-300 text-sm md:hidden"
                onClick={() => setActive(null)}
                aria-label={t("map.close")}
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3.5">
              {activePin.entries.map((e, i) => (
                <TooltipEntry key={i} entry={e} lng={lng} />
              ))}
            </ul>
            <p className="mt-3 pt-2.5 border-t border-line text-[11px] font-display tracking-wide text-gold-300">
              {t("map.statLine")}
            </p>
          </div>
        )}

        <div className="absolute left-4 top-4 font-display text-[11px] tracking-[0.3em] uppercase text-ink-600">
          {t("map.hud")}
        </div>
        <div className="absolute right-4 top-4 hidden md:flex items-center gap-4 text-[11px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-400 inline-block" />
            {t("map.legendFaculty")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-500 inline-block" />
            {t("map.legendOther")}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-600">{t("map.note")}</p>
    </div>
  );
}
