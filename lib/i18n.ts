export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Texte disponible dans les deux langues. */
export type L<T = string> = { fr: T; en: T };

export const otherLocale = (lang: Locale): Locale => (lang === "fr" ? "en" : "fr");

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://brunel-dsamago.vercel.app").replace(/\/$/, "");
