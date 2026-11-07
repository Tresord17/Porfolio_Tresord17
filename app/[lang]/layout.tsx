import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import "../effects.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Effects } from "@/components/Effects";
import { themeInitScript } from "@/lib/theme-script";
import { hasLocale, locales, siteUrl } from "@/lib/i18n";
import { getDict } from "@/content/ui";
import { fullName, profile } from "@/content/profile";

// Polices auto-hébergées (aucune requête vers un service tiers)
const inter = localFont({ src: "../fonts/Inter-Variable.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../fonts/JetBrainsMono-Variable.woff2", variable: "--font-mono", weight: "100 800", display: "swap", preload: false });
const display = localFont({ src: "../fonts/BricolageGrotesque-Variable.woff2", variable: "--font-display", weight: "200 800", display: "swap" });
const serif = localFont({ src: "../fonts/InstrumentSerif-Italic.woff2", variable: "--font-serif", weight: "400", style: "italic", display: "swap", preload: false });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#161f4c" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1429" },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${fullName} · ${profile.title[lang]}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${fullName}` },
    description: profile.tagline[lang],
    authors: [{ name: fullName }],
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", en: "/en", "x-default": "/fr" } },
    openGraph: {
      type: "profile",
      title,
      description: profile.tagline[lang],
      url: `/${lang}`,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      siteName: fullName,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${mono.variable} ${display.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Applique le thème choisi avant le premier affichage (pas de flash) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">{dict.skip}</a>
        <Header lang={lang} dict={dict} initials={profile.initials} />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer dict={dict} />
        <BackToTop label={dict.backToTop} />
        <Effects />
      </body>
    </html>
  );
}
