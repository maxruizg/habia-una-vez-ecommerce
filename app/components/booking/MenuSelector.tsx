import { Check, UtensilsCrossed } from "lucide-react";
import { cn } from "~/lib/utils";
import type { PackageMenuConfig } from "~/lib/types";

interface MenuSelectorProps {
  menuConfig: PackageMenuConfig;
  selectedAdultMenu: string[];
  selectedKidsMenu: string[];
  onAdultMenuChange: (ids: string[]) => void;
  onKidsMenuChange: (ids: string[]) => void;
}

export function MenuSelector({
  menuConfig,
  selectedAdultMenu,
  selectedKidsMenu,
  onAdultMenuChange,
  onKidsMenuChange,
}: MenuSelectorProps) {
  function toggleAdultMenu(id: string) {
    onAdultMenuChange([id]);
  }

  function toggleKidsMenu(id: string) {
    if (selectedKidsMenu.includes(id)) {
      onKidsMenuChange(selectedKidsMenu.filter((m) => m !== id));
    } else if (selectedKidsMenu.length < menuConfig.kidsMaxPicks) {
      onKidsMenuChange([...selectedKidsMenu, id]);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <UtensilsCrossed className="w-5 h-5 text-enchant-500" />
        <h4 className="font-heading font-bold text-slate-800">Seleccion de Menu</h4>
      </div>

      {/* Adult menu */}
      <div className="magic-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-heading font-semibold text-slate-700">Menu para Adultos</h5>
          <span className="text-xs text-slate-500 font-body">
            Selecciona {menuConfig.adultMaxPicks}
          </span>
        </div>
        <div className="grid gap-2">
          {menuConfig.adultOptions.map((option) => {
            const isSelected = selectedAdultMenu.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleAdultMenu(option.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left",
                  isSelected
                    ? "border-enchant-500 bg-enchant-50"
                    : "border-slate-200 hover:border-enchant-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  isSelected ? "border-enchant-500 bg-enchant-500" : "border-slate-300"
                )}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-body text-sm text-slate-700">{option.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Kids menu */}
      <div className="magic-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-heading font-semibold text-slate-700">Menu para Ninos</h5>
          <span className={cn(
            "text-xs font-heading font-semibold px-2 py-0.5 rounded-full",
            selectedKidsMenu.length === menuConfig.kidsMaxPicks
              ? "bg-enchant-100 text-enchant-700"
              : "bg-slate-100 text-slate-500"
          )}>
            {selectedKidsMenu.length}/{menuConfig.kidsMaxPicks} seleccionados
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {menuConfig.kidsOptions.map((option) => {
            const isSelected = selectedKidsMenu.includes(option.id);
            const isDisabled = !isSelected && selectedKidsMenu.length >= menuConfig.kidsMaxPicks;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleKidsMenu(option.id)}
                disabled={isDisabled}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left",
                  isSelected
                    ? "border-enchant-500 bg-enchant-50"
                    : isDisabled
                    ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                    : "border-slate-200 hover:border-enchant-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
                  isSelected ? "border-enchant-500 bg-enchant-500" : "border-slate-300"
                )}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-body text-sm text-slate-700">{option.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
