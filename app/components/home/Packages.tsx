import { useState } from "react";
import { Link } from "react-router";
import { Check, Crown, Sparkles, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { Button } from "~/components/ui/Button";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { AnimatedCounter } from "~/components/decorative/AnimatedCounter";
import { WaveDivider } from "~/components/decorative/WaveDivider";
import { PackageComparison } from "~/components/home/PackageComparison";
import type { EventPackage } from "~/lib/types";

interface PackagesProps {
  packages: EventPackage[];
}

export function Packages({ packages }: PackagesProps) {
  const sectionRef = useScrollAnimation();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <>
      <section
        id="paquetes"
        className="py-20 bg-gradient-to-br from-fairy-50 via-cream-50 to-fairy-100 dot-grid-bg"
        ref={sectionRef}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 scroll-hidden">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4 heading-hover-gradient">
              Nuestros Paquetes
            </h2>
            <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
              Elige la experiencia perfecta para la celebracion de tus pequenos
            </p>
            <StorybookDivider className="max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`${index % 2 === 0 ? "scroll-fade-left" : "scroll-fade-right"} magic-card p-8 ${
                  pkg.isPremium ? "border-2 border-gold-400 ring-2 ring-gold-200" : ""
                }`}
                style={{ "--stagger": index } as React.CSSProperties}
              >
                {pkg.isPremium && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-white px-4 py-1.5 rounded-full text-sm font-heading font-bold flex items-center gap-1.5 shadow-lg z-10">
                    <Crown className="w-4 h-4" />
                    Recomendado
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Sparkles className={`w-5 h-5 ${pkg.isPremium ? "text-gold-500" : "text-enchant-500"}`} />
                    <h3 className="font-display text-2xl font-bold text-slate-800">
                      {pkg.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 font-body text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <AnimatedCounter
                      value={pkg.price}
                      format="currency"
                      className={`text-4xl font-heading font-bold ${pkg.isPremium ? "text-gold-600" : "text-enchant-600"}`}
                    />
                  </div>
                  <p className="text-slate-500 text-sm mt-1">
                    {pkg.duration} | {pkg.minGuests}-{pkg.maxGuests} invitados
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.isPremium ? "text-gold-500" : "text-enchant-500"}`} />
                      <span className="text-sm text-slate-700 font-body">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/reservar?package=${pkg.id}`}>
                  <Button
                    variant={pkg.isPremium ? "secondary" : "primary"}
                    className={`w-full ${pkg.isPremium ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700" : ""}`}
                  >
                    Reservar
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison toggle */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-enchant-300 text-enchant-600 font-heading font-semibold text-sm hover:bg-enchant-50 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showComparison ? "rotate-180" : ""}`}
              />
              {showComparison ? "Ocultar comparacion" : "Ver comparacion"}
            </button>

            {showComparison && (
              <div className="max-w-4xl mx-auto animate-fade-in-up">
                <PackageComparison packages={packages} />
              </div>
            )}
          </div>
        </div>
      </section>
      <WaveDivider color="var(--color-magic-50)" variant="wave" />
    </>
  );
}
