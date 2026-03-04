export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function generateBookingNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  return `HUV-${year}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

import type { DayType, GuestTier, TierPrice, EventPackage } from "./types";

/** Mon-Wed = weekday, Thu-Sun = weekend (venue's custom definition) */
export function getDayType(dateStr: string): DayType {
  const day = new Date(dateStr + "T12:00:00").getDay();
  // 1=Mon, 2=Tue, 3=Wed → weekday; 0=Sun, 4=Thu, 5=Fri, 6=Sat → weekend
  return day >= 1 && day <= 3 ? "weekday" : "weekend";
}

export function getDayTypeLabel(dayType: DayType): string {
  return dayType === "weekday" ? "Lunes a Miercoles" : "Jueves a Domingo";
}

export function getTierPrice(
  tiers: EventPackage["pricingTiers"],
  dayType: DayType,
  tier: GuestTier
): TierPrice | null {
  return tiers[dayType]?.[tier] ?? null;
}

/** Returns the lowest apertura price across all tiers and day types */
export function getMinPrice(tiers: EventPackage["pricingTiers"]): number {
  let min = Infinity;
  for (const dayType of ["weekday", "weekend"] as DayType[]) {
    const dayTiers = tiers[dayType];
    if (!dayTiers) continue;
    for (const tier of Object.values(dayTiers)) {
      if (tier && tier.apertura < min) min = tier.apertura;
    }
  }
  return min === Infinity ? 0 : min;
}
