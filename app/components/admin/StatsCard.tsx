import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "enchant" | "fairy" | "magic" | "gold";
  subtitle?: string;
}

const colorClasses = {
  enchant: "bg-enchant-100 text-enchant-600",
  fairy: "bg-fairy-100 text-fairy-600",
  magic: "bg-magic-100 text-magic-600",
  gold: "bg-gold-100 text-gold-600",
};

export function StatsCard({ title, value, icon: Icon, color = "enchant", subtitle }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-heading text-slate-500">{title}</p>
          <p className="text-2xl font-heading font-bold text-slate-800 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 font-body mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
