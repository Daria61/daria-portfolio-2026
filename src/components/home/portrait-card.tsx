import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";

export function PortraitCard({ dict }: { dict: Dictionary }) {
  return (
    // Phones: full-width card above the info cards.
    // 640–1279px: left column, keeps its ratio and stays in view while the cards scroll.
    // 1280px+: 510px column that stretches to the cards' height.
    <div className="@container relative aspect-[73/100] w-full overflow-hidden rounded-[28px] bg-cream/5 sm:sticky sm:top-[11.5rem] sm:self-start md:top-32 xl:relative xl:top-auto xl:aspect-auto xl:min-h-[699px] xl:self-stretch">
      {/* Positioned layer for the image: next/image `fill` needs an absolute/relative
          parent, and the card itself is `sticky` on mid-size screens. */}
      <div className="absolute inset-0">
        <Image
          src="/daria-pic.JPG"
          alt={dict.hero.photoAlt}
          fill
          sizes="(min-width: 1280px) 510px, (min-width: 640px) 40vw, calc(100vw - 32px)"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[50%_40%]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/90 via-black/45 to-transparent"
      />

      {/* Text scales with the card's own width so it fits the narrow column too. */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 @min-[300px]:px-6 @min-[300px]:pb-7 @min-[440px]:px-8 @min-[440px]:pb-9">
        <h1
          id="hero-name"
          className="text-xl font-medium uppercase tracking-tight text-white @min-[300px]:text-2xl @min-[440px]:text-[26px]"
        >
          {dict.hero.name}
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase text-white/90 @min-[300px]:mt-3 @min-[300px]:text-[13px] @min-[440px]:text-sm">
          {dict.hero.role}
        </p>
      </div>
    </div>
  );
}
