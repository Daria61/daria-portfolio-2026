import type en from "@/i18n/dictionaries/en.json";

// Each project's text (title, tags, location, cover description) lives in the
// dictionaries under work.items.<id>, in both languages.
type ProjectId = keyof (typeof en)["work"]["items"];

type Size = { width: number; height: number };

type Logo = {
  src: string;
  /** Twice as wide as tall (e.g. Mbank, Toki); takes two grid columns. */
  wide?: boolean;
};

/**
 * What a project card shows. Every card sits on the same background
 * (set in work-section.tsx), so covers should not bring their own.
 * - `screens`: app screenshots side by side (phones).
 * - `logos`: a wall of logos.
 * - `image` + `frame`: a website screenshot shown as a rounded window.
 */
type Cover =
  | { screens: (Size & { src: string })[]; logos?: never; image?: never; frame?: never }
  | { logos: Logo[]; screens?: never; image?: never; frame?: never }
  | { image: string; frame: Size; screens?: never; logos?: never };

export type Project = Cover & {
  id: ProjectId;
  /** Optional link (store page, live site, case study). Adds the ↗ button. */
  href?: string;
};

export const projects: Project[] = [
  {
    id: "billcenter",
    screens: [
      { src: "/work/billcenter/screen-login.png", width: 360, height: 800 },
      { src: "/work/billcenter/screen-bills.png", width: 360, height: 800 },
      { src: "/work/billcenter/screen-payment.png", width: 360, height: 800 },
    ],
  },
  {
    id: "integration",
    // Companies connected to the integration service, in two rows of
    // one wide logo + three square ones.
    logos: [
      { src: "/work/integration/mbank-logo.png", wide: true },
      { src: "/work/integration/logo-gold.png" },
      { src: "/work/integration/ubedn.png" },
      { src: "/work/integration/logo-green-swirl.png" },
      { src: "/work/integration/toki-logo.png", wide: true },
      { src: "/work/integration/skymedia.png" },
      { src: "/work/integration/logo-green-play.png" },
      { src: "/work/integration/mostmoney.png" },
    ],
  },
  {
    id: "stoic",
    image: "/work/stoic-academy-homepage.jpg",
    frame: { width: 1600, height: 777 },
    href: "https://academy.stoic.education/",
  },
  {
    id: "pinebaatar",
    image: "/work/pinebaatar-homepage.jpg",
    frame: { width: 1600, height: 944 },
    href: "https://pinebaatar.pinecone.mn/",
  },
];
