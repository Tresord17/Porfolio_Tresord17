import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  PROFIL — c'est ici que l'on modifie l'essentiel du portfolio.
 *  Un champ laissé vide ("") masque automatiquement l'élément.
 * ─────────────────────────────────────────────────────────────
 */
export const profile = {
  firstName: "Brunel Trésor",
  lastName: "DSAMAGO JAFFO",
  initials: "BD",

  title: {
    fr: "Étudiant ingénieur en Cybersécurité et Investigation Numérique",
    en: "Cybersecurity & Digital Forensics Engineering Student",
  } satisfies L,

  tagline: {
    fr: "Passionné par la conception sécurisée, l'analyse de risques et le développement d'interfaces, je mets la rigueur de l'ingénieur au service de systèmes plus sûrs.",
    en: "Passionate about secure design, risk analysis and interface development, I bring an engineer's rigour to building safer systems.",
  } satisfies L,

  location: { fr: "Yaoundé, Cameroun", en: "Yaoundé, Cameroon" } satisfies L,

  /** Bandeau de disponibilité. Mettre "" pour le masquer. */
  availability: {
    fr: "À la recherche d'un stage en cybersécurité",
    en: "Looking for a cybersecurity internship",
  } satisfies L,

  about: {
    fr: [
      "Je suis en cinquième et dernière année du cycle ingénieur à l'École Nationale Supérieure Polytechnique de Yaoundé (ENSPY), dans la filière ==Cybersécurité et Investigation Numérique==.",
      "Mon terrain de jeu couvre tout le cycle de la sécurité : conception d'architectures réseau robustes, audit et analyse de risques, test d'intrusion et investigation numérique. J'aime ==comprendre un système en profondeur avant de le sécuriser==, puis documenter chaque étape avec rigueur.",
      "Je développe aussi des ==applications web et mobiles== (React, Next.js, Flutter, Django). Cette double compétence me donne une vision concrète des systèmes que je protège, et je recherche aujourd'hui un stage pour mettre en pratique mon goût pour la résolution de problèmes complexes et la conduite de projets techniques.",
    ],
    en: [
      "I am in the fifth and final year of the engineering programme at the National Advanced School of Engineering of Yaoundé (ENSPY), majoring in ==Cybersecurity and Digital Forensics==.",
      "My field covers the whole security lifecycle: designing resilient network architectures, auditing and risk analysis, penetration testing and digital forensics. I like to ==understand a system in depth before securing it==, then document every step rigorously.",
      "I also build ==web and mobile applications== (React, Next.js, Flutter, Django). This dual skill set gives me a hands-on view of the systems I protect, and I am now looking for an internship where I can apply my taste for solving complex problems and running technical projects.",
    ],
  } satisfies L<string[]>,

  interests: {
    fr: ["Veille technologique", "Lecture", "Jeux vidéo", "Films et séries", "Animés", "Football", "Découverte"],
    en: ["Tech watch", "Reading", "Video games", "Films & series", "Anime", "Football", "Exploring"],
  } satisfies L<string[]>,

  languages: [
    { name: { fr: "Français", en: "French" }, level: { fr: "Courant", en: "Fluent" }, value: 95 },
    { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire", en: "Intermediate" }, value: 60 },
  ],

  /** Coordonnées et liens. Laisser "" pour masquer. */
  email: "bruneltresor@gmail.com",
  whatsapp: "+237 651 61 93 27",
  linkedin: "https://www.linkedin.com/in/tresord17",
  github: "https://github.com/Tresord17",

  /**
   * Portrait : laissé vide, le haut de page affiche le terminal animé.
   * Pour remettre une photo, la déposer dans /public/images et indiquer son chemin,
   * ex. "/images/portrait.jpg" (elle apparaîtra en petit dans la barre du terminal).
   */
  photo: "",

  /** CV (dans /public/cv). Le CV n'existe qu'en français pour l'instant. */
  cv: { fr: "/cv/CV_Tresor_DSAMAGO.pdf", en: "/cv/CV_Tresor_DSAMAGO.pdf" } satisfies L,
};

/** Lignes du terminal animé du haut de page. */
export const terminal: L<{ kind: "cmd" | "out" | "ok" | "dir" | "gap"; text: string }[]> = {
  fr: [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: "brunel-tresor.dsamago-jaffo" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "cat profil.txt" },
    { kind: "out", text: "Étudiant ingénieur en cybersécurité" },
    { kind: "out", text: "et investigation numérique" },
    { kind: "out", text: "ENSPY · 5e année · Yaoundé" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "ls domaines/" },
    { kind: "dir", text: "dev/ ui-ux/ reseau/ audit/ pentest/ forensic/" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "./statut --stage" },
    { kind: "ok", text: "● disponible · stage en cybersécurité" },
  ],
  en: [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: "brunel-tresor.dsamago-jaffo" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "cat profile.txt" },
    { kind: "out", text: "Engineering student in cybersecurity" },
    { kind: "out", text: "and digital forensics" },
    { kind: "out", text: "ENSPY · 5th year · Yaoundé" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "ls domains/" },
    { kind: "dir", text: "dev/ ui-ux/ network/ audit/ pentest/ forensics/" },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "./status --internship" },
    { kind: "ok", text: "● available · cybersecurity internship" },
  ],
};

export const fullName = `${profile.firstName} ${profile.lastName}`;
export const whatsappLink = profile.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}` : "";
