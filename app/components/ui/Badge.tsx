import { cn } from "~/lib/utils";

type BadgeVariant = "enchant" | "fairy" | "magic" | "gold" | "lime" | "cobalt" | "orange" | "success" | "danger" | "slate";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  enchant: "bg-enchant-100 text-enchant-700 border-enchant-200",
  fairy: "bg-fairy-100 text-fairy-700 border-fairy-200",
  magic: "bg-magic-100 text-magic-700 border-magic-200",
  gold: "bg-gold-100 text-gold-700 border-gold-200",
  lime: "bg-lime-100 text-lime-700 border-lime-200",
  cobalt: "bg-cobalt-100 text-cobalt-700 border-cobalt-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  success: "bg-success-50 text-success-700 border-green-200",
  danger: "bg-danger-50 text-danger-700 border-red-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({ children, variant = "enchant", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
