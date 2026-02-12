import { useScroll, useTransform, motion } from "motion/react";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
      <motion.div
        className="h-full"
        style={{
          width,
          background:
            "linear-gradient(90deg, var(--color-enchant-500), var(--color-fairy-500), var(--color-magic-500), var(--color-gold-500))",
        }}
      />
    </div>
  );
}
