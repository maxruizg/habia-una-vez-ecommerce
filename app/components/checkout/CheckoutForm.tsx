import { Form } from "react-router";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";
import { formatCurrency, formatDate } from "~/lib/utils";
import { CreditCard, CalendarDays, Package, Puzzle } from "lucide-react";
import type { Cart } from "~/lib/cart.server";

interface CheckoutFormProps {
  cart: Cart;
  subtotal: number;
  errors?: Record<string, string>;
  isSubmitting?: boolean;
}

export function CheckoutForm({ cart, subtotal, errors, isSubmitting }: CheckoutFormProps) {
  const packageItem = cart.items.find((i) => i.type === "package");
  const addonItems = cart.items.filter((i) => i.type === "addon");

  return (
    <Form method="post" className="space-y-8">
      {/* Contact info */}
      <div className="magic-card p-6">
        <h3 className="font-heading text-lg font-bold text-slate-800 mb-4">Datos de contacto</h3>
        <div className="space-y-4">
          <Input
            label="Nombre completo"
            name="name"
            placeholder="Tu nombre"
            error={errors?.name}
            required
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              error={errors?.email}
              required
            />
            <Input
              label="Telefono"
              name="phone"
              type="tel"
              placeholder="55 1234 5678"
              error={errors?.phone}
              required
            />
          </div>
        </div>
      </div>

      {/* Event summary */}
      <div className="magic-card p-6">
        <h3 className="font-heading text-lg font-bold text-slate-800 mb-4">Resumen del evento</h3>

        {cart.eventDate && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-enchant-50 rounded-xl">
            <CalendarDays className="w-5 h-5 text-enchant-600" />
            <div>
              <p className="text-sm text-slate-600">Fecha del evento</p>
              <p className="font-heading font-bold text-slate-800">{formatDate(cart.eventDate)}</p>
            </div>
          </div>
        )}

        {packageItem && (
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-enchant-500" />
              <span className="font-body text-slate-700">{packageItem.name}</span>
            </div>
            <span className="font-heading font-bold text-slate-800">
              {formatCurrency(packageItem.price)}
            </span>
          </div>
        )}

        {addonItems.map((item) => (
          <div key={item.itemId} className="flex items-center justify-between py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Puzzle className="w-5 h-5 text-magic-500" />
              <span className="font-body text-slate-700">
                {item.name} {item.quantity > 1 && `x${item.quantity}`}
              </span>
            </div>
            <span className="font-heading font-bold text-slate-800">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4">
          <span className="font-heading text-lg font-bold text-slate-800">Total</span>
          <span className="font-heading text-2xl font-bold text-enchant-600">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="magic-card p-6">
        <Textarea
          label="Notas especiales (opcional)"
          name="notes"
          placeholder="Alergias, tematica especifica, peticiones especiales..."
        />
      </div>

      {/* Submit */}
      <div className="text-center">
        <p className="text-sm text-slate-500 font-body mb-4">
          El pago se coordinara directamente. Nos pondremos en contacto contigo.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[250px]">
          <CreditCard className="w-5 h-5" />
          {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
        </Button>
      </div>
    </Form>
  );
}
