import { Link } from "react-router";
import { Check, Crown, Sparkles } from "lucide-react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { formatCurrency } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import type { EventPackage } from "~/lib/types";

interface PackagesProps {
  packages: EventPackage[];
}

export function Packages({ packages }: PackagesProps) {
  const sectionRef = useScrollAnimation();

  return (
    <section id="paquetes" className="py-20 bg-cream-50" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Nuestros Paquetes
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Elige la experiencia perfecta para la celebracion de tus pequenos
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`scroll-hidden magic-card p-8 relative ${
                pkg.isPremium ? "border-2 border-gold-400 ring-2 ring-gold-200" : ""
              }`}
            >
              {pkg.isPremium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-white px-4 py-1.5 rounded-full text-sm font-heading font-bold flex items-center gap-1.5 shadow-lg">
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
                  <span className={`text-4xl font-heading font-bold ${pkg.isPremium ? "text-gold-600" : "text-enchant-600"}`}>
                    {formatCurrency(pkg.price)}
                  </span>
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
      </div>
    </section>
  );
}
