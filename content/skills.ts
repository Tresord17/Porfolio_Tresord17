import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";
export type { IconName };

export type SkillGroup = {
  /** Identifiant (utilisé dans la vue « Code »). */
  key: string;
  icon: IconName;
  title: L;
  items: L<string[]>;
  tools: string[];
  /** Carte mise en avant (sur deux colonnes, badge « Point fort »). */
  featured?: boolean;
  /** Petite illustration animée dans la carte. */
  deco?: "docs" | "ui";
};

export const skills: SkillGroup[] = [
  {
    key: "dev",
    icon: "code",
    featured: true,
    title: { fr: "Développement web et mobile", en: "Web & mobile development" },
    items: {
      fr: [
        "Applications web full-stack avec Next.js, React et TypeScript",
        "Applications mobiles multiplateformes avec Flutter",
        "API et back-ends : Django, Supabase / PostgreSQL, Firebase",
        "Authentification, gestion des rôles et contrôle d'accès côté serveur",
        "Signature électronique et cryptographie appliquée",
        "Mise en production et hébergement",
      ],
      en: [
        "Full-stack web apps with Next.js, React and TypeScript",
        "Cross-platform mobile apps with Flutter",
        "APIs and back-ends: Django, Supabase / PostgreSQL, Firebase",
        "Authentication, role management and server-side access control",
        "Electronic signatures and applied cryptography",
        "Deployment and hosting",
      ],
    },
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "Django", "Python", "Supabase", "PostgreSQL", "Firebase", "Git"],
  },
  {
    key: "uiux",
    icon: "layout",
    deco: "ui",
    title: { fr: "UI / UX design", en: "UI / UX design" },
    items: {
      fr: [
        "Maquettes mobile-first et prototypes haute fidélité",
        "Interfaces responsives, accessibles et bilingues",
        "Chartes graphiques, typographie et composants réutilisables",
        "Thèmes clair et sombre, micro-interactions",
      ],
      en: [
        "Mobile-first mockups and high-fidelity prototypes",
        "Responsive, accessible and bilingual interfaces",
        "Visual identities, typography and reusable components",
        "Light and dark themes, micro-interactions",
      ],
    },
    tools: ["Maquettage", "Prototypage", "CSS", "Accessibilité (WCAG)"],
  },
  {
    key: "reseau",
    icon: "network",
    title: { fr: "Réseau et infrastructure", en: "Network & infrastructure" },
    items: {
      fr: [
        "Architectures hiérarchiques 3 et 4 tiers",
        "Haute disponibilité : VRRP, MST, agrégation de liens",
        "Segmentation VLAN, routage dynamique, NAT/PAT",
        "Durcissement des équipements d'accès",
      ],
      en: [
        "3- and 4-tier hierarchical architectures",
        "High availability: VRRP, MST, link aggregation",
        "VLAN segmentation, dynamic routing, NAT/PAT",
        "Access device hardening",
      ],
    },
    tools: ["Cisco IOS", "EVE-NG", "GNS3", "Fortinet", "Ubuntu Server"],
  },
  {
    key: "audit",
    icon: "scale",
    title: { fr: "Audit, risques et conformité", en: "Audit, risk & compliance" },
    items: {
      fr: [
        "Audit de sécurité selon ISO/IEC 27001",
        "Analyse de risques EBIOS Risk Manager",
        "Cartographie des risques et plans de traitement",
        "Gestion de crise",
      ],
      en: [
        "Security audits against ISO/IEC 27001",
        "EBIOS Risk Manager risk analysis",
        "Risk mapping and treatment plans",
        "Crisis management",
      ],
    },
    tools: ["ISO 27001", "EBIOS RM", "Excel"],
  },
  {
    key: "pentest",
    icon: "shield",
    title: { fr: "Test d'intrusion", en: "Penetration testing" },
    items: {
      fr: [
        "Méthodologie de test d'intrusion (CEH v13)",
        "Évaluation de systèmes Windows et Linux en laboratoire isolé",
        "Recommandations de détection et de remédiation",
      ],
      en: [
        "Penetration testing methodology (CEH v13)",
        "Assessment of Windows and Linux systems in an isolated lab",
        "Detection and remediation advice",
      ],
    },
    tools: ["Parrot Security", "Metasploit", "VMware"],
  },
  {
    key: "forensic",
    icon: "search",
    title: { fr: "Investigation numérique", en: "Digital forensics" },
    items: {
      fr: [
        "Acquisition et analyse de terminaux Android",
        "Préservation de la preuve et traçabilité",
        "Reconstitution chronologique des événements",
      ],
      en: [
        "Android device acquisition and analysis",
        "Evidence preservation and chain of custody",
        "Event timeline reconstruction",
      ],
    },
    tools: ["Autopsy", "ADB", "Andriller CE", "ALEAPP"],
  },
  {
    key: "redaction",
    icon: "doc",
    deco: "docs",
    title: { fr: "Rédaction technique", en: "Technical writing" },
    items: {
      fr: [
        "LaTeX : rapports et documents avec feuille de style personnelle",
        "Word niveau expert : styles, modèles, tables et sommaires automatiques",
        "Dossiers DAT, DTA, DEX et plans de tests",
        "Rapports d'audit, d'expertise et de stage",
      ],
      en: [
        "LaTeX: reports and documents with a custom style sheet",
        "Expert-level Word: styles, templates, automatic tables and contents",
        "Architecture, technical and operations files, test plans",
        "Audit, forensic and internship reports",
      ],
    },
    tools: ["LaTeX", "Word", "Visio", "PowerPoint"],
  },
  {
    key: "systemes",
    icon: "terminal",
    title: { fr: "Systèmes et langages", en: "Systems & languages" },
    items: {
      fr: [
        "Administration et dépannage Windows et Linux",
        "Programmation Python, Java et C",
        "Serveurs Ubuntu",
      ],
      en: [
        "Windows and Linux administration and troubleshooting",
        "Programming in Python, Java and C",
        "Ubuntu servers",
      ],
    },
    tools: ["Linux", "Windows", "Ubuntu Server", "Python", "Java", "C"],
  },
];
