import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  linkTo?: "/" | "/dashboard";
};

export function Logo({ className, linkTo = "/" }: LogoProps) {
  const content = (
    <>
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-soft ring-1 ring-white/20">
        <Sparkles className="h-4 w-4" />
      </div>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        BillFlow<span className="text-primary">.ai</span>
      </span>
    </>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={cn("flex items-center gap-2.5", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("flex items-center gap-2.5", className)}>{content}</div>;
}
