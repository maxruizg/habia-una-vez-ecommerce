import { Link } from "react-router";
import type { Route } from "./+types/confirmacion.$bookingNumber";
import { packages, addons, siteSettings } from "~/lib/data";
import { getBookingByNumber } from "~/lib/data.server";
import { formatCurrency, formatDate } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import { Button } from "~/components/ui/Button";
import { CheckCircle, CalendarDays, Phone, Home, Sparkles, UtensilsCrossed } from "lucide-react";
import { getDayTypeLabel } from "~/lib/utils";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Confirmacion ${params.bookingNumber} | Habia una vez` }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const booking = await getBookingByNumber(params.bookingNumber);
  if (!booking) {
    throw new Response("Reservacion no encontrada", { status: 404 });
  }

  const pkg = packages.find((p) => p.id === booking.packageId);
  const bookingAddons = booking.addons.map((ba) => {
    const addon = addons.find((a) => a.id === ba.addonId);
    return { ...ba, name: addon?.name || ba.addonId, price: addon?.price || 0 };
  });

  return { booking, packageName: pkg?.name || "", bookingAddons, siteSettings };
}

export default function Confirmacion({ loaderData }: Route.ComponentProps) {
  const { booking, packageName, bookingAddons, siteSettings: settings } = loaderData;

  const whatsappMessage = encodeURIComponent(
    `Hola! Acabo de realizar la reservacion ${booking.bookingNumber} para el ${formatDate(booking.eventDate)}. Me gustaria confirmar los detalles.`
  );

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        {/* Celebratory header */}
        <div className="relative py-16 bg-gradient-to-br from-enchant-500 via-magic-500 to-fairy-500 overflow-hidden">
          <SparkleParticles />
          <div className="relative z-10 text-center">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-scale-in" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in-up">
              Reservacion Confirmada
            </h1>
            <p className="font-body text-white/80 animate-fade-in-up [animation-delay:0.2s]">
              Tu evento magico esta en camino
            </p>
          </div>
        </div>

        <PageContainer narrow>
          <div className="magic-card p-8 -mt-8 relative z-20 max-w-2xl mx-auto">
            {/* Booking number */}
            <div className="text-center mb-6 pb-6 border-b border-slate-200">
              <p className="text-sm font-heading text-slate-500 mb-1">Numero de reservacion</p>
              <p className="font-display text-2xl font-bold text-enchant-600">
                {booking.bookingNumber}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2">
                <span className="text-slate-600 font-body">Fecha del evento</span>
                <div className="text-right">
                  <span className="font-heading font-bold text-slate-800 flex items-center gap-2 justify-end">
                    <CalendarDays className="w-4 h-4 text-enchant-500" />
                    {formatDate(booking.eventDate)}
                  </span>
                  {booking.dayType && (
                    <p className="text-xs text-slate-500 font-body">{getDayTypeLabel(booking.dayType)}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600 font-body">Paquete</span>
                <div className="text-right">
                  <span className="font-heading font-bold text-slate-800">{packageName}</span>
                  {booking.guestTier && (
                    <p className="text-xs text-slate-500 font-body">Capacidad: {booking.guestTier} PAX</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600 font-body">Invitados</span>
                <div className="text-right">
                  <span className="font-heading font-bold text-slate-800">{booking.guestCount}</span>
                  {booking.childCount !== undefined && booking.adultCount !== undefined && (
                    <p className="text-xs text-slate-500 font-body">
                      Ninos: {booking.childCount} / Adultos: {booking.adultCount}
                    </p>
                  )}
                </div>
              </div>

              {booking.selectedAdultMenu && booking.selectedAdultMenu.length > 0 && (
                <div className="py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <UtensilsCrossed className="w-4 h-4 text-enchant-500" />
                    <span className="text-slate-600 font-body">Menu</span>
                  </div>
                  <p className="text-xs text-slate-700 font-body ml-6">
                    Adultos: {booking.selectedAdultMenu.join(", ")}
                  </p>
                  {booking.selectedKidsMenu && booking.selectedKidsMenu.length > 0 && (
                    <p className="text-xs text-slate-700 font-body ml-6">
                      Ninos: {booking.selectedKidsMenu.join(", ")}
                    </p>
                  )}
                </div>
              )}

              {bookingAddons.length > 0 && (
                <div className="py-2">
                  <span className="text-slate-600 font-body block mb-2">Extras</span>
                  {bookingAddons.map((addon) => (
                    <div key={addon.addonId} className="flex justify-between text-sm py-1">
                      <span className="text-slate-700">
                        {addon.name} {addon.quantity > 1 && `x${addon.quantity}`}
                      </span>
                      <span className="font-heading font-semibold">{formatCurrency(addon.price * addon.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-px bg-slate-200" />

              <div className="flex justify-between pt-2">
                <span className="font-heading text-lg font-bold text-slate-800">Total</span>
                <span className="font-heading text-xl font-bold text-enchant-600">
                  {formatCurrency(booking.subtotal)}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="bg-enchant-50 rounded-xl p-4 text-center mb-6">
              <Sparkles className="w-5 h-5 text-enchant-500 mx-auto mb-2" />
              <p className="text-sm text-slate-700 font-body">
                Nos pondremos en contacto contigo para confirmar los detalles y coordinar el pago.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer settings={settings} />
    </>
  );
}
