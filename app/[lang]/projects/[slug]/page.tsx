import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { hasLocale, locales } from "@/lib/i18n";
import { getDict } from "@/content/ui";
import { getProject, projects } from "@/content/projects";
import { Icon } from "@/components/Icon";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) return {};
  return {
    title: p.title[lang],
    description: p.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { fr: `/fr/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

const stagger = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;
const delay = (ms: number) => ({ ["--d" as string]: ms }) as CSSProperties;

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) notFound();
  const t = getDict(lang);

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  const blocks: { title: string; body: React.ReactNode }[] = [
    { title: t.project.context, body: <p>{p.context[lang]}</p> },
    { title: t.project.work, body: <ul className="ticks">{p.work[lang].map((w) => <li key={w}>{w}</li>)}</ul> },
    { title: t.project.results, body: <ul className="ticks ticks-accent">{p.results[lang].map((r) => <li key={r}>{r}</li>)}</ul> },
  ];
  if (p.gallery?.length) {
    blocks.push({
      title: t.project.gallery,
      body: (
        <div className="gallery">
          {p.gallery.map((g) => (
            <figure key={g.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.caption[lang]} loading="lazy" decoding="async" />
              <figcaption>{g.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
      ),
    });
  }

  return (
    <article className="section project-page">
      <div className="container">
        <Link href={`/${lang}#projects`} className="back-link rise" style={delay(0)}>
          <Icon name="arrowLeft" size={16} /> {t.project.back}
        </Link>

        <header className="project-header">
          <p className="kicker rise" style={delay(60)}>
            <span className="card-icon"><Icon name={p.icon} /></span> {p.category[lang]}
          </p>
          <h1 className="rise" style={delay(120)}>{p.title[lang]}</h1>
          <p className="lead rise" style={delay(200)}>{p.summary[lang]}</p>
        </header>

        <div className="project-layout">
          <div className="project-main">
            {blocks.map((b, i) => (
              <section key={b.title} className="case-block" data-reveal="" style={stagger(0)}>
                <h2><span className="case-num">0{i + 1}</span> {b.title}</h2>
                {b.body}
              </section>
            ))}
          </div>

          <aside className="project-aside rise" style={delay(280)}>
            <div className="card aside-card">
              <dl className="facts">
                <div><dt>{t.project.year}</dt><dd>{p.period[lang]}</dd></div>
                <div><dt>{t.project.framework}</dt><dd>{p.framework[lang]}</dd></div>
                <div><dt>{t.project.role}</dt><dd>{p.role[lang]}</dd></div>
              </dl>
            </div>
            <div className="card aside-card">
              <p className="aside-title">{t.project.stack}</p>
              <ul className="tags">{p.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
            </div>
            {p.links && p.links.length > 0 && (
              <div className="aside-links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <Icon name={l.kind === "github" ? "github" : "external"} size={18} /> {l.label[lang]}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>

        <nav className="pager" aria-label={t.nav.projects}>
          {prev ? (
            <Link href={`/${lang}/projects/${prev.slug}`} className="pager-link" data-reveal="" style={stagger(0)}>
              <span className="muted">← {t.project.prev}</span>
              <span>{prev.title[lang]}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/${lang}/projects/${next.slug}`} className="pager-link pager-next" data-reveal="" style={stagger(1)}>
              <span className="muted">{t.project.next} →</span>
              <span>{next.title[lang]}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
