import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { WaveDivider } from "~/components/decorative/WaveDivider";

const galleryImages = [
  { id: 1, label: "Salon decorado", image: "/images/gallery/salon.svg", gradient: "from-enchant-300 to-enchant-500" },
  { id: 2, label: "Personajes en accion", image: "/images/gallery/personajes.svg", gradient: "from-fairy-300 to-fairy-500" },
  { id: 3, label: "Mesa de dulces", image: "/images/gallery/mesa-dulces.svg", gradient: "from-magic-300 to-magic-500" },
  { id: 4, label: "Ninos divirtiendose", image: "/images/gallery/ninos.svg", gradient: "from-gold-300 to-gold-500" },
  { id: 5, label: "Decoracion tematica", image: "/images/gallery/decoracion.svg", gradient: "from-enchant-400 to-fairy-400" },
  { id: 6, label: "Pastel personalizado", image: "/images/gallery/pastel.svg", gradient: "from-fairy-400 to-magic-400" },
];

export function Gallery() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      <section
        id="galeria"
        className="py-20 bg-gradient-to-br from-gold-50 via-cream-50 to-fairy-50"
        ref={sectionRef}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-hidden">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4 heading-hover-gradient">
              Galeria
            </h2>
            <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
              Momentos magicos que hemos creado
            </p>
            <StorybookDivider className="max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className="scroll-scale aspect-square rounded-2xl overflow-hidden group"
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${img.gradient} group-hover:scale-105 transition-transform duration-500`}>
                  <img
                    src={img.image}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-4 py-3 text-white font-heading font-semibold text-center text-sm sm:text-base">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider color="var(--color-enchant-500)" variant="wave" />
    </>
  );
}
