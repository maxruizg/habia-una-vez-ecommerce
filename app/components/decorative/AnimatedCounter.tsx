import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  format?: "currency" | "number";
  duration?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatAsCurrency(n: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function AnimatedCounter({
  value,
  format = "number",
  duration = 1500,
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(
    format === "currency" ? formatAsCurrency(0) : "0"
  );
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.round(easedProgress * value);

            setDisplay(
              format === "currency"
                ? formatAsCurrency(current)
                : current.toLocaleString("es-MX")
            );

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, format, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
