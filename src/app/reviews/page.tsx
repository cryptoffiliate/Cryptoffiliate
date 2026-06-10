import type { Metadata } from "next";
import Link from "next/link";
import { EXCHANGES } from "@/data/exchanges";

export const metadata: Metadata = {
  title: "Crypto Exchange Reviews 2025 — In-depth & Unbiased",
  description:
    "Detailed reviews of the top crypto exchanges. We test fees, security, UX, and customer support so you can choose with confidence.",
};

export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <p className="section-label">Updated June 2025</p>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
        Crypto exchange reviews
      </h1>
      <p className="text-slate-500 mb-8 text-sm leading-relaxed">
        We open real accounts, make real trades, and document every fee.
        Each review is updated when exchanges change their terms.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {EXCHANGES.map((exchange) => (
          <Link
            key={exchange.id}
            href={`/reviews/${exchange.slug}`}
            className="card p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black font-mono flex-shrink-0"
              style={{
                background: exchange.logoColor + "18",
                border: `1.5px solid ${exchange.logoColor}40`,
                color: exchange.logoColor,
              }}
            >
              {exchange.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900 text-sm">
                  {exchange.name} review
                </p>
                {exchange.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                    style={{
                      background: exchange.badgeColor! + "18",
                      color: exchange.badgeColor!,
                    }}
                  >
                    {exchange.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{exchange.tagline}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span>★ {exchange.rating}/5</span>
                <span>Maker: {exchange.makerFee}%</span>
                <span>{exchange.coins}+ coins</span>
              </div>
            </div>
            <svg
              className="text-slate-300 flex-shrink-0 mt-0.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
