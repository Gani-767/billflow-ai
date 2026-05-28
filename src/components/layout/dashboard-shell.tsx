import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  Users,
} from "lucide-react";

import { CreateInvoiceDialog } from "@/components/invoices/create-invoice-dialog";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  userEmail?: string | null;
  onSignOut: () => void;
};

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Invoices", icon: FileText, href: "/dashboard/invoices" },
  { label: "Clients", icon: Users, href: "/dashboard/invoices" },
  { label: "WhatsApp", icon: MessageSquare, href: "/dashboard" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

function NavLinks({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(pathname, item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            className,
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function DashboardShell({ children, userEmail, onSignOut }: DashboardShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-muted/30 lg:flex-row">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/80 bg-card/95 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center border-b border-border/60 px-5">
          <Logo linkTo="/dashboard" />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <NavLinks pathname={pathname} />
        </nav>
        <div className="border-t border-border/60 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-[100dvh] flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border/80 bg-background/90 px-4 backdrop-blur-xl sm:h-16 sm:px-5">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-lg lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[min(100vw-2rem,18rem)] flex-col gap-0 p-0">
              <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Logo linkTo="/dashboard" />
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} />
              </nav>
              <div className="border-t border-border/60 p-4">
                <p className="mb-3 truncate px-3 text-xs text-muted-foreground">{userEmail}</p>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onSignOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1 lg:hidden">
            <Logo linkTo="/dashboard" className="[&_span]:text-base" />
          </div>

          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            <p className="truncate text-sm font-medium text-foreground">{userEmail}</p>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button
              className="h-9 gap-1.5 rounded-lg px-3 shadow-soft sm:px-4"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New invoice</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden px-4 py-5 pb-24 sm:px-6 sm:py-6 lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>

        <nav
          className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-border/80 bg-background/95 px-2 py-2 backdrop-blur-xl safe-bottom lg:hidden"
          aria-label="Mobile navigation"
        >
          {[
            { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
            { label: "Invoices", icon: FileText, href: "/dashboard/invoices" },
            { label: "New", icon: Plus, action: () => setCreateOpen(true) },
            { label: "Alerts", icon: Bell, href: "/dashboard" },
          ].map((item) =>
            "action" in item ? (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium text-primary"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors",
                  isActive(pathname, item.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            ),
          )}
        </nav>
      </div>

      <CreateInvoiceDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
