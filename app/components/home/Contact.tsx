import { Form } from "react-router";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Button } from "~/components/ui/Button";

interface ContactProps {
  settings: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  errors?: Record<string, string>;
  success?: boolean;
}

export function Contact({ settings, errors, success }: ContactProps) {
  const sectionRef = useScrollAnimation();

  return (
    <section id="contacto" className="py-20 bg-cream-50" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Contacto
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos para ayudarte a crear el evento perfecto
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info */}
          <div className="scroll-hidden">
            <div className="space-y-6 mb-8">
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 magic-card hover:border-enchant-400"
              >
                <div className="w-12 h-12 rounded-xl bg-enchant-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-enchant-600" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-slate-800">WhatsApp</p>
                  <p className="text-slate-600 text-sm">{settings.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-4 p-4 magic-card hover:border-enchant-400"
              >
                <div className="w-12 h-12 rounded-xl bg-fairy-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-fairy-600" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-slate-800">Email</p>
                  <p className="text-slate-600 text-sm">{settings.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 magic-card">
                <div className="w-12 h-12 rounded-xl bg-magic-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-magic-600" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-slate-800">Direccion</p>
                  <p className="text-slate-600 text-sm">{settings.address}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[250px]">
              <iframe
                src={settings.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion de Habia una vez"
              />
            </div>
          </div>

          {/* Form */}
          <div className="scroll-hidden">
            {success ? (
              <div className="magic-card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-50 flex items-center justify-center">
                  <Send className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-800 mb-2">
                  Mensaje enviado
                </h3>
                <p className="text-slate-600 font-body">
                  Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <Form method="post" className="magic-card p-8 space-y-5">
                <input type="hidden" name="intent" value="contact" />
                <Input
                  label="Nombre"
                  name="name"
                  placeholder="Tu nombre completo"
                  error={errors?.name}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  error={errors?.email}
                  required
                />
                <Input
                  label="Telefono (opcional)"
                  name="phone"
                  type="tel"
                  placeholder="55 1234 5678"
                  error={errors?.phone}
                />
                <Textarea
                  label="Mensaje"
                  name="message"
                  placeholder="Cuentanos sobre tu evento..."
                  error={errors?.message}
                  required
                />
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
