import { Link } from "react-router";
import type { Route } from "./+types/admin.paquetes._index";
import { packages } from "~/lib/data";
import { formatCurrency } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import { Edit, Crown } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Paquetes | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  return { packages };
}

export default function AdminPaquetes({ loaderData }: Route.ComponentProps) {
  const { packages: pkgs } = loaderData;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Paquetes</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {pkgs.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {pkg.isPremium && <Crown className="w-5 h-5 text-gold-500" />}
                <h3 className="font-heading text-lg font-bold text-slate-800">{pkg.name}</h3>
              </div>
              <Badge variant={pkg.isPremium ? "gold" : "enchant"}>
                {pkg.isPremium ? "Premium" : "Base"}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 font-body mb-4">{pkg.description}</p>

            <div className="flex justify-between items-center mb-4">
              <span className="font-heading text-2xl font-bold text-enchant-600">
                {formatCurrency(pkg.price)}
              </span>
              <span className="text-sm text-slate-500">
                {pkg.duration} | {pkg.minGuests}-{pkg.maxGuests} invitados
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-heading font-semibold text-slate-600 mb-2">Incluye:</p>
              <ul className="text-sm text-slate-600 font-body space-y-1">
                {pkg.includes.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-enchant-400" />
                    {item}
                  </li>
                ))}
                {pkg.includes.length > 4 && (
                  <li className="text-slate-400">+{pkg.includes.length - 4} mas...</li>
                )}
              </ul>
            </div>

            <Link
              to={`/admin/paquetes/${pkg.id}`}
              className="inline-flex items-center gap-2 text-enchant-600 hover:text-enchant-700 font-heading font-semibold text-sm"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
