import { useState } from "react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { cn } from "~/lib/utils";
import { UtensilsCrossed, Coffee, Cookie, Drumstick, Beef, Ham, Flame, Baby } from "lucide-react";
import type { MenuItem } from "~/lib/types";

interface MenuSectionProps {
  menuItems: MenuItem[];
}

const categories = [
  { id: "bebidas", label: "Bebidas", icon: Coffee },
  { id: "botanas", label: "Botanas", icon: UtensilsCrossed },
  { id: "panaderia", label: "Panaderia", icon: Cookie },
  { id: "pollo", label: "Pollo", icon: Drumstick },
  { id: "res", label: "Res", icon: Beef },
  { id: "cerdo", label: "Cerdo", icon: Ham },
  { id: "tacos", label: "Tacos", icon: Flame },
  { id: "infantil", label: "Infantil", icon: Baby },
] as const;

export function MenuSection({ menuItems }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("bebidas");
  const sectionRef = useScrollAnimation();

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-20 bg-cream-50" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Nuestro Menu
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Deliciosas opciones para que todos disfruten
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="scroll-hidden max-w-4xl mx-auto">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-enchant-500 text-white shadow-md"
                      : "bg-white text-slate-600 hover:bg-enchant-50 hover:text-enchant-600 border border-slate-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Items grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-3.5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 rounded-full bg-enchant-400 shrink-0" />
                <span className="font-body text-slate-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
