import { Suspense, lazy } from "react";
import { SectionHeading } from "./common.jsx";

// 지도는 무겁기 때문에 lazy 로딩
const WorldMap = lazy(() => import("./WorldMap.jsx"));

export default function StudentsSection() {
  return (
    <section id="alumni" className="relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        index="03"
        label="World Map"
        title="제자들이 진출한 세계"
        desc="이 연구실을 거쳐 간 학생들은 지금 세계 곳곳의 대학과 기업에서 다음 세대를 이끌고 있습니다."
      />
      <Suspense
        fallback={
          <div className="h-72 rounded-2xl border border-line bg-base-900/70 flex items-center justify-center text-ink-600 text-sm">
            지도를 불러오는 중…
          </div>
        }
      >
        <WorldMap />
      </Suspense>
    </section>
  );
}
