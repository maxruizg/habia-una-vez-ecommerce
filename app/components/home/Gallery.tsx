import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { WaveDivider } from "~/components/decorative/WaveDivider";

const galleryImages = [
  { id: 1, label: "Nuestro salon", image: "/images/gallery/venue-overview.jpg" },
  { id: 2, label: "Decoracion tematica", image: "/images/gallery/table-setup.jpg" },
  { id: 3, label: "Area de juegos", image: "/images/gallery/playground-area.jpg" },
  { id: 4, label: "Tobogan y alberca de pelotas", image: "/images/gallery/play-structure.jpg" },
  { id: 5, label: "Diversion sin fin", image: "/images/gallery/ball-pit-fun.jpg" },
  { id: 6, label: "Cuna de Estrellas", image: "/images/gallery/cuna-estrellas.jpg" },
  { id: 7, label: "Caya Glam Studio", image: "/images/gallery/glam-studio.jpg" },
  { id: 8, label: "Estacion de belleza", image: "/images/gallery/nail-polish-station.jpg" },
  { id: 9, label: "Estacion de comida", image: "/images/gallery/food-station.jpg" },
  { id: 10, label: "Momentos especiales", image: "/images/gallery/kids-playing.jpg" },
  { id: 11, label: "Habia una vez", image: "/images/gallery/branded-backdrop.jpg" },
  { id: 12, label: "Juegos interactivos", image: "/images/gallery/interactive-play.jpg" },
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className="scroll-scale aspect-square rounded-2xl overflow-hidden group"
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={img.image}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
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
