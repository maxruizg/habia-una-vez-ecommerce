import { useScrollAnimation } from "~/hooks/useScrollAnimation";

interface WaveDividerProps {
  color?: string;
  variant?: "wave" | "hill" | "torn-paper";
  className?: string;
}

const paths: Record<string, string> = {
  wave: "M0,64 C150,96 350,0 500,64 C650,128 850,32 1000,64 L1000,128 L0,128 Z",
  hill: "M0,96 Q250,0 500,64 Q750,128 1000,96 L1000,128 L0,128 Z",
  "torn-paper":
    "M0,80 L50,72 L100,88 L150,68 L200,84 L250,76 L300,92 L350,70 L400,86 L450,74 L500,90 L550,72 L600,88 L650,76 L700,84 L750,70 L800,92 L850,78 L900,86 L950,74 L1000,82 L1000,128 L0,128 Z",
};

export function WaveDivider({
  color = "var(--color-cream-50)",
  variant = "wave",
  className = "",
}: WaveDividerProps) {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`scroll-wave-reveal w-full h-12 md:h-16 -mb-px relative ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 128"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
