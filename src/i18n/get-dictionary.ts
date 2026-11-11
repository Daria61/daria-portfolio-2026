import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  mn: () => import("./dictionaries/mn.json").then((module) => module.default),
};

/** The locale of the current route (the `[lang]` segment). */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
