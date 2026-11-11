import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { hasLocale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { skillsToCode } from "@/lib/skillsCode";
import { getDict } from "@/content/ui";
import { fullName, profile, terminal, whatsappLink } from "@/content/profile";
import { skills } from "@/content/skills";
import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { certifications } from "@/content/certifications";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectGrid, type ProjectCardData } from "@/components/ProjectGrid";
import { HeroTerminal } from "@/components/HeroTerminal";
import { CodeRain } from "@/components/CodeRain";
import { CopyButton } from "@/components/CopyButton";
import { SkillsView } from "@/components/SkillsView";

/** Délai d'apparition (cascade) : index → variable CSS. */
const stagger = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;
const delay = (ms: number) => ({ ["--d" as string]: ms }) as CSSProperties;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const cv = profile.cv[lang];

  const cards: ProjectCardData[] = projects.map((p) => ({
    slug: p.slug,
    href: `/${lang}/projects/${p.slug}`,
    group: p.group,
    icon: p.icon,
    category: p.category[lang],
    period: p.period[lang],
    title: p.title[lang],
    summary: p.summary[lang],
    stack: p.stack,
    featured: !!p.featured,
    github: p.links?.find((l) => l.kind === "github")?.href,
  }));

  const links = [
    whatsappLink && { k: t.contact.whatsapp, v: profile.whatsapp, href: whatsappLink, icon: "external" as const },
    profile.linkedin && { k: t.contact.linkedin, v: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin, icon: "external" as const },
    profile.github && { k: t.contact.github, v: profile.github.replace(/^https?:\/\/(www\.)?/, ""), href: profile.github, icon: "external" as const },
    cv && { k: "CV", v: lang === "fr" ? "Télécharger (PDF)" : "Download (PDF, French)", href: cv, icon: "download" as const, download: true },
  ].filter(Boolean) as { k: string; v: string; href: string; icon: "external" | "download"; download?: boolean }[];

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section id="top" className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-grid-lit" aria-hidden="true" />
        {/* Pluie de code (canevas, derrière le terminal) */}
        <CodeRain />
        <div className="hero-glow g1" aria-hidden="true" />
        <div className="hero-glow g2" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="kicker rise" style={delay(0)}>
              <span className="prompt" aria-hidden="true">&gt;</span> <span data-scramble="">{t.hero.kicker}</span>
            </p>
            <h1 className="hero-name">
              <span className="line"><span style={delay(60)}>{profile.firstName}</span></span>
              <span className="line">
                {/* Le nom « décroche » brièvement, comme un signal brouillé */}
                <span className="hero-lastname glitch" data-text={profile.lastName} style={delay(120)}>{profile.lastName}</span>
              </span>
            </h1>
            <p className="hero-title rise" style={delay(200)}>{profile.title[lang]}</p>
            <p className="hero-tagline rise" style={delay(260)}>{profile.tagline[lang]}</p>
            {profile.availability[lang] && (
              <p className="hero-status rise" style={delay(320)}>
                <span className="status-dot" aria-hidden="true" /> {profile.availability[lang]}
              </p>
            )}
            <div className="hero-ctas rise" style={delay(380)}>
              <Link href={`/${lang}#projects`} className="btn btn-primary magnetic">
                {t.hero.ctaProjects} <Icon name="arrow" size={18} className="i-arrow" />
              </Link>
              {cv && (
                <a href={cv} className="btn btn-on-hero magnetic" download>
                  <Icon name="download" size={18} className="i-down" /> {t.hero.cv}
                </a>
              )}
            </div>
          </div>

          {/* Cadre de visée autour du terminal */}
          <div className="term-wrap">
            <span className="brackets" aria-hidden="true"><i /><i /><i /><i /></span>
            <HeroTerminal
              lines={terminal[lang]}
              title={t.terminal.title}
              label={t.terminal.label}
              avatar={profile.photo || undefined}
            />
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section id="about" className="section">
        <div className="container narrow">
          <SectionHeading label={t.sections.about.label} tag={t.nav.about} title={t.sections.about.title} />
          <div className="prose">
            {profile.about[lang].map((p, i) => <p key={i} data-reveal="" style={stagger(i)}>{rich(p)}</p>)}
          </div>
          <div className="interests" data-reveal="">
            <p className="mini-title"><Icon name="heart" size={16} /> {t.certs.interests}</p>
            <ul className="tags">
              {profile.interests[lang].map((i) => <li key={i} className="tag tag-soft">{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── SKILLS ───────── */}
      <section id="skills" className="section section-alt">
        <div className="container">
          <SectionHeading label={t.sections.skills.label} tag={t.nav.skills} title={t.sections.skills.title} lead={t.sections.skills.lead} />
          <SkillsView code={skillsToCode(skills, lang, fullName, t.skillsView.featured)} labels={t.skillsView}>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <article
                  key={s.key}
                  className={`card skill-card tilt${s.featured ? " is-featured" : ""}`}
                  data-reveal="scale"
                  style={stagger(i % 3)}
                >
                  {s.deco === "docs" && (
                    <span className="deco deco-docs" aria-hidden="true"><i data-l="TeX" /><i data-l="W" /><i data-l="PDF" /></span>
                  )}
                  {s.deco === "ui" && (
                    <span className="deco deco-ui" aria-hidden="true"><i /><i /><i /></span>
                  )}
                  <div className="card-icon"><Icon name={s.icon} /></div>
                  <h3>
                    {s.title[lang]}
                    {s.featured && <span className="strength">{t.skillsView.featured}</span>}
                  </h3>
                  <ul className="ticks">{s.items[lang].map((it) => <li key={it}>{it}</li>)}</ul>
                  <ul className="tags">{s.tools.map((tool) => <li key={tool} className="tag">{tool}</li>)}</ul>
                </article>
              ))}
            </div>
          </SkillsView>
        </div>
      </section>

      {/* ───────── PROJECTS ───────── */}
      <section id="projects" className="section">
        <div className="container">
          <SectionHeading label={t.sections.projects.label} tag={t.nav.projects} title={t.sections.projects.title} lead={t.sections.projects.lead} />
          <div data-reveal="">
            <ProjectGrid items={cards} labels={{ ...t.filters, readMore: t.project.readMore }} />
          </div>
        </div>
      </section>

      {/* ───────── CERTIFICATIONS & LANGUAGES ───────── */}
      <section id="certifications" className="section section-alt">
        <div className="container">
          <SectionHeading label={t.sections.certs.label} tag={t.nav.certifications} title={t.sections.certs.title} />
          <div className="certs-layout">
            <ul className="certs-list">
              {certifications.map((c, i) => (
                <li key={c.name} data-reveal="left" style={stagger(i)}>
                  <a href={c.url} className="card cert-card" target="_blank" rel="noopener noreferrer">
                    <span className="cert-badge"><Icon name="award" size={22} /></span>
                    <span className="cert-body">
                      <span className="cert-name">{c.name}</span>
                      <span className="cert-meta">{c.issuer} · {c.year}</span>
                    </span>
                    <span className="cert-verify">{t.certs.verify} <Icon name="external" size={14} /></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="card lang-card" data-reveal="" style={stagger(1)}>
              <p className="mini-title"><Icon name="globe" size={16} /> {t.certs.languages}</p>
              <ul className="lang-list">
                {profile.languages.map((l) => (
                  <li key={l.name.fr}>
                    <span className="lang-row"><span>{l.name[lang]}</span><span className="muted">{l.level[lang]}</span></span>
                    <span className="meter" aria-hidden="true"><span style={{ width: `${l.value}%` }} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── JOURNEY ───────── */}
      <section id="journey" className="section">
        <div className="container narrow">
          <SectionHeading label={t.sections.journey.label} tag={t.nav.journey} title={t.sections.journey.title} />
          <ol className="timeline" data-reveal="fade">
            {timeline.map((e, i) => (
              <li key={i} className="tl-item" data-reveal="left" style={stagger(i)}>
                  <span className="tl-dot" aria-hidden="true">
                    <Icon name={e.kind === "education" ? "grad" : "briefcase"} size={16} />
                  </span>
                  <div className="tl-body">
                    <p className="tl-period">
                      {e.period[lang]} · {e.kind === "education" ? t.journey.education : t.journey.experience}
                      {e.current && <span className="pill">{t.journey.current}</span>}
                    </p>
                    <h3>{e.title[lang]}</h3>
                    <p className="tl-place">{e.place[lang]}</p>
                    <p className="muted">{e.description[lang]}</p>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </section>

      {/* ───────── CONTACT ───────── */}
      <section id="contact" className="section section-alt">
        <div className="container">
          <SectionHeading label={t.sections.contact.label} tag={t.nav.contact} title={t.sections.contact.title} lead={t.sections.contact.lead} />
          {profile.email && (
            <div className="contact-mail" data-reveal="">
              <a href={`mailto:${profile.email}`} aria-label={`${t.contact.write} : ${profile.email}`}>{profile.email}</a>
              <CopyButton value={profile.email} label={t.copy.label} done={t.copy.done} />
            </div>
          )}
          <div className="contact-links" data-reveal="">
            {links.map((l) => (
              <a
                key={l.k}
                href={l.href}
                className={`contact-link${l.download ? " is-down" : ""}`}
                {...(l.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="k">{l.k}</span>
                <span className="v">{l.v} <Icon name={l.icon} size={16} /></span>
              </a>
            ))}
          </div>
          <p className="contact-location muted"><Icon name="pin" size={14} /> {profile.location[lang]}</p>
        </div>
      </section>
    </>
  );
}
