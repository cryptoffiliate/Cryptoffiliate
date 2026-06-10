import Link from "next/link";
import type { Exchange } from "@/lib/types";
import { buildAffiliateUrl } from "@/lib/utils";

interface Props { exchange: Exchange; }

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={s <= Math.round(rating) ? "#FFD700" : "none"}
            stroke="#FFD700"
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </span>
  );
}

export function ExchangeCard({ exchange }: Props) {
  return (
    <div className="exchange-card">
      {/* Top accent line */}
      <div style={{ height: 3, background: exchange.logoColor, margin: "-24px -24px 0", borderBottom: "none" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", fontWeight: 800,
            background: exchange.logoColor + "18",
            border: `2px solid ${exchange.logoColor}`,
            color: exchange.logoColor,
            letterSpacing: "0.04em",
          }}>
            {exchange.logo}
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#0A0A0A", margin: 0 }}>{exchange.name}</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#6B7280", margin: 0 }}>{exchange.tagline}</p>
          </div>
        </div>
        {exchange.badge && (
          <span className="fee-badge" style={{ color: exchange.badgeColor!, borderColor: exchange.badgeColor! + "60", background: exchange.badgeColor! + "12", flexShrink: 0, fontSize: "0.6rem" }}>
            {exchange.badge}
          </span>
        )}
      </div>

      {/* Rating */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Stars rating={exchange.rating} />
        <span style={{ fontFamily: "var(--font-jetbrains)", fontWeight: 700, fontSize: "0.8rem", color: "#0A0A0A" }}>{exchange.rating}</span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#6B7280" }}>({(exchange.reviews / 1000).toFixed(1)}k)</span>
      </div>

      {/* Fee stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "Maker", value: `${exchange.makerFee}%` },
          { label: "Taker", value: `${exchange.takerFee}%` },
          { label: "Coins", value: `${exchange.coins}+` },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: "#F5F0E8", padding: "10px 8px", textAlign: "center", border: "1px solid #E5E0D8" }}>
            <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.85rem", fontWeight: 700, color: "#0A0A0A", margin: 0 }}>{value}</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Bonus */}
      <div style={{ background: "#0A0A0A", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.6rem", fontWeight: 700, color: "#FFD700", letterSpacing: "0.16em", textTransform: "uppercase" }}>BONUS</span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", fontWeight: 600, color: "#F5F0E8" }}>{exchange.bonus}</span>
      </div>

      {/* Best for */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {exchange.best?.slice(0,3).map((b) => (
          <span key={b} style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 500, color: "#6B7280", padding: "3px 8px", border: "1px solid #E5E0D8", background: "#FFFFFF" }}>
            ✓ {b}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <a
          href={buildAffiliateUrl(exchange.affiliateUrl, exchange.id, "card")}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary"
          style={{ flex: 1, justifyContent: "center", background: exchange.logoColor, borderColor: exchange.logoColor, color: "#FFF", padding: "10px 16px" }}
        >
          Visit {exchange.name} →
        </a>
        <Link href={`/reviews/${exchange.slug}`} className="btn-ghost" style={{ padding: "10px 14px", fontSize: "0.72rem" }}>
          Review
        </Link>
      </div>
    </div>
  );
}
