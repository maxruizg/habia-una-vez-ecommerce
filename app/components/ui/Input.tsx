import { cn } from "~/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  compact?: boolean;
}

export function Input({
  label,
  error,
  compact,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className={cn("flex flex-col", compact ? "gap-1" : "gap-1.5")}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-heading font-semibold text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "rounded-xl border border-slate-300 bg-white px-4 font-body text-slate-800",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-enchant-400 focus:border-enchant-400",
          "transition-all duration-200",
          compact ? "py-2 text-sm" : "py-2.5 text-base",
          error && "border-danger-500 focus:ring-danger-400",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-danger-600 font-body">{error}</p>
      )}
    </div>
  );
}
