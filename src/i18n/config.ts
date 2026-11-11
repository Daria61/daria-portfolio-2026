export const locales = ["mn", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
};

/** Remembers the visitor's last chosen language for visits to "/". */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}
