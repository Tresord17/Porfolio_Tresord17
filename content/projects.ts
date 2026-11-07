import type { L } from "@/lib/i18n";
import type { IconName } from "./skills";

export type ProjectGroup = "security" | "network" | "dev";

export type Project = {
  slug: string;
  period: L;
  group: ProjectGroup;
  featured?: boolean;
  icon: IconName;
  category: L;
  title: L;
  summary: L;
  framework: L;
  role: L;
  context: L;
  work: L<string[]>;
  results: L<string[]>;
  stack: string[];
  /** Captures d'écran : déposer les images dans /public/images/projects/<slug>/ */
  gallery?: { src: string; caption: L }[];
  links?: { label: L; href: string; kind: "github" | "web" }[];
};

const allProjects: Project[] = [
  {
    slug: "architecture-reseau-4-couches",
    period: { fr: "Sept. 2026", en: "Sep 2026" },
    group: "network",
    featured: true,
    icon: "network",
    category: { fr: "Sécurité réseau", en: "Network security" },
    title: { fr: "Architecture réseau hiérarchique à quatre couches", en: "Four-tier hierarchical network architecture" },
    summary: {
      fr: "Conception, configuration et validation d'une infrastructure Cisco redondante sur EVE-NG, livrée avec ses dossiers DAT, DTA et DEX.",
      en: "Design, configuration and validation of a redundant Cisco infrastructure on EVE-NG, delivered with full architecture, technical and operations files.",
    },
    framework: { fr: "Projet d'UE · ENSPY", en: "Course project · ENSPY" },
    role: { fr: "Conception, configuration, tests et documentation", en: "Design, configuration, testing and documentation" },
    context: {
      fr: "L'objectif était de bâtir une architecture d'entreprise à quatre couches (sortie, cœur, agrégation, accès) qui reste disponible en cas de panne d'un équipement, avec des services cloisonnés et une administration séparée.",
      en: "The goal was to build a four-tier enterprise architecture (egress, core, aggregation, access) that stays available if any device fails, with isolated services and separate management.",
    },
    work: {
      fr: [
        "Plan d'adressage et segmentation en VLAN par service, avec un VLAN d'administration dédié.",
        "Redondance de passerelle (VRRP) et de commutation (MST, agrégation de liens).",
        "DHCP relayé, NAT/PAT et accès Internet depuis le laboratoire.",
        "Durcissement de la couche d'accès selon les bonnes pratiques Cisco.",
      ],
      en: [
        "Addressing plan and per-service VLAN segmentation, with a dedicated management VLAN.",
        "Gateway redundancy (VRRP) and switching redundancy (MST, link aggregation).",
        "DHCP relay, NAT/PAT and Internet access from the lab.",
        "Access layer hardening following Cisco best practices.",
      ],
    },
    results: {
      fr: [
        "Architecture validée de bout en bout, chemins réseau conformes aux quatre couches.",
        "Dossier d'exploitation de 42 pages et campagne de 35 cas de test.",
        "Trois livrables : DAT (schémas Visio), DTA (configurations), DEX (exploitation et tests).",
      ],
      en: [
        "Architecture validated end to end, with traffic paths matching the four tiers.",
        "42-page operations file and a 35-case test campaign.",
        "Three deliverables: architecture (Visio), technical (configurations), operations (runbook and tests).",
      ],
    },
    stack: ["EVE-NG", "Cisco IOL", "VRRP", "MST", "VTP", "LACP", "MobaXterm", "Visio"],
  },
  {
    slug: "investigation-android",
    period: { fr: "2026", en: "2026" },
    group: "security",
    icon: "search",
    category: { fr: "Investigation numérique", en: "Digital forensics" },
    title: { fr: "Investigation numérique d'un smartphone Android", en: "Forensic investigation of an Android smartphone" },
    summary: {
      fr: "Enquête judiciaire simulée sur un terminal Android : acquisition, analyse des artefacts et rapport d'expertise structuré.",
      en: "Simulated judicial investigation on an Android device: acquisition, artefact analysis and a structured expert report.",
    },
    framework: { fr: "Projet de groupe · ENSPY", en: "Group project · ENSPY" },
    role: { fr: "Membre de l'équipe d'investigation", en: "Investigation team member" },
    context: {
      fr: "À partir d'un scénario d'enquête fictif, l'équipe devait établir les faits à partir d'un terminal Android virtualisé, en respectant une méthodologie qui garantit la recevabilité de la preuve.",
      en: "Starting from a fictional case scenario, the team had to establish the facts from a virtualised Android device, following a methodology that keeps the evidence admissible.",
    },
    work: {
      fr: [
        "Acquisition des données du terminal en préservant leur intégrité.",
        "Analyse des artefacts (communications, applications, fichiers) avec plusieurs outils croisés.",
        "Reconstitution chronologique des événements utiles à l'enquête.",
      ],
      en: [
        "Device data acquisition while preserving integrity.",
        "Artefact analysis (communications, apps, files) cross-checked across several tools.",
        "Timeline reconstruction of the events relevant to the case.",
      ],
    },
    results: {
      fr: ["Rapport d'expertise structuré, illustré de 19 figures.", "Conclusions étayées et traçables jusqu'aux preuves sources."],
      en: ["Structured expert report illustrated with 19 figures.", "Conclusions backed by, and traceable to, the source evidence."],
    },
    stack: ["Autopsy", "ADB", "Andriller CE", "ALEAPP", "Android"],
  },
  {
    slug: "ceh-v13-labs",
    period: { fr: "2026", en: "2026" },
    group: "security",
    icon: "shield",
    category: { fr: "Test d'intrusion", en: "Penetration testing" },
    title: { fr: "Laboratoires CEH v13 · sécurité des systèmes", en: "CEH v13 labs · system security" },
    summary: {
      fr: "Mise en place d'un laboratoire virtuel isolé et réalisation des travaux pratiques du module système de la certification CEH v13, avec rapport commenté.",
      en: "Set-up of an isolated virtual lab and completion of the CEH v13 system module hands-on labs, with an annotated report.",
    },
    framework: { fr: "Travaux pratiques · ENSPY", en: "Hands-on labs · ENSPY" },
    role: { fr: "Travail individuel", en: "Individual work" },
    context: {
      fr: "Comprendre comment un système est compromis est indispensable pour savoir le défendre. Ces travaux ont été menés exclusivement dans un environnement de laboratoire fermé, sur des machines prévues à cet effet.",
      en: "Understanding how a system gets compromised is essential to defending it. These labs were carried out exclusively in a closed lab environment, on machines set up for that purpose.",
    },
    work: {
      fr: [
        "Conception d'un laboratoire VMware avec poste d'audit et cibles Windows et Linux.",
        "Réalisation des scénarios du module et analyse de leurs traces côté défense.",
        "Résolution des difficultés techniques propres à un environnement en français.",
      ],
      en: [
        "Design of a VMware lab with an audit workstation and Windows and Linux targets.",
        "Completion of the module scenarios and analysis of the traces they leave for defenders.",
        "Troubleshooting issues specific to a French-locale environment.",
      ],
    },
    results: {
      fr: ["Rapport de laboratoire commenté capture par capture.", "Recommandations de détection et de remédiation pour chaque scénario."],
      en: ["Lab report annotated screenshot by screenshot.", "Detection and remediation recommendations for each scenario."],
    },
    stack: ["Parrot Security", "Windows 11", "Ubuntu", "VMware", "Metasploit"],
  },
  {
    slug: "ebios-rm",
    period: { fr: "2026", en: "2026" },
    group: "security",
    icon: "scale",
    category: { fr: "Gestion des risques", en: "Risk management" },
    title: { fr: "Analyse de risques EBIOS RM et gestion de crise", en: "EBIOS RM risk analysis and crisis management" },
    summary: {
      fr: "Analyse de risques complète selon EBIOS Risk Manager sur le cas d'une rédaction de presse, jusqu'au plan de traitement.",
      en: "Full EBIOS Risk Manager analysis of a newsroom case study, through to the treatment plan.",
    },
    framework: { fr: "UE Audit, risques et gestion de crise · ENSPY", en: "Audit, risk and crisis management course · ENSPY" },
    role: { fr: "Analyse et rédaction", en: "Analysis and writing" },
    context: {
      fr: "Un média manipule des informations sensibles, notamment sur ses sources. L'enjeu était d'identifier ce qui menace réellement son activité et de prioriser des mesures réalistes.",
      en: "A media organisation handles sensitive information, including on its sources. The challenge was to identify what truly threatens its activity and prioritise realistic measures.",
    },
    work: {
      fr: [
        "Déroulé des cinq ateliers EBIOS RM, du socle de sécurité aux scénarios opérationnels.",
        "Cartographie des risques et des parties prenantes.",
        "Plan d'amélioration continue de la sécurité (PACS) et synthèse pour la direction.",
      ],
      en: [
        "All five EBIOS RM workshops, from security baseline to operational scenarios.",
        "Risk and stakeholder mapping.",
        "Continuous security improvement plan (PACS) and an executive summary.",
      ],
    },
    results: {
      fr: ["Rapport d'analyse complet et support de présentation de 121 diapositives."],
      en: ["Complete analysis report and a 121-slide presentation deck."],
    },
    stack: ["EBIOS RM", "Cartographie des risques", "PACS"],
  },
  {
    slug: "lses-fighting",
    period: { fr: "Août – oct. 2026", en: "Aug – Oct 2026" },
    group: "dev",
    icon: "code",
    category: { fr: "Développement web", en: "Web development" },
    title: { fr: "LSES Fighting · plateforme pour les sports de combat", en: "LSES Fighting · combat sports platform" },
    summary: {
      fr: "Site vitrine bilingue avec espace d'administration pour promouvoir athlètes, entraîneurs et clubs de Sambo et de MMA.",
      en: "Bilingual showcase site with an admin back-office promoting Sambo and MMA athletes, coaches and clubs.",
    },
    framework: { fr: "Stage préingénieur · client privé", en: "Pre-engineering internship · private client" },
    role: { fr: "Développeur principal (≈ 75 % du développement)", en: "Lead developer (≈ 75% of development)" },
    context: {
      fr: "Le client, entraîneur et manager installé entre le Royaume-Uni et le Cameroun, souhaitait populariser ces disciplines et offrir une vitrine aux sportifs camerounais.",
      en: "The client, a coach and manager based between the UK and Cameroon, wanted to popularise these disciplines and give Cameroonian athletes a showcase.",
    },
    work: {
      fr: [
        "Site public bilingue (langue détectée depuis le navigateur), thèmes clair et sombre, galeries médias par discipline et actualités.",
        "Inscription par e-mail ou Google, rôles athlète et entraîneur, file de validation des entraîneurs et espace superviseur.",
        "Annuaires publics des athlètes et entraîneurs avec filtres, palmarès et notifications.",
        "Changements de statut réservés à des fonctions côté base de données, identité vérifiée côté serveur, formulaire de contact protégé contre le spam.",
      ],
      en: [
        "Bilingual public site (language detected from the browser), light and dark themes, per-discipline media galleries and news.",
        "Email or Google sign-up, athlete and coach roles, coach approval queue and a supervisor area.",
        "Public athlete and coach directories with filters, achievements and notifications.",
        "Status changes restricted to database-side functions, server-side identity checks, spam-protected contact form.",
      ],
    },
    results: {
      fr: [
        "106 scénarios de sécurité (actions autorisées ou interdites) rejouables sur la base de données.",
        "Code source et documentation technique publiés sur GitHub.",
      ],
      en: [
        "106 security scenarios (allowed or forbidden actions) that can be replayed against the database.",
        "Source code and technical documentation published on GitHub.",
      ],
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "next-intl", "Supabase", "PostgreSQL"],
    links: [{ label: { fr: "Code source", en: "Source code" }, href: "https://github.com/Tresord17/LSES-Fighting", kind: "github" }],
  },
  {
    slug: "audit-iso-27001",
    period: { fr: "Janv. – mai 2026", en: "Jan – May 2026" },
    group: "security",
    icon: "scale",
    category: { fr: "Audit de sécurité", en: "Security audit" },
    title: { fr: "Audit de sécurité d'une application web selon ISO 27001", en: "ISO 27001 security audit of a web application" },
    summary: {
      fr: "Audit complet d'une application web et conception d'un outil d'autodiagnostic sur Excel qui automatise l'identification des vulnérabilités et la génération de recommandations.",
      en: "Full audit of a web application and design of an Excel self-assessment tool that automates vulnerability identification and recommendation generation.",
    },
    framework: { fr: "Cours d'audit des systèmes d'information · ENSPY", en: "Information systems audit course · ENSPY" },
    role: { fr: "Audit et conception de l'outil", en: "Audit and tool design" },
    context: {
      fr: "L'objectif était d'évaluer le niveau de sécurité d'une application web au regard des exigences de la norme ISO/IEC 27001, puis de rendre la démarche reproductible grâce à un outil simple à utiliser.",
      en: "The goal was to assess a web application's security posture against ISO/IEC 27001 requirements, then make the approach repeatable through an easy-to-use tool.",
    },
    work: {
      fr: [
        "Évaluation de l'application point par point au regard des mesures de la norme.",
        "Conception d'un classeur Excel d'autodiagnostic qui calcule les écarts et propose des recommandations.",
        "Rédaction du rapport d'audit et des priorités de remédiation.",
      ],
      en: [
        "Point-by-point assessment of the application against the standard's controls.",
        "Design of an Excel self-assessment workbook that computes gaps and suggests recommendations.",
        "Audit report and remediation priorities.",
      ],
    },
    results: {
      fr: ["Plus de 15 vulnérabilités critiques identifiées automatiquement par l'outil.", "Recommandations générées et priorisées pour chaque écart."],
      en: ["More than 15 critical vulnerabilities identified automatically by the tool.", "Recommendations generated and prioritised for each gap."],
    },
    stack: ["ISO/IEC 27001", "Excel", "Audit"],
  },
  {
    slug: "signature-numerique",
    period: { fr: "Nov. – déc. 2025", en: "Nov – Dec 2025" },
    group: "security",
    icon: "lock",
    category: { fr: "Cryptographie appliquée", en: "Applied cryptography" },
    title: { fr: "Signature numérique de factures PDF", en: "Digital signing of PDF invoices" },
    summary: {
      fr: "Application Django qui signe des factures PDF avec une paire de clés RSA et un certificat X.509, puis vérifie leur authenticité et leur intégrité.",
      en: "Django application that signs PDF invoices with an RSA key pair and an X.509 certificate, then verifies their authenticity and integrity.",
    },
    framework: { fr: "Projet de cours · ENSPY", en: "Course project · ENSPY" },
    role: { fr: "Conception et développement", en: "Design and development" },
    context: {
      fr: "Pour une boutique en ligne, une facture doit pouvoir prouver qui l'a émise et qu'elle n'a pas été modifiée. Le projet met en pratique les mécanismes de la signature électronique sur un cas concret.",
      en: "For an online shop, an invoice must prove who issued it and that it has not been altered. The project puts electronic signature mechanisms into practice on a real-world case.",
    },
    work: {
      fr: [
        "Génération d'une identité numérique par signataire : clé RSA 2048 bits et certificat X.509.",
        "Signature RSA-PSS avec SHA-256 et apposition d'un cachet visuel sur chaque page.",
        "Module de vérification indiquant l'auteur, la date de signature et l'état du document (intact ou compromis).",
      ],
      en: [
        "Per-signer digital identity: 2048-bit RSA key and X.509 certificate.",
        "RSA-PSS signature with SHA-256 and a visual stamp on every page.",
        "Verification module showing the author, signing time and document status (intact or tampered).",
      ],
    },
    results: {
      fr: [
        "Toute modification du contenu d'une facture signée est détectée à la vérification.",
        "Pistes d'évolution identifiées : format standard PAdES, certificats émis par une autorité de confiance, chiffrement des clés privées.",
      ],
      en: [
        "Any change to the content of a signed invoice is detected at verification.",
        "Identified next steps: standard PAdES format, certificates issued by a trusted authority, encrypted private keys.",
      ],
    },
    stack: ["Python", "Django", "cryptography", "RSA-PSS", "X.509", "pypdf", "ReportLab"],
    links: [{ label: { fr: "Code source", en: "Source code" }, href: "https://github.com/Tresord17/Projet-SignatureNumerique", kind: "github" }],
  },
  {
    slug: "portail-mandats-investigation",
    period: { fr: "Janv. 2026 – en cours", en: "Jan 2026 – ongoing" },
    group: "security",
    icon: "search",
    category: { fr: "Investigation numérique", en: "Digital forensics" },
    title: { fr: "Portail de gestion de mandats d'investigation", en: "Investigation warrant management portal" },
    summary: {
      fr: "Développement full-stack d'un portail de suivi des mandats d'investigation numérique, avec une interface React et une API en TypeScript.",
      en: "Full-stack development of a portal to track digital investigation warrants, with a React interface and a TypeScript API.",
    },
    framework: { fr: "Projet d'investigation numérique · ENSPY", en: "Digital forensics project · ENSPY" },
    role: { fr: "Développement full-stack", en: "Full-stack development" },
    context: {
      fr: "Une investigation numérique commence par un cadre légal : le mandat. Le portail centralise ces mandats pour suivre chaque dossier de son ouverture à sa clôture.",
      en: "A digital investigation starts with a legal framework: the warrant. The portal centralises warrants to follow each case from opening to closure.",
    },
    work: {
      fr: ["Interfaces réactives sous React.", "API en TypeScript pour la gestion des mandats et de leur suivi."],
      en: ["Responsive React interfaces.", "TypeScript API to manage warrants and their follow-up."],
    },
    results: {
      fr: ["Projet en cours de développement."],
      en: ["Project currently in development."],
    },
    stack: ["React", "TypeScript", "API REST"],
  },
  {
    slug: "reseau-campus-3-tiers",
    period: { fr: "Nov. – déc. 2025", en: "Nov – Dec 2025" },
    group: "network",
    icon: "network",
    category: { fr: "Réseau", en: "Networking" },
    title: { fr: "Architecture réseau 3 tiers pour un campus", en: "Three-tier campus network architecture" },
    summary: {
      fr: "Conception et déploiement simulé d'une infrastructure réseau haute disponibilité pour un campus, avec routage dynamique et segmentation VLAN sur équipements Cisco.",
      en: "Design and simulated deployment of a high-availability campus network with dynamic routing and VLAN segmentation on Cisco devices.",
    },
    framework: { fr: "Cours de conception de réseaux · ENSPY", en: "Network design course · ENSPY" },
    role: { fr: "Conception et configuration", en: "Design and configuration" },
    context: {
      fr: "Un campus réunit des publics aux besoins différents sur une même infrastructure. Il fallait garantir la disponibilité du réseau tout en séparant les flux.",
      en: "A campus brings together users with different needs on a single infrastructure. The network had to stay available while keeping traffic separated.",
    },
    work: {
      fr: [
        "Architecture hiérarchique cœur, distribution et accès.",
        "Segmentation en VLAN et routage dynamique entre les sous-réseaux.",
        "Redondance des liens et des équipements critiques.",
      ],
      en: [
        "Hierarchical core, distribution and access design.",
        "VLAN segmentation and dynamic routing between subnets.",
        "Redundant links and critical devices.",
      ],
    },
    results: {
      fr: ["Infrastructure simulée et validée sous GNS3.", "Base de travail réutilisée pour l'architecture à quatre couches de 2026."],
      en: ["Infrastructure simulated and validated in GNS3.", "Groundwork reused for the 2026 four-tier architecture."],
    },
    stack: ["GNS3", "Cisco IOS", "VLAN", "Routage dynamique"],
  },
  {
    slug: "suivi-patient-distance",
    period: { fr: "Mars – mai 2026", en: "Mar – May 2026" },
    group: "dev",
    icon: "phoneApp",
    category: { fr: "Développement mobile", en: "Mobile development" },
    title: { fr: "Application de suivi de patients à distance", en: "Remote patient monitoring app" },
    summary: {
      fr: "Développement du frontend d'une application mobile de suivi médical, avec messagerie sécurisée et visualisation des données de santé.",
      en: "Frontend development of a mobile health-monitoring app, with secure messaging and health data visualisation.",
    },
    framework: { fr: "Projet de groupe · ENSPY", en: "Group project · ENSPY" },
    role: { fr: "Développeur frontend", en: "Frontend developer" },
    context: {
      fr: "Le suivi à distance permet au personnel soignant de garder le contact avec ses patients entre deux consultations. Les données médicales étant sensibles, la confidentialité des échanges était au cœur du projet.",
      en: "Remote monitoring lets care staff stay in touch with patients between visits. Since medical data is sensitive, confidential exchanges were at the heart of the project.",
    },
    work: {
      fr: ["Écrans de l'application sous Flutter.", "Messagerie sécurisée entre patient et soignant.", "Graphiques de visualisation des données médicales."],
      en: ["App screens built with Flutter.", "Secure messaging between patient and caregiver.", "Charts to visualise medical data."],
    },
    results: {
      fr: ["Frontend mobile livré et intégré au reste de l'application."],
      en: ["Mobile frontend delivered and integrated with the rest of the app."],
    },
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "hn-tech-ecommerce",
    period: { fr: "Oct. – déc. 2024", en: "Oct – Dec 2024" },
    group: "dev",
    icon: "phoneApp",
    category: { fr: "Développement mobile", en: "Mobile development" },
    title: { fr: "HN TECH · application e-commerce", en: "HN TECH · e-commerce app" },
    summary: {
      fr: "Direction d'équipe pour le développement d'une application e-commerce multiplateforme sous Flutter, élue meilleure application de la promotion.",
      en: "Led the team building a cross-platform Flutter e-commerce app, voted best app of the class.",
    },
    framework: { fr: "Projet de groupe · ENSPY", en: "Group project · ENSPY" },
    role: { fr: "Chef d'équipe et développeur", en: "Team lead and developer" },
    context: {
      fr: "L'équipe devait concevoir une boutique en ligne complète, utilisable aussi bien sur Android que sur iOS.",
      en: "The team had to design a complete online shop, usable on both Android and iOS.",
    },
    work: {
      fr: ["Répartition des tâches et coordination de l'équipe.", "Développement de l'application sous Flutter.", "Soin particulier apporté à l'expérience utilisateur et à la fluidité."],
      en: ["Task allocation and team coordination.", "App development with Flutter.", "Strong focus on user experience and smoothness."],
    },
    results: {
      fr: ["Projet récompensé comme meilleure application de la promotion pour son UX et sa fluidité."],
      en: ["Awarded best app of the class for its UX and smoothness."],
    },
    stack: ["Flutter", "Firebase", "Dart"],
  },
];

/** Ordre d'affichage des projets (le premier est mis en avant). */
const order = [
  "architecture-reseau-4-couches",
  "audit-iso-27001",
  "lses-fighting",
  "signature-numerique",
  "investigation-android",
  "portail-mandats-investigation",
  "ebios-rm",
  "ceh-v13-labs",
  "reseau-campus-3-tiers",
  "hn-tech-ecommerce",
  "suivi-patient-distance",
];

export const projects: Project[] = [...allProjects].sort((a, b) => {
  const ia = order.indexOf(a.slug), ib = order.indexOf(b.slug);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
