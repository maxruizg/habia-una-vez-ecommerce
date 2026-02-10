import { useScrollAnimation } from "~/hooks/useScrollAnimation";
import { StorybookDivider } from "~/components/decorative/StorybookDivider";
import type { Character } from "~/lib/types";

interface CharactersProps {
  characters: Character[];
}

export function Characters({ characters }: CharactersProps) {
  const sectionRef = useScrollAnimation();

  return (
    <section id="personajes" className="py-20 bg-white" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-hidden">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Nuestros Personajes
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Conoce a los personajes magicos que haran de tu fiesta algo inolvidable
          </p>
          <StorybookDivider className="max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {characters.map((character) => (
            <div
              key={character.id}
              className="scroll-hidden magic-card p-6 text-center group"
            >
              {/* Placeholder avatar */}
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl text-white font-display font-bold">
                  {character.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800 mb-2">
                {character.name}
              </h3>
              <p className="text-sm text-slate-600 font-body leading-relaxed">
                {character.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
