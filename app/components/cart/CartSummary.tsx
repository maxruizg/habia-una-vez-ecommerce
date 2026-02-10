import { Link } from "react-router";
import { formatCurrency } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  packageTotal: number;
  addonsTotal: number;
  subtotal: number;
  itemCount: number;
}

export function CartSummary({ packageTotal, addonsTotal, subtotal, itemCount }: CartSummaryProps) {
  return (
    <div className="magic-card p-6 sticky top-24">
      <h3 className="font-heading text-lg font-bold text-slate-800 mb-4">
        Resumen
      </h3>

      <div className="space-y-3 mb-6">
        {packageTotal > 0 && (
          <div className="flex justify-between text-sm font-body">
            <span className="text-slate-600">Paquete</span>
            <span className="text-slate-800 font-semibold">{formatCurrency(packageTotal)}</span>
          </div>
        )}
        {addonsTotal > 0 && (
          <div className="flex justify-between text-sm font-body">
            <span className="text-slate-600">Extras</span>
            <span className="text-slate-800 font-semibold">{formatCurrency(addonsTotal)}</span>
          </div>
        )}
        <div className="h-px bg-slate-200" />
        <div className="flex justify-between">
          <span className="font-heading font-bold text-slate-800">Total</span>
          <span className="font-heading text-xl font-bold text-enchant-600">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      <Link to="/checkout">
        <Button className="w-full">
          <ShoppingCart className="w-4 h-4" />
          Ir a Checkout
        </Button>
      </Link>
    </div>
  );
}
