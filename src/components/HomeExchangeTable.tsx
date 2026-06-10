"use client";

import Link from "next/link";
import type { Exchange } from "@/lib/types";
import { buildAffiliateUrl } from "@/lib/utils";

interface Props {
  exchanges: Exchange[];
}

function StarRow({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={s <= rounded ? "#FFD600" : "#CCCCCC"}
            stroke="#111111"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </span>
  );
}

export function HomeExchangeTable({ exchanges }: Props) {
  return (
    <div
      style={{
        border: "2px solid #111111",
        overflow: "hidden",
        boxShadow: "6px 6px 0 #111111",
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
          background: "#111111",
          padding: "12px 20px",
        }}
      >
        {["Exchange", "Maker fee", "Taker fee", "Rating", ""].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#9A9A9A",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {exchanges.map((ex, i) => (
        <div
          key={ex.id}
          data-testid={`exchange-row-${ex.id}`}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
            padding: "18px 20px",
            alignItems: "center",
            borderTop: i === 0 ? "none" : "2px solid #111111",
            background: i % 2 === 0 ? "#FFFFFF" : "#F4F4F0",
            transition: "background .1s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#FFF8E1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              i % 2 === 0 ? "#FFFFFF" : "#F4F4F0";
          }}
        >
          {/* Name + accent */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 36,
                background: ex.accentColor,
                flexShrink: 0,
                border: "1px solid #111111",
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#111111",
                  letterSpacing: "-.02em",
                }}
              >
                {ex.name}
              </p>
              {ex.bonusText && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "#00C853",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                  }}
                >
                  ✦ {ex.bonusText}
                </p>
              )}
            </div>
          </div>

          {/* Maker fee */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#111111",
            }}
          >
            {(ex.makerFee * 100).toFixed(2)}%
          </span>

          {/* Taker fee */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#111111",
            }}
          >
            {(ex.takerFee * 100).toFixed(2)}%
          </span>

          {/* Rating */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <StarRow rating={ex.rating} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#4A4A4A",
              }}
            >
              {ex.rating}/5 ({ex.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={buildAffiliateUrl(ex)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "11px", padding: "8px 14px" }}
            >
              Visit →
            </a>
            <Link
              href={`/reviews/${ex.id}`}
              className="btn-ghost"
              style={{ fontSize: "11px", padding: "8px 14px" }}
            >
              Review
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
