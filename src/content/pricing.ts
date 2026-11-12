import type en from "@/i18n/dictionaries/en.json";

// Each package's text (name, who it's for, features, ...) lives in the
// dictionaries under pricing.packages.<id>, in both languages.
type PackageId = keyof (typeof en)["pricing"]["packages"];

export type Package = {
  id: PackageId;
  /** One-time price range in tögrög. */
  price: [from: number, to: number];
  /** Highlighted as "Most popular". */
  featured?: boolean;
};

export const packages: Package[] = [
  { id: "starter", price: [650_000, 800_000] },
  { id: "business", price: [1_300_000, 1_600_000], featured: true },
  { id: "premium", price: [2_200_000, 2_800_000] },
];

// Poster packages: text under pricing.posters.packages.<id> in the dictionaries.
type PosterPackageId = keyof (typeof en)["pricing"]["posters"]["packages"];

export type PosterPackage = {
  id: PosterPackageId;
  /** Price in tögrög, per poster or per month. */
  price: number;
  unit: "poster" | "month";
  /** Monthly packs: rounded price per poster, shown as "≈58,000₮ per poster". */
  perPoster?: number;
  /** Highlighted as "Best seller". */
  featured?: boolean;
};

export const posterPackages: PosterPackage[] = [
  { id: "single", price: 70_000, unit: "poster" },
  { id: "starter", price: 350_000, unit: "month", perPoster: 58_000 }, // 6 posters
  { id: "growth", price: 600_000, unit: "month", perPoster: 50_000, featured: true }, // 12 posters
];
