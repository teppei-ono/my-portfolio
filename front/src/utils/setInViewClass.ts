export type setInViewClassOptions = {
  selector?: string;
  inViewClass?: string;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export function setInViewClass(options: setInViewClassOptions = {}) {
  const {
    selector = "[data-io]",
    inViewClass = "isInview",
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.1,
    once = true,
  } = options;

  if (typeof window === "undefined") return () => {};
  if (!("IntersectionObserver" in window)) return () => {};

  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return () => {};

  const obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target as HTMLElement;
        el.classList.add(inViewClass);

        if (once) obs.unobserve(el);
      }
    },
    { root: null, rootMargin, threshold }
  );

  for (const el of els) obs.observe(el);

  return () => obs.disconnect();
}