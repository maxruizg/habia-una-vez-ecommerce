import { useState, useEffect } from "react";

const SECTION_COLORS: Record<string, string> = {
  hero: "#75C2E6",
  paquetes: "#F29295",
  personajes: "#C496C4",
  menu: "#75C2E6",
  galeria: "#FEDC5D",
  calendario: "#C496C4",
  contacto: "#F29295",
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

  const activeSectionColor = SECTION_COLORS[activeSectionId] || "#75C2E6";

  return { activeSectionId, activeSectionColor };
}
