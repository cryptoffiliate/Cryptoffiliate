import type { Metadata } from "next";
import { AIChat } from "@/components/AIChat";

export const metadata: Metadata = {
  title: "AI Advisor — Cryptoffiliate",
  description: "Ask our AI anything about crypto exchanges, wallets, fees, and more.",
};

export default function AIAdvisorPage() {
  return (
    <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <span className="eyebrow eyebrow-accent">§ AI ADVISOR · Powered by Claude</span>
        <h1 className="heading-lg" style={{ marginBottom: "32px" }}>
          Ask the <span className="italic-serif">AI</span> advisor
        </h1>
        <AIChat placeholder="Which exchange has the lowest fees for a $5,000 BTC trade?" />
      </div>
    </div>
  );
}
