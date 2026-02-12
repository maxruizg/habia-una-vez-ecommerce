import { useEffect, useRef } from "react";

const SCROLL_CLASSES = [
  "scroll-hidden",
  "scroll-fade-left",
  "scroll-fade-right",
  "scroll-scale",
  "scroll-rotate-in",
  "scroll-flip-up",
  "scroll-wave-reveal",
];

const SELECTOR = SCROLL_CLASSES.map((c) => `.${c}`).join(", ");

function hasScrollClass(el: Element): boolean {
  return SCROLL_CLASSES.some((c) => el.classList.contains(c));
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const children = el.querySelectorAll(SELECTOR);
    children.forEach((child) => observer.observe(child));

    if (hasScrollClass(el)) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
