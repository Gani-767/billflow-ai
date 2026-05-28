import { getSupabaseClient } from "@/lib/supabase";
import type { CreateInvoiceInput, Invoice, InvoiceStatus } from "@/types/invoice";

function mapRow(row: Record<string, unknown>): Invoice {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    invoice_number: row.invoice_number as string,
    client_name: row.client_name as string,
    client_email: (row.client_email as string | null) ?? null,
    amount: Number(row.amount),
    currency: row.currency as string,
    status: row.status as InvoiceStatus,
    description: (row.description as string | null) ?? null,
    due_date: (row.due_date as string | null) ?? null,
    issued_at: row.issued_at as string,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function fetchInvoices(userId: string): Promise<Invoice[]> {
  const { data, error } = await getSupabaseClient()
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    if (error.code === "42P01" || error.message.includes("does not exist")) {
      return [];
    }
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRow);
}

async function nextInvoiceNumber(userId: string): Promise<string> {
  const { count, error } = await getSupabaseClient()
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  const n = (count ?? 0) + 1;
  return `INV-${String(n).padStart(4, "0")}`;
}

export async function createInvoice(userId: string, input: CreateInvoiceInput): Promise<Invoice> {
  const invoice_number = await nextInvoiceNumber(userId);

  const { data, error } = await getSupabaseClient()
    .from("invoices")
    .insert({
      user_id: userId,
      invoice_number,
      client_name: input.client_name,
      client_email: input.client_email ?? null,
      amount: input.amount,
      description: input.description ?? null,
      status: input.status ?? "draft",
      due_date: input.due_date ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
  const { data, error } = await getSupabaseClient()
    .from("invoices")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await getSupabaseClient().from("invoices").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export type InvoiceStats = {
  totalRevenue: number;
  pendingCount: number;
  overdueCount: number;
  totalCount: number;
  pendingAmount: number;
};

export function computeInvoiceStats(invoices: Invoice[]): InvoiceStats {
  const paid = invoices.filter((i) => i.status === "paid");
  const pending = invoices.filter((i) => i.status === "sent" || i.status === "draft");
  const overdue = invoices.filter((i) => i.status === "overdue");

  return {
    totalRevenue: paid.reduce((sum, i) => sum + i.amount, 0),
    pendingCount: pending.length,
    overdueCount: overdue.length,
    totalCount: invoices.length,
    pendingAmount: pending.reduce((sum, i) => sum + i.amount, 0),
  };
}
