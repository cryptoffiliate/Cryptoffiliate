"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/compare", label: "Compare" },
  { href: "/reviews", label: "Reviews" },
  { href: "/bonuses", label: "Bonuses" },
  { href: "/tools/fee-calculator", label: "Fee calculator" },
  { href: "/tools/fee-breakdown", label: "Hidden fees" },
  { href: "/quiz", label: "Find my exchange" },
  { href: "/alerts", label: "🔔 Bonus alerts" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight"
        >
          <span className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-xs font-black">
            CA
          </span>
          <span>
            crypto<span className="text-brand-500">ffiliate</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                pathname?.startsWith(href)
                  ? "bg-brand-50 text-brand-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/compare"
          className="btn-primary text-xs hidden sm:inline-flex"
        >
          Compare exchanges →
        </Link>
      </div>
    </header>
  );
}
