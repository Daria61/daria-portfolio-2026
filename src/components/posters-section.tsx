import Image from "next/image";
import { posters } from "@/content/posters";
import type { Dictionary } from "@/i18n/get-dictionary";
import { PosterCarousel } from "./poster-carousel";
import { SectionHeading } from "./section-heading";

const POSTER_SIZES =
  "(min-width: 1332px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw";

export function PostersSection({ dict }: { dict: Dictionary }) {
  const text = dict.posters;

  return (
    <section
      id="posters"
      aria-labelledby="posters-title"
      className="mx-auto w-full max-w-[1332px] scroll-mt-6 px-4 pt-24 sm:px-8 sm:pt-32"
    >
      <SectionHeading
        id="posters-title"
        eyebrow={text.eyebrow}
        title={text.title}
        intro={text.intro}
      />

      {/* Phones: a swipeable row of large posters (the next one peeks in).
          640px+: a grid, 2 columns then 3. */}
      <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-16 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {posters.map((poster) => (
          <li key={poster.id} className="w-[78%] shrink-0 snap-center sm:w-auto">
            {poster.slides ? (
              <PosterCarousel
                label={text.items[poster.id]}
                slides={poster.slides.map((src, i) => ({
                  src,
                  alt: text.slides[poster.id][i] ?? text.items[poster.id],
                }))}
                previousLabel={text.carousel.previous}
                nextLabel={text.carousel.next}
                slideLabel={text.carousel.slide}
                sizes={POSTER_SIZES}
              />
            ) : (
              <Image
                src={poster.src}
                alt={text.items[poster.id]}
                width={1080}
                height={1350}
                sizes={POSTER_SIZES}
                className="h-auto w-full rounded-2xl ring-1 ring-cream/10"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
