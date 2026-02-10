import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/admin.reservas.$id";
import { packages, addons } from "~/lib/data";
import { getBooking, updateBookingStatus } from "~/lib/data.server";
import type { Booking } from "~/lib/types";
import { formatCurrency, formatDate } from "~/lib/utils";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { Button } from "~/components/ui/Button";
import { ArrowLeft, CalendarDays, Users, Mail, Phone } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Detalle de Reserva | Admin" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const booking = getBooking(params.id);
  if (!booking) throw new Response("No encontrado", { status: 404 });

  const pkg = packages.find((p) => p.id === booking.packageId);
  const bookingAddons = booking.addons.map((ba) => {
    const addon = addons.find((a) => a.id === ba.addonId);
    return { ...ba, name: addon?.name || ba.addonId, price: addon?.price || 0 };
  });

  return { booking, packageName: pkg?.name || "", bookingAddons };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const status = formData.get("status") as Booking["status"];
  updateBookingStatus(params.id, status);
  return { success: true };
}

export default function AdminReservaDetail({ loaderData }: Route.ComponentProps) {
  const { booking, packageName, bookingAddons } = loaderData;

  const statusActions: { label: string; value: Booking["status"]; variant: "primary" | "secondary" | "danger" | "outline" }[] = [
    { label: "Confirmar", value: "confirmada", variant: "primary" },
    { label: "Completar", value: "completada", variant: "outline" },
    { label: "Cancelar", value: "cancelada", variant: "danger" },
  ];

  return (
    <div>
      <Link
        to="/admin/reservas"
        className="inline-flex items-center gap-2 text-enchant-600 hover:text-enchant-700 font-heading font-semibold text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a reservas
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-800">
          {booking.bookingNumber}
        </h1>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-heading font-bold text-slate-800 mb-4">Cliente</h3>
          <div className="space-y-3">
            <p className="font-body text-lg text-slate-800 font-semibold">{booking.customerName}</p>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Mail className="w-4 h-4" />
              {booking.customerEmail}
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Phone className="w-4 h-4" />
              {booking.customerPhone}
            </div>
          </div>
        </div>

        {/* Event info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-heading font-bold text-slate-800 mb-4">Evento</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700">
              <CalendarDays className="w-4 h-4 text-enchant-500" />
              <span className="font-body">{formatDate(booking.eventDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-fairy-500" />
              <span className="font-body">{booking.guestCount} invitados</span>
            </div>
            <div>
              <span className="text-sm text-slate-500">Paquete: </span>
              <span className="font-heading font-bold text-slate-800">{packageName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Addons & Total */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <h3 className="font-heading font-bold text-slate-800 mb-4">Detalles del pedido</h3>

        {bookingAddons.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-2">Extras:</p>
            {bookingAddons.map((addon) => (
              <div key={addon.addonId} className="flex justify-between py-1.5 text-sm">
                <span className="text-slate-700">
                  {addon.name} {addon.quantity > 1 && `x${addon.quantity}`}
                </span>
                <span className="font-heading font-semibold">{formatCurrency(addon.price * addon.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-3 border-t border-slate-200">
          <span className="font-heading font-bold text-slate-800">Total</span>
          <span className="font-heading text-xl font-bold text-enchant-600">
            {formatCurrency(booking.subtotal)}
          </span>
        </div>

        {booking.notes && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500 mb-1">Notas:</p>
            <p className="text-sm text-slate-700 font-body">{booking.notes}</p>
          </div>
        )}
      </div>

      {/* Status actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <h3 className="font-heading font-bold text-slate-800 mb-4">Acciones</h3>
        <div className="flex flex-wrap gap-3">
          {statusActions
            .filter((a) => a.value !== booking.status)
            .map((action) => (
              <Form key={action.value} method="post">
                <input type="hidden" name="status" value={action.value} />
                <Button type="submit" variant={action.variant} size="sm">
                  {action.label}
                </Button>
              </Form>
            ))}
        </div>
      </div>
    </div>
  );
}
