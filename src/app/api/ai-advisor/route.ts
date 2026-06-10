import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the Cryptoffiliate AI Advisor — a straight-talking, independent crypto intelligence assistant. You help users find the right crypto exchange, hardware wallet, tax software, VPN, trading bot, or cloud mining service for their specific situation.

Key rules:
- Give direct, personalised recommendations — not generic lists
- Mention fees, pros/cons, and who each product is best for
- Never recommend something just because it pays higher commissions
- Be concise but thorough — 2-4 paragraphs max per response
- If you don't know something, say so — never fabricate data
- Focus on: Binance, Coinbase, Kraken, OKX, Bybit (exchanges); Ledger, Trezor (wallets); Koinly, CoinLedger, ZenLedger (tax); NordVPN, ExpressVPN (VPNs); 3Commas, WunderTrading (bots)`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await client.messages.stream({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages,
          });

          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ type: "delta", text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          const data = JSON.stringify({ type: "error", message: msg });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
