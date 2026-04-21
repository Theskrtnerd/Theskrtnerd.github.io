"use client";

import { useEffect } from "react";

const config = {
  map: "world",
  projection: "geoOrthographic",
  theme: "dark-yellow",
  water: 1,
  graticule: 0,
  names: 1,
  duration: 2000,
  slider: 0,
  autoplay: 1,
  autozoom: "none",
  data: [
    {
      colors: {},
      places: ["VN"],
      text: "My Home",
      position: {
        zoomLevel: 1,
        geoPoint: { longitude: 0, latitude: 0 },
        rotationX: -106.4,
        rotationY: -16.5,
      },
    },
    {
      places: ["FR", "DE", "BE", "BG", "LU", "NL"],
      text: "Europe",
      position: {
        geoPoint: { longitude: 12.1, latitude: 53.3 },
        rotationX: -12.1,
        rotationY: -53.3,
        zoomLevel: 2.4,
      },
    },
    {
      places: ["US"],
      text: "North America",
      position: {
        geoPoint: { longitude: -100.6, latitude: 44.4 },
        rotationX: 100.6,
        rotationY: -44.4,
        zoomLevel: 1.6,
      },
    },
    {
      places: ["KH", "CN", "HK", "IN", "MM", "SG", "AE", "TW", "QA"],
      text: "Asia",
      position: {
        geoPoint: { longitude: 83.8, latitude: 33.3 },
        rotationX: -83.8,
        rotationY: -33.3,
        zoomLevel: 1.5,
      },
    },
    {
      places: ["AU"],
      text: "Oceania",
      position: {
        geoPoint: { longitude: 134.3, latitude: -25.7 },
        rotationX: -134.3,
        rotationY: 25.7,
        zoomLevel: 1.9,
      },
    },
  ],
  home: "VN",
};

export default function VisitedPlaces() {
  useEffect(() => {
    // expose config to global scope where visitedplaces scripts read it from
    (window as unknown as { visitedplaces_config: unknown }).visitedplaces_config = config;

    const scripts = [
      "https://www.visitedplaces.com/js/common.js",
      "https://www.visitedplaces.com/js/viewer.js",
    ];

    const tags: HTMLScriptElement[] = [];
    scripts.forEach((src) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
      tags.push(s);
    });

    return () => {
      tags.forEach((t) => t.remove());
    };
  }, []);

  return (
    <div
      id="chartdiv"
      className="w-full border border-border bg-surface"
      style={{ height: 600 }}
    />
  );
}
