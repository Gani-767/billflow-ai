import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/logo";
import { Reveal } from "@/components/motion/reveal";

type AuthFormShellProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer: ReactNode;
};

export function AuthFormShell({ children, title, subtitle, footer }: AuthFormShellProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <div className="saas-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-chart-2/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-lg flex-col px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/"
          className="mb-8 inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <Logo />
        </div>

        <Reveal className="flex flex-1 flex-col">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-glow backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
            <div className="p-6 sm:p-8">
              <div className="content-stack mb-6">
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </Reveal>
      </div>
    </div>
  );
}
