import Link from "next/link";

const FOOTER_LINKS = {
  "Exchanges": [
    { href: "/reviews/binance", label: "Binance review" },
    { href: "/reviews/coinbase", label: "Coinbase review" },
    { href: "/reviews/kraken", label: "Kraken review" },
    { href: "/reviews/bybit", label: "Bybit review" },
    { href: "/reviews/okx", label: "OKX review" },
  ],
  "Tools": [
    { href: "/compare", label: "Exchange comparison" },
    { href: "/tools/fee-calculator", label: "Fee calculator" },
    { href: "/bonuses", label: "Signup bonuses" },
  ],
  "Site": [
    { href: "/about", label: "About" },
    { href: "/disclosure", label: "Affiliate disclosure" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-bold text-slate-900 mb-2">
              crypto<span className="text-brand-500">ffiliate</span>
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Independent crypto exchange reviews, comparisons, and tools since
              2025.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                {group}
              </p>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
            <strong className="text-slate-500">Affiliate disclosure:</strong>{" "}
            Cryptoffiliate.com earns commissions when you sign up or trade
            through links on this site, at no extra cost to you. This never
            influences our ratings — exchanges are evaluated independently.
            Crypto investments carry significant risk. Not financial advice.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            © {new Date().getFullYear()} Cryptoffiliate.com · All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
