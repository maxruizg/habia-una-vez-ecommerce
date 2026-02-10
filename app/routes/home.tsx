import type { Route } from "./+types/home";
import { packages, characters, menuItems, siteSettings } from "~/lib/data";
import { getCart, getCartTotal } from "~/lib/cart.server";
import { validateForm, contactSchema } from "~/lib/validators";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Hero } from "~/components/home/Hero";
import { Packages } from "~/components/home/Packages";
import { Characters } from "~/components/home/Characters";
import { MenuSection } from "~/components/home/MenuSection";
import { Gallery } from "~/components/home/Gallery";
import { CalendarCTA } from "~/components/home/CalendarCTA";
import { Contact } from "~/components/home/Contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Habia una vez | Salon de Eventos Infantiles" },
    {
      name: "description",
      content:
        "Salon de eventos infantiles en Jardines del Pedregal, CDMX. Fiestas magicas con personajes, decoracion tematica y paquetes todo incluido.",
    },
    { property: "og:title", content: "Habia una vez | Salon de Eventos Infantiles" },
    { property: "og:type", content: "website" },
    { name: "geo.region", content: "MX-CMX" },
    { name: "geo.placename", content: "Ciudad de Mexico" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getCart(request);
  const { itemCount } = getCartTotal(cart);
  return {
    packages,
    characters,
    menuItems,
    siteSettings,
    cartItemCount: itemCount,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "contact") {
    const data = Object.fromEntries(formData);
    const result = validateForm(contactSchema, data);
    if (!result.success) {
      return { errors: result.errors, success: false };
    }
    // TODO: Send email / save to DB
    return { errors: undefined, success: true };
  }

  return { errors: undefined, success: false };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { packages, characters, menuItems, siteSettings, cartItemCount } = loaderData;

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main>
        <Hero />
        <Packages packages={packages} />
        <Characters characters={characters} />
        <MenuSection menuItems={menuItems} />
        <Gallery />
        <CalendarCTA />
        <Contact
          settings={siteSettings}
          errors={actionData?.errors}
          success={actionData?.success}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
