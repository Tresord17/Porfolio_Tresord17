"use client";

import type { MouseEvent } from "react";
import { switchTheme, useTheme, type ThemePref } from "@/lib/theme";
import type { Dict } from "@/content/ui";
import { Icon } from "./Icon";

const origin = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2] as const;
};

/** Bouton clair / sombre de la barre de navigation. */
export function ThemeToggle({ dict }: { dict: Dict }) {
  const { theme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? dict.theme.toLight : dict.theme.toDark;
  return (
    <button type="button" className="icon-btn" onClick={(e) => switchTheme(next, ...origin(e))} aria-label={label} title={label}>
      <span className="theme-icon" key={theme}>
        <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
      </span>
    </button>
  );
}

/** Sélecteur Clair / Sombre / Système du pied de page. */
export function ThemeSelect({ dict }: { dict: Dict }) {
  const { pref, ready } = useTheme();
  const options: { value: ThemePref; label: string; icon: "sun" | "moon" | "monitor" }[] = [
    { value: "light", label: dict.theme.light, icon: "sun" },
    { value: "dark", label: dict.theme.dark, icon: "moon" },
    { value: "system", label: dict.theme.system, icon: "monitor" },
  ];
  return (
    <div className="theme-select" role="radiogroup" aria-label={dict.theme.label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={ready && pref === o.value}
          className="theme-option"
          onClick={(e) => switchTheme(o.value, ...origin(e))}
        >
          <Icon name={o.icon} size={15} />
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
