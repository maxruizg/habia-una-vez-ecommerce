import { Link } from "react-router";
import type { Route } from "./+types/admin.paquetes.$id";
import { packages } from "~/lib/data";
import { formatCurrency } from "~/lib/utils";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Editar Paquete | Admin" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const pkg = packages.find((p) => p.id === params.id);
  if (!pkg) throw new Response("No encontrado", { status: 404 });
  return { package: pkg };
}

export async function action({ request, params }: Route.ActionArgs) {
  // TODO: Update package data when DB is ready
  return { success: true, message: "Los cambios se guardaran cuando la base de datos este configurada." };
}

export default function AdminPaqueteEdit({ loaderData, actionData }: Route.ComponentProps) {
  const { package: pkg } = loaderData;

  return (
    <div>
      <Link
        to="/admin/paquetes"
        className="inline-flex items-center gap-2 text-enchant-600 hover:text-enchant-700 font-heading font-semibold text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a paquetes
      </Link>

      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">
        Editar: {pkg.name}
      </h1>

      {actionData?.success && (
        <div className="bg-gold-100 border border-gold-300 rounded-xl p-4 mb-6 text-sm text-gold-800 font-body">
          {actionData.message}
        </div>
      )}

      <form method="post" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 max-w-2xl">
        <Input label="Nombre" name="name" defaultValue={pkg.name} />
        <Textarea label="Descripcion" name="description" defaultValue={pkg.description} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Precio" name="price" type="number" defaultValue={pkg.price} />
          <Input label="Duracion" name="duration" defaultValue={pkg.duration} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Min invitados" name="minGuests" type="number" defaultValue={pkg.minGuests} />
          <Input label="Max invitados" name="maxGuests" type="number" defaultValue={pkg.maxGuests} />
        </div>
        <Textarea
          label="Incluye (uno por linea)"
          name="includes"
          defaultValue={pkg.includes.join("\n")}
          className="min-h-[200px]"
        />
        <Button type="submit">
          <Save className="w-4 h-4" />
          Guardar cambios
        </Button>
      </form>
    </div>
  );
}
