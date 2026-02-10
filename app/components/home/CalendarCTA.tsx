import { CalendarDays, Sparkles } from "lucide-react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { SparkleParticles } from "~/components/decorative/SparkleParticles";

export function CalendarCTA() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="relative py-24 bg-gradient-to-br from-enchant-500 via-magic-500 to-fairy-500 overflow-hidden" ref={sectionRef}>
      <SparkleParticles />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="scroll-hidden">
          <CalendarDays className="w-16 h-16 text-white/80 mx-auto mb-6 animate-float" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Reserva tu Fecha Magica
          </h2>
          <p className="font-body text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Consulta disponibilidad y asegura el dia perfecto para la celebracion
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservar"
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 px-7 py-3 text-lg bg-white text-enchant-600 hover:bg-cream-100 hover:text-enchant-700 shadow-xl"
            >
              <CalendarDays className="w-5 h-5" />
              Ver Calendario
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-white/70">
            <Sparkles className="w-4 h-4" />
            <span className="font-body text-sm">
              Mas de 200 fiestas realizadas
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
