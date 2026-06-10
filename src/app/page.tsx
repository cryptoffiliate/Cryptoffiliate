import type { Metadata } from "next";
import Link from "next/link";
import { EXCHANGES } from "@/data/exchanges";
import { ExchangeCard } from "@/components/ExchangeCard";

export const metadata: Metadata = {
  title: "Best Crypto Exchange Reviews & Fee Comparisons 2025",
  description: "Independent crypto exchange reviews with live fee data. Compare Binance, Coinbase, Kraken, Bybit, OKX side-by-side. Find your best exchange in 60 seconds.",
};

const STATS = [
  { num: "5",       label: "Exchanges\nreviewed" },
  { num: "Nightly", label: "Fee data\nsync" },
  { num: "100%",    label: "Editorial\nindependence" },
  { num: "Free",    label: "All tools &\ncomparisons" },
];

const FEATURES = [
  { num: "01", title: "Live fee comparison", desc: "Fee tables auto-synced nightly from exchange APIs. Never stale, never manually updated.", href: "/compare" },
  { num: "02", title: "Hidden fee calculator", desc: "Most traders overpay by 40–60%. Upload your history and see exactly where your money goes.", href: "/tools/fee-breakdown" },
  { num: "03", title: "Exchange match quiz", desc: "5 questions. One recommendation. No sales pitch — just the exchange that fits your situation.", href: "/quiz" },
  { num: "04", title: "Bonus tracker", desc: "Every verified signup bonus across all 5 exchanges. Updated when offers change.", href: "/bonuses" },
  { num: "05", title: "Bonus alerts", desc: "Email alerts when a new bonus drops or an existing one improves. First to know.", href: "/alerts" },
  { num: "06", title: "Deep reviews", desc: "Real accounts. Real trades. Every exchange tested before it's written about.", href: "/reviews" },
];

