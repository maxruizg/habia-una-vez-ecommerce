import { useState } from "react";
import type { Route } from "./+types/admin.reservas._index";
import { getBookings } from "~/lib/data.server";
import type { Booking } from "~/lib/types";
import { BookingTable } from "~/components/admin/BookingTable";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reservas | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  const bookings = getBookings();
  return { bookings };
}

const statusFilters: { label: string; value: Booking["status"] | "todas" }[] = [
  { label: "Todas", value: "todas" },
  { label: "Pendientes", value: "pendiente" },
  { label: "Confirmadas", value: "confirmada" },
  { label: "Completadas", value: "completada" },
  { label: "Canceladas", value: "cancelada" },
];

export default function AdminReservas({ loaderData }: Route.ComponentProps) {
  const { bookings } = loaderData;
  const [filter, setFilter] = useState<Booking["status"] | "todas">("todas");

  const filtered = filter === "todas"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Reservas</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all",
              filter === f.value
                ? "bg-enchant-500 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-enchant-50 border border-slate-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <BookingTable bookings={filtered} />
    </div>
  );
}
