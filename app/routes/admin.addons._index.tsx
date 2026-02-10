import type { Route } from "./+types/admin.addons._index";
import { addons } from "~/lib/data";
import { formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Extras | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  return { addons };
}

const categoryLabels: Record<string, string> = {
  personajes: "Personajes",
  comida: "Comida",
  decoracion: "Decoracion",
  entretenimiento: "Entretenimiento",
};

const categoryColors: Record<string, "enchant" | "fairy" | "magic" | "gold"> = {
  personajes: "magic",
  comida: "gold",
  decoracion: "fairy",
  entretenimiento: "enchant",
};

export default function AdminAddons({ loaderData }: Route.ComponentProps) {
  const { addons: addonList } = loaderData;

  const grouped = addonList.reduce<Record<string, typeof addonList>>((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Extras</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-heading text-lg font-bold text-slate-800">
              {categoryLabels[category] || category}
            </h2>
            <Badge variant={categoryColors[category] || "enchant"}>
              {items.length} items
            </Badge>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase">Descripcion</th>
                  <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase">Max</th>
                </tr>
              </thead>
              <tbody>
                {items.map((addon) => (
                  <tr key={addon.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-heading font-semibold text-slate-800 text-sm">{addon.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm font-body">{addon.description}</td>
                    <td className="px-4 py-3 font-heading font-bold text-enchant-600 text-sm">{formatCurrency(addon.price)}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{addon.maxQuantity || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