export default function HomePage() {
  const topPicks = EXCHANGES.slice(0, 3);

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span className="eyebrow eyebrow-accent">Independent intelligence</span>
                <span style={{ width: 40, height: 1, background: "#FF4500" }} />
                <span className="eyebrow">Est. 2024</span>
              </div>

              <h1 className="display-xl" style={{ marginBottom: 24 }}>
                Find the exchange<br />
                that's actually{" "}
                <span className="display-italic">right</span>
                <br />for you.
              </h1>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", lineHeight: 1.7, color: "#4B5563", maxWidth: 480, marginBottom: 36 }}>
                We compare fees, security, and bonuses across 5 major exchanges — independently, with live data, and no paid rankings.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <Link href="/compare" className="btn-primary">Compare all exchanges →</Link>
                <Link href="/quiz" className="btn-ghost">Find my exchange</Link>
              </div>

              {/* Trust signals */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                {["No paid placements", "FTC-compliant disclosure", "Updated June 2025"].map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", fontWeight: 500, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, background: "#4ade80", display: "inline-block", flexShrink: 0 }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stats panel */}
            <div>
              <div style={{ border: "2px solid #0A0A0A", background: "#0A0A0A", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", color: "#666", textTransform: "uppercase" }}>
                    CRYPTOFFILIATE :: DATA TERMINAL
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
                    <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.6rem", color: "#4ade80", fontWeight: 700 }}>LIVE</span>
                  </span>
                </div>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {STATS.map(({ num, label }, i) => (
                    <div key={label} style={{
                      padding: "28px 24px",
                      borderRight: i % 2 === 0 ? "1px solid #222" : "none",
                      borderBottom: i < 2 ? "1px solid #222" : "none",
                    }}>
                      <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "2rem", fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>{num}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#6B7280", lineHeight: 1.4, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "pre-line" }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA bar */}
                <div style={{ padding: "16px 20px", borderTop: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "#666" }}>TOP FEE: OKX 0.08% maker</span>
                  <Link href="/tools/fee-breakdown" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "#FF4500", fontWeight: 700, textDecoration: "none", letterSpacing: "0.08em" }}>
                    CALCULATE YOURS →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top picks ────────────────────────────────── */}
      <section style={{ background: "#F5F0E8", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div className="section-bar">
            <span className="eyebrow eyebrow-accent">§ 01</span>
            <span className="eyebrow">Editor's top picks</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-lg">Best exchanges <span className="display-italic">right now</span></h2>
            <Link href="/compare" className="btn-ghost" style={{ alignSelf: "flex-end" }}>See all 5 →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {topPicks.map((exchange) => (
              <ExchangeCard key={exchange.id} exchange={exchange} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial pull quote ──────────────────── */}
      <section style={{ background: "#0A0A0A", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow" style={{ color: "#FF4500", marginBottom: 24, display: "block" }}>§ 02 — Editorial standard</span>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontStyle: "italic", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              "Most 'best exchange' sites rank by who pays the highest commission. We rank by who's{" "}
              <span style={{ color: "#FF4500" }}>actually</span>{" "}
              right for{" "}
              <span style={{ background: "#FFD700", color: "#0A0A0A", fontStyle: "normal", fontFamily: "var(--font-inter)", fontWeight: 900, padding: "0 8px" }}>you.</span>"
            </p>
            <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 28 }}>
              — Cryptoffiliate editorial policy
            </p>
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────── */}
      <section style={{ background: "#FFFFFF", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div className="section-bar">
            <span className="eyebrow eyebrow-accent">§ 03</span>
            <span className="eyebrow">What's inside</span>
          </div>
          <h2 className="display-lg" style={{ marginBottom: 48 }}>
            Tools competitors <span className="display-italic">don't have</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "2px solid #0A0A0A" }}>
            {FEATURES.map(({ num, title, desc, href }, i) => (
              <Link key={href} href={href} style={{
                padding: "32px 28px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                borderRight: (i + 1) % 3 !== 0 ? "2px solid #0A0A0A" : "none",
                borderBottom: i < 3 ? "2px solid #0A0A0A" : "none",
                background: "#FFFFFF",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
              >
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "2rem", fontWeight: 300, color: "#E5E0D8", lineHeight: 1 }}>{num}</span>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "0.95rem", color: "#0A0A0A", margin: 0, letterSpacing: "-0.01em" }}>{title}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "#FF4500", fontWeight: 700, letterSpacing: "0.12em", marginTop: "auto" }}>EXPLORE →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why trust us ─────────────────────────────── */}
      <section style={{ background: "#F5F0E8", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div className="section-bar">
            <span className="eyebrow eyebrow-accent">§ 04</span>
            <span className="eyebrow">Our methodology</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
            {[
              { label: "Independent testing", body: "We open real accounts and execute real trades on every exchange before writing a single word." },
              { label: "Live fee data",        body: "Our cron job pulls fee data from exchange APIs every night. What you see is what you'd actually pay today." },
              { label: "Transparent earnings", body: "We earn commissions through affiliate links. Disclosed clearly. It never influences our star ratings — ever." },
            ].map(({ label, body }) => (
              <div key={label} style={{ borderTop: "3px solid #0A0A0A", paddingTop: 24 }}>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "0.95rem", color: "#0A0A0A", marginBottom: 12, letterSpacing: "-0.01em" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section style={{ background: "#FF4500", borderBottom: "2px solid #0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16, display: "block" }}>Free · No sign-up · Instant</span>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
              Ready to find your<br /><em>perfect</em> exchange?
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/compare" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 28px", background: "#FFFFFF", color: "#FF4500", fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", border: "2px solid #FFFFFF", transition: "background 0.1s" }}>
              Compare exchanges →
            </Link>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 28px", background: "transparent", color: "#FFFFFF", fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", border: "2px solid rgba(255,255,255,0.5)", transition: "border-color 0.1s" }}>
              Take the quiz
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
