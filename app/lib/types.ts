export type GuestTier = 50 | 75 | 100 | 125;
export type DayType = "weekday" | "weekend";

export interface TierPrice {
  apertura: number;
  regular: number;
}

export interface PackageMenuConfig {
  adultOptions: { id: string; name: string }[];
  adultMaxPicks: number;
  kidsOptions: { id: string; name: string }[];
  kidsMaxPicks: number;
}

export interface EventPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricingTiers: Record<DayType, Partial<Record<GuestTier, TierPrice>>>;
  guestTiers: GuestTier[];
  duration: string;
  includes: string[];
  isPremium: boolean;
  image?: string;
  menuConfig?: PackageMenuConfig;
}

export interface PackageAddon {
  id: string;
  name: string;
  category: "personajes" | "comida" | "decoracion" | "entretenimiento" | "manualidades" | "menu-top";
  description: string;
  price: number;
  image?: string;
  maxQuantity?: number;
  perPerson?: boolean;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: "aguas" | "guisados" | "guarniciones" | "menu-ninos" | "snacks";
  description?: string;
  price?: number;
}

export interface BlockedDate {
  date: string;
  reason?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageId: string;
  eventDate: string;
  guestCount: number;
  childCount?: number;
  adultCount?: number;
  guestTier?: GuestTier;
  dayType?: DayType;
  selectedAdultMenu?: string[];
  selectedKidsMenu?: string[];
  addons: { addonId: string; quantity: number }[];
  subtotal: number;
  status: "pendiente" | "confirmada" | "cancelada" | "completada";
  notes?: string;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  subtitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  mapUrl: string;
}
