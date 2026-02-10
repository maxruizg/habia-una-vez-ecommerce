import { Link } from "react-router";
import { Eye } from "lucide-react";
import { formatCurrency, formatDateShort } from "~/lib/utils";
import { StatusBadge } from "./StatusBadge";
import type { Booking } from "~/lib/types";

interface BookingTableProps {
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 font-body">
        No hay reservaciones
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Reservacion
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Cliente
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Estado
              </th>
              <th className="px-4 py-3 text-right text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-heading font-bold text-enchant-600 text-sm">
                    {booking.bookingNumber}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-body text-sm text-slate-800">{booking.customerName}</p>
                  <p className="font-body text-xs text-slate-500">{booking.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-sm font-body text-slate-700">
                  {formatDateShort(booking.eventDate)}
                </td>
                <td className="px-4 py-3 text-sm font-heading font-bold text-slate-800">
                  {formatCurrency(booking.subtotal)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/admin/reservas/${booking.id}`}
                    className="inline-flex items-center gap-1 text-enchant-600 hover:text-enchant-700 text-sm font-heading font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
