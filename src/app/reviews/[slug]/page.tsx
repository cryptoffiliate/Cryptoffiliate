import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EXCHANGES, getExchangeBySlug } from "@/data/exchanges";
import { buildAffiliateUrl } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

// Generate all static paths at build time
export async function generateStaticParams() {
  return EXCHANGES.map((e) => ({ slug: e.slug }));
}

// Dynamic SEO metadata per exchange
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exchange = getExchangeBySlug(params.slug);
  if (!exchange) return {};
  return {
    title: `${exchange.name} Review 2025 — Fees, Safety & Our Verdict`,
    description: `Is ${exchange.name} safe? Our in-depth review covers fees (${exchange.makerFee}% maker / ${exchange.takerFee}% taker), security, supported coins, and exclusive signup bonuses.`,
    openGraph: {
      title: `${exchange.name} Review 2025`,
      description: `In-depth review of ${exchange.name}. Rating: ${exchange.rating}/5.`,
    },
  };
}

function StarRow({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-500"
            style={{ width: `${(score / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-900 w-8 text-right">
          {score}/5
        </span>
      </div>
    </div>
  );
}

export default function ReviewPage({ params }: Props) {
  const exchange = getExchangeBySlug(params.slug);
  if (!exchange) notFound();

  const affiliateUrl = buildAffiliateUrl(
    exchange.affiliateUrl,
    exchange.id,
    "review"
  );

  // Derived sub-scores (in a real build, these come from your data/CMS)
  const subScores = [
    { label: "Fees & pricing", score: exchange.makerFee <= 0.1 ? 4.8 : 3.8 },
    { label: "Security", score: exchange.usBased ? 4.5 : 4.0 },
    { label: "Ease of use", score: exchange.id === "coinbase" ? 4.9 : 4.2 },
    { label: "Coin selection", score: exchange.coins >= 300 ? 4.7 : 3.9 },
    { label: "Customer support", score: 3.8 },
  ];

  // JSON-LD schema for Google star ratings in SERPs
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "FinancialService",
      name: exchange.name,
      url: exchange.affiliateUrl,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: exchange.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: "Cryptoffiliate" },
    publisher: { "@type": "Organization", name: "Cryptoffiliate" },
    datePublished: exchange.lastUpdated,
    dateModified: exchange.lastUpdated,
  };

  return (
    <>
      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6 flex gap-1.5 items-center">
          <Link href="/" className="hover:text-slate-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/reviews" className="hover:text-slate-600">
            Reviews
          </Link>
          <span>/</span>
          <span className="text-slate-600">{exchange.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-black font-mono flex-shrink-0"
            style={{
              background: exchange.logoColor + "18",
              border: `2px solid ${exchange.logoColor}40`,
              color: exchange.logoColor,
            }}
          >
            {exchange.logo}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {exchange.name} review
              </h1>
              {exchange.badge && (
                <span
                  className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{
                    background: exchange.badgeColor! + "18",
                    color: exchange.badgeColor!,
                  }}
                >
                  {exchange.badge}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-0.5">{exchange.tagline}</p>
            <p className="text-xs text-slate-400 mt-1">
              Last updated: {exchange.lastUpdated} · Founded: {exchange.founded}{" "}
              · HQ: {exchange.headquarters}
            </p>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <p className="text-xs text-brand-500 bg-brand-50 border border-brand-100 rounded-lg px-3 py-2 mb-6">
          Affiliate disclosure: we may earn a commission if you sign up through
          links on this page, at no cost to you.
        </p>

        {/* Top CTA */}
        <div className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-semibold text-slate-900">
              Our verdict: {exchange.name} scores{" "}
              <span className="text-brand-500">{exchange.rating}/5</span>
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-0.5">
              🎁 {exchange.bonus}
            </p>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: exchange.logoColor }}
          >
            Visit {exchange.name} →
          </a>
        </div>

        {/* Score breakdown */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Score breakdown
          </h2>
          <div className="card px-5 py-3">
            {subScores.map((s) => (
              <StarRow key={s.label} label={s.label} score={s.score} />
            ))}
          </div>
        </section>

        {/* Key stats */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Key stats
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Maker fee", value: `${exchange.makerFee}%` },
              { label: "Taker fee", value: `${exchange.takerFee}%` },
              { label: "Coins listed", value: `${exchange.coins}+` },
              { label: "Min. deposit", value: exchange.minDeposit },
              { label: "Withdrawal fee", value: exchange.withdrawalFee },
              { label: "KYC", value: exchange.kyc === "required" ? "Required" : "Optional" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100"
              >
                <p className="text-base font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Pros & cons
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                Pros
              </p>
              <ul className="space-y-2">
                {exchange.best.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-4">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">
                Cons
              </p>
              <ul className="space-y-2">
                {exchange.kyc === "required" && (
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400 font-bold mt-0.5">✗</span>
                    Full KYC required
                  </li>
                )}
                {!exchange.usBased && (
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400 font-bold mt-0.5">✗</span>
                    Not available in the US
                  </li>
                )}
                {exchange.takerFee > 0.2 && (
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400 font-bold mt-0.5">✗</span>
                    Higher taker fees than competitors
                  </li>
                )}
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-red-400 font-bold mt-0.5">✗</span>
                  Customer support can be slow
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="card p-6 text-center">
          <p className="font-semibold text-slate-900 mb-1">
            Ready to get started with {exchange.name}?
          </p>
          <p className="text-sm text-slate-400 mb-4">
            Use our link to claim: {exchange.bonus}
          </p>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: exchange.logoColor }}
          >
            Open {exchange.name} account →
          </a>
          <p className="text-xs text-slate-400 mt-2">
            Affiliate link · {exchange.bonus}
          </p>
        </div>
      </div>
    </>
  );
}
