import { useActiveSectionObserver } from "~/hooks/useActiveSectionObserver";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "paquetes", label: "Paquetes" },
  { id: "personajes", label: "Personajes" },
  { id: "menu", label: "Menu" },
  { id: "galeria", label: "Galeria" },
  { id: "contacto", label: "Contacto" },
];

const SECTION_IDS = sections.map((s) => s.id);

export function SectionProgressIndicator() {
  const { activeSectionId, activeSectionColor } = useActiveSectionObserver(SECTION_IDS);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSectionId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative flex items-center justify-end"
            aria-label={section.label}
          >
            <span className="absolute right-5 px-2 py-1 rounded bg-slate-800 text-white text-xs font-heading opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
                backgroundColor: isActive ? activeSectionColor : "#cbd5e1",
                transform: isActive ? "scale(1.2)" : "scale(1)",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
