import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";

const placeholderImages = [
  { id: 1, label: "Salon decorado", gradient: "from-enchant-300 to-enchant-500" },
  { id: 2, label: "Personajes en accion", gradient: "from-fairy-300 to-fairy-500" },
  { id: 3, label: "Mesa de dulces", gradient: "from-magic-300 to-magic-500" },
  { id: 4, label: "Ninos divirtiendose", gradient: "from-gold-300 to-gold-500" },
  { id: 5, label: "Decoracion tematica", gradient: "from-enchant-400 to-fairy-400" },
  { id: 6, label: "Pastel personalizado", gradient: "from-fairy-400 to-magic-400" },
];

export function Gallery() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="galeria" className="py-20 bg-white" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Galeria
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Momentos magicos que hemos creado
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {placeholderImages.map((img) => (
            <div
              key={img.id}
              className="scroll-hidden aspect-square rounded-2xl overflow-hidden group"
            >
              <div className={`w-full h-full bg-gradient-to-br ${img.gradient} flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500`}>
                <span className="text-white font-heading font-semibold text-center text-sm sm:text-base opacity-80">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
