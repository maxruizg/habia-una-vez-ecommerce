import { createCookieSessionStorage } from "react-router";

export interface CartItem {
  type: "package" | "addon";
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  eventDate?: string;
  guestCount?: number;
}

const cartSessionSecret = process.env.SESSION_SECRET || "default-dev-secret-change-in-production";

const cartStorage = createCookieSessionStorage({
  cookie: {
    name: "__huv_cart",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secrets: [cartSessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getCartSession(request: Request) {
  return cartStorage.getSession(request.headers.get("Cookie"));
}

export async function getCart(request: Request): Promise<Cart> {
  const session = await getCartSession(request);
  const cart = session.get("cart") as Cart | undefined;
  return cart || { items: [] };
}

export async function setCart(request: Request, cart: Cart) {
  const session = await getCartSession(request);
  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function addToCart(request: Request, item: CartItem, eventDate?: string, guestCount?: number) {
  const session = await getCartSession(request);
  const cart = (session.get("cart") as Cart) || { items: [] };

  if (item.type === "package") {
    cart.items = cart.items.filter((i) => i.type !== "package");
  }

  const existingIndex = cart.items.findIndex(
    (i) => i.itemId === item.itemId && i.type === item.type
  );

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  if (eventDate) cart.eventDate = eventDate;
  if (guestCount) cart.guestCount = guestCount;

  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function updateCartItem(
  request: Request,
  itemId: string,
  quantity: number
) {
  const session = await getCartSession(request);
  const cart = (session.get("cart") as Cart) || { items: [] };

  const index = cart.items.findIndex((i) => i.itemId === itemId);

  if (index >= 0) {
    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }
  }

  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function removeFromCart(request: Request, itemId: string) {
  return updateCartItem(request, itemId, 0);
}

export async function setCartItems(
  request: Request,
  items: CartItem[],
  eventDate?: string,
  guestCount?: number
) {
  const session = await getCartSession(request);
  const cart: Cart = { items, eventDate, guestCount };
  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function clearCart(request: Request) {
  const session = await getCartSession(request);
  session.set("cart", { items: [] });
  return cartStorage.commitSession(session);
}

export function getCartTotal(cart: Cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, itemCount };
}
