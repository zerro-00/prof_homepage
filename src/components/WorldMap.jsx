import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import { CITY_PINS } from "../data/alumni.js";
import { localizeField } from "../i18n/index.js";
import { worksForStudent } from "../data/publications.js";
import geoData from "../data/countries-110m.json";

const MAP_W = 980;
const MAP_H = 470;
const PROJECTION_CONFIG = { scale: 165, center: [15, 8] };

// ComposableMap과 동일한 투영을 재현해 핀의 화면 좌표를 미리 계산한다.
// 8px 이내로 겹치는 핀(예: 서울 ↔ 세종 3.7px)은 최대 6px 벌리고
// 실제 좌표와 1px 선으로 연결한다.
const PROJECTION = geoNaturalEarth1()
  .scale(PROJECTION_CONFIG.scale)
  .center(PROJECTION_CONFIG.center)
  .translate([MAP_W / 2, MAP_H / 2]);

const OVERLAP_PX = 8;
const SPREAD_PX = 6;

function layoutPins(pins) {
  const pts = pins.map((pin) => ({ pin, xy: PROJECTION(pin.coordinates) ?? [0, 0], dx: 0, dy: 0 }));
  const claimed = new Set();
  pts.forEach((a, i) => {
    if (claimed.has(i)) return;
    const cluster = [i];
    claimed.add(i);
    pts.forEach((b, j) => {
      if (j <= i || claimed.has(j)) return;
      if (Math.hypot(a.xy[0] - b.xy[0], a.xy[1] - b.xy[1]) < OVERLAP_PX) {
        cluster.push(j);
        claimed.add(j);
      }
    });
    if (cluster.length > 1) {
      cluster.forEach((idx, k) => {
        const angle = -Math.PI / 2 + (2 * Math.PI * k) / cluster.length;
        pts[idx].dx = Math.cos(angle) * SPREAD_PX;
        pts[idx].dy = Math.sin(angle) * SPREAD_PX;
      });
    }
  });
  return pts;
}

function displayName(entry, lng) {
  if (lng === "ko") return { main: entry.nameKo, sub: entry.nameEn };
  return { main: entry.nameEn ?? entry.nameKo, sub: null };
}

