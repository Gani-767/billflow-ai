import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  FileText,
  Bell,
  Shield,
  Sparkles,
  MessageCircle,
  Zap,
  BarChart3,
  Check,
} from "lucide-react";
import { ChatMockup } from "@/components/ChatMockup";
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
        content: "Type ‘Invoice Ravi ₹5000 Logo’ — done. Invoices, PDFs and reminders, automated.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogosStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            BillFlow<span className="text-primary">.ai</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#how" className="hover:text-foreground transition">
            How it works
          </a>
          <a href="#pricing" className="hover:text-foreground transition">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition"
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-hero">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            New · GPT-powered invoice parsing
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Invoices on <span className="text-gradient">WhatsApp.</span>
            <br />
            Done in 10 seconds.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Send a quick message like{" "}
            <em className="text-foreground not-italic">“Invoice Ravi ₹5000 logo design”</em> —
            BillFlow AI creates the invoice, generates a PDF, sends it to your client, and reminds
            them to pay.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition"
            >
              Start free — no card needed <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
            >
              <MessageCircle className="h-4 w-4 text-primary" /> See it in action
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> Free for 14 days
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> GST-ready
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> Cancel anytime
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const items = ["Local Studio", "Chai & Co.", "PixelKart", "Repair Hub", "Lensman", "Verde Cafe"];
  return (
    <div className="border-y border-border/60 bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          Trusted by 2,400+ small businesses across India
        </p>
        <div className="mt-4 grid grid-cols-3 gap-6 md:grid-cols-6 opacity-70">
          {items.map((n) => (
            <div
              key={n}
              className="text-center font-display text-sm font-semibold text-foreground/70"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: Bot,
      title: "AI understands you",
      body: "Type naturally in English or Hinglish. BillFlow extracts client, amount, and service automatically.",
    },
    {
      icon: FileText,
      title: "Beautiful PDFs",
      body: "Branded, GST-ready invoice PDFs generated in seconds — sent back to your chat.",
    },
    {
      icon: Bell,
      title: "Auto reminders",
      body: "Polite payment nudges fire on day 3, 7 and 14. You stop chasing, clients still pay.",
    },
    {
      icon: BarChart3,
      title: "Dashboard",
      body: "Web dashboard tracks paid, pending and overdue. Filter by client or month in one tap.",
    },
    {
      icon: Zap,
      title: "10-second flow",
      body: "From message to PDF in under 10 seconds — even on a 2G connection.",
    },
    {
      icon: Shield,
      title: "Your data, safe",
      body: "Encrypted at rest, isolated per business. Export anytime as CSV or PDF bundle.",
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">Features</p>
        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Everything you need.
          <br />
          Nothing you don’t.
        </h2>
        <p className="mt-4 text-muted-foreground">
          A pocket-sized billing team that lives inside the app you already use 50 times a day.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Type a message",
      d: "Open WhatsApp and message BillFlow like you’d text a friend.",
    },
    {
      n: "02",
      t: "AI does the math",
      d: "Client, amount, service and tax are extracted in milliseconds.",
    },
    {
      n: "03",
      t: "PDF lands back",
      d: "A branded invoice PDF is generated and sent to your client.",
    },
    { n: "04", t: "Get paid faster", d: "Auto-reminders close the loop — no awkward follow-ups." },
  ];
  return (
    <section id="how" className="border-y border-border/60 bg-card/50">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-primary">How it works</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              From thought to paid invoice — in four taps.
            </h2>
          </div>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Try the demo flow <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-background p-6">
              <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      note: "for 14 days",
      features: ["Up to 10 invoices", "WhatsApp integration", "PDF generation", "Email support"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹499",
      note: "per month",
      features: [
        "Unlimited invoices",
        "Auto reminders",
        "Branded PDFs",
        "GST support",
        "Priority support",
      ],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "Business",
      price: "₹999",
      note: "per month",
      features: [
        "Everything in Pro",
        "Multi-user access",
        "Analytics dashboard",
        "Custom branding",
        "API access",
      ],
      cta: "Talk to us",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">Pricing</p>
        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Pay less than your chai budget.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Simple, transparent plans. Upgrade or cancel anytime.
        </p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl border p-7 ${p.highlight ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card shadow-soft"}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              {p.highlight && (
                <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  Most loved
                </span>
              )}
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tracking-tight">{p.price}</span>
              <span
                className={
                  p.highlight
                    ? "text-primary-foreground/80 text-sm"
                    : "text-muted-foreground text-sm"
                }
              >
                {p.note}
              </span>
            </div>
            <ul
              className={`mt-6 space-y-3 text-sm ${p.highlight ? "text-primary-foreground/90" : "text-foreground/80"}`}
            >
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check
                    className={`mt-0.5 h-4 w-4 ${p.highlight ? "text-primary-foreground" : "text-primary"}`}
                  />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ${p.highlight ? "bg-background text-foreground hover:opacity-90" : "bg-foreground text-background hover:opacity-90"}`}
            >
              {p.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-5 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Stop typing invoices. Start sending them.
          </h2>
          <p className="mt-4 text-primary-foreground/85">
            Join thousands of small businesses turning WhatsApp into their billing assistant. Setup
            in under 2 minutes.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="tel"
              placeholder="Your WhatsApp number"
              className="w-full rounded-full bg-background/95 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-background"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition"
            >
              Get my AI assistant <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-primary-foreground/70">
            No credit card. Free for 14 days. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="font-medium text-foreground">BillFlow AI</span>
          <span>· © {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-foreground transition">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
