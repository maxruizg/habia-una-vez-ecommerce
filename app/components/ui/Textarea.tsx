import { cn } from "~/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-heading font-semibold text-slate-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-body text-slate-800",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-enchant-400 focus:border-enchant-400",
          "transition-all duration-200 min-h-[100px] resize-y",
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
