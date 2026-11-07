"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "./Icon";

export type ProjectCardData = {
  slug: string;
  href: string;
  group: "security" | "network" | "dev";
  icon: IconName;
  category: string;
  period: string;
  title: string;
  summary: string;
  stack: string[];
  featured: boolean;
  github?: string;
};

type Labels = {
  all: string; security: string; network: string; dev: string; label: string;
  readMore: string; showMore: string; showLess: string;
};

const INITIAL = 5; // carte mise en avant + 4 cartes, le reste sur demande

export function ProjectGrid({ items, labels }: { items: ProjectCardData[]; labels: Labels }) {
  const [filter, setFilter] = useState<"all" | ProjectCardData["group"]>("all");
  const [expanded, setExpanded] = useState(false);
  const [live, setLive] = useState(false); // les cartes ne s'animent qu'après une interaction
  const groups = ["all", "security", "network", "dev"] as const;
  const filtered = items.filter((p) => filter === "all" || p.group === filter);
  const canCollapse = filter === "all" && filtered.length > INITIAL;
  const visible = canCollapse && !expanded ? filtered.slice(0, INITIAL) : filtered;
  const hidden = filtered.length - INITIAL;

  return (
    <>
      <div className="filters" role="toolbar" aria-label={labels.label}>
        {groups.map((g) => {
          const count = g === "all" ? items.length : items.filter((p) => p.group === g).length;
          return (
            <button
              key={g}
              type="button"
              className="filter-chip"
              aria-pressed={filter === g}
              onClick={() => { setFilter(g); setExpanded(false); setLive(true); }}
            >
              {labels[g]} <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className={`projects-grid${live ? " is-live" : ""}`} id="projects-grid" aria-live="polite">
        {visible.map((p, i) => (
          <article
            key={`${filter}-${p.slug}`}
            className={`card project-card tilt${p.featured && filter === "all" ? " is-featured" : ""}`}
            style={{ ["--i" as string]: expanded && i >= INITIAL ? i - INITIAL : i }}
          >
            <div className="project-top">
              <span className="card-icon"><Icon name={p.icon} /></span>
              <span className="project-meta">{p.category} · {p.period}</span>
              {p.github && (
                <a href={p.github} className="project-gh" target="_blank" rel="noopener noreferrer" aria-label={`GitHub · ${p.title}`} title="GitHub">
                  <Icon name="github" size={18} />
                </a>
              )}
            </div>
            <h3>
              <Link href={p.href} className="stretched">{p.title}</Link>
            </h3>
            <p className="muted">{p.summary}</p>
            <ul className="tags">
              {p.stack.slice(0, 5).map((s) => <li key={s} className="tag">{s}</li>)}
            </ul>
            <span className="read-more" aria-hidden="true">
              {labels.readMore} <Icon name="arrow" size={16} />
            </span>
          </article>
        ))}
      </div>

      {canCollapse && (
        <div className="more-wrap">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={expanded}
            aria-controls="projects-grid"
            onClick={() => {
              if (expanded) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              setExpanded((v) => !v);
              setLive(true);
            }}
          >
            {expanded ? labels.showLess : labels.showMore.replace("{n}", String(hidden))}
            <Icon name="chevronDown" size={18} />
          </button>
        </div>
      )}
    </>
  );
}
