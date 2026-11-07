import type { L } from "@/lib/i18n";

export type TimelineEntry = {
  kind: "education" | "experience";
  period: L;
  title: L;
  place: L;
  description: L;
  current?: boolean;
};

/** Parcours, du plus récent au plus ancien. */
export const timeline: TimelineEntry[] = [
  {
    kind: "experience",
    period: { fr: "Août – oct. 2026", en: "Aug – Oct 2026" },
    title: { fr: "Stagiaire préingénieur · Développeur web full-stack", en: "Pre-engineering intern · Full-stack web developer" },
    place: { fr: "Projet LSES Fighting · client privé (Cameroun / Royaume-Uni)", en: "LSES Fighting project · private client (Cameroon / UK)" },
    description: {
      fr: "Conception, développement et mise en production d'une plateforme web bilingue pour les sports de combat. J'ai pris en charge environ 75 % du développement dans un binôme.",
      en: "Design, development and release of a bilingual web platform for combat sports. I handled about 75% of the development within a two-person team.",
    },
  },
  {
    kind: "education",
    period: { fr: "Sept. 2022 – 2027", en: "Sep 2022 – 2027" },
    title: {
      fr: "Diplôme d'ingénieur · Cybersécurité et Investigation Numérique",
      en: "Engineering degree · Cybersecurity and Digital Forensics",
    },
    place: {
      fr: "École Nationale Supérieure Polytechnique de Yaoundé (ENSPY)",
      en: "National Advanced School of Engineering of Yaoundé (ENSPY)",
    },
    description: {
      fr: "Cinquième année en cours. Cours suivis : audit des systèmes d'information, investigation numérique, conception de réseaux, sécurité des réseaux et détection d'intrusion, gestion de projets, systèmes d'exploitation, programmation, intelligence artificielle et droit de l'informatique.",
      en: "Currently in fifth year. Courses include information systems audit, digital forensics, network design, network security and intrusion detection, project management, operating systems, programming, artificial intelligence and IT law.",
    },
    current: true,
  },
  {
    kind: "education",
    period: { fr: "Sept. 2015 – juil. 2022", en: "Sep 2015 – Jul 2022" },
    title: { fr: "Baccalauréat C, mention Assez Bien", en: "Baccalaureate, series C (maths & physics), with honours" },
    place: { fr: "Lycée Bilingue de Mbouda", en: "Lycée Bilingue de Mbouda (bilingual high school)" },
    description: {
      fr: "Formation secondaire à dominante mathématiques et sciences physiques.",
      en: "Secondary education focused on mathematics and physical sciences.",
    },
  },
];
