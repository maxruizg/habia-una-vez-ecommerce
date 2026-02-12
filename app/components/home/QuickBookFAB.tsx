import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export function QuickBookFAB() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      {expanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-enchant-200 p-4 w-56 animate-scale-in">
          <p className="font-heading text-sm font-semibold text-slate-700 mb-1">
            Desde $8,500 MXN
          </p>
          <p className="text-xs text-slate-500 mb-3 font-body">
            Paquetes todo incluido
          </p>
          <a
            href="/reservar"
            className="block text-center px-4 py-2 bg-enchant-500 text-white rounded-xl text-sm font-heading font-semibold hover:bg-enchant-600 transition-colors"
          >
            Reservar ahora
          </a>
          <button
            onClick={() => setExpanded(false)}
            className="mt-2 text-xs text-slate-400 hover:text-slate-600 w-full text-center"
          >
            Cerrar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="w-14 h-14 rounded-full bg-enchant-500 text-white shadow-lg hover:bg-enchant-600 transition-all hover:scale-110 flex items-center justify-center"
          aria-label="Reservar"
        >
          <CalendarDays className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
