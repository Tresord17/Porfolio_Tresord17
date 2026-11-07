"use client";

import { useState, type ReactNode } from "react";
import type { CodeLine } from "@/lib/skillsCode";
import { Icon } from "./Icon";

type Labels = { label: string; cards: string; code: string; file: string; lines: string };

/** Bascule entre la vue « Cartes » (rendue côté serveur) et la vue « Code » (éditeur). */
export function SkillsView({ code, labels, children }: { code: CodeLine[]; labels: Labels; children: ReactNode }) {
  const [view, setView] = useState<"cards" | "code">("cards");

  return (
    <>
      <div className="view-switch" role="tablist" aria-label={labels.label} data-view={view}>
        <span className="view-thumb" aria-hidden="true" />
        <button type="button" role="tab" id="tab-cards" aria-selected={view === "cards"} aria-controls="skills-cards" onClick={() => setView("cards")}>
          <Icon name="grid" size={16} /> {labels.cards}
        </button>
        <button type="button" role="tab" id="tab-code" aria-selected={view === "code"} aria-controls="skills-code" onClick={() => setView("code")}>
          <Icon name="code" size={16} /> {labels.code}
        </button>
      </div>

      <div id="skills-cards" role="tabpanel" aria-labelledby="tab-cards" hidden={view !== "cards"}>
        {children}
      </div>

      {view === "code" && (
        <div id="skills-code" role="tabpanel" aria-labelledby="tab-code" className="editor">
          <div className="editor-bar" aria-hidden="true">
            <i /><i /><i />
            <span className="editor-tab"><Icon name="code" size={13} /> {labels.file}</span>
          </div>
          <pre className="editor-body" tabIndex={0}>
            <code>
              {code.map((line, i) => (
                <span key={i} className="code-line" style={{ ["--i" as string]: i }}>
                  <span className="ln" aria-hidden="true">{i + 1}</span>
                  <span className="lc">
                    {line.map((tok, j) => <span key={j} className={`tk-${tok.k}`}>{tok.v}</span>)}
                    {i === code.length - 1 && <span className="caret" aria-hidden="true" />}
                  </span>
                </span>
              ))}
            </code>
          </pre>
          <div className="editor-status" aria-hidden="true">
            <span>TypeScript</span><span>UTF-8</span><span>LF</span><span>{code.length} {labels.lines}</span>
          </div>
        </div>
      )}
    </>
  );
}
