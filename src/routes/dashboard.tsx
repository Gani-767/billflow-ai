import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock,
  FileText,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { InvoiceTable } from "@/components/invoices/invoice-table";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Reveal } from "@/components/motion/reveal";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoiceStats, useInvoices } from "@/hooks/use-invoices";
import { requireAuth } from "@/lib/auth-guard";
import { formatCurrency, formatRelativeDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: requireAuth,
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — BillFlow AI" }],
  }),
});

function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: invoices = [], isLoading } = useInvoices();
  const { stats } = useInvoiceStats();

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/login" });
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const metrics = [
    {
      label: "Revenue collected",
      value: formatCurrency(stats.totalRevenue),
      change: `${stats.totalCount} total`,
      trend: "up" as const,
      icon: Wallet,
      hint: "Paid invoices",
    },
    {
      label: "Pending",
      value: String(stats.pendingCount),
      change: formatCurrency(stats.pendingAmount),
      trend: "neutral" as const,
      icon: Clock,
      hint: "Awaiting payment",
    },
    {
      label: "Overdue",
      value: String(stats.overdueCount),
      change: stats.overdueCount > 0 ? "Action needed" : "All clear",
      trend: stats.overdueCount > 0 ? ("down" as const) : ("up" as const),
      icon: TrendingUp,
      hint: "Past due date",
    },
    {
      label: "Invoices",
      value: String(stats.totalCount),
      change: "All statuses",
      trend: "up" as const,
      icon: FileText,
      hint: "In your workspace",
    },
  ];

  const recent = invoices.slice(0, 5);

  return (
    <DashboardShell userEmail={user.email} onSignOut={handleSignOut}>
      <div className="space-y-8 sm:space-y-10">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="content-stack max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Overview
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Good {getGreeting()},{" "}
                <span className="text-muted-foreground">{user.email?.split("@")[0]}</span>
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Your billing command center — revenue, pending payments, and recent activity.
              </p>
            </div>
            <Link to="/dashboard/invoices">
              <Button variant="outline" className="w-full rounded-lg gap-2 sm:w-auto">
                Manage invoices <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
          {metrics.map((m, index) => (
            <Reveal key={m.label} delay={index * 60} className="h-full">
              <Card className="card-hover h-full border-border/80 bg-card/80 shadow-soft backdrop-blur-sm">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2 sm:p-6">
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary sm:p-2">
                    <m.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span
                    className={cn(
                      "hidden items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline-flex",
                      m.trend === "up" && "bg-chart-3/15 text-chart-3",
                      m.trend === "down" && "bg-destructive/10 text-destructive",
                      m.trend === "neutral" && "bg-muted text-muted-foreground",
                    )}
                  >
                    {m.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                    {m.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
                    {m.change}
                  </span>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">{m.value}</p>
                  <p className="text-xs font-medium text-foreground/90 sm:text-sm">{m.label}</p>
                  <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{m.hint}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <Reveal className="order-2 h-full lg:order-1 lg:col-span-2" delay={80}>
            <Card className="border-border/80 bg-card/80 shadow-soft">
              <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="min-w-0">
                  <CardTitle className="font-display text-base sm:text-lg">Recent invoices</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Latest activity in your workspace
                  </CardDescription>
                </div>
                <Link to="/dashboard/invoices">
                  <Button variant="outline" size="sm" className="w-full rounded-lg sm:w-auto">
                    View all
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                {isLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : recent.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 py-12 text-center">
                    <p className="text-sm text-muted-foreground">No invoices yet.</p>
                    <Link to="/dashboard/invoices" search={{ create: true }}>
                      <Button className="mt-4 rounded-lg">Create first invoice</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 md:hidden">
                      {recent.map((inv) => (
                        <div
                          key={inv.id}
                          className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium">{inv.client_name}</p>
                            <p className="text-xs text-muted-foreground">{inv.invoice_number}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatCurrency(inv.amount, inv.currency)}
                            </p>
                            <InvoiceStatusBadge status={inv.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="hidden md:block">
                      <InvoiceTable invoices={recent} compact />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="order-1 h-full lg:order-2" delay={160}>
            <Card className="h-full border-border/80 bg-gradient-primary text-primary-foreground shadow-glow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-display text-base text-primary-foreground sm:text-lg">
                  Quick actions
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Get started in under 2 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
                <Link to="/dashboard/invoices" search={{ create: true }} className="block">
                  <Button
                    variant="secondary"
                    className="h-11 w-full rounded-lg bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                  >
                    + New invoice
                  </Button>
                </Link>
                <Link to="/dashboard/invoices" className="block">
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-lg border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Browse all invoices
                  </Button>
                </Link>
                {recent[0] && (
                  <div className="mt-4 rounded-xl bg-primary-foreground/10 p-4">
                    <p className="text-xs text-primary-foreground/70">Latest</p>
                    <p className="mt-1 font-semibold">{recent[0].client_name}</p>
                    <p className="text-sm text-primary-foreground/85">
                      {formatCurrency(recent[0].amount)} · {formatRelativeDate(recent[0].issued_at)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </DashboardShell>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
