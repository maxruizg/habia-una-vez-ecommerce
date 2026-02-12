import { Check, Minus } from "lucide-react";
import { formatCurrency } from "~/lib/utils";
import type { EventPackage } from "~/lib/types";

interface PackageComparisonProps {
  packages: EventPackage[];
}

const featureLabels = [
  "Salon de eventos",
  "Personal de servicio",
  "Invitaciones electronicas",
  "Pastel decorado tematico",
  "Mesa de botanas",
  "Bebidas ilimitadas",
  "Pintacaritas profesional",
  "Decoracion del salon",
  "Musica y sonido",
  "Personaje mascota",
  "Pinata tematica",
  "Regalo para festejado",
  "Barra de snacks premium",
  "Sesion de fotos",
  "Show de magia",
  "Area de inflables",
];

const baseFeatureCount = 9;

export function PackageComparison({ packages }: PackageComparisonProps) {
  const basic = packages.find((p) => !p.isPremium);
  const premium = packages.find((p) => p.isPremium);

  if (!basic || !premium) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 font-heading font-semibold text-slate-600">
              Caracteristica
            </th>
            <th className="text-center py-3 px-4 font-heading font-semibold text-slate-700">
              {basic.name}
            </th>
            <th className="text-center py-3 px-4 font-heading font-semibold text-gold-700 bg-gold-50 rounded-t-xl">
              {premium.name}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-slate-100">
            <td className="py-3 px-4 font-body text-slate-600">Precio</td>
            <td className="py-3 px-4 text-center font-heading font-bold text-enchant-600">
              {formatCurrency(basic.price)}
            </td>
            <td className="py-3 px-4 text-center font-heading font-bold text-gold-600 bg-gold-50">
              {formatCurrency(premium.price)}
            </td>
          </tr>
          <tr className="border-t border-slate-100">
            <td className="py-3 px-4 font-body text-slate-600">Duracion</td>
            <td className="py-3 px-4 text-center font-body text-slate-700">
              {basic.duration}
            </td>
            <td className="py-3 px-4 text-center font-body text-slate-700 bg-gold-50">
              {premium.duration}
            </td>
          </tr>
          <tr className="border-t border-slate-100">
            <td className="py-3 px-4 font-body text-slate-600">Invitados</td>
            <td className="py-3 px-4 text-center font-body text-slate-700">
              {basic.minGuests}-{basic.maxGuests}
            </td>
            <td className="py-3 px-4 text-center font-body text-slate-700 bg-gold-50">
              {premium.minGuests}-{premium.maxGuests}
            </td>
          </tr>
          {featureLabels.map((label, i) => {
            const basicHas = i < baseFeatureCount;
            const premiumHas = true;
            return (
              <tr key={label} className="border-t border-slate-100">
                <td className="py-3 px-4 font-body text-slate-600">{label}</td>
                <td className="py-3 px-4 text-center">
                  {basicHas ? (
                    <Check className="w-4 h-4 text-enchant-500 mx-auto" />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                  )}
                </td>
                <td className="py-3 px-4 text-center bg-gold-50">
                  {premiumHas ? (
                    <Check className="w-4 h-4 text-gold-500 mx-auto" />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
