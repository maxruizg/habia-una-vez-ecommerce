import { useFetcher } from "react-router";

export function useCart() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  function addItem(data: {
    itemId: string;
    type: "package" | "addon";
    name: string;
    price: number;
    quantity?: number;
    eventDate?: string;
    guestCount?: number;
  }) {
    fetcher.submit(
      {
        intent: "add",
        itemId: data.itemId,
        type: data.type,
        name: data.name,
        price: String(data.price),
        quantity: String(data.quantity || 1),
        ...(data.eventDate ? { eventDate: data.eventDate } : {}),
        ...(data.guestCount ? { guestCount: String(data.guestCount) } : {}),
      },
      { method: "POST", action: "/api/cart" }
    );
  }

  function addBooking(data: {
    items: { type: "package" | "addon"; itemId: string; name: string; price: number; quantity: number }[];
    eventDate?: string;
    guestCount?: number;
  }) {
    fetcher.submit(
      {
        intent: "add-booking",
        items: JSON.stringify(data.items),
        ...(data.eventDate ? { eventDate: data.eventDate } : {}),
        ...(data.guestCount ? { guestCount: String(data.guestCount) } : {}),
      },
      { method: "POST", action: "/api/cart" }
    );
  }

  function updateItem(itemId: string, quantity: number) {
    fetcher.submit(
      { intent: "update", itemId, quantity: String(quantity) },
      { method: "POST", action: "/api/cart" }
    );
  }

  function removeItem(itemId: string) {
    fetcher.submit(
      { intent: "remove", itemId },
      { method: "POST", action: "/api/cart" }
    );
  }

  function clearAll() {
    fetcher.submit(
      { intent: "clear" },
      { method: "POST", action: "/api/cart" }
    );
  }

  return { addItem, addBooking, updateItem, removeItem, clearAll, isSubmitting };
}
