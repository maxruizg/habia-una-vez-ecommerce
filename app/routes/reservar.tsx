import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import type { Route } from "./+types/reservar";
import { packages, addons } from "~/lib/data";
import { getBlockedDates, getBookings } from "~/lib/data.server";
import { getCart, getCartTotal } from "~/lib/cart.server";
import { formatCurrency, formatDate, getDayType, getDayTypeLabel, getTierPrice } from "~/lib/utils";
import type { GuestTier } from "~/lib/types";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { StepIndicator } from "~/components/booking/StepIndicator";
import { BookingCalendar } from "~/components/booking/BookingCalendar";
import { PackageSelector } from "~/components/booking/PackageSelector";
import { AddonSelector } from "~/components/booking/AddonSelector";
import { MenuSelector } from "~/components/booking/MenuSelector";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import { CalendarDays, Package, Puzzle, ShoppingCart, ArrowLeft, ArrowRight, UtensilsCrossed } from "lucide-react";
import { useCart } from "~/hooks/useCart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reservar | Habia una vez" },
    { name: "description", content: "Reserva tu fecha magica para la fiesta infantil de tus suenos." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const blockedDates = (await getBlockedDates()).map((d) => d.date);
  const bookings = await getBookings();
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
  const [selectedTier, setSelectedTier] = useState<GuestTier | null>(null);
  const [childCount, setChildCount] = useState(15);
  const [adultCount, setAdultCount] = useState(15);
  const [selectedAdultMenu, setSelectedAdultMenu] = useState<string[]>([]);
  const [selectedKidsMenu, setSelectedKidsMenu] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<{ addonId: string; quantity: number }[]>([]);
  const [pageTurnDirection, setPageTurnDirection] = useState<"forward" | "backward">("forward");
  const [pageTurnKey, setPageTurnKey] = useState(0);

  const guestCount = childCount + adultCount;
  const selectedPackage = pkgs.find((p) => p.id === selectedPackageId);
  const dayType = selectedDate ? getDayType(selectedDate) : null;
  const currentPrice = selectedPackage && dayType && selectedTier
    ? getTierPrice(selectedPackage.pricingTiers, dayType, selectedTier)
    : null;

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
      case 2: {
        if (!selectedPackageId || !selectedTier || !dayType) return false;
        if (guestCount < 1 || guestCount > selectedTier) return false;
        if (selectedPackage?.menuConfig) {
          if (selectedAdultMenu.length !== selectedPackage.menuConfig.adultMaxPicks) return false;
          if (selectedKidsMenu.length !== selectedPackage.menuConfig.kidsMaxPicks) return false;
        }
        return true;
      }
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  }

  function toggleAddon(addonId: string, defaultQuantity?: number) {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.addonId === addonId);
      if (exists) return prev.filter((a) => a.addonId !== addonId);
      return [...prev, { addonId, quantity: defaultQuantity || 1 }];
    });
  }

  function updateAddonQuantity(addonId: string, quantity: number) {
    setSelectedAddons((prev) =>
      prev.map((a) => (a.addonId === addonId ? { ...a, quantity } : a))
    );
  }

  function calculateTotal() {
    let total = currentPrice?.apertura || 0;
    for (const sa of selectedAddons) {
      const addon = addonList.find((a) => a.id === sa.addonId);
      if (!addon) continue;
      if (addon.perPerson) {
        total += addon.price * guestCount;
      } else {
        total += addon.price * sa.quantity;
      }
    }
    return total;
  }

  function calculateExtrasSubtotal() {
    let total = 0;
    for (const sa of selectedAddons) {
      const addon = addonList.find((a) => a.id === sa.addonId);
      if (!addon) continue;
      if (addon.perPerson) {
        total += addon.price * guestCount;
      } else {
        total += addon.price * sa.quantity;
      }
    }
    return total;
  }

  const [pendingNavigate, setPendingNavigate] = useState(false);

  function handleAddToCart() {
    if (!selectedPackage || !currentPrice) return;

    const items = [
      {
        type: "package" as const,
        itemId: selectedPackage.id,
        name: selectedPackage.name,
        price: currentPrice.apertura,
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
            quantity: addon.perPerson ? guestCount : sa.quantity,
          };
        })
        .filter(Boolean) as { type: "package" | "addon"; itemId: string; name: string; price: number; quantity: number }[],
    ];

    cart.addBooking({
      items,
      eventDate: selectedDate,
      guestCount,
      childCount,
      adultCount,
      guestTier: selectedTier ?? undefined,
      dayType: dayType ?? undefined,
      selectedAdultMenu: selectedAdultMenu.length > 0 ? selectedAdultMenu : undefined,
      selectedKidsMenu: selectedKidsMenu.length > 0 ? selectedKidsMenu : undefined,
    });

    setPendingNavigate(true);
  }

  // Navigate to cart only after the fetcher completes (cookie is set)
  useEffect(() => {
    if (pendingNavigate && !cart.isSubmitting) {
      navigate("/carrito");
    }
  }, [pendingNavigate, cart.isSubmitting, navigate]);

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
                  <div className="mt-4 text-center space-y-1">
                    <p className="font-body text-enchant-600 font-semibold">
                      Fecha seleccionada: {formatDate(selectedDate)}
                    </p>
                    <p className="text-sm text-slate-500 font-body">
                      {getDayTypeLabel(getDayType(selectedDate))} — Los precios se ajustan segun el dia
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 - Package + Tier + Guests + Menu */}
            {currentStep === 2 && (
              <div className="animate-fade-in space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-enchant-500" />
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Selecciona un paquete</h2>
                </div>
                <PackageSelector
                  packages={pkgs}
                  selectedId={selectedPackageId}
                  onSelect={(id) => {
                    setSelectedPackageId(id);
                    setSelectedTier(null);
                    setSelectedAdultMenu([]);
                    setSelectedKidsMenu([]);
                  }}
                  dayType={dayType}
                  selectedTier={selectedTier}
                  onSelectTier={setSelectedTier}
                />

                {/* Guest split */}
                {selectedTier && (
                  <div className="animate-fade-in space-y-4">
                    <h4 className="font-heading font-bold text-slate-800">Distribucion de invitados</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Ninos"
                        type="number"
                        min={0}
                        value={childCount === 0 ? "" : childCount}
                        onChange={(e) => setChildCount(e.target.value === "" ? 0 : Number(e.target.value))}
                        onBlur={() => { if (childCount < 1) setChildCount(1); }}
                      />
                      <Input
                        label="Adultos"
                        type="number"
                        min={0}
                        value={adultCount === 0 ? "" : adultCount}
                        onChange={(e) => setAdultCount(e.target.value === "" ? 0 : Number(e.target.value))}
                        onBlur={() => { if (adultCount < 1) setAdultCount(1); }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-sm text-slate-600">
                        Total: <span className="font-bold text-enchant-600">{guestCount} invitados</span>
                        <span className="text-slate-400 ml-2">
                          (max {selectedTier})
                        </span>
                      </p>
                      {guestCount > selectedTier && (
                        <p className="text-sm text-danger-600 mt-1 font-body">
                          El total de invitados no puede exceder {selectedTier}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Menu selection (Encantada only) */}
                {selectedTier && selectedPackage?.menuConfig && (
                  <MenuSelector
                    menuConfig={selectedPackage.menuConfig}
                    selectedAdultMenu={selectedAdultMenu}
                    selectedKidsMenu={selectedKidsMenu}
                    onAdultMenuChange={setSelectedAdultMenu}
                    onKidsMenuChange={setSelectedKidsMenu}
                  />
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
                  childCount={childCount}
                  guestCount={guestCount}
                />

                <div className="mt-6 p-4 bg-enchant-50 rounded-xl text-center">
                  <span className="font-heading text-sm text-slate-600">Subtotal extras: </span>
                  <span className="font-heading font-bold text-enchant-600">
                    {formatCurrency(calculateExtrasSubtotal())}
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
                    <div className="text-right">
                      <span className="font-body font-bold text-slate-800">{formatDate(selectedDate)}</span>
                      {dayType && (
                        <p className="text-xs text-slate-500 font-body">{getDayTypeLabel(dayType)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-heading font-semibold text-slate-600">Invitados</span>
                    <div className="text-right">
                      <p className="font-body font-bold text-slate-800">{guestCount} total</p>
                      <p className="text-sm text-slate-500 font-body">Ninos: {childCount} / Adultos: {adultCount}</p>
                      {selectedTier && (
                        <p className="text-xs text-slate-400 font-body">Capacidad: {selectedTier} PAX</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="font-heading font-semibold text-slate-600">Paquete</span>
                    <div className="text-right">
                      <p className="font-body font-bold text-slate-800">{selectedPackage?.name}</p>
                      {currentPrice && (
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-slate-400 line-through font-heading">
                            {formatCurrency(currentPrice.regular)}
                          </span>
                          <span className="text-sm text-enchant-600 font-heading font-bold">
                            {formatCurrency(currentPrice.apertura)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Menu selections */}
                  {selectedPackage?.menuConfig && (selectedAdultMenu.length > 0 || selectedKidsMenu.length > 0) && (
                    <div className="py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <UtensilsCrossed className="w-4 h-4 text-enchant-500" />
                        <span className="font-heading font-semibold text-slate-600">Menu</span>
                      </div>
                      {selectedAdultMenu.length > 0 && (
                        <p className="text-sm text-slate-700 font-body">
                          <span className="text-slate-500">Adultos: </span>
                          {selectedAdultMenu.map((id) =>
                            selectedPackage.menuConfig!.adultOptions.find((o) => o.id === id)?.name
                          ).join(", ")}
                        </p>
                      )}
                      {selectedKidsMenu.length > 0 && (
                        <p className="text-sm text-slate-700 font-body mt-1">
                          <span className="text-slate-500">Ninos: </span>
                          {selectedKidsMenu.map((id) =>
                            selectedPackage.menuConfig!.kidsOptions.find((o) => o.id === id)?.name
                          ).join(", ")}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedAddons.length > 0 && (
                    <div className="py-3 border-b border-slate-100">
                      <p className="font-heading font-semibold text-slate-600 mb-2">Extras</p>
                      {selectedAddons.map((sa) => {
                        const addon = addonList.find((a) => a.id === sa.addonId);
                        if (!addon) return null;
                        const isPerPerson = addon.perPerson;
                        const lineTotal = isPerPerson ? addon.price * guestCount : addon.price * sa.quantity;
                        return (
                          <div key={sa.addonId} className="flex justify-between items-center py-1">
                            <span className="text-sm text-slate-700 font-body">
                              {addon.name}
                              {isPerPerson
                                ? ` x ${guestCount} personas`
                                : sa.quantity > 1 ? ` x${sa.quantity}` : ""}
                            </span>
                            <span className="text-sm font-heading font-semibold text-slate-700">
                              {formatCurrency(lineTotal)}
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
