"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/** Bouton flottant « haut de page », avec un anneau qui indique la progression de lecture. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ref.current?.style.setProperty("--p", p.toFixed(3));
      setVisible(window.scrollY > 600);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className="btt-ring" viewBox="0 0 40 40" aria-hidden="true">
        <circle className="track" cx="20" cy="20" r="18" pathLength={100} />
        <circle className="bar" cx="20" cy="20" r="18" pathLength={100} />
      </svg>
      <span className="btt-arrow"><Icon name="arrowUp" size={22} /></span>
    </button>
  );
}
