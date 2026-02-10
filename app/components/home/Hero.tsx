import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-enchant-500 via-magic-500 to-fairy-500">
      <SparkleParticles />

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 animate-fade-in-up">
          Habia una vez
        </h1>
        <p className="font-heading text-xl sm:text-2xl lg:text-3xl text-white/90 mb-2 animate-fade-in-up [animation-delay:0.2s]">
          Salon de Eventos Infantiles
        </p>
        <p className="font-body text-base sm:text-lg text-white/70 mb-10 animate-fade-in-up [animation-delay:0.3s]">
          by Pamela Hermo Eventos
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.5s]">
          <a
            href="/reservar"
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 px-7 py-3 text-lg bg-white text-enchant-600 hover:bg-cream-100 hover:text-enchant-700 shadow-xl"
          >
            Reserva tu Fecha
          </a>
          <a
            href="#paquetes"
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 px-7 py-3 text-lg border-2 border-white text-white hover:bg-white/15"
          >
            Ver Paquetes
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#paquetes"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce-gentle"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
