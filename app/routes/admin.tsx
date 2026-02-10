import type { Route } from "./+types/admin";
import { requireAdmin } from "~/lib/auth.server";
import { AdminLayout } from "~/components/layout/AdminLayout";

export async function loader({ request }: Route.LoaderArgs) {
  const admin = await requireAdmin(request);
  return { admin };
}

export default function Admin() {
  return <AdminLayout />;
}
