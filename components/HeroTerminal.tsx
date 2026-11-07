"use client";

import { useEffect, useState } from "react";

export type TermLine = { kind: "cmd" | "out" | "ok" | "dir" | "gap"; text: string };

/**
 * Terminal décoratif avec effet de saisie.
 * Le texte complet est rendu côté serveur (invisible, il réserve la place : aucun saut de mise en page),
 * puis le texte « tapé » est superposé caractère par caractère.
 */
export function HeroTerminal({ lines, title, label, avatar }: { lines: TermLine[]; title: string; label: string; avatar?: string }) {
  const total = lines.reduce((n, l) => n + l.text.length, 0);
  const [typed, setTyped] = useState(-1); // -1 : rendu serveur / sans JS → tout est affiché
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setReady(true); return; }
    setTyped(0);
    setReady(true);
    // Planning de frappe : commandes « tapées » lentement, sorties affichées vite, petites pauses
    const times: number[] = [];
    let at = 900; // laisse le temps à la carte d'apparaître
    for (const l of lines) {
      const per = l.kind === "cmd" ? 55 : 9;
      for (let k = 0; k < l.text.length; k++) { at += per; times.push(at); }
      at += l.kind === "cmd" ? 320 : l.kind === "gap" ? 0 : 90;
    }
    let raf = 0;
    let n = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const elapsed = t - t0;
      let k = n;
      while (k < total && times[k] <= elapsed) k++;
      if (k !== n) { n = k; setTyped(n); }
      if (n < total) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [lines, total]);

  let remaining = typed < 0 ? Infinity : typed;
  let caretPlaced = false;

  return (
    <div className={`terminal${ready ? " is-ready" : ""}`} role="img" aria-label={label}>
      <div className="terminal-bar" aria-hidden="true">
        <i /><i /><i />
        <span className="terminal-title">{title}</span>
        {avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="terminal-avatar" width={26} height={26} />
        )}
      </div>
      <div className="terminal-body" aria-hidden="true">
        {lines.map((l, i) => {
          if (l.kind === "gap") return <span key={i} className="t-line t-gap" />;
          const before = remaining;
          const reached = before >= 0;
          const shown = l.text.slice(0, Math.max(0, Math.min(l.text.length, before)));
          const done = before >= l.text.length;
          remaining -= l.text.length;
          const showCaret = reached && !caretPlaced && (!done || i === lines.length - 1);
          if (showCaret) caretPlaced = true;
          const render = (s: string) =>
            l.kind === "cmd" ? (<><span className="ps">$ </span>{s}</>) : s;
          return (
            <span key={i} className={`t-line t-${l.kind}`}>
              <span className="ghost">{render(l.text)}</span>
              <span className="typed">
                {reached && (shown.length > 0 || l.kind === "cmd") && render(shown)}
                {showCaret && <span className="caret" />}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
