import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  FileText,
} from "lucide-react";

import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteInvoice, useUpdateInvoiceStatus } from "@/hooks/use-invoices";
import { filterInvoices } from "@/lib/filter-invoices";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Invoice, InvoiceFilters, InvoiceStatus } from "@/types/invoice";

type InvoiceTableProps = {
  invoices: Invoice[];
  isLoading?: boolean;
  compact?: boolean;
};

const defaultFilters: InvoiceFilters = {
  search: "",
  status: "all",
  sort: "newest",
};

export function InvoiceTable({ invoices, isLoading, compact }: InvoiceTableProps) {
  const [filters, setFilters] = useState<InvoiceFilters>(defaultFilters);
  const updateStatus = useUpdateInvoiceStatus();
  const deleteInv = useDeleteInvoice();

  const filtered = useMemo(() => filterInvoices(invoices, filters), [invoices, filters]);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search client, invoice #, email…"
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              className="h-10 rounded-lg bg-background pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filters.status}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, status: v as InvoiceFilters["status"] }))
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[130px] rounded-lg sm:w-[140px]">
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.sort}
              onValueChange={(v) => setFilters((f) => ({ ...f, sort: v as InvoiceFilters["sort"] }))}
            >
              <SelectTrigger className="h-10 w-full min-w-[130px] rounded-lg sm:w-[150px]">
                <ArrowDownAZ className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="amount_high">Amount: high</SelectItem>
                <SelectItem value="amount_low">Amount: low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {filtered.length} of {invoices.length} invoice{invoices.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 px-6 py-14 text-center">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <p className="mt-4 font-medium text-foreground">No invoices found</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {invoices.length === 0
              ? "Create your first invoice or run the Supabase schema in supabase/schema.sql."
              : "Try adjusting your search or filters."}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filtered.map((inv) => (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                onStatusChange={(status) => updateStatus.mutate({ id: inv.id, status })}
                onDelete={() => deleteInv.mutate(inv.id)}
              />
            ))}
          </div>
          <div className="hidden overflow-hidden rounded-xl border border-border/80 md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium lg:px-6">Invoice</th>
                  <th className="px-4 py-3 font-medium lg:px-6">Client</th>
                  <th className="px-4 py-3 font-medium lg:px-6">Amount</th>
                  <th className="px-4 py-3 font-medium lg:px-6">Status</th>
                  <th className="px-4 py-3 font-medium lg:px-6">Issued</th>
                  <th className="px-4 py-3 lg:px-6" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-4 font-medium lg:px-6">{inv.invoice_number}</td>
                    <td className="px-4 py-4 lg:px-6">
                      <div className="font-medium">{inv.client_name}</div>
                      {inv.client_email && (
                        <div className="text-xs text-muted-foreground">{inv.client_email}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium lg:px-6">
                      {formatCurrency(inv.amount, inv.currency)}
                    </td>
                    <td className="px-4 py-4 lg:px-6">
                      <InvoiceStatusBadge status={inv.status} />
                    </td>
                    <td className="px-4 py-4 text-muted-foreground lg:px-6">
                      {formatDate(inv.issued_at)}
                    </td>
                    <td className="px-4 py-4 lg:px-6">
                      <InvoiceActions
                        invoice={inv}
                        onStatusChange={(status) => updateStatus.mutate({ id: inv.id, status })}
                        onDelete={() => deleteInv.mutate(inv.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function InvoiceActions({
  invoice,
  onStatusChange,
  onDelete,
}: {
  invoice: Invoice;
  onStatusChange: (status: InvoiceStatus) => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {invoice.status !== "sent" && (
          <DropdownMenuItem onClick={() => onStatusChange("sent")}>Mark as sent</DropdownMenuItem>
        )}
        {invoice.status !== "paid" && (
          <DropdownMenuItem onClick={() => onStatusChange("paid")}>Mark as paid</DropdownMenuItem>
        )}
        {invoice.status !== "overdue" && (
          <DropdownMenuItem onClick={() => onStatusChange("overdue")}>Mark overdue</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InvoiceCard({
  invoice,
  onStatusChange,
  onDelete,
}: {
  invoice: Invoice;
  onStatusChange: (status: InvoiceStatus) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium">{invoice.client_name}</p>
          <p className="text-xs text-muted-foreground">{invoice.invoice_number}</p>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-lg font-bold">
          {formatCurrency(invoice.amount, invoice.currency)}
        </span>
        <span className="text-xs text-muted-foreground">{formatDate(invoice.issued_at)}</span>
      </div>
      <div className="mt-3 flex justify-end">
        <InvoiceActions invoice={invoice} onStatusChange={onStatusChange} onDelete={onDelete} />
      </div>
    </div>
  );
}
