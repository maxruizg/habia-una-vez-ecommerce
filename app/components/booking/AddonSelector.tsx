import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { cn, formatCurrency } from "~/lib/utils";
import type { PackageAddon } from "~/lib/types";

interface SelectedAddon {
  addonId: string;
  quantity: number;
}

interface AddonSelectorProps {
  addons: PackageAddon[];
  selectedAddons: SelectedAddon[];
  onToggle: (addonId: string) => void;
  onQuantityChange: (addonId: string, quantity: number) => void;
}

const categoryLabels: Record<string, string> = {
  personajes: "Personajes",
  comida: "Comida",
  decoracion: "Decoracion",
  entretenimiento: "Entretenimiento",
};

const categoryOrder = ["personajes", "comida", "decoracion", "entretenimiento"];

export function AddonSelector({
  addons,
  selectedAddons,
  onToggle,
  onQuantityChange,
}: AddonSelectorProps) {
  const [activeTab, setActiveTab] = useState(categoryOrder[0]);

  const filteredAddons = addons.filter((a) => a.category === activeTab);

  function getSelected(addonId: string) {
    return selectedAddons.find((s) => s.addonId === addonId);
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryOrder.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all",
              activeTab === cat
                ? "bg-enchant-500 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-enchant-50 border border-slate-200"
            )}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Addon cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredAddons.map((addon) => {
          const selected = getSelected(addon.id);
          const isSelected = !!selected;

          return (
            <div
              key={addon.id}
              className={cn(
                "magic-card p-4 transition-all",
                isSelected && "border-2 border-enchant-500 ring-1 ring-enchant-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-heading font-bold text-slate-800">{addon.name}</h4>
                <button
                  type="button"
                  onClick={() => onToggle(addon.id)}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
                    isSelected
                      ? "bg-enchant-500 text-white"
                      : "bg-slate-100 text-slate-400 hover:bg-enchant-100 hover:text-enchant-500"
                  )}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-sm text-slate-600 font-body mb-3">{addon.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-enchant-600">
                  {formatCurrency(addon.price)}
                </span>

                {isSelected && addon.maxQuantity && addon.maxQuantity > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange(addon.id, Math.max(1, (selected?.quantity || 1) - 1))
                      }
                      className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-heading font-bold w-6 text-center">
                      {selected?.quantity || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange(
                          addon.id,
                          Math.min(addon.maxQuantity!, (selected?.quantity || 1) + 1)
                        )
                      }
                      className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
