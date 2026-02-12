import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import { AnimatedText } from "~/components/decorative/AnimatedText";
import { TextHighlight } from "~/components/decorative/TextHighlight";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh-bg"
    >
      <SparkleParticles />

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-white/90 mb-3 animate-fade-in-up">
          Habia una vez
        </p>

        <AnimatedText
          text="Donde cada fiesta es un cuento de hadas"
          as="h1"
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
          delayMs={100}
        />

        <p className="font-body text-base sm:text-lg text-white/70 mb-10 animate-fade-in-up [animation-delay:0.8s]">
          Salon de Eventos Infantiles &middot; <TextHighlight className="text-white/90">cuento de hadas</TextHighlight>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:1s]">
          <a
            href="/reservar"
            className="magic-cursor inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 px-7 py-3 text-lg bg-white text-enchant-600 hover:bg-cream-100 hover:text-enchant-700 shadow-xl"
          >
            Reserva tu Fecha
          </a>
          <a
            href="#paquetes"
            className="magic-cursor inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 px-7 py-3 text-lg border-2 border-white text-white hover:bg-white/15"
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
