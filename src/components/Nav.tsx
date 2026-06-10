"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_GROUPS = [
  {
    label: "Exchanges",
    href: "/compare",
    accentColor: "#FF5722",
    items: [
      { href: "/compare",               label: "Compare exchanges",     desc: "Side-by-side fees & features" },
      { href: "/reviews",               label: "Exchange reviews",       desc: "In-depth reviews of every exchange" },
      { href: "/bonuses",               label: "Signup bonuses",         desc: "Verified promo codes & offers" },
      { href: "/bonuses/bonus-tracker", label: "Bonus tracker",          desc: "Live countdown timers on all offers" },
      { href: "/community/fee-reports", label: "Community fee reports",  desc: "Real fees paid by real traders" },
      { href: "/community/reviews",     label: "User reviews",           desc: "Community exchange ratings" },
      { href: "/quiz",                  label: "Find my exchange",        desc: "5-question personalised match", highlight: true },
    ],
  },
  {
    label: "Wallets",
    href: "/hardware-wallets",
    accentColor: "#002FA7",
    items: [
      { href: "/hardware-wallets",                  label: "All hardware wallets",  desc: "Ledger, Trezor, CoolWallet" },
      { href: "/hardware-wallets/ledger",           label: "Ledger review",         desc: "Nano X, Flex, Stax — all models" },
      { href: "/hardware-wallets/trezor",           label: "Trezor review",         desc: "Safe 3, Safe 5, Safe 7" },
      { href: "/hardware-wallets/ledger-vs-trezor", label: "Ledger vs Trezor",      desc: "Definitive head-to-head", highlight: true },
    ],
  },
  {
    label: "Tools",
    href: "/tools/fee-breakdown",
    accentColor: "#111111",
    items: [
      { href: "/tools/fee-breakdown",        label: "Hidden fee calculator",   desc: "See what you're really paying" },
      { href: "/tools/fee-analyst",          label: "AI fee analyst",          desc: "Upload CSV → find what you overpaid" },
      { href: "/tools/migration-planner",    label: "Migration planner",       desc: "Step-by-step exchange switch" },
      { href: "/tools/profit-calculator",    label: "Profit calculator",        desc: "P&L including fees" },
      { href: "/tools/fee-trends",           label: "Fee trends",               desc: "90-day historical fee charts" },
      { href: "/tools/portfolio-health",     label: "Portfolio health check",   desc: "AI risk assessment", highlight: true },
      { href: "/tools/dca-planner",          label: "DCA planner",              desc: "AI-optimised buy schedule" },
      { href: "/tools/jurisdiction-checker", label: "Jurisdiction checker",     desc: "Which exchanges work in your country" },
    ],
  },
  {
    label: "Tax & Security",
    href: "/tax-software",
    accentColor: "#111111",
    items: [
      { href: "/tax-software",               label: "Crypto tax software",     desc: "Koinly, CoinLedger, ZenLedger" },
      { href: "/tax-harvesting",             label: "Tax-loss harvesting",     desc: "Year-end savings scanner" },
      { href: "/security",                   label: "Security overview",        desc: "The essential crypto stack" },
      { href: "/security-audit",             label: "Security audit",          desc: "Interactive personal checklist" },
      { href: "/security/vpn",               label: "Best VPNs",               desc: "NordVPN, Proton, ExpressVPN" },
      { href: "/security/password-managers", label: "Password managers",       desc: "Bitwarden vs 1Password" },
    ],
  },
  {
    label: "Discover",
    href: "/ai-advisor",
    accentColor: "#FF5722",
    items: [
      { href: "/ai-advisor",             label: "AI advisor",              desc: "Ask anything about crypto", highlight: true },
      { href: "/scam-detector",          label: "Scam detector",           desc: "Check any URL with AI" },
      { href: "/whitepaper",             label: "Whitepaper analyser",     desc: "AI summary of any whitepaper" },
      { href: "/status",                 label: "Exchange status",          desc: "Live uptime monitoring" },
      { href: "/proof-of-reserves",      label: "Proof of reserves",        desc: "Who has audits" },
      { href: "/volume",                 label: "Volume league table",      desc: "24h trading rankings" },
      { href: "/regulatory-monitor",     label: "Regulatory monitor",       desc: "SEC/FCA/MiCA updates" },
      { href: "/trading-bots",           label: "Trading bots",             desc: "WunderTrading, 3Commas, TradingView" },
      { href: "/cloud-mining",           label: "Cloud mining",             desc: "NiceHash, ECOS, BitFuFu" },
    ],
  },
];

