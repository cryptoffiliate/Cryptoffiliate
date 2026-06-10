import Link from "next/link";

const FOOTER_LINKS = {
  "Exchanges": [
    { href: "/reviews/binance",  label: "Binance review" },
    { href: "/reviews/coinbase", label: "Coinbase review" },
    { href: "/reviews/kraken",   label: "Kraken review" },
    { href: "/reviews/bybit",    label: "Bybit review" },
    { href: "/reviews/okx",      label: "OKX review" },
  ],
  "Tools": [
    { href: "/compare",              label: "Exchange comparison" },
    { href: "/tools/fee-breakdown",  label: "Hidden fee calculator" },
    { href: "/tools/fee-calculator", label: "Fee calculator" },
    { href: "/quiz",                 label: "Find my exchange" },
    { href: "/bonuses",              label: "Signup bonuses" },
  ],
  "Site": [
    { href: "/alerts",     label: "Bonus alerts" },
    { href: "/about",      label: "About" },
    { href: "/disclosure", label: "Affiliate disclosure" },
    { href: "/privacy",    label: "Privacy policy" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "2px solid #0A0A0A" }}>
      {/* Yellow stripe */}
      <div style={{ height: 6, background: "repeating-linear-gradient(-45deg, #FFD700 0 10px, #0A0A0A 10px 20px)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 12 }}>
              CRYPTO<span style={{ color: "#FF4500" }}>FFILIATE</span>
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              Independent crypto exchange reviews, live fee comparisons, and tools. No paid placements. Ever.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/compare" className="btn-primary" style={{ justifyContent: "center", textAlign: "center", padding: "10px 20px", fontSize: "0.72rem" }}>
                Compare exchanges →
              </Link>
              <Link href="/alerts" className="btn-ghost" style={{ justifyContent: "center", textAlign: "center", padding: "9px 20px", fontSize: "0.72rem", borderColor: "#333", color: "#F5F0E8" }}>
                🔔 Get bonus alerts
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF4500", marginBottom: 16 }}>
                {group}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#6B7280", textDecoration: "none", transition: "color 0.1s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F0E8")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7280")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#444", lineHeight: 1.6, maxWidth: 640 }}>
            <strong style={{ color: "#6B7280" }}>Affiliate disclosure:</strong>{" "}
            Cryptoffiliate.com earns commissions when you sign up through links on this site at no extra cost to you. This never influences our ratings — exchanges are evaluated independently. Crypto investments carry significant risk. Not financial advice.
          </p>
          <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "#333", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} CRYPTOFFILIATE
          </p>
        </div>
      </div>
    </footer>
  );
}
