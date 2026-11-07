"use client";

import { useEffect, useRef } from "react";

/** Glyphes de la pluie : hexadécimal, ponctuation de code et katakana. */
const GLYPHS = "0123456789ABCDEF<>/\\{}[]();=+*&^%$#!?|~アカサタナハマヤラワヲン";

/**
 * Pluie de code (clin d'œil « hacker ») dessinée sur un canevas, derrière le
 * haut de page. Entièrement décorative :
 *  - rien ne s'affiche si l'utilisateur limite les animations ;
 *  - l'animation s'arrête quand le haut de page sort de l'écran ou que
 *    l'onglet passe en arrière-plan (environ 18 images par seconde) ;
 *  - les couleurs viennent des variables CSS, donc suivent le thème.
 */
export function CodeRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let step = 17;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let hi = "rgba(254,127,0,.85)";
    let lo = "rgba(135,155,240,.5)";

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      hi = cs.getPropertyValue("--rain-hi").trim() || hi;
      lo = cs.getPropertyValue("--rain-lo").trim() || lo;
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.clientWidth;
      h = host.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = w < 640 ? 14 : 18;
      cols = Math.ceil(w / step);
      drops = Array.from({ length: cols }, () => -Math.random() * h);
      speeds = Array.from({ length: cols }, () => step * (0.55 + Math.random() * 0.7));
      ctx.font = `${step - 4}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
    };

    let raf = 0;
    let last = 0;
    let onScreen = true;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.hidden || cols === 0) return;
      if (t - last < 55) return; // ~18 images/s : le rendu « saccadé » fait partie du style
      last = t;

      // Estompe l'image précédente sans peindre de fond : les glyphes laissent une traînée
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.1)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < cols; i++) {
        const y = drops[i];
        ctx.fillStyle = Math.random() < 0.14 ? hi : lo;
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * step, y);
        drops[i] = y > h + Math.random() * 300 ? -24 : y + speeds[i];
      }
    };

    readColors();
    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver((entries) => { onScreen = entries[0]?.isIntersecting ?? true; });
    io.observe(host);

    window.addEventListener("themechange", readColors);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", readColors);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("themechange", readColors);
      media.removeEventListener("change", readColors);
    };
  }, []);

  return <canvas ref={ref} className="code-rain" aria-hidden="true" />;
}
