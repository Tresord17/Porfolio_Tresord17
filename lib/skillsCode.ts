import type { Locale } from "./i18n";
import type { SkillGroup } from "@/content/skills";

export type Tok = { k: "kw" | "key" | "str" | "pun" | "com" | "num" | "txt"; v: string };
export type CodeLine = Tok[];

const t = (k: Tok["k"], v: string): Tok => ({ k, v });

/**
 * Transforme les compétences en un petit fichier TypeScript coloré (vue « Code »).
 * Généré à partir des mêmes données que les cartes : rien à maintenir en double.
 */
export function skillsToCode(skills: SkillGroup[], lang: Locale, author: string, featuredLabel: string): CodeLine[] {
  const lines: CodeLine[] = [];
  const I = "  ";
  lines.push([t("com", `// ${lang === "fr" ? "competences.ts" : "skills.ts"} · ${author}`)]);
  lines.push([t("kw", "export const "), t("txt", lang === "fr" ? "competences" : "skills"), t("pun", " = {")]);

  for (const s of skills) {
    lines.push([t("txt", I), t("key", s.key), t("pun", ": {")]);
    const titleLine: CodeLine = [t("txt", I + I), t("key", lang === "fr" ? "domaine" : "area"), t("pun", ": "), t("str", `"${s.title[lang]}"`), t("pun", ",")];
    if (s.featured) titleLine.push(t("com", `  // ★ ${featuredLabel.toLowerCase()}`));
    lines.push(titleLine);

    // Outils, regroupés par 4 par ligne
    lines.push([t("txt", I + I), t("key", lang === "fr" ? "outils" : "tools"), t("pun", ": [")]);
    for (let i = 0; i < s.tools.length; i += 4) {
      const chunk = s.tools.slice(i, i + 4);
      const line: CodeLine = [t("txt", I + I + I)];
      chunk.forEach((tool, j) => {
        line.push(t("str", `"${tool}"`));
        line.push(t("pun", j < chunk.length - 1 ? ", " : ","));
      });
      lines.push(line);
    }
    lines.push([t("txt", I + I), t("pun", "],")]);
    lines.push([t("txt", I), t("pun", "},")]);
  }
  lines.push([t("pun", "} "), t("kw", "as const"), t("pun", ";")]);
  return lines;
}
