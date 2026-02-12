import { useScroll, useTransform, motion } from "motion/react";

const decorations = [
  { id: 0, size: 14, left: 5, top: 15, speed: 0.15, color: "var(--color-gold-400)", opacity: 0.25 },
  { id: 1, size: 10, left: 92, top: 25, speed: 0.25, color: "var(--color-enchant-300)", opacity: 0.2 },
  { id: 2, size: 18, left: 12, top: 45, speed: 0.1, color: "var(--color-fairy-300)", opacity: 0.15 },
  { id: 3, size: 8, left: 88, top: 55, speed: 0.3, color: "var(--color-gold-300)", opacity: 0.25 },
  { id: 4, size: 12, left: 3, top: 70, speed: 0.2, color: "var(--color-magic-300)", opacity: 0.2 },
  { id: 5, size: 16, left: 95, top: 80, speed: 0.12, color: "var(--color-enchant-200)", opacity: 0.2 },
  { id: 6, size: 6, left: 8, top: 90, speed: 0.35, color: "var(--color-fairy-200)", opacity: 0.3 },
  { id: 7, size: 20, left: 90, top: 10, speed: 0.08, color: "var(--color-gold-200)", opacity: 0.15 },
  { id: 8, size: 9, left: 15, top: 35, speed: 0.28, color: "var(--color-magic-200)", opacity: 0.2 },
  { id: 9, size: 11, left: 85, top: 65, speed: 0.18, color: "var(--color-enchant-300)", opacity: 0.18 },
];

function FloatingStar({ decoration }: { decoration: (typeof decorations)[number] }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -decoration.speed * 600]);

  return (
    <motion.svg
      style={{
        position: "fixed",
        left: `${decoration.left}%`,
        top: `${decoration.top}%`,
        width: decoration.size,
        height: decoration.size,
        opacity: decoration.opacity,
        y,
      }}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill={decoration.color}
      />
    </motion.svg>
  );
}

export function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block">
      {decorations.map((d) => (
        <FloatingStar key={d.id} decoration={d} />
      ))}
    </div>
  );
}
