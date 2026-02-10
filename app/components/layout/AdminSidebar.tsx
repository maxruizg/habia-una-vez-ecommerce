import { NavLink } from "react-router";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Package,
  Puzzle,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "~/lib/utils";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/calendario", icon: CalendarDays, label: "Calendario", end: false },
  { to: "/admin/reservas", icon: BookOpen, label: "Reservas", end: false },
  { to: "/admin/paquetes", icon: Package, label: "Paquetes", end: false },
  { to: "/admin/addons", icon: Puzzle, label: "Extras", end: false },
  { to: "/admin/configuracion", icon: Settings, label: "Configuracion", end: false },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-enchant-400" />
          <span className="font-display text-lg font-bold">Admin</span>
        </div>
        <p className="text-slate-500 text-xs mt-1">Habia una vez</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-heading font-semibold transition-colors",
                isActive
                  ? "bg-enchant-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <form method="post" action="/admin/login">
          <input type="hidden" name="intent" value="logout" />
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-heading font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesion
          </button>
        </form>
      </div>
    </aside>
  );
}
