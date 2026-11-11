"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type Props = {
  /** Describes the whole carousel for screen readers. */
  label: string;
  slides: { src: string; alt: string }[];
  previousLabel: string;
  nextLabel: string;
  /** e.g. "Slide {current} of {total}". */
  slideLabel: string;
  sizes: string;
};

/**
 * Instagram-style poster carousel: one slide at a time, arrow buttons (and the
 * keyboard arrow keys) to move, a "1 / 7" counter. No looping, like Instagram;
 * an arrow hides at the first/last slide.
 */
export function PosterCarousel({ label, slides, previousLabel, nextLabel, slideLabel, sizes }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const go = (next: number) => setIndex(Math.min(total - 1, Math.max(0, next)));
  const describe = (n: number) =>
    slideLabel.replace("{current}", String(n)).replace("{total}", String(total));

  // Hidden at the ends, but kept focusable (aria-disabled, not disabled) so
  // keyboard focus isn't lost when an arrow runs out of slides.
  const arrow =
    "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg shadow-black/30 transition-opacity hover:bg-white focus-visible:outline-cream aria-disabled:pointer-events-none aria-disabled:opacity-0 aria-disabled:focus-visible:opacity-40";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
      className="relative overflow-hidden rounded-2xl ring-1 ring-cream/10"
    >
      <div
        className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={describe(i + 1)}
            aria-hidden={i !== index}
            className="w-full shrink-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1080}
              height={1350}
              sizes={sizes}
              // Load the current and next slide ahead of time so moving
              // forward never shows an empty frame.
              loading={i <= index + 1 ? "eager" : "lazy"}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm"
      >
        {index + 1} / {total}
      </p>

      <button
        type="button"
        aria-label={previousLabel}
        aria-disabled={atStart}
        onClick={() => go(index - 1)}
        className={`${arrow} left-3`}
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        aria-disabled={atEnd}
        onClick={() => go(index + 1)}
        className={`${arrow} right-3`}
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  );
}
