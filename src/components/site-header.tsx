import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";
import { SparkleIcon } from "./sparkle-icon";

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function SiteHeader({ lang, dict }: Props) {
  const links = [
    { href: `/${lang}#about`, label: dict.nav.about },
    { href: `/${lang}#work`, label: dict.nav.work },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    // Sticky: stays at the top while scrolling, over a blurred, mostly-opaque
    // background so the page reads cleanly underneath. Its height (about
    // 136px on phones, 160px at 640–767px, 100px from 768px) is mirrored by
    // scroll-padding-top in globals.css so anchor links land below it.
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-y-3 bg-ink/80 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-6">
      <Link
        href={`/${lang}`}
        aria-label={dict.nav.home}
        className="inline-flex h-12 items-center gap-2.5 justify-self-start rounded-full border border-line px-6 text-base font-semibold tracking-tight transition-colors hover:border-cream/70"
      >
        <SparkleIcon className="size-4" />
        Daria
      </Link>

      <nav aria-label={dict.nav.label} className="order-last w-full md:order-none md:w-auto">
        <ul className="flex h-[52px] items-center rounded-full bg-cream px-1.5 text-ink">
          {links.map((link) => (
            <li key={link.href} className="flex-1 md:flex-none">
              <Link
                href={link.href}
                className="flex h-10 items-center justify-center whitespace-nowrap rounded-full px-1.5 text-sm font-semibold tracking-tight transition-colors hover:bg-ink/[0.07] focus-visible:outline-ink focus-visible:outline-offset-0 min-[375px]:px-3 min-[375px]:text-[15px] md:px-[22px] md:text-base"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <LanguageSwitcher
        current={lang}
        label={dict.language.label}
        className="justify-self-end"
      />
    </header>
  );
}