function EntryLinks({ entry, lng }) {
  if (!entry.link && !entry.subLink) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {entry.link && (
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-lg border border-gold-500/40 px-3 text-[13px] font-medium text-gold-300 transition-colors hover:bg-gold-500/10"
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
          className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-[13px] text-ink-300 transition-colors hover:border-base-600 hover:text-ink-100"
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
        <span className={entry.isFaculty ? "font-semibold text-gold-300" : "text-accent-300"}>
          {name.main}
          {name.sub && <span className="font-normal"> ({name.sub})</span>}
        </span>
        <span className="mx-1.5 text-ink-600">·</span>
        <span className="text-ink-500">{localizeField(entry, "grad", lng)}</span>
        {works.length > 0 && (
          <span className="ml-2 font-display text-[11px] text-ink-600">
            SSCI {works.filter((w) => w.type === "SSCI").length} · KCI{" "}
            {works.filter((w) => w.type === "KCI").length}
          </span>
        )}
      </p>
      <p className="mt-0.5 text-ink-100">{localizeField(entry, "affiliation", lng)}</p>
      <p className="text-ink-300">{localizeField(entry, "title", lng)}</p>
      {entry.path && (
        <p className="mt-0.5 text-[12px] text-ink-500">{localizeField(entry, "path", lng)}</p>
      )}
      <EntryLinks entry={entry} lng={lng} />
    </li>
  );
}

export function PinCard({ pin, lng, onClose }) {
  const { t } = useTranslation();
  return (
    <div
      data-lenis-prevent
      className="thin-scroll max-h-full overflow-y-auto rounded-xl border border-accent-400/40 bg-base-850/95 p-4 backdrop-blur"
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="font-semibold text-ink-100">
          {localizeField(pin, "city", lng)}
          <span className="ml-2 text-xs text-ink-500">{localizeField(pin, "country", lng)}</span>
        </p>
        <button
          type="button"
          className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center text-ink-600 transition-colors hover:text-ink-300"
          onClick={onClose}
          aria-label={t("map.close")}
        >
          ✕
        </button>
      </div>
      <ul className="space-y-3.5">
        {pin.entries.map((e, i) => (
          <TooltipEntry key={i} entry={e} lng={lng} />
        ))}
      </ul>
      <p className="mt-3 border-t border-line pt-2.5 font-display text-[11px] tracking-wide text-gold-300">
        {t("map.statLine")}
      </p>
    </div>
  );
}

/* 지도 — 상태는 StudentsSection이 들고 있고 여기서는 표시만 한다 (§2-3 양방향 하이라이트) */
export default function WorldMap({
  activePinIds,
  highlightPinId,
  onHoverPin,
  onSelectPin,
  compact = false,
}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const laid = useMemo(() => layoutPins(CITY_PINS), []);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-base-900/70"
        onMouseLeave={() => onHoverPin(null)}
        style={compact ? { height: 260 } : undefined}
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
          projectionConfig={PROJECTION_CONFIG}
          width={MAP_W}
          height={MAP_H}
          style={compact ? { width: "100%", height: "100%" } : { width: "100%", height: "auto" }}
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

          {laid.map(({ pin, dx, dy }) => {
            const inTab = activePinIds.has(pin.id);
            const isHot = highlightPinId === pin.id;
            const isFaculty = pin.entries.some((e) => e.isFaculty);
            const core = isFaculty ? "var(--pin-faculty)" : "var(--pin)";
            const coreActive = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-active)";
            const ring = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-ring)";
            const r = isHot ? 6.3 : isFaculty ? 5.2 : 4.5;
            const spread = dx !== 0 || dy !== 0;
            return (
              <Marker
                key={pin.id}
                coordinates={pin.coordinates}
                onMouseEnter={() => onHoverPin(pin.id)}
                onClick={() => onSelectPin(pin.id)}
              >
                <g
                  className="cursor-pointer"
                  style={{ opacity: inTab ? 1 : 0.22, transition: "opacity .2s" }}
                >
                  {/* 겹침 완화로 옮긴 경우 실제 좌표와 1px 선으로 연결 */}
                  {(dx !== 0 || dy !== 0) && (
                    <line
                      x1={0}
                      y1={0}
                      x2={dx}
                      y2={dy}
                      strokeWidth={1}
                      style={{ stroke: "var(--map-label)" }}
                    />
                  )}
                  <g
                    transform={`translate(${dx} ${dy}) scale(${isHot ? 1.4 : 1})`}
                    style={{ transition: "transform .18s" }}
                  >
                    {(isHot || isFaculty) && (
                      <circle
                        r={6}
                        fill="none"
                        strokeWidth={1.2}
                        className="pin-pulse"
                        style={{ stroke: ring }}
                      />
                    )}
                    <circle
                      r={r}
                      strokeWidth={1.5}
                      style={{
                        fill: isHot ? coreActive : core,
                        stroke: "var(--pin-stroke)",
                        transition: "all .2s",
                      }}
                    />
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
                  </g>
                  {/* 지역명 라벨 — 사람 이름은 상시 노출하지 않는다.
                      겹침 완화로 옮긴 핀은 라벨도 이동 방향 바깥쪽으로 밀어야
                      두 라벨이 서로 교차하지 않는다 (서울 ↔ 세종). */}
                  <text
                    x={spread ? dx * 1.8 + (dx >= 0 ? 10 : -10) : (pin.labelDx ?? 10)}
                    y={spread ? dy * 1.8 + (dy < 0 ? -3 : 11) : (pin.labelDy ?? 4)}
                    textAnchor={
                      spread ? (dx >= 0 ? "start" : "end") : (pin.labelDx ?? 10) < 0 ? "end" : "start"
                    }
                    className="pointer-events-none hidden select-none md:block"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 8.5,
                      fontWeight: isHot ? 700 : 600,
                      letterSpacing: "0.08em",
                      fill: isHot ? "var(--pin-active)" : "var(--map-label)",
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

        <div className="absolute left-4 top-4 font-display text-[11px] uppercase tracking-[0.3em] text-ink-600">
          {t("map.hud")}
        </div>
        <div className="absolute right-4 top-4 hidden items-center gap-4 text-[11px] text-ink-500 md:flex">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold-400" />
            {t("map.legendFaculty")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-500" />
            {t("map.legendOther")}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-600">{t("map.note")}</p>
    </div>
  );
}
