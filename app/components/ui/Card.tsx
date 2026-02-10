import { cn } from "~/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className, hover = true, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "magic-card",
        paddingClasses[padding],
        !hover && "hover:transform-none hover:shadow-[0_4px_24px_rgba(20,184,166,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
