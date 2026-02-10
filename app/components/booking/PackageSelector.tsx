import { Check, Crown, Sparkles } from "lucide-react";
import { cn, formatCurrency } from "~/lib/utils";
import type { EventPackage } from "~/lib/types";

interface PackageSelectorProps {
  packages: EventPackage[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function PackageSelector({ packages, selectedId, onSelect }: PackageSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {packages.map((pkg) => {
        const isSelected = selectedId === pkg.id;

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
                <span className="text-xs font-heading font-bold uppercase tracking-wide">Premium</span>
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={`w-5 h-5 ${pkg.isPremium ? "text-gold-500" : "text-enchant-500"}`} />
              <h3 className="font-heading text-xl font-bold text-slate-800">{pkg.name}</h3>
            </div>

            <p className="text-sm text-slate-600 font-body mb-3">{pkg.description}</p>

            <div className={`text-2xl font-heading font-bold ${pkg.isPremium ? "text-gold-600" : "text-enchant-600"}`}>
              {formatCurrency(pkg.price)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {pkg.duration} | {pkg.minGuests}-{pkg.maxGuests} invitados
            </p>
          </button>
        );
      })}
    </div>
  );
}
