import { cn } from "~/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  compact?: boolean;
}

export function Select({
  label,
  error,
  options,
  compact,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || props.name;

  return (
    <div className={cn("flex flex-col", compact ? "gap-1" : "gap-1.5")}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-heading font-semibold text-slate-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "rounded-xl border border-slate-300 bg-white px-4 font-body text-slate-800",
          "focus:outline-none focus:ring-2 focus:ring-enchant-400 focus:border-enchant-400",
          "transition-all duration-200",
          compact ? "py-2 text-sm" : "py-2.5 text-base",
          error && "border-danger-500 focus:ring-danger-400",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-danger-600 font-body">{error}</p>
      )}
    </div>
  );
}
