"use client";

import dynamic from "next/dynamic";

const PhilippinesMap = dynamic(() => import("@/components/PhilippinesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-[400px] bg-surface-container-low border border-outline-variant rounded-xl animate-pulse" />
  ),
});

export default function HomeMapSection() {
  return <PhilippinesMap />;
}
