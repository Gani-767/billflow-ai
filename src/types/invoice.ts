export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export type Invoice = {
  id: string;
  user_id: string;
  invoice_number: string;
  client_name: string;
  client_email: string | null;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  description: string | null;
  due_date: string | null;
  issued_at: string;
  created_at: string;
  updated_at: string;
};

export type CreateInvoiceInput = {
  client_name: string;
  client_email?: string;
  amount: number;
  description?: string;
  status?: InvoiceStatus;
  due_date?: string;
};

export type InvoiceFilters = {
  search: string;
  status: InvoiceStatus | "all";
  sort: "newest" | "oldest" | "amount_high" | "amount_low";
};
