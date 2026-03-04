import { Check, Crown, Sparkles, Users } from "lucide-react";
import { cn, formatCurrency, getTierPrice, getMinPrice, getDayTypeLabel } from "~/lib/utils";
import type { EventPackage, DayType, GuestTier } from "~/lib/types";

interface PackageSelectorProps {
  packages: EventPackage[];
  selectedId?: string;
  onSelect: (id: string) => void;
  dayType: DayType | null;
  selectedTier: GuestTier | null;
  onSelectTier: (tier: GuestTier) => void;
}

export function PackageSelector({
  packages,
  selectedId,
  onSelect,
  dayType,
  selectedTier,
  onSelectTier,
}: PackageSelectorProps) {
  const selectedPackage = packages.find((p) => p.id === selectedId);

  return (
    <div className="space-y-6">
      {/* Package cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const isSelected = selectedId === pkg.id;
          const minPrice = dayType
            ? Math.min(
                ...pkg.guestTiers
                  .map((t) => getTierPrice(pkg.pricingTiers, dayType, t)?.apertura ?? Infinity)
              )
            : getMinPrice(pkg.pricingTiers);

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelect(pkg.id)}
              className={cn(
                "magic-card p-6 text-left transition-all relative",
                isSelected
                  ? "border-2 border-enchant-500 ring-2 ring-enchant-200"
                  : "hover:border-enchant-300",
                pkg.isPremium && !isSelected && "border-gold-300"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-enchant-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {pkg.isPremium && (
                <div className="flex items-center gap-1 text-gold-600 mb-2">
                  <Crown className="w-4 h-4" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wide">Recomendado</span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-5 h-5 ${pkg.isPremium ? "text-gold-500" : "text-enchant-500"}`} />
                <h3 className="font-heading text-xl font-bold text-slate-800">{pkg.name}</h3>
              </div>

              <p className="text-sm text-slate-600 font-body mb-3">{pkg.description}</p>

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 font-body">desde</span>
                <span className={`text-2xl font-heading font-bold ${pkg.isPremium ? "text-gold-600" : "text-enchant-600"}`}>
                  {formatCurrency(minPrice)}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {pkg.duration} | 50-125 invitados
              </p>
            </button>
          );
        })}
      </div>

      {/* Tier selection */}
      {selectedPackage && dayType && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-enchant-500" />
            <h4 className="font-heading font-bold text-slate-800">Selecciona tu capacidad</h4>
          </div>
          <p className="text-sm text-slate-500 font-body mb-4">
            Precios para <span className="font-semibold text-enchant-600">{getDayTypeLabel(dayType)}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {selectedPackage.guestTiers.map((tier) => {
              const price = getTierPrice(selectedPackage.pricingTiers, dayType, tier);
              if (!price) return null;
              const isActive = selectedTier === tier;

              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onSelectTier(tier)}
                  className={cn(
                    "rounded-xl border-2 p-4 text-center transition-all",
                    isActive
                      ? "border-enchant-500 bg-enchant-50 ring-2 ring-enchant-200"
                      : "border-slate-200 hover:border-enchant-300 bg-white"
                  )}
                >
                  <p className="font-heading text-2xl font-bold text-slate-800">{tier}</p>
                  <p className="text-xs text-slate-500 font-body mb-2">invitados</p>
                  <p className="text-xs text-slate-400 line-through font-heading">
                    {formatCurrency(price.regular)}
                  </p>
                  <p className={cn(
                    "font-heading font-bold text-lg",
                    isActive ? "text-enchant-600" : "text-slate-700"
                  )}>
                    {formatCurrency(price.apertura)}
                  </p>
                  <p className="text-[10px] text-enchant-500 font-heading font-semibold uppercase tracking-wide mt-1">
                    Precio Apertura
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
