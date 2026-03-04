import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("reservar", "routes/reservar.tsx"),
  route("carrito", "routes/carrito.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("confirmacion/:bookingNumber", "routes/confirmacion.$bookingNumber.tsx"),
  route("terminos", "routes/terminos.tsx"),
  route("api/cart", "routes/api.cart.ts"),

  // Admin
  route("admin/login", "routes/admin.login.tsx"),
  route("admin", "routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    route("calendario", "routes/admin.calendario.tsx"),
    route("reservas", "routes/admin.reservas._index.tsx"),
    route("reservas/:id", "routes/admin.reservas.$id.tsx"),
    route("paquetes", "routes/admin.paquetes._index.tsx"),
    route("paquetes/:id", "routes/admin.paquetes.$id.tsx"),
    route("addons", "routes/admin.addons._index.tsx"),
    route("configuracion", "routes/admin.configuracion.tsx"),
  ]),
] satisfies RouteConfig;
