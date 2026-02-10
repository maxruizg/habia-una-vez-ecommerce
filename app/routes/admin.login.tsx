import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/admin.login";
import { login, createAdminSession, logout, getAdmin } from "~/lib/auth.server";
import { validateForm, loginSchema } from "~/lib/validators";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { Sparkles, LogIn } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Login | Habia una vez" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const admin = await getAdmin(request);
  if (admin) throw redirect("/admin");
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    return logout(request);
  }

  const data = Object.fromEntries(formData);
  const result = validateForm(loginSchema, data);

  if (!result.success) {
    return { errors: result.errors };
  }

  const admin = await login(result.data.email, result.data.password);
  if (!admin) {
    return { errors: { email: "Credenciales invalidas" } };
  }

  return createAdminSession(admin.id, request);
}

export default function AdminLogin({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-enchant-400 mx-auto mb-3" />
          <h1 className="font-display text-3xl font-bold text-white">Admin</h1>
          <p className="text-slate-400 font-body text-sm mt-1">Habia una vez</p>
        </div>

        <Form method="post" className="bg-white rounded-2xl shadow-2xl p-8 space-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="admin@habiaunavez.com"
            error={actionData?.errors?.email}
            required
          />
          <Input
            label="Contrasena"
            name="password"
            type="password"
            placeholder="********"
            error={actionData?.errors?.password}
            required
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <LogIn className="w-4 h-4" />
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
