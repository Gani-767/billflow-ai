import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog";
import { InvoiceTable } from "@/components/invoices/invoice-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Reveal } from "@/components/motion/reveal";
import { useAuth } from "@/contexts/auth-context";
import { useInvoices } from "@/hooks/use-invoices";
import { requireAuth } from "@/lib/auth-guard";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/dashboard/invoices")({
  validateSearch: (search: Record<string, unknown>) => ({
    create: search.create === true || search.create === "true",
  }),
  beforeLoad: requireAuth,
  component: InvoicesPage,
  head: () => ({
    meta: [{ title: "Invoices — BillFlow AI" }],
  }),
});

function InvoicesPage() {
  const navigate = useNavigate();
  const { create } = Route.useSearch();
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: invoices = [], isLoading, isError, error } = useInvoices();
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (create) setCreateOpen(true);
  }, [create]);

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/login" });
  }

  const totalOutstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <DashboardShell userEmail={user.email} onSignOut={handleSignOut}>
      <div className="space-y-8 sm:space-y-10">
        <Reveal>
          <div className="content-stack max-w-xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <FileText className="h-3.5 w-3.5" />
              Invoice management
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Invoices</h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Search, filter, and update every invoice from one place.
              {totalOutstanding > 0 && (
                <span className="mt-1 block font-medium text-foreground">
                  {formatCurrency(totalOutstanding)} outstanding
                </span>
              )}
            </p>
          </div>
        </Reveal>

        {isError && (
          <div className="rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error instanceof Error ? error.message : "Could not load invoices."}
            <p className="mt-2 text-xs opacity-90">
              Run <code className="rounded bg-destructive/10 px-1">supabase/schema.sql</code> in your
              Supabase SQL editor.
            </p>
          </div>
        )}

        <Reveal delay={80}>
          <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-soft backdrop-blur-sm sm:p-6">
            <InvoiceTable invoices={invoices} isLoading={isLoading} />
          </div>
        </Reveal>
      </div>

      <CreateInvoiceDialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open && create) {
            navigate({ to: "/dashboard/invoices", search: {}, replace: true });
          }
        }}
      />
    </DashboardShell>
  );
}