function Dropdown({ group, isOpen, onClose }: { group: typeof NAV_GROUPS[0]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div
      onMouseLeave={onClose}
      data-testid={`nav-dropdown-${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
      style={{
        position: "absolute",
        top: "calc(100% + 2px)",
        left: 0,
        width: "300px",
        background: "#FFFFFF",
        border: "2px solid #111111",
        borderRadius: 0,
        overflow: "hidden",
        zIndex: 50,
        boxShadow: "6px 6px 0 #111111",
      }}
    >
      {/* colored top rule */}
      <div style={{ height: "4px", background: group.accentColor }} />
      <div style={{ padding: "8px" }}>
        {group.items.map(({ href, label, desc, highlight }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            data-testid={`nav-link-${href.split("/").filter(Boolean).join("-")}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              padding: "10px 12px",
              borderRadius: 0,
              textDecoration: "none",
              background: highlight ? "rgba(255,87,34,0.07)" : "transparent",
              borderLeft: highlight ? "3px solid #FF5722" : "3px solid transparent",
              marginBottom: "2px",
              transition: "background .1s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#F4F4F0";
              el.style.borderLeftColor = "#111111";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = highlight ? "rgba(255,87,34,0.07)" : "transparent";
              el.style.borderLeftColor = highlight ? "#FF5722" : "transparent";
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "#111111" }}>{label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "#4A4A4A", letterSpacing: ".02em" }}>{desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.55)" }} onClick={onClose} />
      <div
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "340px",
          maxWidth: "95vw",
          height: "100%",
          background: "#F4F4F0",
          borderLeft: "2px solid #111111",
          boxShadow: "-6px 0 0 #111111",
          display: "flex",
          flexDirection: "column",
        }}
        data-testid="mobile-menu"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", height: "64px", borderBottom: "2px solid #111111", background: "#111111" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px", letterSpacing: "-.03em", color: "#F4F4F0" }}>
            CRYPTO<span style={{ color: "#FF5722" }}>/</span>FFILIATE
          </span>
          <button
            onClick={onClose}
            data-testid="mobile-menu-close"
            style={{ width: "32px", height: "32px", background: "#FF5722", border: "2px solid #F4F4F0", borderRadius: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#111111" }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          {NAV_GROUPS.map((g) => (
            <div key={g.href} style={{ marginBottom: "8px", border: "2px solid #111111", background: "#FFFFFF", overflow: "hidden" }}>
              <div style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: "10px", color: "#F4F4F0", letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, borderBottom: "2px solid #111111", background: "#111111", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, background: g.accentColor, flexShrink: 0 }} />
                {g.label}
              </div>
              {g.items.map(({ href, label, highlight }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  style={{ display: "block", padding: "10px 14px", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 600, color: "#111111", background: highlight ? "rgba(255,87,34,0.07)" : "transparent", borderBottom: "1px solid #CCCCCC", borderLeft: highlight ? "3px solid #FF5722" : "3px solid transparent" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: "2px solid #111111", display: "flex", flexDirection: "column", gap: "10px", background: "#F4F4F0" }}>
          <Link href="/alerts" onClick={onClose} className="btn-ghost" style={{ justifyContent: "center", textAlign: "center" }}>
            Bonus alerts
          </Link>
          <Link href="/ai-advisor" onClick={onClose} className="btn-primary" style={{ justifyContent: "center", textAlign: "center" }}>
            Ask the AI →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenGroup(null); }, [pathname]);

  return (
    <>
      <header
        className="nav-dark"
        data-testid="main-nav"
      >
        {/* Top editorial bar */}
        <div style={{
          background: "#111111",
          color: "#F4F4F0",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          padding: "5px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #111111",
        }}>
          <span style={{ color: "#FF5722" }}>● LIVE</span>
          <span style={{ color: "#9A9A9A" }}>Independent · No paid placements · AI-powered</span>
          <span style={{ color: "#FFD600" }}>EST. 2024</span>
        </div>

        <div className="container" style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <Link
            href="/"
            data-testid="logo-link"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "20px",
              color: "#111111",
              textDecoration: "none",
              letterSpacing: "-.03em",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                background: "#111111",
                color: "#FF5722",
                padding: "2px 7px",
                borderRadius: 0,
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                letterSpacing: ".14em",
                border: "2px solid #111111",
              }}
            >
              CF
            </span>
            CRYPTO<span style={{ color: "#FF5722" }}>/</span>FFILIATE
          </Link>

          <nav ref={navRef} style={{ display: "flex", alignItems: "center", gap: "0", position: "relative" }} className="hidden md:flex">
            {NAV_GROUPS.map((g) => {
              const isActive = pathname?.startsWith(g.href);
              const isOpen = openGroup === g.href;
              return (
                <div key={g.href} style={{ position: "relative" }}>
                  <button
                    onMouseEnter={() => setOpenGroup(g.href)}
                    onClick={() => setOpenGroup(isOpen ? null : g.href)}
                    data-testid={`nav-group-${g.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 14px",
                      borderRadius: 0,
                      border: "none",
                      borderBottom: isActive || isOpen ? "3px solid #FF5722" : "3px solid transparent",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      background: isOpen ? "#EAEAEA" : "transparent",
                      color: isActive || isOpen ? "#FF5722" : "#111111",
                      transition: "all .12s",
                    }}
                  >
                    {g.label}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .12s" }}>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <Dropdown group={g} isOpen={isOpen} onClose={() => setOpenGroup(null)} />
                </div>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <Link
              href="/alerts"
              className="hidden md:inline-flex"
              data-testid="nav-alerts"
              style={{
                padding: "8px 14px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#111111",
                textDecoration: "none",
                border: "2px solid #111111",
                borderRadius: 0,
                background: "#FFD600",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                transition: "box-shadow .12s, transform .12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #111111";
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              ▲ Alerts
            </Link>
            <Link
              href="/ai-advisor"
              className="hidden md:inline-flex btn-primary"
              data-testid="nav-cta-ai"
              style={{ fontSize: "11px", padding: "9px 16px" }}
            >
              Ask AI →
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              data-testid="mobile-menu-toggle"
              className="md:hidden"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: 0,
                border: "2px solid #111111",
                background: "#F4F4F0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
