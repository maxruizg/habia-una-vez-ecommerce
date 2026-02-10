import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Email invalido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
});

export const bookingSchema = z.object({
  packageId: z.string().min(1, "Selecciona un paquete"),
  eventDate: z.string().min(1, "La fecha es requerida"),
  guestCount: z.coerce.number().positive("Ingresa el numero de invitados"),
});

export const customerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email invalido"),
  phone: z.string().min(10, "Telefono invalido"),
});

export const checkoutSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email invalido"),
  phone: z.string().min(10, "Telefono invalido"),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email invalido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export const blockDateSchema = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  reason: z.string().optional(),
});

export function validateForm<I, O>(schema: z.ZodType<O, I>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) {
        errors[key] = issue.message;
      }
    }
    return { success: false as const, errors, data: undefined };
  }
  return { success: true as const, errors: undefined, data: result.data };
}
