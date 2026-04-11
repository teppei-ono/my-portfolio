// HeaderScrollClass.tsx（例）
"use client";
import { useEffect } from "react";

export default function HeaderScrollClass() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-header]");
    if (!header) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const on = window.scrollY >= window.innerHeight / 2;
      header.classList.toggle("isScrolled", on);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}