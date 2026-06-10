"use client";

import { useState, useMemo } from "react";
import type { Exchange, SortKey, TableFilters } from "@/lib/types";
import { buildAffiliateUrl, formatCount } from "@/lib/utils";

// ─── Sub-components ──────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 12 12">
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

function KycPill({ kyc }: { kyc: Exchange["kyc"] }) {
  if (kyc === "required")
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
        KYC req.
      </span>
    );
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
      KYC opt.
    </span>
  );
}

function Check({ value }: { value: boolean }) {
  return value ? (
    <span className="text-emerald-500 text-base">✓</span>
  ) : (
    <span className="text-red-400 text-sm">✗</span>
  );
}

// ─── Expanded row detail ─────────────────────────────────────────────────────

function ExpandedRow({ exchange }: { exchange: Exchange }) {
  return (
    <tr className="bg-brand-50/30">
      <td colSpan={9} className="px-4 pb-4 pt-0">
        <div className="flex gap-3 flex-wrap pt-1">
          {/* Best for */}
          <div className="flex-1 min-w-44 bg-white rounded-xl border border-slate-100 p-3">
            <p className="section-label mb-2">Best for</p>
            <div className="flex flex-wrap gap-1.5">
              {exchange.best.map((b) => (
                <span
                  key={b}
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    background: exchange.logoColor + "12",
                    color: exchange.logoColor,
                    border: `1px solid ${exchange.logoColor}30`,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Affiliate details */}
          <div className="flex-1 min-w-44 bg-white rounded-xl border border-slate-100 p-3">
            <p className="section-label mb-2">Affiliate commission</p>
            <p className="text-sm font-semibold text-slate-900">
              {exchange.commission}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Min. deposit: {exchange.minDeposit} · Withdrawal:{" "}
              {exchange.withdrawalFee}
            </p>
          </div>

          {/* Features */}
          <div className="flex-1 min-w-44 bg-white rounded-xl border border-slate-100 p-3">
            <p className="section-label mb-2">Features</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-700">
              {[
                ["Staking", exchange.staking],
                ["Futures", exchange.futures],
                ["Fiat on-ramp", exchange.fiatOnRamp],
                ["US available", exchange.usBased],
              ].map(([label, val]) => (
                <div key={label as string} className="flex items-center gap-1.5">
                  <Check value={val as boolean} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main row ────────────────────────────────────────────────────────────────

function ExchangeRow({
  exchange,
  isExpanded,
  onToggle,
}: {
  exchange: Exchange;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [ctaHover, setCtaHover] = useState(false);
  const affiliateUrl = buildAffiliateUrl(
    exchange.affiliateUrl,
    exchange.id,
    "table"
  );

  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50 ${
          isExpanded ? "bg-brand-50/20" : ""
        }`}
      >
        {/* Name */}
        <td className="px-4 py-3.5 min-w-44">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black font-mono flex-shrink-0"
              style={{
                background: exchange.logoColor + "18",
                border: `1.5px solid ${exchange.logoColor}40`,
                color: exchange.logoColor,
              }}
            >
              {exchange.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-slate-900">
                  {exchange.name}
                </span>
                {exchange.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-semibold leading-none"
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
              <p className="text-xs text-slate-400 mt-0.5">{exchange.tagline}</p>
            </div>
          </div>
        </td>

        {/* Rating */}
        <td className="px-3 py-3.5 text-center">
          <Stars rating={exchange.rating} />
          <p className="text-xs text-slate-400 mt-0.5">
            {exchange.rating} ({formatCount(exchange.reviews)})
          </p>
        </td>

        {/* Maker fee */}
        <td className="px-3 py-3.5 text-center">
          <p className="font-semibold text-sm text-slate-900">
            {exchange.makerFee}%
          </p>
          <p className="text-xs text-slate-400">maker</p>
        </td>

        {/* Taker fee */}
        <td className="px-3 py-3.5 text-center">
          <p className="font-semibold text-sm text-slate-900">
            {exchange.takerFee}%
          </p>
          <p className="text-xs text-slate-400">taker</p>
        </td>

        {/* Coins */}
        <td className="px-3 py-3.5 text-center">
          <p className="font-semibold text-sm text-slate-900">
            {exchange.coins}+
          </p>
        </td>

        {/* KYC */}
        <td className="px-3 py-3.5 text-center">
          <KycPill kyc={exchange.kyc} />
        </td>

        {/* Fiat */}
        <td className="px-3 py-3.5 text-center">
          <Check value={exchange.fiatOnRamp} />
        </td>

        {/* Futures */}
        <td className="px-3 py-3.5 text-center">
          <Check value={exchange.futures} />
        </td>

        {/* CTA */}
        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border-[1.5px] transition-all whitespace-nowrap"
            style={{
              background: ctaHover ? exchange.logoColor : exchange.logoColor + "15",
              color: ctaHover ? "#fff" : exchange.logoColor,
              borderColor: exchange.logoColor + "50",
            }}
          >
            Visit {exchange.name}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 8L8 2M8 2H4M8 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {exchange.bonus}
          </p>
        </td>
      </tr>

      {isExpanded && <ExpandedRow exchange={exchange} />}
    </>
  );
}

// ─── Filter / sort bar ───────────────────────────────────────────────────────

const FILTER_OPTIONS: { key: keyof TableFilters; label: string }[] = [
  { key: "usBased", label: "US available" },
  { key: "fiatOnRamp", label: "Fiat on-ramp" },
  { key: "futures", label: "Futures" },
  { key: "staking", label: "Staking" },
  { key: "kycOptional", label: "No KYC" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Rating" },
  { key: "makerFee", label: "Maker fee" },
  { key: "takerFee", label: "Taker fee" },
  { key: "coins", label: "Coins" },
];

// ─── Main export ─────────────────────────────────────────────────────────────

export function ExchangeComparisonTable({
  exchanges,
}: {
  exchanges: Exchange[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortAsc, setSortAsc] = useState(false);
  const [filters, setFilters] = useState<TableFilters>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFilter = (key: keyof TableFilters) =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(key === "makerFee" || key === "takerFee");
    }
  };

  const filtered = useMemo(() => {
    let list = [...exchanges];
    if (filters.usBased) list = list.filter((e) => e.usBased);
    if (filters.fiatOnRamp) list = list.filter((e) => e.fiatOnRamp);
    if (filters.futures) list = list.filter((e) => e.futures);
    if (filters.staking) list = list.filter((e) => e.staking);
    if (filters.kycOptional) list = list.filter((e) => e.kyc !== "required");

    list.sort((a, b) => {
      const va = a[sortKey] as number;
      const vb = b[sortKey] as number;
      return sortAsc ? va - vb : vb - va;
    });

    return list;
  }, [exchanges, filters, sortKey, sortAsc]);

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Crypto exchange comparison
        </h1>
        <p className="text-sm text-slate-400">
          Updated June 2025 · {exchanges.length} exchanges ·{" "}
          <span className="affiliate-disclosure">
            Affiliate disclosure: we earn commissions through links on this page.
          </span>
        </p>
      </div>

      {/* Filter / sort bar */}
      <div className="flex flex-wrap gap-2 items-center mb-4 text-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Filter:
        </span>
        {FILTER_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`text-xs px-3 py-1.5 rounded-full border-[1.5px] font-medium transition-all ${
              filters[key]
                ? "bg-brand-50 text-brand-600 border-brand-400"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {filters[key] && "✓ "}
            {label}
          </button>
        ))}
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-2">
          Sort:
        </span>
        {SORT_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleSort(key)}
            className={`text-xs px-3 py-1.5 rounded-full border-[1.5px] font-medium transition-all ${
              sortKey === key
                ? "bg-brand-50 text-brand-600 border-brand-400"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {label}
            {sortKey === key && (sortAsc ? " ↑" : " ↓")}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Exchange
                </th>
                {SORT_OPTIONS.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors select-none ${
                      sortKey === key
                        ? "text-brand-500 border-b-2 border-brand-500"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {label}
                    {sortKey === key && (sortAsc ? " ↑" : " ↓")}
                  </th>
                ))}
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  KYC
                </th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Fiat
                </th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Futures
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Get started
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exchange) => (
                <ExchangeRow
                  key={exchange.id}
                  exchange={exchange}
                  isExpanded={expandedId === exchange.id}
                  onToggle={() =>
                    setExpandedId(
                      expandedId === exchange.id ? null : exchange.id
                    )
                  }
                />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-sm text-slate-400"
                  >
                    No exchanges match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-between text-xs text-slate-400">
          <span>Click any row to expand details · Fees shown are standard tier</span>
          <span>Last updated: June 2025</span>
        </div>
      </div>
    </div>
  );
}
