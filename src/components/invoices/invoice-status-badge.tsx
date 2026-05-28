import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/types/invoice";

const styles: Record<InvoiceStatus, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  sent: "bg-chart-2/15 text-chart-2 border-chart-2/20",
  paid: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  cancelled: "bg-foreground/5 text-muted-foreground border-border line-through",
};

const labels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
