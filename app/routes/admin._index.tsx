import type { Route } from "./+types/admin._index";
import { packages } from "~/lib/data";
import { getBookings } from "~/lib/data.server";
import { formatCurrency } from "~/lib/utils";
import { StatsCard } from "~/components/admin/StatsCard";
import { BookingTable } from "~/components/admin/BookingTable";
import { BookOpen, DollarSign, Clock, CalendarDays } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  const bookings = getBookings();

  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelada")
    .reduce((sum, b) => sum + b.subtotal, 0);
  const pendingCount = bookings.filter((b) => b.status === "pendiente").length;
  const upcomingBookings = bookings
    .filter((b) => b.eventDate >= new Date().toISOString().split("T")[0] && b.status !== "cancelada")
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  return { totalBookings, totalRevenue, pendingCount, upcomingBookings, recentBookings: bookings.slice(-5).reverse() };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { totalBookings, totalRevenue, pendingCount, upcomingBookings, recentBookings } = loaderData;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Reservas" value={totalBookings} icon={BookOpen} color="enchant" />
        <StatsCard title="Ingresos" value={formatCurrency(totalRevenue)} icon={DollarSign} color="gold" />
        <StatsCard title="Pendientes" value={pendingCount} icon={Clock} color="fairy" />
        <StatsCard
          title="Proximos Eventos"
          value={upcomingBookings.length}
          icon={CalendarDays}
          color="magic"
        />
      </div>

      {/* Recent bookings */}
      <h2 className="font-heading text-lg font-bold text-slate-800 mb-4">Reservas recientes</h2>
      <BookingTable bookings={recentBookings} />
    </div>
  );
}
