import type { Route } from "./+types/admin.configuracion";
import { siteSettings } from "~/lib/data";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { Save } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Configuracion | Admin" }];
}

export async function loader({}: Route.LoaderArgs) {
  return { settings: siteSettings };
}

export async function action({ request }: Route.ActionArgs) {
  // TODO: Save settings when DB is ready
  return { success: true, message: "Los cambios se guardaran cuando la base de datos este configurada." };
}

export default function AdminConfiguracion({ loaderData, actionData }: Route.ComponentProps) {
  const { settings } = loaderData;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-6">Configuracion</h1>

      {actionData?.success && (
        <div className="bg-gold-100 border border-gold-300 rounded-xl p-4 mb-6 text-sm text-gold-800 font-body">
          {actionData.message}
        </div>
      )}

      <form method="post" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 max-w-2xl">
        <h3 className="font-heading font-bold text-slate-800">Informacion General</h3>

        <Input label="Nombre del negocio" name="name" defaultValue={settings.name} />
        <Input label="Tagline" name="tagline" defaultValue={settings.tagline} />
        <Input label="Subtitulo" name="subtitle" defaultValue={settings.subtitle} />

        <h3 className="font-heading font-bold text-slate-800 pt-4">Contacto</h3>

        <Input label="Telefono" name="phone" defaultValue={settings.phone} />
        <Input label="WhatsApp" name="whatsapp" defaultValue={settings.whatsapp} />
        <Input label="Email" name="email" type="email" defaultValue={settings.email} />
        <Input label="Direccion" name="address" defaultValue={settings.address} />

        <h3 className="font-heading font-bold text-slate-800 pt-4">Redes Sociales</h3>

        <Input label="Instagram" name="instagram" defaultValue={settings.instagram} />
        <Input label="Facebook" name="facebook" defaultValue={settings.facebook} />

        <Button type="submit">
          <Save className="w-4 h-4" />
          Guardar cambios
        </Button>
      </form>
    </div>
  );
}
