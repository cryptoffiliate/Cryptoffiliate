export function buildAffiliateUrl(exchange: { affiliateUrl: string; id: string }): string {
  return exchange.affiliateUrl;
}

export function formatFee(fee: number): string {
  return `${(fee * 100).toFixed(2)}%`;
}
