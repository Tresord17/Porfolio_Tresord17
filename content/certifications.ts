import type { L } from "@/lib/i18n";

export type Certification = { name: string; issuer: string; year: string; url: string; note?: L };

export const certifications: Certification[] = [
  {
    name: "Fortinet Certified Associate Cybersecurity",
    issuer: "Fortinet",
    year: "2025",
    url: "https://www.credly.com/badges/14184a15-5e0e-49ac-9802-6fae0d917da6/public_url",
  },
  {
    name: "Fortinet Certified Fundamentals Cybersecurity",
    issuer: "Fortinet",
    year: "2025",
    url: "https://www.credly.com/badges/ea53a5f2-a58e-4a0e-ba6d-c4d739989198/public_url",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2026",
    url: "https://www.credly.com/badges/cd0e856b-cba6-4d6d-abe8-bf772a5391a1/public_url",
  },
];
