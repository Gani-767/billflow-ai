import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  FileText,
  Bell,
  Shield,
  MessageCircle,
  Zap,
  BarChart3,
  Check,
  Star,
} from "lucide-react";
import { ChatMockup } from "@/components/ChatMockup";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/motion/section-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BillFlow AI — Create invoices in 10 seconds on WhatsApp" },
      {
        name: "description",
        content:
          "AI-powered invoice automation for small businesses. Send a WhatsApp message, get a professional invoice PDF, and auto-remind clients to pay.",
      },
      { property: "og:title", content: "BillFlow AI — Invoices on WhatsApp" },
      {
        property: "og:description",
        content: "Type ‘Invoice Ravi ₹5000 logo’ — done. Invoices, PDFs and reminders, automated.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <div className="saas-grid pointer-events-none fixed inset-0 opacity-40 sm:opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-mesh" />
      <MarketingNav />
      <Hero />
      <LogosStrip />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-hero">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-12 sm:gap-16 sm:px-5 sm:pb-24 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:pb-32 lg:pt-28">
        <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:text-left">
          <div
            className="hero-enter mx-auto inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary lg:mx-0"
            style={{ "--hero-delay": "0ms" } as React.CSSProperties}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate">AI invoice parsing · Now in beta</span>
          </div>
          <h1
            className="hero-enter mt-6 font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:mt-8 lg:text-6xl"
            style={{ "--hero-delay": "80ms" } as React.CSSProperties}
          >
            The billing OS for{" "}
            <span className="text-gradient">WhatsApp-first</span> businesses.
          </h1>
          <p
            className="hero-enter mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:mt-6"
            style={{ "--hero-delay": "160ms" } as React.CSSProperties}
          >
            Message{" "}
            <span className="inline-block max-w-full break-words rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground sm:text-sm">
              Invoice Ravi ₹5000 logo
            </span>{" "}
            — BillFlow creates the PDF, sends it to your client, and chases payment automatically.
          </p>
          <div
            className="hero-enter mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            style={{ "--hero-delay": "240ms" } as React.CSSProperties}
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full rounded-lg gap-2 shadow-glow transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:h-11 sm:w-auto sm:px-6"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-lg gap-2 bg-card/80 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:h-11 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-primary" /> Watch demo
              </Button>
            </a>
          </div>
          <div
            className="hero-enter mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-10 sm:mt-12 sm:gap-8"
            style={{ "--hero-delay": "320ms" } as React.CSSProperties}
          >
            {[
              { stat: "10s", label: "Avg. invoice time" },
              { stat: "2.4k+", label: "Businesses" },
              { stat: "98%", label: "Parse accuracy" },
            ].map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">{s.stat}</p>
                <p className="mt-1 text-[10px] leading-snug text-muted-foreground sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            className="hero-enter relative w-full max-w-[min(100%,340px)] sm:max-w-[360px] float-soft"
            style={{ "--hero-delay": "200ms" } as React.CSSProperties}
          >
            <div className="glow-pulse absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl" />
            <ChatMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const items = ["Local Studio", "Chai & Co.", "PixelKart", "Repair Hub", "Lensman", "Verde Cafe"];
  return (
    <Reveal as="section">
      <div className="border-y border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            Trusted by teams across India
          </p>
          <div className="mt-6 -mx-4 flex gap-8 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {items.map((n) => (
              <span
                key={n}
                className="shrink-0 font-display text-sm font-semibold text-foreground/35 whitespace-nowrap transition-colors duration-300 hover:text-foreground/60"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Features() {
  const items = [
    {
      icon: Bot,
      title: "Natural language AI",
      body: "English or Hinglish — client, amount, and line items extracted instantly.",
      span: "lg:col-span-2",
    },
    {
      icon: FileText,
      title: "Branded PDFs",
      body: "GST-ready invoices with your logo, sent back in chat.",
      span: "",
    },
    {
      icon: Bell,
      title: "Smart reminders",
      body: "Polite nudges on day 3, 7, and 14. You stop chasing.",
      span: "",
    },
    {
      icon: BarChart3,
      title: "Revenue dashboard",
      body: "Paid, pending, and overdue — filter by client or month.",
      span: "",
    },
    {
      icon: Zap,
      title: "10-second flow",
      body: "Message to PDF in under 10 seconds, even on 2G.",
      span: "lg:col-span-2",
    },
    {
      icon: Shield,
      title: "Enterprise-grade security",
      body: "Encrypted at rest, isolated per tenant. Export anytime.",
      span: "",
    },
  ];
  return (
    <section id="features" className="section-padding mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Platform"
        title="Everything to get paid faster."
        description="One workspace for invoicing, reminders, and revenue — built for how you already work."
      />
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body, span }, index) => (
          <Reveal key={title} delay={index * 70}>
            <div
              className={`card-hover group relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 shadow-soft backdrop-blur-sm sm:p-7 ${span}`}
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10" />
              <div className="relative content-stack">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Send a message", d: "Text BillFlow on WhatsApp like you'd message a teammate." },
    { n: "02", t: "AI structures it", d: "Client, amount, tax, and service lines parsed in milliseconds." },
    { n: "03", t: "PDF delivered", d: "Branded invoice generated and shared with your client." },
    { n: "04", t: "Get paid", d: "Automated reminders until the invoice is closed." },
  ];
  return (
    <section id="how" className="border-y border-border/60 bg-card/30">
      <div className="section-padding mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeader
            eyebrow="Workflow"
            title="Four steps. Zero spreadsheets."
            align="left"
            className="mb-0 lg:max-w-xl"
          />
          <Reveal delay={120}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Try it free <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {steps.map((s, index) => (
            <Reveal key={s.n} delay={index * 90}>
              <div className="card-hover h-full rounded-2xl border border-border/80 bg-background p-6 shadow-soft sm:p-7">
                <div className="font-display text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{s.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      text: "We stopped using Excel for invoices. BillFlow pays for itself in a week.",
      author: "Priya S.",
      role: "Studio owner, Bangalore",
    },
    {
      text: "Clients actually pay faster now. The reminders are polite but effective.",
      author: "Rahul M.",
      role: "Freelance designer",
    },
  ];
  return (
    <section className="section-padding mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Customers"
        title="Loved by founders and freelancers."
        description="Real stories from teams who replaced manual billing with WhatsApp automation."
      />
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {quotes.map((q, index) => (
          <Reveal key={q.author} delay={index * 100}>
            <div className="card-hover h-full rounded-2xl border border-border/80 bg-card/60 p-7 shadow-soft backdrop-blur-sm sm:p-9">
              <div className="flex gap-0.5 text-chart-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-foreground/90">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {q.author[0]}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{q.author}</p>
                  <p className="truncate text-xs text-muted-foreground">{q.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      note: "14-day trial",
      features: ["10 invoices / mo", "WhatsApp integration", "PDF generation", "Email support"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹499",
      note: "/ month",
      features: [
        "Unlimited invoices",
        "Auto reminders",
        "Custom branding",
        "GST support",
        "Priority support",
      ],
      cta: "Start Pro trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "₹999",
      note: "/ month",
      features: [
        "Everything in Pro",
        "Multi-user seats",
        "Analytics & API",
        "Dedicated onboarding",
        "SLA support",
      ],
      cta: "Contact sales",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="section-padding mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple plans. No surprises."
        description="Start free. Upgrade when you're ready to scale."
      />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
        {plans.map((p, index) => (
          <Reveal key={p.name} delay={index * 100}>
            <div
              className={`card-hover relative flex h-full flex-col rounded-2xl border p-7 transition sm:p-8 ${
                p.highlight
                  ? "border-primary bg-card shadow-glow lg:-mt-3 lg:mb-3 lg:py-11"
                  : "border-border/80 bg-card/60 shadow-soft"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="content-stack">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {p.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{p.note}</span>
                </div>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-foreground/85">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="mt-8 block">
                <Button
                  className={`h-11 w-full rounded-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${p.highlight ? "shadow-glow" : ""}`}
                  variant={p.highlight ? "default" : "outline"}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-4 pb-20 sm:px-5 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-primary p-8 shadow-glow sm:rounded-3xl sm:p-12 md:p-16">
          <div className="glow-pulse pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl sm:h-80 sm:w-80" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-chart-2/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center content-stack">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
              Ready to automate your invoicing?
            </h2>
            <p className="text-sm text-primary-foreground/85 sm:text-base">
              Join thousands of businesses billing through WhatsApp. Setup takes under 2 minutes.
            </p>
            <form className="mx-auto mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:mt-4">
              <input
                type="tel"
                placeholder="+91 WhatsApp number"
                className="h-12 min-h-[48px] flex-1 rounded-lg border-0 bg-primary-foreground/95 px-4 text-base text-foreground placeholder:text-muted-foreground outline-none transition-shadow duration-300 focus:ring-2 focus:ring-primary-foreground sm:h-11 sm:text-sm"
              />
              <Button
                type="button"
                className="h-12 min-h-[48px] rounded-lg bg-foreground px-6 text-base text-background transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:h-11 sm:text-sm"
              >
                Get started
              </Button>
            </form>
            <p className="text-[11px] text-primary-foreground/70 sm:text-xs">
              No credit card · 14-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30 safe-bottom">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-5 sm:py-12 sm:text-left">
        <Logo />
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors duration-200 hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors duration-200 hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors duration-200 hover:text-foreground">
            Contact
          </a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BillFlow AI</p>
      </div>
    </footer>
  );
}
