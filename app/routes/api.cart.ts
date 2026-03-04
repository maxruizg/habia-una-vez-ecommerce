import type { Route } from "./+types/api.cart";
import { addToCart, updateCartItem, removeFromCart, clearCart, setCartItems } from "~/lib/cart.server";
import type { CartItem } from "~/lib/cart.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "add-booking": {
      const itemsJson = formData.get("items") as string;
      const eventDate = formData.get("eventDate") as string | undefined;
      const guestCount = formData.get("guestCount")
        ? Number(formData.get("guestCount"))
        : undefined;
      const childCount = formData.get("childCount")
        ? Number(formData.get("childCount"))
        : undefined;
      const adultCount = formData.get("adultCount")
        ? Number(formData.get("adultCount"))
        : undefined;
      const guestTier = formData.get("guestTier")
        ? (Number(formData.get("guestTier")) as import("~/lib/types").GuestTier)
        : undefined;
      const dayType = formData.get("dayType")
        ? (formData.get("dayType") as import("~/lib/types").DayType)
        : undefined;

      let selectedAdultMenu: string[] | undefined;
      try {
        const raw = formData.get("selectedAdultMenu");
        if (raw) selectedAdultMenu = JSON.parse(raw as string);
      } catch { /* ignore */ }

      let selectedKidsMenu: string[] | undefined;
      try {
        const raw = formData.get("selectedKidsMenu");
        if (raw) selectedKidsMenu = JSON.parse(raw as string);
      } catch { /* ignore */ }

      let items: CartItem[];
      try {
        items = JSON.parse(itemsJson);
      } catch {
        return new Response(JSON.stringify({ error: "Invalid items JSON" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const cookie = await setCartItems(
        request, items, eventDate || undefined, guestCount, childCount, adultCount,
        guestTier, dayType, selectedAdultMenu, selectedKidsMenu
      );
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      });
    }

    case "add": {
      const item = {
        type: (formData.get("type") as "package" | "addon") || "addon",
        itemId: formData.get("itemId") as string,
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity") || 1),
      };
      const eventDate = formData.get("eventDate") as string | undefined;
      const guestCount = formData.get("guestCount")
        ? Number(formData.get("guestCount"))
        : undefined;

      const cookie = await addToCart(request, item, eventDate || undefined, guestCount);
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      });
    }

    case "update": {
      const itemId = formData.get("itemId") as string;
      const quantity = Number(formData.get("quantity"));
      const cookie = await updateCartItem(request, itemId, quantity);
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      });
    }

    case "remove": {
      const itemId = formData.get("itemId") as string;
      const cookie = await removeFromCart(request, itemId);
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      });
    }

    case "clear": {
      const cookie = await clearCart(request);
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      });
    }

    default:
      return new Response(JSON.stringify({ error: "Invalid intent" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
  }
}
