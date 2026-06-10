export interface Exchange {
  id: string;
  name: string;
  logo?: string;
  accentColor: string;
  logoColor: string;
  rating: number;
  reviewCount: number;
  makerFee: number;
  takerFee: number;
  withdrawalFee: string;
  supported: string[];
  highlights: string[];
  affiliateUrl: string;
  bonusText?: string;
}
