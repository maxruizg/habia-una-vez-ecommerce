import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("reservar", "routes/reservar.tsx"),
  route("carrito", "routes/carrito.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("confirmacion/:bookingNumber", "routes/confirmacion.$bookingNumber.tsx"),
  route("api/cart", "routes/api.cart.ts"),

  // Admin
  route("admin/login", "routes/admin.login.tsx"),
  layout("routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    route("admin/calendario", "routes/admin.calendario.tsx"),
    route("admin/reservas", "routes/admin.reservas._index.tsx"),
    route("admin/reservas/:id", "routes/admin.reservas.$id.tsx"),
    route("admin/paquetes", "routes/admin.paquetes._index.tsx"),
    route("admin/paquetes/:id", "routes/admin.paquetes.$id.tsx"),
    route("admin/addons", "routes/admin.addons._index.tsx"),
    route("admin/configuracion", "routes/admin.configuracion.tsx"),
  ]),
] satisfies RouteConfig;
