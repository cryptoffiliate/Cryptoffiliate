import type { Metadata } from "next";
import Link from "next/link";
import { EXCHANGES } from "@/data/exchanges";
import { ExchangeCard } from "@/components/ExchangeCard";

export const metadata: Metadata = {
  title: "Best Crypto Exchange Reviews & Comparisons 2025",
  description:
    "Compare crypto exchanges side-by-side. Independent reviews, live fee comparisons, and exclusive signup bonuses.",
};

export default function HomePage() {
  const topPicks = EXCHANGES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <p className="section-label mb-4">Unbiased · Updated monthly</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
            Find the best crypto exchange
            <br />
            <span className="text-brand-500">for your needs</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
            We compare fees, security, supported coins, and signup bonuses
            across {EXCHANGES.length} major exchanges so you don't have to.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/compare" className="btn-primary px-6 py-3 text-sm">
              Compare all exchanges →
            </Link>
            <Link
              href="/quiz"
              className="btn-outline px-6 py-3 text-sm"
            >
              Find my exchange →
            </Link>
            <Link
              href="/tools/fee-calculator"
              className="btn-outline px-6 py-3 text-sm"
            >
              Calculate my fees
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 justify-center mt-10 text-sm text-slate-400">
            <span>✓ {EXCHANGES.length} exchanges reviewed</span>
            <span>✓ Updated June 2025</span>
            <span>✓ Independent ratings</span>
            <span>✓ FTC-compliant disclosure</span>
          </div>
        </div>
      </section>

      {/* Top picks */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Editor's top picks</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Best exchanges right now
            </h2>
          </div>
          <Link href="/compare" className="btn-outline text-sm">
            See all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {topPicks.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>
      </section>

      {/* Why trust us */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <p className="section-label text-center">Why cryptoffiliate</p>
          <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-10">
            Reviews you can actually trust
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔍",
                title: "Independent testing",
                desc: "We open real accounts and test every exchange ourselves before reviewing.",
              },
              {
                icon: "📊",
                title: "Live fee data",
                desc: "Fee tables are auto-updated nightly from exchange APIs — never stale.",
              },
              {
                icon: "📣",
                title: "Transparent disclosure",
                desc: "We earn commissions through affiliate links. It never affects our star ratings.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-4 py-14 text-center">
        <div className="bg-brand-50 rounded-2xl border border-brand-100 px-8 py-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
            Ready to find your exchange?
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Use our comparison tool to filter by fees, KYC, fiat support, and
            more.
          </p>
          <Link href="/compare" className="btn-primary px-6 py-3">
            Open comparison table →
          </Link>
        </div>
      </section>
    </>
  );
}
