import { useEffect, useRef, useState } from "react";

interface TextHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function TextHighlight({ children, className = "" }: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`text-highlight ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
