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

// All posters are 4:5 (Instagram post size). The two dark posters sit in the
// middle column (positions 2 and 5) so each desktop row reads light, dark,
// light. With four light posters, one 2-column (tablet) row pairs two lights.
export const posters: Poster[] = [
  { id: "karate", src: "/posters/karate-open-class.webp" }, // light
  {
    // dark blue/green
    id: "stoic-journey",
    slides: [
      "01-dream.webp",
      "02-2022.webp",
      "03-2022-universities.png",
      "04-2023.webp",
      "05-2023-universities.png",
      "06-2024.webp",
      "07-2024-universities.png",
      "08-2025.webp",
      "09-2025-universities.png",
      "10-achievement.webp",
    ].map((file) => `/posters/stoic-journey/${file}`),
  },
  { id: "step-into-college", src: "/posters/Instagram post - 4.png" }, // light
  {
    // cream
    id: "save-coffee",
    // Slide 1 was rendered from "Instagram post - 17.pdf", slides 2–7 from the
    // matching PDFs 18–23 (browsers can't show a PDF as an image).
    slides: [17, 18, 19, 20, 21, 22, 23].map((n) => `/posters/Instagram post - ${n}.png`),
  },
  { id: "coffee-cat", src: "/posters/Instagram post - 29.png" }, // orange
  { id: "stand-for-nothing", src: "/posters/stand-for-nothing.webp" }, // beige
];
