"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LOCATIONS: [number, number][] = [
  [14.5547, 121.0244],
  [14.5995, 120.9842],
  [14.676, 121.0437],
  [8.4822, 124.6472],
  [7.1907, 125.4553],
];

export default function PhilippinesMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { zoomControl: false }).setView(
      [12.8797, 121.774],
      6,
    );

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(map);

    const markerHtmlStyles = `
      background-color: #ef4444;
      width: 1rem;
      height: 1rem;
      display: block;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
    `;

    const customIcon = L.divIcon({
      className: "custom-pin",
      iconAnchor: [8, 8],
      html: `<span style="${markerHtmlStyles}"></span>`,
    });

    LOCATIONS.forEach((loc) => {
      L.marker(loc, { icon: customIcon }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 md:h-[400px] bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant rounded-xl relative overflow-hidden shadow-lg z-0"
      aria-label="Map of Philippine cities with respiratory risk monitoring"
    />
  );
}
