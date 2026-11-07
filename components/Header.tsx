"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/ui";
import { profile } from "@/content/profile";
import { Icon, type IconName } from "./Icon";
import { ThemeToggle } from "./ThemeControls";

const SECTIONS = ["about", "skills", "projects", "certifications", "journey", "contact"] as const;

type Social = { key: string; icon: IconName; label: string; href: string; title: string; external: boolean };

/**
 * Raccourcis de contact de la barre de navigation : GitHub, LinkedIn, Gmail.
 * Un champ vide dans content/profile.ts masque simplement l'entrée.
 */
function contactLinks(dict: Dict): Social[] {
  return [
    profile.github && { key: "github", icon: "github" as const, label: "GitHub", href: profile.github, title: dict.headerContact.github, external: true },
    profile.linkedin && { key: "linkedin", icon: "linkedin" as const, label: "LinkedIn", href: profile.linkedin, title: dict.headerContact.linkedin, external: true },
    profile.email && { key: "gmail", icon: "gmail" as const, label: "Gmail", href: `mailto:${profile.email}`, title: dict.headerContact.gmail, external: false },
  ].filter(Boolean) as Social[];
}

/** Station de contact : bulles de verre qui gonflent sous le curseur. */
function SocialDock({ items, label, drawer, onNavigate }: { items: Social[]; label: string; drawer?: boolean; onNavigate: () => void }) {
  if (!items.length) return null;
  return (
    <ul className={`social-dock${drawer ? " is-drawer" : ""}`} aria-label={label}>
      {items.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            className={`social-btn s-${s.key}`}
            aria-label={s.title}
            onClick={onNavigate}
            {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className="social-blob" aria-hidden="true" />
            <Icon name={s.icon} size={18} />
            <span className="social-tip" aria-hidden="true">{s.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header({ lang, dict, initials }: { lang: Locale; dict: Dict; initials: string }) {
  const pathname = usePathname() || `/${lang}`;
  const other: Locale = lang === "fr" ? "en" : "fr";
  const switchHref = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${other}`);
  const isHome = pathname === `/${lang}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const socials = contactLinks(dict);

  // Ombre sous l'en-tête dès que l'on quitte le haut de page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section active dans le menu (page d'accueil uniquement)
  useEffect(() => {
    if (!isHome) { setActive(pathname.includes("/projects/") ? "projects" : null); return; }
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 200) { setActive(null); return; }
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onTop); };
  }, [isHome, pathname]);

  // Menu mobile : fermeture au changement de page, à la touche Échap, blocage du défilement
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 920 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href={`/${lang}`} className="brand" aria-label={`${initials} · ${lang === "fr" ? "Accueil" : "Home"}`} onClick={() => setOpen(false)}>
          <span className="brand-mark">{initials}</span>
        </Link>

        <nav id="main-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Navigation">
          {SECTIONS.map((id, i) => (
            <Link
              key={id}
              href={`/${lang}#${id}`}
              className="nav-link"
              style={{ ["--i" as string]: i }}
              aria-current={active === id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {dict.nav[id]}
            </Link>
          ))}
          {/* Sur mobile, les contacts prennent place au bas du menu déroulant */}
          <SocialDock items={socials} label={dict.headerContact.group} drawer onNavigate={() => setOpen(false)} />
        </nav>

        <div className="header-actions">
          <SocialDock items={socials} label={dict.headerContact.group} onNavigate={() => setOpen(false)} />
          <Link href={switchHref} className="lang-switch" hrefLang={other} lang={other} title={dict.langSwitch}>
            <span aria-hidden="true">{other.toUpperCase()}</span>
            <span className="sr-only">{dict.langSwitch}</span>
          </Link>
          <ThemeToggle dict={dict} />
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
