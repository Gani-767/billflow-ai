import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 saas-nav border-b border-border/60 bg-background/80 backdrop-blur-xl transition-[background,box-shadow] duration-300 supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-5">
        <Logo className="min-w-0 shrink" />

        <nav
          className="hidden items-center gap-1 rounded-full border border-border/80 bg-card/60 p-1 text-sm md:flex"
          aria-label="Main"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-muted-foreground transition hover:bg-background hover:text-foreground lg:px-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="rounded-lg">
              Sign in
            </Button>
          </Link>
          <Link to="/signup" className="hidden min-[400px]:block">
            <Button size="sm" className="rounded-lg gap-1 shadow-soft">
              <span className="hidden sm:inline">Get started</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-lg md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[min(100vw-2rem,20rem)] flex-col gap-0 p-0">
              <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
                <SheetTitle className="font-display text-base">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile">
                {links.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto space-y-2 border-t border-border/60 p-4">
                <Link to="/login" onClick={() => setOpen(false)} className="block">
                  <Button variant="outline" className="h-11 w-full rounded-lg">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="block">
                  <Button className="h-11 w-full rounded-lg gap-2">
                    Get started free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
