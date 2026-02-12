import { useCallback } from "react";
import { cn } from "~/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "a";
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-enchant-500 text-white hover:bg-enchant-600 active:bg-enchant-700 shadow-md hover:shadow-lg magic-cursor",
  secondary:
    "bg-fairy-500 text-white hover:bg-fairy-600 active:bg-fairy-700 shadow-md hover:shadow-lg magic-cursor",
  outline:
    "border-2 border-enchant-500 text-enchant-600 hover:bg-enchant-50 active:bg-enchant-100",
  ghost:
    "text-enchant-600 hover:bg-enchant-50 active:bg-enchant-100",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

function createRipple(e: React.MouseEvent<HTMLElement>) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const span = document.createElement("span");
  span.className = "ripple-span";
  span.style.width = span.style.height = `${size}px`;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;

  button.appendChild(span);
  span.addEventListener("animationend", () => span.remove());
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  as = "button",
  href,
  onMouseDown,
  ...props
}: ButtonProps) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onMouseDown?.(e);
    },
    [onMouseDown]
  );

  const classes = cn(
    "btn-ripple inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-200 cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {children}
    </button>
  );
}
