import { Badge } from "~/components/ui/Badge";
import type { Booking } from "~/lib/types";

const statusConfig: Record<Booking["status"], { label: string; variant: "success" | "gold" | "danger" | "enchant" }> = {
  pendiente: { label: "Pendiente", variant: "gold" },
  confirmada: { label: "Confirmada", variant: "success" },
  cancelada: { label: "Cancelada", variant: "danger" },
  completada: { label: "Completada", variant: "enchant" },
};

interface StatusBadgeProps {
  status: Booking["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
