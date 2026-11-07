import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/lib/i18n";
import { fullName, profile } from "@/content/profile";

/** Image d'aperçu générée au build (partage sur LinkedIn, WhatsApp…). */
export const alt = fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "fr";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", color: "#fff",
          background: "linear-gradient(160deg, #1b2559 0%, #131a42 60%, #0e1430 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: 18, background: "#fe7f00", color: "#1b2559",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 26, color: "#b9c0dd", display: "flex" }}>
            {lang === "fr" ? "> cybersécurité · investigation numérique" : "> cybersecurity · digital forensics"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, display: "flex" }}>{profile.firstName}</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#fe7f00", display: "flex" }}>{profile.lastName}</div>
          <div style={{ fontSize: 32, marginTop: 28, color: "#e8ebf5", display: "flex" }}>{profile.title[lang]}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#c9f6e2" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3ddc97", display: "flex" }} />
          {profile.availability[lang]}
        </div>
      </div>
    ),
    size,
  );
}
