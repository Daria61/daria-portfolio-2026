import { Marck_Script } from "next/font/google";
import Link from "next/link";
import { phone } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ArrowUpRightIcon } from "./icons";

// Handwritten font for the decorative outline text only. It sits below the
// fold, so it isn't preloaded.
const scriptFont = Marck_Script({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  preload: false,
});

export function ContactSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const text = dict.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden px-4 pt-20 pb-10 text-center sm:px-8 sm:pt-28"
    >
      {/* Dotted texture, fading out at the top and bottom edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(244_243_234/0.08)_1px,transparent_1.5px)] bg-size-[18px_18px] mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
      />

      <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-cream/60">
        ( {text.eyebrow} )
      </p>

      <h2
        id="contact-title"
        className="mx-auto mt-6 max-w-5xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-black tracking-[-0.045em] text-balance"
      >
        {text.title}
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-balance text-cream/60 sm:text-lg">
        {text.text}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={phone.href}
          className="inline-flex h-14 items-center gap-3 rounded-full bg-cream px-8 text-lg font-semibold whitespace-nowrap text-ink tabular-nums transition-colors hover:bg-white"
        >
          {phone.display}
          <ArrowUpRightIcon className="size-5" />
        </a>
        <Link
          href={`/${lang}#experience`}
          className="inline-flex h-14 items-center rounded-full border border-line px-8 text-lg font-semibold whitespace-nowrap transition-colors hover:border-cream/70"
        >
          {text.secondary}
        </Link>
      </div>

      <p
        aria-hidden="true"
        className={`${scriptFont.className} text-outline mt-14 text-[clamp(5rem,17vw,15rem)] leading-[1.15] whitespace-nowrap select-none sm:mt-16`}
      >
        {text.script}
      </p>
    </section>
  );
}
