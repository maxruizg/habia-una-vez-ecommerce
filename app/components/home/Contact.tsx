import { useState } from "react";
import { Phone, MapPin, MessageCircle } from "lucide-react";
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
}

export function Contact({ settings }: ContactProps) {
  const sectionRef = useScrollAnimation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const lines = [];
    if (name) lines.push(`Hola, soy *${name}*.`);
    if (message) lines.push(message);
    if (!lines.length) lines.push("Hola, me gustaria obtener mas informacion sobre sus eventos.");
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-br from-fairy-50 via-cream-50 to-magic-50"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4 heading-hover-gradient">
            Contacto
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos para ayudarte a crear el evento perfecto
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info */}
          <div className="scroll-fade-left">
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
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 magic-card hover:border-enchant-400"
              >
                <div className="w-12 h-12 rounded-xl bg-fairy-100 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-fairy-600" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-slate-800">Escribenos</p>
                  <p className="text-slate-600 text-sm">Enviar mensaje por WhatsApp</p>
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

          {/* WhatsApp form */}
          <div className="scroll-fade-right">
            <form onSubmit={handleWhatsApp} className="magic-card p-8 space-y-5">
              <Input
                label="Nombre"
                name="name"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                label="Mensaje"
                name="message"
                placeholder="Cuentanos sobre tu evento..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" className="w-full">
                <MessageCircle className="w-4 h-4" />
                Enviar por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
