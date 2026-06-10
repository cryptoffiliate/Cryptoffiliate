"use client";

import { useEffect, useState } from "react";

interface TickerItem {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

interface TickerResponse {
  items: TickerItem[];
  updated_at: string;
  source: string;
}

const FALLBACK: TickerItem[] = [
  { label: "BTC/USD",        value: "$107,240", change: "+2.4%", up: true  },
  { label: "ETH/USD",        value: "$3,841",   change: "+1.8%", up: true  },
  { label: "SOL/USD",        value: "$188",     change: "+3.1%", up: true  },
  { label: "BINANCE MAKER",  value: "0.10%",    change: "",      up: true  },
  { label: "OKX MAKER",      value: "0.08%",    change: "",      up: true  },
  { label: "KRAKEN MAKER",   value: "0.16%",    change: "",      up: true  },
  { label: "COINBASE TAKER", value: "0.60%",    change: "",      up: false },
];

export function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const res = await fetch("/api/ticker", { cache: "no-store" });
        if (!res.ok) return;
        const data: TickerResponse = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
          setLive(data.source !== "fallback");
        }
      } catch {
        /* keep fallback */
      }
    };

    load();
    timer = setInterval(load, 60_000);
    return () => { if (timer) clearInterval(timer); };
  }, []);

  const all = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden flex items-center"
      style={{
        background: "#111111",
        borderBottom: "2px solid #111111",
        height: "36px",
        position: "relative",
      }}
      data-testid="market-ticker"
    >
      {/* Edge fades */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #111111, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(-90deg, #111111, transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* LIVE pill */}
      <div
        data-testid="ticker-live-pill"
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "#111111",
          background: live ? "#00C853" : "#FFD600",
          padding: "2px 8px",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          gap: 5,
          border: "1px solid #F4F4F0",
        }}
      >
        <span style={{ width: 6, height: 6, background: "#111111", borderRadius: 0 }} />
        {live ? "LIVE" : "DEMO"}
      </div>

      {/* Scrolling track */}
      <div
        className="ticker-track flex items-center"
        style={{
          display: "flex",
          gap: 0,
          paddingLeft: "120px",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 20px",
              borderRight: "1px solid #333333",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
            }}
            data-testid={i < items.length ? `ticker-item-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}` : undefined}
          >
            <span style={{ color: "#9A9A9A", fontSize: "9px", letterSpacing: ".18em" }}>{item.label}</span>
            <span style={{ color: "#F4F4F0", fontWeight: 700 }}>{item.value}</span>
            {item.change && (
              <span
                style={{
                  color: "#111111",
                  background: item.up ? "#00C853" : "#D50000",
                  padding: "1px 6px",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                {item.change}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
