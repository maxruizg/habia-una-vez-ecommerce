import { Link, useLocation } from "react-router";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { useMobileMenu } from "~/hooks/useMobileMenu";
import { cn } from "~/lib/utils";

interface NavbarProps {
  cartItemCount?: number;
}

const navLinks = [
  { href: "/#paquetes", label: "Paquetes" },
  { href: "/#personajes", label: "Personajes" },
  { href: "/#menu", label: "Menu" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/reservar", label: "Reservar" },
];

export function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const { isOpen, toggle, close } = useMobileMenu();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-enchant-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={close}
          >
            <Sparkles className="w-6 h-6 text-enchant-500 group-hover:animate-wand-wave" />
            <span className="font-display text-xl font-bold bg-gradient-to-r from-enchant-600 to-magic-600 bg-clip-text text-transparent">
              Habia una vez
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-heading font-semibold rounded-lg transition-colors",
                  "text-slate-600 hover:text-enchant-600 hover:bg-enchant-50",
                  link.href === "/reservar" &&
                    "bg-enchant-500 text-white hover:bg-enchant-600 hover:text-white ml-2"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrito"
              className="relative p-2 rounded-lg text-slate-600 hover:text-enchant-600 hover:bg-enchant-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-fairy-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggle}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-enchant-600 hover:bg-enchant-50 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-enchant-100 animate-fade-in-down">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className={cn(
                  "block px-3 py-2.5 text-base font-heading font-semibold rounded-lg transition-colors",
                  "text-slate-600 hover:text-enchant-600 hover:bg-enchant-50",
                  link.href === "/reservar" &&
                    "bg-enchant-500 text-white hover:bg-enchant-600 hover:text-white text-center mt-2"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
