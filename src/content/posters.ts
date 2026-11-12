import type en from "@/i18n/dictionaries/en.json";

// Each poster's description (alt text) lives in the dictionaries under
// posters.items.<id>, in both languages. Carousels also have one description
// per slide under posters.slides.<id>.
type PosterId = keyof (typeof en)["posters"]["items"];
type CarouselId = keyof (typeof en)["posters"]["slides"];

/** A single poster, or an Instagram-style carousel of several slides. */
export type Poster =
  | { id: PosterId; src: string; slides?: never }
  | { id: CarouselId; slides: string[]; src?: never };

// All posters are 4:5 (Instagram post size), shown in this order: a 3-column
// grid on desktop, 2 columns on tablets, a swipeable row on phones.
export const posters: Poster[] = [
  { id: "karate", src: "/posters/karate-open-class.webp" }, // light
  {
    // "8 цаг хөдөлмөрлөөд… 8 цаг оочирлов." — night photos, white frame
    id: "eight-hours",
    slides: ["01-work.webp", "02-queue.webp"].map((file) => `/posters/8-hours/${file}`),
  },
  { id: "step-into-college", src: "/posters/Instagram post - 4.png" }, // light
  { id: "stoic-sat", src: "/posters/stoic-sat.webp" }, // light blue, dark bottom
  {
    // cream
    id: "save-coffee",
    // Slide 1 was rendered from "Instagram post - 17.pdf", slides 2–7 from the
    // matching PDFs 18–23 (browsers can't show a PDF as an image).
    slides: [17, 18, 19, 20, 21, 22, 23].map((n) => `/posters/Instagram post - ${n}.png`),
  },
  { id: "karate-academics", src: "/posters/karate-academics.webp" }, // dark blue
];
