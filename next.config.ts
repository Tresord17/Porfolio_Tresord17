import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Politique de sécurité du contenu (CSP).
// Le site est 100 % statique : aucun script ni ressource tiers.
// 'unsafe-inline' reste nécessaire pour les scripts d'hydratation de Next.js
// sur des pages statiques (l'alternative par nonce imposerait un rendu dynamique).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { globalNotFound: true, agentUpgrade: "security" },
  async headers() {
    return isProd ? [{ source: "/:path*", headers: securityHeaders }] : [];
  },
  async redirects() {
    return [
      // Visiteur dont la langue principale du navigateur est l'anglais → /en
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "^en.*" }],
        destination: "/en",
        permanent: false,
      },
      // Tous les autres → /fr (langue par défaut)
      { source: "/", destination: "/fr", permanent: false },
    ];
  },
};

export default nextConfig;
