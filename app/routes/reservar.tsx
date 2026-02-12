import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import type { Route } from "./+types/reservar";
import { packages, addons } from "~/lib/data";
import { getBlockedDates, getBookings } from "~/lib/data.server";
import { getCart, getCartTotal } from "~/lib/cart.server";
import { formatCurrency, formatDate } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { StepIndicator } from "~/components/booking/StepIndicator";
import { BookingCalendar } from "~/components/booking/BookingCalendar";
import { PackageSelector } from "~/components/booking/PackageSelector";
import { AddonSelector } from "~/components/booking/AddonSelector";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import { CalendarDays, Package, Puzzle, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "~/hooks/useCart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reservar | Habia una vez" },
    { name: "description", content: "Reserva tu fecha magica para la fiesta infantil de tus suenos." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const blockedDates = getBlockedDates().map((d) => d.date);
  const bookings = getBookings();
  const bookedDates = bookings
    .filter((b) => b.status !== "cancelada")
    .map((b) => b.eventDate);
  const cart = await getCart(request);
  const { itemCount } = getCartTotal(cart);

  return {
    packages,
    addons,
    blockedDates,
    bookedDates,
    cartItemCount: itemCount,
  };
}

const STEPS = ["Fecha", "Paquete", "Extras", "Resumen"];

