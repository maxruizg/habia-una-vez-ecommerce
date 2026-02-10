import { Link } from "react-router";
import { Sparkles, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";

interface SiteSettings {
  name: string;
  tagline: string;
  subtitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
}

const defaultSettings: SiteSettings = {
  name: "Habia una vez",
  tagline: "Salon de Eventos Infantiles",
  subtitle: "by Pamela Hermo Eventos",
  phone: "55 19 95 70 04",
  whatsapp: "5219957004",
  email: "contacto@habiaunavez.com",
  address: "Cda. de Gruta 19, Jardines del Pedregal, Coyoacan, 01900 Ciudad de Mexico, CDMX",
  instagram: "https://instagram.com/habiaunavez",
  facebook: "https://facebook.com/habiaunavez",
};

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const s = settings || defaultSettings;

  return (
    <footer className="bg-slate-900 text-white">
      <StorybookDivider />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-enchant-400" />
              <span className="font-display text-xl font-bold text-white">
                Habia una vez
              </span>
            </div>
            <p className="text-slate-400 text-sm font-body mb-2">
              {s.subtitle}
            </p>
            <p className="text-slate-400 text-sm font-body">
              {s.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Enlaces</h4>
            <div className="space-y-2">
              <Link to="/#paquetes" className="block text-slate-400 hover:text-enchant-400 transition-colors text-sm">
                Paquetes
              </Link>
              <Link to="/#personajes" className="block text-slate-400 hover:text-enchant-400 transition-colors text-sm">
                Personajes
              </Link>
              <Link to="/reservar" className="block text-slate-400 hover:text-enchant-400 transition-colors text-sm">
                Reservar
              </Link>
              <Link to="/#contacto" className="block text-slate-400 hover:text-enchant-400 transition-colors text-sm">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${s.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-enchant-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {s.phone}
              </a>
              <a
                href={`mailto:${s.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-enchant-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {s.email}
              </a>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{s.address}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={s.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-enchant-400 hover:bg-slate-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={s.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-enchant-400 hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm font-body">
          <p>&copy; {new Date().getFullYear()} {s.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
