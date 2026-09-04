import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoNaturalEarth1 } from "d3-geo";
import { CITY_PINS, MEMBERS_PIN } from "../data/alumni.js";
import { localizeField } from "../i18n/index.js";
import { worksForStudent } from "../data/publications.js";
import geoData from "../data/countries-110m.json";

// §3 지도 확대 — full-bleed 폭을 전부 쓰고, 남극을 잘라내 북반구를 크게 잡는다.
// 29차 §3에서 full-bleed를 해제하고 높이를 420px(1440px 이상 480px)로 줄였다.
// scale 240 / center [15, 12]에서 모든 핀(휴스턴 x172 ~ 멜버른 x998, y185~536)이 여백 안에 든다.
const MAP_W = 1120;
const MAP_H = 650;
const PROJECTION_CONFIG = { scale: 240, center: [15, 12] };

// ComposableMap과 동일한 투영을 재현해 핀의 화면 좌표를 미리 계산한다.
// 8px 이내로 겹치는 핀(예: 서울 ↔ 세종 3.7px)은 최대 6px 벌리고
// 실제 좌표와 1px 선으로 연결한다.
const PROJECTION = geoNaturalEarth1()
  .scale(PROJECTION_CONFIG.scale)
  .center(PROJECTION_CONFIG.center)
  .translate([MAP_W / 2, MAP_H / 2]);

// 핀 축소(7→5px)에 맞춰 겹침 판정·분리 거리도 같은 비율로 줄인다 (29차 §3)
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

/* ---- 서울에서 뻗어나가는 호 (§4-1) ----
   국내(서울·세종·연세)는 거리가 짧아 점으로 보이므로 호를 그리지 않는다. */
const SEOUL = [126.978, 37.5665];
const ARC_DRAW_MS = 500;
const ARC_STAGGER_MS = 120; // 8개 도시 × 120ms + 500ms = 1.34초 (1.5초 이내)
const DOMESTIC = new Set(["seoul", "sejong", "yonsei"]);
const ARCS_SEEN_KEY = "alumni-arcs-drawn";

/* 화면 좌표에서 2차 베지에로 호를 그린다.
   ⚠️ 처음엔 지령대로 geoInterpolate(대권)를 썼는데, 서울↔북미는 대권이 북극을 지나
   NaturalEarth1 투영에서 지도 위쪽 밖으로 나가 잘리고 가로줄처럼 보였다.
   투영 좌표의 중점을 위로 들어 올리는 방식이 항상 지도 안에 머물고 의도한 "뻗어나가는 호"로 읽힌다. */
function arcPath(to) {
  const a = PROJECTION(SEOUL);
  const b = PROJECTION(to);
  if (!a || !b) return null;
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const bulge = Math.min(dist * 0.18, 60);
  const cx = (a[0] + b[0]) / 2;
  const cy = Math.max(10, (a[1] + b[1]) / 2 - bulge);
  return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
}

