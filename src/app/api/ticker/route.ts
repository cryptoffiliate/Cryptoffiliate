export async function GET() {
  // Fallback data — replace with a live price API (CoinGecko, etc.) when ready
  const items = [
    { label: "BTC/USD",        value: "$107,240", change: "+2.4%", up: true  },
    { label: "ETH/USD",        value: "$3,841",   change: "+1.8%", up: true  },
    { label: "SOL/USD",        value: "$188",     change: "+3.1%", up: true  },
    { label: "BINANCE MAKER",  value: "0.10%",    change: "",      up: true  },
    { label: "OKX MAKER",      value: "0.08%",    change: "",      up: true  },
    { label: "KRAKEN MAKER",   value: "0.16%",    change: "",      up: true  },
    { label: "COINBASE TAKER", value: "0.60%",    change: "",      up: false },
  ];

  return Response.json({
    items,
    updated_at: new Date().toISOString(),
    source: "fallback",
  });
}
