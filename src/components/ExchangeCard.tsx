import Link from "next/link";
import type { Exchange } from "@/lib/types";
import { buildAffiliateUrl } from "@/lib/utils";

interface Props {
  exchange: Exchange;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={s <= Math.round(rating) ? "#F0B90B" : "none"}
            stroke="#F0B90B"
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </span>
  );
}

export function ExchangeCard({ exchange }: Props) {
  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
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
          <div>
            <p className="font-semibold text-slate-900 text-sm">
              {exchange.name}
            </p>
            <p className="text-xs text-slate-400">{exchange.tagline}</p>
          </div>
        </div>
        {exchange.badge && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
            style={{
              background: exchange.badgeColor! + "18",
              color: exchange.badgeColor!,
              border: `1px solid ${exchange.badgeColor}40`,
            }}
          >
            {exchange.badge}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Stars rating={exchange.rating} />
        <span className="text-sm font-semibold text-slate-900">
          {exchange.rating}
        </span>
        <span className="text-xs text-slate-400">
          ({(exchange.reviews / 1000).toFixed(1)}k reviews)
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Maker fee", value: `${exchange.makerFee}%` },
          { label: "Coins", value: `${exchange.coins}+` },
          { label: "Min deposit", value: exchange.minDeposit },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-slate-50 rounded-lg p-2 text-center"
          >
            <p className="text-xs font-semibold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Bonus */}
      <p className="text-xs text-emerald-600 font-medium bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-100">
        🎁 {exchange.bonus}
      </p>

      {/* CTAs */}
      <div className="flex gap-2 mt-auto">
        <a
          href={buildAffiliateUrl(exchange.affiliateUrl, exchange.id, "table")}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 text-center text-sm font-semibold py-2 px-3 rounded-lg transition-colors text-white"
          style={{ background: exchange.logoColor }}
        >
          Visit {exchange.name}
        </a>
        <Link
          href={`/reviews/${exchange.slug}`}
          className="btn-outline text-xs px-3"
        >
          Review
        </Link>
      </div>
    </div>
  );
}
