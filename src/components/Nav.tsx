"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/compare",              label: "Compare" },
  { href: "/reviews",              label: "Reviews" },
  { href: "/bonuses",              label: "Bonuses" },
  { href: "/tools/fee-breakdown",  label: "Hidden fees" },
  { href: "/quiz",                 label: "Find my exchange" },
];

const TICKER_ITEMS = [
  { label: "BTC", value: "$107,240", change: "+2.4%", up: true },
  { label: "ETH", value: "$3,841",   change: "+1.8%", up: true },
  { label: "SOL", value: "$188",     change: "+3.1%", up: true },
  { label: "BNB MAKER", value: "0.10%", change: "", up: true },
  { label: "OKX MAKER", value: "0.08%", change: "", up: true },
  { label: "KRAKEN MAKER", value: "0.16%", change: "", up: true },
  { label: "COINBASE TAKER", value: "0.60%", change: "", up: false },
  { label: "BYBIT MAKER", value: "0.10%", change: "", up: true },
];

const all = [...TICKER_ITEMS, ...TICKER_ITEMS];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Ticker bar */}
      <div className="ticker-wrap">
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg,#0A0A0A,transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(-90deg,#0A0A0A,transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div className="ticker-track" style={{ alignItems: "center", height: 36, paddingLeft: 24 }}>
          {all.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 24px", borderRight: "1px solid #222" }}>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", color: "#666", textTransform: "uppercase" }}>{item.label}</span>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.72rem", fontWeight: 700, color: "#F5F0E8" }}>{item.value}</span>
              {item.change && (
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", fontWeight: 700, color: item.up ? "#4ade80" : "#f87171" }}>{item.change}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <header style={{ background: "#FFFFFF", borderBottom: "2px solid #0A0A0A", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              background: "#FF4500",
              color: "#FFF",
              padding: "4px 8px",
              textTransform: "uppercase"
            }}>CF</span>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.03em", color: "#0A0A0A" }}>
              CRYPTO<span style={{ color: "#FF4500" }}>FFILIATE</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden sm:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname?.startsWith(href) ? "active" : ""}`}
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 600 }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/alerts" className="btn-ghost hidden sm:inline-flex" style={{ padding: "8px 16px", fontSize: "0.72rem" }}>
              🔔 Alerts
            </Link>
            <Link href="/compare" className="btn-primary hidden sm:inline-flex" style={{ padding: "8px 18px", fontSize: "0.72rem" }}>
              Compare →
            </Link>
            <button
              onClick={() => setOpen(!open)}
              style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}
              className="sm:hidden"
            >
              <span style={{ width: 22, height: 2, background: "#0A0A0A", display: "block" }} />
              <span style={{ width: 22, height: 2, background: "#0A0A0A", display: "block" }} />
              <span style={{ width: 22, height: 2, background: "#0A0A0A", display: "block" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ borderTop: "1px solid #E5E0D8", background: "#FFFFFF", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#0A0A0A", textDecoration: "none", padding: "8px 0", borderBottom: "1px solid #E5E0D8" }}>
                {label}
              </Link>
            ))}
            <Link href="/compare" className="btn-primary" style={{ textAlign: "center", marginTop: 8 }}>Compare exchanges →</Link>
          </div>
        )}
      </header>
    </>
  );
}
