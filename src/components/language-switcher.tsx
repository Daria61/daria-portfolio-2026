"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/i18n/config";

type Props = {
  current: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ current, label, className = "" }: Props) {
  const pathname = usePathname();

  // Swap the first path segment: /en/work -> /mn/work
  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex h-12 items-center gap-3.5 rounded-full border border-line px-4">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={hrefFor(locale)}
                hrefLang={locale}
                lang={locale}
                title={localeNames[locale]}
                aria-current={active ? "true" : undefined}
                className={`block rounded-full px-2.5 py-1 font-mono text-sm font-bold transition-colors ${
                  active ? "text-cream" : "text-cream/40 hover:text-cream"
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
