import type { ReactNode } from "react";
import { Check, Sparkles } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/reveal";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

const perks = [
  "14-day free trial, no card required",
  "GST-ready invoices in seconds",
  "WhatsApp-native workflow",
];

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-x-hidden bg-background">
      <div className="saas-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-chart-2/15 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-6xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-border/60 bg-card/40 p-10 backdrop-blur-sm lg:flex">
          <Logo />
          <div className="max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for Indian small businesses
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
              Billing that feels as easy as a chat.
            </h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Turn WhatsApp messages into professional invoices, PDFs, and payment reminders —
              without spreadsheets or awkward follow-ups.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-foreground/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BillFlow AI. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>

          <ul className="mb-6 flex flex-col gap-2 rounded-xl border border-border/60 bg-card/50 p-4 lg:hidden">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                {perk}
              </li>
            ))}
          </ul>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 lg:hidden">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <Reveal>
            <div className="saas-panel rounded-2xl border border-border/80 bg-card/90 shadow-soft backdrop-blur-xl">
              <div className="hidden border-b border-border/60 px-5 py-5 sm:px-6 lg:block">
                <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="p-6 sm:p-7">{children}</div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
