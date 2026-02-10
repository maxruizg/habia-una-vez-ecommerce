import { redirect } from "react-router";
import type { Route } from "./+types/checkout";
import { getCart, getCartTotal, clearCart } from "~/lib/cart.server";
import { createBooking } from "~/lib/data.server";
import { validateForm, checkoutSchema } from "~/lib/validators";
import { generateBookingNumber } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { CheckoutForm } from "~/components/checkout/CheckoutForm";
import { useNavigation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Checkout | Habia una vez" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);
  if (cart.items.length === 0) {
    throw redirect("/carrito");
  }
  const { subtotal, itemCount } = getCartTotal(cart);
  return { cart, subtotal, itemCount };
}

export async function action({ request }: Route.ActionArgs) {
  const cart = await getCart(request);
  if (cart.items.length === 0) {
    throw redirect("/carrito");
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = validateForm(checkoutSchema, data);
  if (!result.success) {
    return { errors: result.errors };
  }

  const { subtotal } = getCartTotal(cart);
  const bookingNumber = generateBookingNumber();
  const packageItem = cart.items.find((i) => i.type === "package");

  createBooking({
    bookingNumber,
    customerName: result.data.name,
    customerEmail: result.data.email,
    customerPhone: result.data.phone,
    packageId: packageItem?.itemId || "",
    eventDate: cart.eventDate || "",
    guestCount: cart.guestCount || 0,
    addons: cart.items
      .filter((i) => i.type === "addon")
      .map((i) => ({ addonId: i.itemId, quantity: i.quantity })),
    subtotal,
    status: "pendiente",
    notes: result.data.notes,
    createdAt: new Date().toISOString(),
  });

  const cookie = await clearCart(request);

  return redirect(`/confirmacion/${bookingNumber}`, {
    headers: { "Set-Cookie": cookie },
  });
}

export default function Checkout({ loaderData, actionData }: Route.ComponentProps) {
  const { cart, subtotal, itemCount } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Navbar cartItemCount={itemCount} />
      <main className="pt-24 pb-16 min-h-screen">
        <PageContainer narrow>
          <h1 className="font-display text-3xl font-bold text-slate-800 mb-8">Checkout</h1>
          <CheckoutForm
            cart={cart}
            subtotal={subtotal}
            errors={actionData?.errors}
            isSubmitting={isSubmitting}
          />
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
