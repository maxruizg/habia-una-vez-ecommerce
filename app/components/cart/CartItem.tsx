import { Minus, Plus, Trash2, Package, Puzzle } from "lucide-react";
import { formatCurrency } from "~/lib/utils";
import type { CartItem as CartItemType } from "~/lib/cart.server";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const isPackage = item.type === "package";

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-enchant-100 to-magic-100 flex items-center justify-center shrink-0">
        {isPackage ? (
          <Package className="w-6 h-6 text-enchant-600" />
        ) : (
          <Puzzle className="w-6 h-6 text-magic-600" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-slate-800 truncate">{item.name}</h4>
        <p className="text-sm text-slate-500 font-body">
          {isPackage ? "Paquete" : "Extra"} &middot; {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {!isPackage && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-sm font-heading font-bold">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}

        <span className="font-heading font-bold text-slate-800 w-24 text-right">
          {formatCurrency(item.price * item.quantity)}
        </span>

        <button
          onClick={() => onRemove(item.itemId)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-danger-500 hover:bg-danger-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
