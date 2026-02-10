import { Link } from "react-router";
import type { Route } from "./+types/carrito";
import { getCart, getCartTotal } from "~/lib/cart.server";
import { formatCurrency, formatDate } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { CartItem } from "~/components/cart/CartItem";
import { CartSummary } from "~/components/cart/CartSummary";
import { Button } from "~/components/ui/Button";
import { useCart } from "~/hooks/useCart";
import {
  ShoppingCart,
  CalendarDays,
  Users,
  ArrowLeft,
  Package,
  Sparkles,
  Puzzle,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Carrito | Habia una vez" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);
  const { subtotal, itemCount } = getCartTotal(cart);
  return { cart, subtotal, itemCount };
}

export default function Carrito({ loaderData }: Route.ComponentProps) {
  const { cart, subtotal, itemCount } = loaderData;
  const { updateItem, removeItem, clearAll } = useCart();

  const isEmpty = cart.items.length === 0;
  const packageItem = cart.items.find((i) => i.type === "package");
  const addonItems = cart.items.filter((i) => i.type === "addon");
  const packageTotal = packageItem ? packageItem.price * packageItem.quantity : 0;
  const addonsTotal = addonItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <Navbar cartItemCount={itemCount} />
      <main className="pt-24 pb-16 min-h-screen">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold text-slate-800">Tu Carrito</h1>
            {!isEmpty && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-danger-600">
                Vaciar carrito
              </Button>
            )}
          </div>

          {isEmpty ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold text-slate-600 mb-2">
                Tu carrito esta vacio
              </h2>
              <p className="text-slate-500 font-body mb-6">
                Empieza reservando tu fecha magica
              </p>
              <Link to="/reservar">
                <Button>
                  <CalendarDays className="w-4 h-4" />
                  Reserva tu Fecha
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Event details */}
                {(cart.eventDate || cart.guestCount) && (
                  <div className="magic-card p-5">
                    <h3 className="font-heading font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-enchant-500" />
                      Detalles del Evento
                    </h3>
                    <div className="flex flex-wrap gap-6">
                      {cart.eventDate && (
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-5 h-5 text-enchant-500" />
                          <div>
                            <p className="text-xs text-slate-500 font-body">Fecha</p>
                            <p className="font-heading font-bold text-slate-800">
                              {formatDate(cart.eventDate)}
                            </p>
                          </div>
                        </div>
                      )}
                      {cart.guestCount && (
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-fairy-500" />
                          <div>
                            <p className="text-xs text-slate-500 font-body">Invitados</p>
                            <p className="font-heading font-bold text-slate-800">
                              {cart.guestCount} personas
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Package */}
                {packageItem && (
                  <div className="magic-card p-5">
                    <h3 className="font-heading font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-enchant-500" />
                      Paquete
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-heading font-bold text-slate-800">
                          {packageItem.name}
                        </p>
                        <p className="text-sm text-slate-500 font-body">Paquete base</p>
                      </div>
                      <span className="font-heading text-lg font-bold text-enchant-600">
                        {formatCurrency(packageItem.price)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Addons */}
                {addonItems.length > 0 && (
                  <div className="magic-card p-5">
                    <h3 className="font-heading font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Puzzle className="w-5 h-5 text-magic-500" />
                      Extras ({addonItems.length})
                    </h3>
                    <div>
                      {addonItems.map((item) => (
                        <CartItem
                          key={item.itemId}
                          item={item}
                          onUpdateQuantity={updateItem}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <Link
                    to="/reservar"
                    className="inline-flex items-center gap-2 text-enchant-600 hover:text-enchant-700 font-heading font-semibold text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Seguir reservando
                  </Link>
                </div>
              </div>

              <div>
                <CartSummary
                  packageTotal={packageTotal}
                  addonsTotal={addonsTotal}
                  subtotal={subtotal}
                  itemCount={itemCount}
                />
              </div>
            </div>
          )}
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
