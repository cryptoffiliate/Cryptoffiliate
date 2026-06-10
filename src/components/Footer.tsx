"use client";

import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Exchanges",
    accentColor: "#FF5722",
    links: [
      { href: "/compare",             label: "Compare exchanges" },
      { href: "/reviews",             label: "All reviews" },
      { href: "/bonuses",             label: "Signup bonuses" },
      { href: "/tools/fee-breakdown", label: "Hidden fee calculator" },
      { href: "/quiz",                label: "Find my exchange" },
    ],
  },
  {
    title: "Wallets & Security",
    accentColor: "#002FA7",
    links: [
      { href: "/hardware-wallets",                 label: "Hardware wallets" },
      { href: "/hardware-wallets/ledger-vs-trezor", label: "Ledger vs Trezor" },
      { href: "/security",                          label: "Security overview" },
      { href: "/security/vpn",                      label: "Best VPNs" },
      { href: "/security/password-managers",        label: "Password managers" },
    ],
  },
  {
    title: "Tax & Tools",
    accentColor: "#111111",
    links: [
      { href: "/tax-software",  label: "Crypto tax software" },
      { href: "/trading-bots",  label: "Trading bots" },
      { href: "/cloud-mining",  label: "Cloud mining" },
      { href: "/alerts",        label: "Bonus alerts" },
      { href: "/ai-advisor",    label: "AI advisor" },
    ],
  },
  {
    title: "Site",
    accentColor: "#FFD600",
    links: [
      { href: "/about",      label: "About" },
      { href: "/disclosure", label: "Affiliate disclosure" },
      { href: "/privacy",    label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "#111111",
        color: "#F4F4F0",
        borderTop: "3px solid #111111",
        marginTop: "80px",
        position: "relative",
      }}
      data-testid="site-footer"
    >
      {/* Yellow stripe accent */}
      <div style={{ height: "8px", background: "repeating-linear-gradient(-45deg, #FFD600 0 12px, #111111 12px 24px)" }} />

      <div className="container" style={{ paddingTop: "56px", paddingBottom: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "40px", alignItems: "flex-start" }}>
          {/* Brand column */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "24px", color: "#F4F4F0", letterSpacing: "-0.04em", marginBottom: "14px" }}>
              CRYPTO<span style={{ color: "#FF5722" }}>/</span>FFILIATE
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#9A9A9A", lineHeight: 1.6, maxWidth: "280px", marginBottom: "24px" }}>
              AI-powered crypto intelligence. Live fee data, unbiased reviews, and a real advisor built in — no paid placements.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                href="/ai-advisor"
                data-testid="footer-cta-ai"
                className="btn-primary"
                style={{ fontSize: "11px", padding: "10px 18px", justifyContent: "center", textAlign: "center" }}
              >
                Ask the AI →
              </Link>
              <Link
                href="/alerts"
                data-testid="footer-cta-alerts"
                className="btn-ghost"
                style={{ fontSize: "11px", padding: "10px 18px", justifyContent: "center", textAlign: "center", background: "#1A1A1A", color: "#F4F4F0", borderColor: "#555555" }}
              >
                ▲ Set alerts
              </Link>
            </div>

            {/* Social */}
            <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
              <a
                href="https://instagram.com/Cryptoffiliate"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#F4F4F0",
                  textDecoration: "none",
                  border: "2px solid #555555",
                  padding: "6px 12px",
                  transition: "border-color .12s, color .12s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#FF5722";
                  (e.currentTarget as HTMLElement).style.color = "#FF5722";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#555555";
                  (e.currentTarget as HTMLElement).style.color = "#F4F4F0";
                }}
              >
                IG @Cryptoffiliate
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: col.accentColor === "#111111" ? "#9A9A9A" : col.accentColor,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ width: 8, height: 8, background: col.accentColor === "#111111" ? "#9A9A9A" : col.accentColor, flexShrink: 0 }} />
                {col.title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", padding: 0 }}>
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "#9A9A9A",
                        textDecoration: "none",
                        transition: "color .12s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F4F4F0"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9A9A9A"; }}
                    >
                      → {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #2A2A2A", marginTop: "48px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#6B6B6B", maxWidth: "640px", lineHeight: 1.6 }}>
            <strong style={{ color: "#FFD600" }}>AFFILIATE DISCLOSURE:</strong>{" "}
            Cryptoffiliate.com earns commissions via links at no cost to you. Ratings are independent. Not financial advice.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555555" }}>
            © {new Date().getFullYear()} CRYPTOFFILIATE
          </p>
        </div>
      </div>
    </footer>
  );
}
