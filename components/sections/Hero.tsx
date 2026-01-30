"use client";

import { useEffect, useRef, useState } from "react";

const ROTATE_INTERVAL_MS = 4000;
const CROSSFADE_DURATION_MS = 800;
const DEFAULT_BG = "/518242979_1131165039034069_8366555255868605704_n.jpg";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [banners, setBanners] = useState<{ id: string; src: string; order: number }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setBanners(data);
      } catch (_) {
        // keep default
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % banners.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [banners.length]);

  useEffect(() => {
    if (heroRef.current && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      heroRef.current.classList.add("animate-fade-in-up");
    }
  }, []);

  const images = banners.length > 0 ? banners.map((b) => b.src) : [DEFAULT_BG];
  const durationSec = CROSSFADE_DURATION_MS / 1000;

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] flex items-center justify-center pt-20 overflow-hidden"
      aria-label="Sekcja główna"
    >
      {/* Warstwy tła z crossfade */}
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === currentIndex ? 1 : 0,
            transition: `opacity ${durationSec}s ease-in-out`,
            zIndex: i === currentIndex ? 1 : 0,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />
      <div className="container-custom text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Fundacja IVEL
        </h1>
        <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md">
          Wspieramy lokalną społeczność i działamy na rzecz pomocy najpotrzebniejszym
        </p>
      </div>
      {images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10"
          role="tablist"
          aria-label="Slajdy banera"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Slajd ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-0 ${
                i === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
