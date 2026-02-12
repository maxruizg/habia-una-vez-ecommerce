import { useEffect, useState } from "react";
import { DollarSign, Users, MapPin, PartyPopper } from "lucide-react";

const pills = [
  { icon: DollarSign, text: "Desde $8,500" },
  { icon: Users, text: "20-80 invitados" },
  { icon: MapPin, text: "Jardines del Pedregal" },
  { icon: PartyPopper, text: "200+ fiestas" },
];

export function QuickOverview() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-30 animate-fade-in-down hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4 px-6 py-2.5 rounded-xl bg-white/80 backdrop-blur-lg border border-enchant-100 shadow-lg">
          <div className="flex items-center gap-4 flex-wrap">
            {pills.map((pill) => {
              const Icon = pill.icon;
              return (
                <span
                  key={pill.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-enchant-50 text-enchant-700 text-sm font-heading font-semibold"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {pill.text}
                </span>
              );
            })}
          </div>
          <a
            href="/reservar"
            className="shrink-0 px-5 py-2 rounded-xl bg-enchant-500 text-white text-sm font-heading font-semibold hover:bg-enchant-600 transition-colors shadow-md magic-cursor"
          >
            Reservar
          </a>
        </div>
      </div>
    </div>
  );
}
