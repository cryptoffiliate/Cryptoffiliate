import Link from "next/link";
import type { Exchange } from "@/lib/types";
import { buildAffiliateUrl } from "@/lib/utils";

interface Props {
  exchange: Exchange;
}

// Map neon colors → editorial palette
function toEditorialColor(neonColor: string): string {
  const map: Record<string, string> = {
    "#00F0FF": "#002FA7",
    "#00FF94": "#00C853",
    "#B026FF": "#002FA7",
    "#C4FF00": "#111111",
    "#FF8A3D": "#FF5722",
    "#FF3D71": "#D50000",
    "#4D8DFF": "#002FA7",
    "#FFC93C": "#FF8A00",
  };
  return map[neonColor] || neonColor;
}

function StarRow({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={s <= rounded ? "#FF5722" : "none"}
            stroke={s <= rounded ? "#FF5722" : "#CCCCCC"}
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </span>
  );
}

export function ExchangeCard({ exchange }: Props) {
  const accentColor = toEditorialColor(exchange.logoColor);

  return (
    <article
      data-testid={`exchange-card-${exchange.id}`}
      className="glow-card"
      style={{
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Colored top border accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: accentColor,
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginTop: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 800,
              background: "#111111",
              border: "2px solid #111111",
              borderRadius: 0,
              color: accentColor === "#111111" ? "#F4F4F0" : accentColor,
              flexShrink: 0,
            }}
          >
            {exchange.logo}
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 800, color: "#111111", letterSpacing: "-.01em" }}>
              {exchange.name}
            </p>
            <StarRow rating={exchange.rating} />
          </div>
        </div>

        {exchange.recommended && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              padding: "3px 8px",
              border: "2px solid #FF5722",
              background: "#FF5722",
              color: "#111111",
              borderRadius: 0,
              flexShrink: 0,
            }}
          >
            TOP PICK
          </span>
        )}
      </div>

      {/* Description */}
      {exchange.description && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#4A4A4A", lineHeight: 1.5 }}>
          {exchange.description}
        </p>
      )}

      {/* Fee stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: "2px solid #111111" }}>
        {[
          { label: "Maker fee", value: exchange.makerFee },
          { label: "Taker fee", value: exchange.takerFee },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 12px",
              borderRight: idx === 0 ? "2px solid #111111" : "none",
              background: idx % 2 === 0 ? "#FFFFFF" : "#F4F4F0",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, color: "#4A4A4A", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "4px" }}>
              {item.label}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: "#111111" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bonus badge */}
      {exchange.bonus && (
        <div
          style={{
            background: "#FFD600",
            border: "2px solid #111111",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#111111", letterSpacing: ".14em", textTransform: "uppercase" }}>
            ★ BONUS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700, color: "#111111" }}>
            {exchange.bonus}
          </span>
        </div>
      )}

      {/* CTA */}
      <a
        href={buildAffiliateUrl(exchange)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-testid={`exchange-card-cta-${exchange.id}`}
        className="aff-btn"
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        Get started →
      </a>

      {/* Review link */}
      {exchange.reviewSlug && (
        <Link
          href={`/reviews/${exchange.reviewSlug}`}
          data-testid={`exchange-card-review-${exchange.id}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#4A4A4A",
            textDecoration: "none",
            textAlign: "center",
            letterSpacing: ".08em",
            borderTop: "1px solid #EAEAEA",
            paddingTop: "10px",
            display: "block",
            transition: "color .12s",
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#111111"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#4A4A4A"; }}
        >
          → Read full review
        </Link>
      )}
    </article>
  );
}