export default function Reservar({ loaderData }: Route.ComponentProps) {
  const { packages: pkgs, addons: addonList, blockedDates, bookedDates, cartItemCount } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const cart = useCart();

  const stepParam = parseInt(searchParams.get("step") || "1");
  const currentStep = Math.min(Math.max(stepParam, 1), 4);

  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [selectedPackageId, setSelectedPackageId] = useState(searchParams.get("package") || "");
  const [guestCount, setGuestCount] = useState(30);
  const [selectedAddons, setSelectedAddons] = useState<{ addonId: string; quantity: number }[]>([]);
  const [pageTurnDirection, setPageTurnDirection] = useState<"forward" | "backward">("forward");
  const [pageTurnKey, setPageTurnKey] = useState(0);

  const selectedPackage = pkgs.find((p) => p.id === selectedPackageId);

  function goToStep(step: number, direction: "forward" | "backward") {
    setPageTurnDirection(direction);
    setPageTurnKey((k) => k + 1);
    setSearchParams({ step: String(step) });
  }

  function handleNext() {
    if (currentStep < 4) goToStep(currentStep + 1, "forward");
  }

  function handleBack() {
    if (currentStep > 1) goToStep(currentStep - 1, "backward");
  }

  function canProceed() {
    switch (currentStep) {
      case 1: return !!selectedDate;
      case 2: return !!selectedPackageId;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  }

  function toggleAddon(addonId: string) {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.addonId === addonId);
      if (exists) return prev.filter((a) => a.addonId !== addonId);
      return [...prev, { addonId, quantity: 1 }];
    });
  }

  function updateAddonQuantity(addonId: string, quantity: number) {
    setSelectedAddons((prev) =>
      prev.map((a) => (a.addonId === addonId ? { ...a, quantity } : a))
    );
  }

  function calculateTotal() {
    let total = selectedPackage?.price || 0;
    for (const sa of selectedAddons) {
      const addon = addonList.find((a) => a.id === sa.addonId);
      if (addon) total += addon.price * sa.quantity;
    }
    return total;
  }

  function handleAddToCart() {
    if (!selectedPackage) return;

    const items = [
      {
        type: "package" as const,
        itemId: selectedPackage.id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        quantity: 1,
      },
      ...selectedAddons
        .map((sa) => {
          const addon = addonList.find((a) => a.id === sa.addonId);
          if (!addon) return null;
          return {
            type: "addon" as const,
            itemId: addon.id,
            name: addon.name,
            price: addon.price,
            quantity: sa.quantity,
          };
        })
        .filter(Boolean) as { type: "package" | "addon"; itemId: string; name: string; price: number; quantity: number }[],
    ];

    cart.addBooking({
      items,
      eventDate: selectedDate,
      guestCount,
    });

    navigate("/carrito");
  }

  const pageTurnClass =
    pageTurnDirection === "forward" ? "page-turn-enter" : "page-turn-enter-reverse";

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 pb-16 min-h-screen">
        {/* Header */}
        <div className="relative py-12 bg-gradient-to-r from-enchant-500 to-magic-500 overflow-hidden mb-8">
          <SparkleParticles />
          <div className="relative z-10 text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Reserva tu Fecha Magica
            </h1>
            <p className="font-body text-white/80">
              Sigue los pasos para crear tu evento perfecto
            </p>
          </div>
        </div>

        <PageContainer narrow>
          <StepIndicator steps={STEPS} currentStep={currentStep} />

          <div key={pageTurnKey} className={pageTurnClass}>
            {/* Step 1 - Date */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <CalendarDays className="w-6 h-6 text-enchant-500" />
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Selecciona una fecha</h2>
                </div>
                <BookingCalendar
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  blockedDates={blockedDates}
                  bookedDates={bookedDates}
                />
                {selectedDate && (
                  <p className="mt-4 text-center font-body text-enchant-600 font-semibold">
                    Fecha seleccionada: {formatDate(selectedDate)}
                  </p>
                )}
              </div>
            )}

            {/* Step 2 - Package */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-enchant-500" />
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Selecciona un paquete</h2>
                </div>
                <PackageSelector
                  packages={pkgs}
                  selectedId={selectedPackageId}
                  onSelect={setSelectedPackageId}
                />

                {selectedPackage && (
                  <div className="mt-6">
                    <Input
                      label={`Numero de invitados (${selectedPackage.minGuests}-${selectedPackage.maxGuests})`}
                      type="number"
                      min={selectedPackage.minGuests}
                      max={selectedPackage.maxGuests}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3 - Addons */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <Puzzle className="w-6 h-6 text-enchant-500" />
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Extras opcionales</h2>
                </div>
                <AddonSelector
                  addons={addonList}
                  selectedAddons={selectedAddons}
                  onToggle={toggleAddon}
                  onQuantityChange={updateAddonQuantity}
                />

                <div className="mt-6 p-4 bg-enchant-50 rounded-xl text-center">
                  <span className="font-heading text-sm text-slate-600">Subtotal extras: </span>
                  <span className="font-heading font-bold text-enchant-600">
                    {formatCurrency(
                      selectedAddons.reduce((sum, sa) => {
                        const addon = addonList.find((a) => a.id === sa.addonId);
                        return sum + (addon?.price || 0) * sa.quantity;
                      }, 0)
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Step 4 - Summary */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingCart className="w-6 h-6 text-enchant-500" />
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Resumen de tu evento</h2>
                </div>

                <div className="magic-card p-6 space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-heading font-semibold text-slate-600">Fecha</span>
                    <span className="font-body font-bold text-slate-800">{formatDate(selectedDate)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-heading font-semibold text-slate-600">Invitados</span>
                    <span className="font-body font-bold text-slate-800">{guestCount}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-heading font-semibold text-slate-600">Paquete</span>
                    <div className="text-right">
                      <p className="font-body font-bold text-slate-800">{selectedPackage?.name}</p>
                      <p className="text-sm text-enchant-600 font-heading">{formatCurrency(selectedPackage?.price || 0)}</p>
                    </div>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="py-3 border-b border-slate-100">
                      <p className="font-heading font-semibold text-slate-600 mb-2">Extras</p>
                      {selectedAddons.map((sa) => {
                        const addon = addonList.find((a) => a.id === sa.addonId);
                        if (!addon) return null;
                        return (
                          <div key={sa.addonId} className="flex justify-between items-center py-1">
                            <span className="text-sm text-slate-700 font-body">
                              {addon.name} {sa.quantity > 1 && `x${sa.quantity}`}
                            </span>
                            <span className="text-sm font-heading font-semibold text-slate-700">
                              {formatCurrency(addon.price * sa.quantity)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-heading text-lg font-bold text-slate-800">Total</span>
                    <span className="font-heading text-2xl font-bold text-enchant-600">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleAddToCart} className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Agregar al Carrito
              </Button>
            )}
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