// 서울에서 가까운 곳부터 그린다
function buildArcs(pins) {
  return pins
    .filter((p) => !DOMESTIC.has(p.id))
    .map((pin) => ({
      id: pin.id,
      faculty: pin.entries.some((e) => e.isFaculty),
      d: arcPath(pin.coordinates),
      dist: Math.hypot(
        (PROJECTION(pin.coordinates) ?? [0, 0])[0] - (PROJECTION(SEOUL) ?? [0, 0])[0],
        (PROJECTION(pin.coordinates) ?? [0, 0])[1] - (PROJECTION(SEOUL) ?? [0, 0])[1]
      ),
    }))
    .filter((a) => a.d)
    .sort((a, b) => a.dist - b.dist);
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
          className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-[13px] text-ink-300 transition-colors hover:border-line-strong hover:text-ink-100"
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
      className="thin-scroll max-h-full overflow-y-auto rounded-xl border border-accent-400/40 bg-surface-3 p-4 backdrop-blur"
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
  const allPins = useMemo(() => [...CITY_PINS, MEMBERS_PIN], []);
  const laid = useMemo(() => layoutPins(allPins), [allPins]);
  const arcs = useMemo(() => buildArcs(CITY_PINS), []);

  // 섹션 진입 시 순차 드로잉. 재진입(sessionStorage)이나 reduced-motion이면 즉시 최종 상태.
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const seenRef = useRef(
    typeof sessionStorage !== "undefined" && sessionStorage.getItem(ARCS_SEEN_KEY) === "1"
  );
  const instant = reducedRef.current || seenRef.current;

  // 애니메이션이 끝나면 재진입 시 생략하도록 기록
  useEffect(() => {
    if (instant) return;
    const total = ARC_STAGGER_MS * Math.max(0, arcs.length - 1) + ARC_DRAW_MS;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(ARCS_SEEN_KEY, "1");
      } catch {
        /* 프라이빗 모드 등 — 무시 */
      }
    }, total);
    return () => clearTimeout(timer);
  }, [instant, arcs.length]);

  const arcDelay = (i) => (instant ? 0 : i * ARC_STAGGER_MS);
  const pinDelay = (id) => {
    const i = arcs.findIndex((a) => a.id === id);
    return i < 0 || instant ? 0 : arcDelay(i) + ARC_DRAW_MS * 0.7;
  };

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-2xl border border-line bg-surface-2 ${
          compact ? "" : "flex items-center xl:min-h-[420px] [@media(min-width:1440px)]:min-h-[480px]"
        }`}
        onMouseLeave={() => onHoverPin(null)}
        style={compact ? { height: 300 } : undefined}
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
          className={compact ? undefined : "xl:max-h-[420px] [@media(min-width:1440px)]:max-h-[480px]"}
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

          {/* 호 — 핀보다 아래에 깔린다 */}
          <g aria-hidden="true" fill="none" strokeLinecap="round">
            {arcs.map((a, i) => {
              const dim = highlightPinId && highlightPinId !== a.id;
              const lit = highlightPinId === a.id;
              const base = a.faculty ? 0.28 : 0.22; // 29차 §3 — 지도 축소에 맞춰 호를 옅게
              return (
                <path
                  key={a.id}
                  className={`arc-line${instant ? " is-instant" : ""}`}
                  d={a.d}
                  pathLength="1"
                  strokeWidth={0.8}
                  strokeDasharray="1"
                  style={{
                    stroke: a.faculty ? "var(--arc-faculty)" : "var(--arc)",
                    opacity: dim ? 0.08 : lit ? 0.6 : base,
                    animationDelay: `${arcDelay(i)}ms`,
                    transition: "opacity .2s",
                  }}
                />
              );
            })}
          </g>

          {laid.map(({ pin, dx, dy }) => {
            const inTab = activePinIds.has(pin.id);
            const isHot = highlightPinId === pin.id;
            const isMembers = !!pin.isMembers;
            const isFaculty = pin.entries.some((e) => e.isFaculty);
            const core = isFaculty ? "var(--pin-faculty)" : "var(--pin)";
            const coreActive = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-active)";
            const ring = isFaculty ? "var(--pin-faculty-active)" : "var(--pin-ring)";
            const r = isHot ? 7 : isFaculty ? 6 : 5;
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
                    {/* 호가 도착하면 핀 팝인 */}
                    {(isHot || (isFaculty && !isMembers)) && (
                      <circle
                        r={8.5}
                        fill="none"
                        strokeWidth={1.4}
                        className="pin-pulse"
                        style={{ stroke: ring }}
                      />
                    )}
                    <g
                      className={`pin-pop${instant ? " is-instant" : ""}`}
                      style={{ animationDelay: `${pinDelay(pin.id)}ms` }}
                    >
                    {isMembers ? (
                      /* 재학생 — 외곽선만 있는 중공 원 */
                      <circle
                        r={r}
                        fill="none"
                        strokeWidth={2}
                        style={{
                          stroke: isHot ? "var(--pin-active)" : "var(--color-accent-300)",
                          transition: "all .2s",
                        }}
                      />
                    ) : (
                      <circle
                        r={r}
                        strokeWidth={2}
                        style={{
                          fill: isHot ? coreActive : core,
                          stroke: "var(--pin-stroke)",
                          transition: "all .2s",
                        }}
                      />
                    )}
                    </g>
                    {pin.entries.length > 1 && (
                      <text
                        textAnchor="middle"
                        y={-14}
                        className="pointer-events-none select-none"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 13,
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
                    x={spread ? dx * 1.8 + (dx >= 0 ? 14 : -14) : (pin.labelDx ?? 14)}
                    y={spread ? dy * 1.8 + (dy < 0 ? -5 : 15) : (pin.labelDy ?? 5)}
                    textAnchor={
                      spread ? (dx >= 0 ? "start" : "end") : (pin.labelDx ?? 14) < 0 ? "end" : "start"
                    }
                    className="pointer-events-none hidden select-none md:block"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13,
                      fontWeight: isHot ? 700 : 500,
                      letterSpacing: "0.08em",
                      fill: isHot ? "var(--pin-active)" : "var(--map-label)",
                      paintOrder: "stroke",
                      stroke: "var(--pin-stroke)",
                      strokeWidth: 2,
                    }}
                  >
                    {pin.region}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        <div className="absolute left-4 top-4 font-display text-[13px] uppercase tracking-[0.3em] text-ink-600">
          {t("map.hud")}
        </div>
        <div className="absolute right-4 top-4 hidden items-center gap-4 text-[13px] text-ink-500 md:flex">
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
