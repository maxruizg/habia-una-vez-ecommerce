export interface EventPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  minGuests: number;
  maxGuests: number;
  includes: string[];
  isPremium: boolean;
  image?: string;
}

export interface PackageAddon {
  id: string;
  name: string;
  category: "personajes" | "comida" | "decoracion" | "entretenimiento";
  description: string;
  price: number;
  image?: string;
  maxQuantity?: number;
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
  category: "bebidas" | "botanas" | "panaderia" | "pollo" | "res" | "cerdo" | "tacos" | "infantil";
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
