"use client";

import Link from "next/link";
import { EXCHANGES } from "@/data/exchanges";
import { AIChat } from "@/components/AIChat";
import { HomeExchangeTable } from "@/components/HomeExchangeTable";

const AI_FEATURES = [
  { num: "01", title: "AI EXCHANGE ADVISOR", desc: "Ask anything in plain English. Get a direct, personalised recommendation — not a list.", tag: "LIVE",  accentBg: "#00C853", accentText: "#111111" },
  { num: "02", title: "AI FEE ANALYST",       desc: "Upload your trade history. Claude tells you exactly how much you overpaid and where to move.", tag: "BETA", accentBg: "#FFD600", accentText: "#111111" },
  { num: "03", title: "PORTFOLIO HEALTH",     desc: "Get an AI assessment of your exchange risk, custody risk, and tax exposure in seconds.", tag: "BETA", accentBg: "#FFD600", accentText: "#111111" },
  { num: "04", title: "SMART BONUS ALERTS",   desc: "AI-monitored exchange announcements. You get alerted only on genuine new offers.", tag: "LIVE",  accentBg: "#00C853", accentText: "#111111" },
  { num: "05", title: "TAX STRATEGIST",       desc: "Tell Claude your holdings. It recommends the right tax software and year-end strategy for you.", tag: "SOON", accentBg: "#002FA7", accentText: "#F4F4F0" },
  { num: "06", title: "BOT STRATEGY BUILDER", desc: "Describe your goals in plain English. Claude builds a WunderTrading or 3Commas config for you.", tag: "SOON", accentBg: "#002FA7", accentText: "#F4F4F0" },
];

const STATS = [
  { num: "40+",     label: "AFFILIATE PROGRAMS" },
  { num: "06",      label: "VERTICALS COVERED" },
  { num: "NIGHTLY", label: "FEE DATA SYNC" },
  { num: "FREE",    label: "AI ADVISOR" },
];

const VERTICALS = [
  { href: "/compare",          num: "I.",   title: "EXCHANGES",        desc: "5 exchanges compared with live fees",     accentColor: "#FF5722" },
  { href: "/hardware-wallets", num: "II.",  title: "HARDWARE WALLETS", desc: "Ledger, Trezor, CoolWallet",              accentColor: "#002FA7" },
  { href: "/tax-software",     num: "III.", title: "TAX SOFTWARE",     desc: "Koinly, CoinLedger, ZenLedger +2",        accentColor: "#FFD600" },
  { href: "/security",         num: "IV.",  title: "SECURITY TOOLS",   desc: "VPNs + password managers",                accentColor: "#111111" },
  { href: "/trading-bots",     num: "V.",   title: "TRADING BOTS",     desc: "WunderTrading, 3Commas, TradingView",      accentColor: "#FF5722" },
  { href: "/cloud-mining",     num: "VI.",  title: "CLOUD MINING",     desc: "NiceHash, ECOS, BitFuFu",                  accentColor: "#002FA7" },
];

