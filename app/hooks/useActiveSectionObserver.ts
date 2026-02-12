import { useState, useEffect } from "react";

const SECTION_COLORS: Record<string, string> = {
  hero: "#14b8a6",
  paquetes: "#ec4899",
  personajes: "#a855f7",
  menu: "#14b8a6",
  galeria: "#f59e0b",
  calendario: "#a855f7",
  contacto: "#ec4899",
};

export function useActiveSectionObserver(sectionIds: string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSectionId(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [sectionIds]);

  const activeSectionColor = SECTION_COLORS[activeSectionId] || "#14b8a6";

  return { activeSectionId, activeSectionColor };
}
