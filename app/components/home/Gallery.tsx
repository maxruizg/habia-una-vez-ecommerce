import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { WaveDivider } from "~/components/decorative/WaveDivider";

const galleryImages = [
  { id: 1, label: "Aventura en equipo", image: "/images/gallery/grupal-1.png", gradient: "from-enchant-300 to-cobalt-400" },
  { id: 2, label: "Amigos magicos", image: "/images/gallery/grupal-2.png", gradient: "from-fairy-300 to-fairy-500" },
  { id: 3, label: "Diversion sin fin", image: "/images/gallery/grupal-3.png", gradient: "from-magic-300 to-magic-500" },
  { id: 4, label: "Momentos especiales", image: "/images/gallery/grupal-4.png", gradient: "from-lime-300 to-lime-500" },
  { id: 5, label: "Mundo de fantasia", image: "/images/gallery/grupal-5.png", gradient: "from-orange-300 to-orange-500" },
  { id: 6, label: "Todos juntos", image: "/images/gallery/grupal-6.png", gradient: "from-cobalt-300 to-enchant-400" },
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
