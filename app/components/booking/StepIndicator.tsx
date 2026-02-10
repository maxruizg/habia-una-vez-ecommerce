import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all",
                  isCompleted && "bg-enchant-500 text-white",
                  isActive && "bg-enchant-500 text-white ring-4 ring-enchant-200",
                  !isActive && !isCompleted && "bg-slate-200 text-slate-500"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step}
              </div>
              <span
                className={cn(
                  "text-xs font-heading mt-1.5 hidden sm:block",
                  isActive ? "text-enchant-600 font-bold" : "text-slate-500"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-16 h-0.5 mb-5 sm:mb-0",
                  step < currentStep ? "bg-enchant-500" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
