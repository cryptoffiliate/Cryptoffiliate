export interface Exchange {
  id: string;
  name: string;
  logo?: string;
  accentColor: string;
  logoColor: string;
  recommended?: boolean;
  description?: string;
  rating: number;
  reviewCount: number;
  makerFee: number;
  takerFee: number;
  withdrawalFee: string;
  supported: string[];
  highlights: string[];
  affiliateUrl: string;
  bonusText?: string;
  bonus?: string;
  reviewSlug?: string;
}
