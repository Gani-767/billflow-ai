import type { Invoice, InvoiceFilters } from "@/types/invoice";

export function filterInvoices(invoices: Invoice[], filters: InvoiceFilters): Invoice[] {
  let result = [...invoices];

  if (filters.status !== "all") {
    result = result.filter((inv) => inv.status === filters.status);
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (inv) =>
        inv.client_name.toLowerCase().includes(q) ||
        inv.invoice_number.toLowerCase().includes(q) ||
        (inv.client_email?.toLowerCase().includes(q) ?? false) ||
        (inv.description?.toLowerCase().includes(q) ?? false),
    );
  }

  switch (filters.sort) {
    case "oldest":
      result.sort((a, b) => new Date(a.issued_at).getTime() - new Date(b.issued_at).getTime());
      break;
    case "amount_high":
      result.sort((a, b) => b.amount - a.amount);
      break;
    case "amount_low":
      result.sort((a, b) => a.amount - b.amount);
      break;
    default:
      result.sort((a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime());
  }

  return result;
}