export default function HomePage() {
  return (
    <div data-testid="home-page">

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "2px solid #111111", background: "#F4F4F0" }} data-testid="hero-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 24px", borderBottom: "2px solid #111111", background: "#111111", fontFamily: "var(--font-mono)", fontSize: "10px", color: "#9A9A9A", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 600 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, background: "#00C853" }} />
            <span style={{ color: "#FF5722" }}>ISSUE 27</span>
            <span style={{ color: "#555555" }}>·</span>
            <span>{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}</span>
          </span>
          <span className="hidden md:inline-flex" style={{ gap: 18, color: "#9A9A9A" }}>
            <span style={{ color: "#FFD600" }}>∎</span> EDITORIAL INDEPENDENCE · NO PAID PLACEMENT
          </span>
          <span style={{ color: "#FFD600" }}>EST. 2024</span>
        </div>

        <div className="container" style={{ paddingTop: "64px", paddingBottom: "72px" }}>
          <div className="grid-hero">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ marginBottom: 24 }}>
                <span className="eyebrow">INDEPENDENT INTELLIGENCE · VOL. 1</span>
              </div>
              <h1 className="heading-xl" style={{ marginBottom: "22px", color: "#111111" }} data-testid="hero-headline">
                Find the<br />
                <span className="italic-serif">right</span> exchange.<br />
                <span style={{ background: "#FFD600", padding: "0 14px", border: "3px solid #111111", display: "inline-block", boxShadow: "5px 5px 0 #111111", color: "#111111", fontStyle: "normal" }}>
                  Skip the sales pitch.
                </span>
              </h1>
              <p className="body-lg" style={{ marginBottom: "36px", maxWidth: "540px", fontSize: "18px", color: "#4A4A4A" }}>
                Live fee data, unbiased reviews, and an <strong style={{ color: "#FF5722" }}>AI advisor</strong> that tells you the truth.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
                <Link href="/ai-advisor" className="btn-primary" data-testid="hero-cta-ai">Ask the AI advisor →</Link>
                <Link href="/compare" className="btn-ghost" data-testid="hero-cta-compare">Compare exchanges</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "2px solid #111111", background: "#FFFFFF", boxShadow: "4px 4px 0 #111111", overflow: "hidden" }}>
                {STATS.map(({ num, label }, i) => (
                  <div key={label} style={{ padding: "18px 14px", borderRight: i < STATS.length - 1 ? "2px solid #111111" : "none" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 800, color: "#111111", marginBottom: "4px", letterSpacing: "-.03em", lineHeight: 1 }}>{num}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#4A4A4A", letterSpacing: ".18em", fontWeight: 600, textTransform: "uppercase" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100%" }}>
                <AIChat compact placeholder="Ask anything — which exchange, wallet, or tax tool?" />
              </div>
            </div>
          </div>
        </div>
        <div className="stripe" />
      </section>

      {/* Exchange table */}
      <section style={{ borderBottom: "2px solid #111111", background: "#F4F4F0" }} data-testid="exchange-comparison-section">
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="eyebrow">§ 01 · Live Data — Synced Nightly</span>
              <h2 className="heading-lg">Exchange <span className="italic-serif">comparison</span></h2>
            </div>
            <Link href="/compare" className="btn-ghost" style={{ fontSize: "11px", padding: "10px 16px" }}>Full report →</Link>
          </div>
          <HomeExchangeTable exchanges={EXCHANGES} />
        </div>
      </section>

      {/* AI Features */}
      <section style={{ borderBottom: "2px solid #111111", background: "#FFFFFF" }} data-testid="ai-features-section">
        <div className="container" style={{ paddingTop: "88px", paddingBottom: "88px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ maxWidth: "640px" }}>
              <span className="eyebrow eyebrow-accent">§ 02 · Powered By Claude Sonnet</span>
              <h2 className="heading-lg">AI features <span className="italic-serif">no competitor</span><br />has built.</h2>
            </div>
            <Link href="/ai-advisor" className="btn-klein" style={{ fontSize: "12px" }}>Try AI advisor →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid #111111" }}>
            {AI_FEATURES.map(({ num, title, desc, tag, accentBg, accentText }, i) => (
              <div key={title} data-testid={`ai-feature-card-${num}`}
                style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "10px", minHeight: "230px", borderRight: (i + 1) % 3 !== 0 ? "2px solid #111111" : "none", borderBottom: i < 3 ? "2px solid #111111" : "none", background: "#FFFFFF", position: "relative" }}
              >
                <div style={{ height: "3px", background: accentBg, position: "absolute", top: 0, left: 0, right: 0 }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "36px", fontWeight: 300, color: "#CCCCCC", lineHeight: 1, letterSpacing: "-.04em" }}>{num}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "3px 8px", background: accentBg, color: accentText, border: "2px solid #111111", fontWeight: 700, letterSpacing: ".15em" }}>{tag}</span>
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 800, color: "#111111", marginTop: "8px", letterSpacing: "-.01em" }}>{title}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#4A4A4A", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section style={{ borderBottom: "2px solid #111111", background: "#F4F4F0" }} data-testid="verticals-section">
        <div className="container" style={{ paddingTop: "88px", paddingBottom: "88px" }}>
          <div style={{ marginBottom: "40px" }}>
            <span className="eyebrow eyebrow-klein">§ 03 · Everything Crypto</span>
            <h2 className="heading-lg">Six verticals.<br /><span className="italic-serif">Forty+</span> programs.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid #111111" }}>
            {VERTICALS.map(({ href, num, title, desc, accentColor }, i) => (
              <Link key={href} href={href} data-testid={`vertical-card-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                style={{ padding: "28px 24px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "10px", minHeight: "220px", position: "relative", borderRight: (i + 1) % 3 !== 0 ? "2px solid #111111" : "none", borderBottom: i < 3 ? "2px solid #111111" : "none", background: "#FFFFFF" }}
              >
                <div style={{ height: "4px", background: accentColor, position: "absolute", top: 0, left: 0, right: 0 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#4A4A4A", letterSpacing: ".14em", fontWeight: 700, textTransform: "uppercase" }}>{num}</span>
                  <span style={{ width: "18px", height: "18px", background: accentColor, border: "2px solid #111111", display: "inline-block" }} />
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 900, color: "#111111", letterSpacing: "-.02em", marginTop: "8px" }}>{title}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#4A4A4A", lineHeight: 1.55, flex: 1 }}>{desc}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#111111", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginTop: "auto" }}>Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial quote */}
      <section style={{ borderBottom: "2px solid #111111", background: "#111111" }}>
        <div className="container" style={{ paddingTop: "88px", paddingBottom: "88px" }}>
          <div style={{ maxWidth: "920px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: ".25em", color: "#FF5722", textTransform: "uppercase", marginBottom: "22px", fontWeight: 700 }}>§ 04 — Editor&apos;s Note</p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4.4vw, 50px)", lineHeight: 1.18, letterSpacing: "-.02em", color: "#F4F4F0", fontStyle: "italic", fontWeight: 400 }}>
              &ldquo;Most &lsquo;best exchange&rsquo; sites rank by who pays the most commission. We rank by who&rsquo;s{" "}
              <span style={{ color: "#FF5722" }}>actually</span> right for{" "}
              <span style={{ color: "#111111", fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "normal", padding: "0 10px", background: "#FFD600", border: "3px solid #F4F4F0" }}>YOU.</span>&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: ".15em", color: "#555555", textTransform: "uppercase", marginTop: "30px", fontWeight: 600 }}>— The Cryptoffiliate Editorial Standard</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section data-testid="bottom-cta-section" style={{ background: "#F4F4F0", borderBottom: "2px solid #111111" }}>
        <div className="container" style={{ paddingTop: "96px", paddingBottom: "96px", textAlign: "center" }}>
          <div style={{ display: "inline-block", marginBottom: "28px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: ".25em", textTransform: "uppercase", padding: "6px 16px", background: "#00C853", color: "#111111", border: "2px solid #111111", fontWeight: 700, boxShadow: "4px 4px 0 #111111" }}>FREE · NO SIGN-UP · INSTANT</span>
          </div>
          <h2 className="heading-lg" style={{ marginBottom: "22px", maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}>
            Ready to find your <span className="italic-serif">perfect</span> exchange?
          </h2>
          <p className="body-lg" style={{ marginBottom: "40px", maxWidth: "580px", margin: "0 auto 40px" }}>Ask the AI, compare the table, or take the quiz. All free, all unbiased.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ai-advisor" className="btn-primary" data-testid="footer-cta-advisor">Ask the AI advisor →</Link>
            <Link href="/compare" className="btn-ghost" data-testid="footer-cta-compare">Compare exchanges</Link>
            <Link href="/quiz" className="btn-klein" data-testid="footer-cta-quiz">Take the quiz</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
