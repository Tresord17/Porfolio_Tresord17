"use client";

import { useSyncExternalStore } from "react";

export type ThemePref = "light" | "dark" | "system";
export type Theme = "light" | "dark";

import { THEME_KEY as KEY } from "./theme-script";
const EVENT = "themechange";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function readPref(): ThemePref {
  try {
    const p = localStorage.getItem(KEY);
    return p === "light" || p === "dark" ? p : "system";
  } catch {
    return "system";
  }
}

function apply(pref: ThemePref) {
  const d = document.documentElement;
  d.dataset.themePref = pref;
  d.dataset.theme = pref === "system" ? (media().matches ? "dark" : "light") : pref;
}

export function setThemePref(pref: ThemePref) {
  try {
    if (pref === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    /* stockage indisponible : le choix reste valable pour la page en cours */
  }
  apply(pref);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onMedia = () => {
    if (readPref() === "system") apply("system");
    cb();
  };
  const m = media();
  m.addEventListener("change", onMedia);
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onMedia);
  return () => {
    m.removeEventListener("change", onMedia);
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onMedia);
  };
}

/** Préférence et thème effectif, synchronisés entre tous les composants. */
export function useTheme(): { pref: ThemePref; theme: Theme; ready: boolean } {
  const snap = useSyncExternalStore(
    subscribe,
    () => `${document.documentElement.dataset.themePref ?? "system"}|${document.documentElement.dataset.theme ?? "dark"}`,
    () => "",
  );
  if (!snap) return { pref: "system", theme: "dark", ready: false };
  const [pref, theme] = snap.split("|") as [ThemePref, Theme];
  return { pref, theme, ready: true };
}

/**
 * Change de thème avec un cercle qui s'étend depuis le point cliqué (API View Transitions).
 * Repli instantané si le navigateur ne la gère pas ou si l'utilisateur limite les animations.
 */
export function switchTheme(pref: ThemePref, x?: number, y?: number) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const current = document.documentElement.dataset.theme;
  const target = pref === "system" ? (media().matches ? "dark" : "light") : pref;
  if (!doc.startViewTransition || reduce || current === target) {
    setThemePref(pref);
    return;
  }
  const cx = x ?? window.innerWidth / 2;
  const cy = y ?? 0;
  const r = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
  const t = doc.startViewTransition(() => setThemePref(pref));
  t.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}
