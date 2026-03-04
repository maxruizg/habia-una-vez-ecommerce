import type { Route } from "./+types/terminos";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { SparkleParticles } from "~/components/decorative/SparkleParticles";
import {
  Wallet,
  ShieldCheck,
  Home,
  Truck,
  Clock,
  Camera,
  Accessibility,
  UserPlus,
  Sparkles,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terminos y Condiciones | Habia una vez" },
    { name: "description", content: "Terminos y condiciones del servicio de Habia una vez." },
  ];
}

const sections = [
  {
    title: "Reservacion & Pagos",
    icon: Wallet,
    items: [
      "Para bloquear fecha y horario se requiere un anticipo de $10,000 MXN.",
      "El evento debera estar liquidado en su totalidad 14 dias naturales antes de la fecha contratada.",
      "En caso de no recibir la liquidacion en el plazo establecido, la fecha podra liberarse automaticamente sin responsabilidad para el salon.",
      "Los anticipos no son reembolsables; sin embargo, podran aplicarse a un cambio de fecha sujeto a disponibilidad.",
    ],
  },
  {
    title: "Acceso y Seguridad",
    icon: ShieldCheck,
    items: [
      "Todos los ninos deberan permanecer supervisados por un adulto responsable durante toda su estancia.",
      "El salon esta disenado para el juego y la diversion; sin embargo, el uso de las instalaciones es responsabilidad de los padres o tutores.",
      "No esta permitido ingresar con objetos peligrosos, pirotecnia, sustancias inflamables ni juguetes que representen algun riesgo para los invitados.",
    ],
  },
  {
    title: "Cuidado de Instalaciones",
    icon: Home,
    items: [
      "Trabajamos todos los dias para que cada familia encuentre la magia en perfectas condiciones.",
      "Cualquier dano causado por mal uso, descuido o negligencia podra generar cargos adicionales de reparacion o reposicion.",
    ],
  },
  {
    title: "Alimentos y Proveedores Externos",
    icon: Truck,
    items: [
      "El ingreso de proveedores externos debera estar previamente autorizado por la administracion y genera un cargo adicional por proveedor.",
      "Cada proveedor es responsable de su equipo, montaje, operacion y desmontaje dentro de los horarios establecidos.",
    ],
  },
  {
    title: "Horarios",
    icon: Clock,
    items: [
      "El acceso para montaje, evento y desmontaje se permitira unicamente el dia del evento, considerando hasta 3 horas previas y 2 horas posteriores al horario contratado.",
      "El tiempo adicional tendra costo extra y estara sujeto a disponibilidad.",
    ],
  },
  {
    title: "Material Audiovisual",
    icon: Camera,
    items: [
      "Durante el evento podran capturarse fotografias o videos con fines promocionales y de difusion del salon.",
      "En caso de no autorizar el uso de este material, debera notificarse por escrito antes del evento.",
    ],
  },
  {
    title: "Accesibilidad",
    icon: Accessibility,
    items: [
      "Por el momento, el salon no cuenta con elevador.",
      "Te pedimos considerar esta informacion en caso de que asistan personas que utilicen silla de ruedas o tengan alguna discapacidad o movilidad reducida, para poder brindar orientacion previa y apoyo en el acceso.",
    ],
  },
  {
    title: "Personas Extra",
    icon: UserPlus,
    items: [
      "Si tienes mas de 125 invitados, el costo por persona extra es de $1,000.",
    ],
  },
  {
    title: "Espiritu del Lugar",
    icon: Sparkles,
    items: [
      "Este espacio fue creado para proteger lo mas valioso del mundo: los suenos de los ninos.",
      "Agradecemos tu apoyo para mantener un ambiente seguro, respetuoso y lleno de magia para todos.",
    ],
  },
];

function SectionCard({ title, icon: Icon, items }: (typeof sections)[number]) {
  return (
    <section className="magic-card overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-enchant-50 to-magic-50 border-b border-slate-100">
        <Icon className="w-5 h-5 text-enchant-600 shrink-0" />
        <h2 className="font-heading text-lg font-bold text-slate-800">{title}</h2>
      </div>
      <ul className="p-6 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-body">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-enchant-400 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Terminos() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        {/* Header */}
        <div className="relative py-12 bg-gradient-to-r from-enchant-500 to-magic-500 overflow-hidden mb-8">
          <SparkleParticles />
          <div className="relative z-10 text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Terminos y Condiciones
            </h1>
            <p className="font-body text-white/80">
              Informacion importante sobre nuestros servicios
            </p>
          </div>
        </div>

        <PageContainer narrow>
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className={section.items.length >= 3 ? "md:col-span-2" : ""}
              >
                <SectionCard {...section} />
              </div>
            ))}
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
