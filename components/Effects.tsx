"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Effets globaux, un seul composant pour toute l'application :
 *  - apparition des éléments [data-reveal] au défilement (IntersectionObserver) ;
 *  - « déchiffrement » des étiquettes [data-scramble] (texte qui se décode) ;
 *  - frise du parcours qui se remplit avec le défilement ;
 *  - halo orange du haut de page qui suit la souris ;
 *  - halo + inclinaison 3D des cartes (.card / .tilt) et boutons aimantés (.magnetic) ;
 *  - reflet liquide de la barre de navigation qui suit le curseur.
 * Sans JavaScript, tout reste visible ; tout est désactivé si l'utilisateur limite les animations.
 */

const GLYPHS = "!<>-_\\/[]{}=+*^?#%$01ABCDEFX";

/** Fait « décoder » un texte : chaque caractère passe par des symboles aléatoires avant de se fixer. */
function scramble(el: HTMLElement, delay = 0) {
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = "1";
  const final = el.textContent ?? "";
  const per = 22; // décalage entre deux caractères (ms)
  const hold = 260; // durée de brouillage d'un caractère (ms)
  let start = 0;
  const tick = (now: number) => {
    if (!start) start = now + delay;
    const e = now - start;
    let out = "";
    let done = true;
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      if (ch === " " || e >= i * per + hold) out += ch;
      else {
        done = false;
        out += e < 0 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
    }
    el.textContent = out;
    if (!done) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

export function Effects() {
  const pathname = usePathname();

  // Apparition au défilement, déchiffrement et frise (relancés à chaque changement de page)
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const scrambleIn = (el: HTMLElement) => {
      if (reduce) return;
      if (el.matches("[data-scramble]")) scramble(el, 120);
      el.querySelectorAll<HTMLElement>("[data-scramble]").forEach((s) => scramble(s, 120));
    };

    // Étiquettes hors des blocs animés (ex. haut de page) : déchiffrées dès le chargement
    if (!reduce) {
      document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((s) => {
        if (!s.closest("[data-reveal]")) scramble(s, 250);
      });
    }

    // Frise du parcours : la ligne orange avance avec le défilement
    const timelines = Array.from(document.querySelectorAll<HTMLElement>(".timeline"));
    let frame = 0;
    const updateTimeline = () => {
      frame = 0;
      const mark = window.innerHeight * 0.62;
      for (const tl of timelines) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
        tl.style.setProperty("--tl", p.toFixed(3));
        tl.querySelectorAll<HTMLElement>(".tl-dot").forEach((d) => {
          const dr = d.getBoundingClientRect();
          d.classList.toggle("is-passed", dr.top + dr.height / 2 < mark);
        });
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateTimeline); };
    if (reduce) timelines.forEach((tl) => tl.querySelectorAll(".tl-dot").forEach((d) => d.classList.add("is-passed")));
    if (timelines.length && !reduce) {
      updateTimeline();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      root.classList.add("reveal-ready");
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add("is-in", "settled");
        scrambleIn(el);
      }
    });
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          scrambleIn(el);
          io.unobserve(el);
          // Une fois l'animation jouée, on retire le délai pour que les survols restent vifs
          window.setTimeout(() => el.classList.add("settled"), 1400);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Halo, inclinaison 3D des cartes et boutons aimantés (souris uniquement)
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let hero: HTMLElement | null = null;
    const head = document.querySelector<HTMLElement>(".site-header");

    /** Halo orange du haut de page : il glisse vers la souris, le halo bleu part à l'opposé (parallaxe). */
    const releaseHero = () => {
      if (!hero) return;
      hero.classList.remove("is-tracking");
      hero.querySelectorAll<HTMLElement>(".hero-glow").forEach((g) => { g.style.removeProperty("--gx"); g.style.removeProperty("--gy"); });
      hero = null;
    };

    const release = (el: HTMLElement | null, prop: "rotate" | "translate") => {
      if (el) el.style[prop] = "";
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!last) return;
        const target = last.target as Element | null;

        // Halo du haut de page qui suit la souris
        const h = target?.closest?.<HTMLElement>(".hero") ?? null;
        if (h !== hero) releaseHero();
        if (h) {
          hero = h;
          h.classList.add("is-tracking");
          const r = h.getBoundingClientRect();
          const x = last.clientX - r.left;
          const y = last.clientY - r.top;
          h.style.setProperty("--px", `${x.toFixed(0)}px`);
          h.style.setProperty("--py", `${y.toFixed(0)}px`);
          const g1 = h.querySelector<HTMLElement>(".hero-glow.g1");
          const g2 = h.querySelector<HTMLElement>(".hero-glow.g2");
          if (g1) {
            const cx = g1.offsetLeft + g1.offsetWidth / 2;
            const cy = g1.offsetTop + g1.offsetHeight / 2;
            g1.style.setProperty("--gx", `${((x - cx) * 0.85).toFixed(1)}px`);
            g1.style.setProperty("--gy", `${((y - cy) * 0.85).toFixed(1)}px`);
          }
          if (g2) {
            g2.style.setProperty("--gx", `${((r.width / 2 - x) * 0.12).toFixed(1)}px`);
            g2.style.setProperty("--gy", `${((r.height / 2 - y) * 0.12).toFixed(1)}px`);
          }
        }

        // Reflet liquide de la barre de navigation
        if (head) {
          const r = head.getBoundingClientRect();
          head.style.setProperty("--hx", `${(((last.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
          head.style.setProperty("--hy", `${(((last.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
        }

        // Halo lumineux des cartes
        const card = target?.closest?.<HTMLElement>(".card");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${last.clientX - r.left}px`);
          card.style.setProperty("--my", `${last.clientY - r.top}px`);
        }

        // Inclinaison 3D (plus faible sur les grandes cartes)
        const tilt = target?.closest?.<HTMLElement>(".tilt") ?? null;
        if (tilt !== tilted) { release(tilted, "rotate"); tilted = tilt; }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (last.clientX - r.left) / r.width - 0.5;
          const py = (last.clientY - r.top) / r.height - 0.5;
          const max = 7 * Math.min(1, 420 / r.width);
          const angle = Math.min(1, Math.hypot(px, py) * 2) * max;
          tilt.style.rotate = `${(-py).toFixed(3)} ${px.toFixed(3)} 0 ${angle.toFixed(2)}deg`;
        }

        // Boutons aimantés : ils suivent légèrement le curseur
        const mag = target?.closest?.<HTMLElement>(".magnetic") ?? null;
        if (mag !== magnet) { release(magnet, "translate"); magnet = mag; }
        if (mag) {
          const r = mag.getBoundingClientRect();
          const dx = (last.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (last.clientY - (r.top + r.height / 2)) / r.height;
          mag.style.translate = `${(dx * 12).toFixed(1)}px ${(dy * 10).toFixed(1)}px`;
        }
      });
    };
    const onLeave = () => { release(tilted, "rotate"); release(magnet, "translate"); tilted = magnet = null; releaseHero(); };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
