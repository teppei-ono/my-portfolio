"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export default function AboutMovieParallax() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // 画面中央を基準に -1..1 の進捗を作る
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);

      // ずらし量（好みで 30〜80 くらいで調整）
      const max = 200;
      const y = reduce ? 0 : Math.max(-1, Math.min(1, progress)) * -max;

      // 端が見えないように少し拡大
      video.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.aboutMovie}>
      <video
        ref={videoRef}
        src="/assets/movies/movie_about.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={styles.aboutMovieVideo}
      />
    </div>
  );
}