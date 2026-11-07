import { Fragment } from "react";

/**
 * Mise en forme légère dans les textes :
 *  - *mot*    → italique (police à empattements), ex. « Projets *et* laboratoires »
 *  - ==mots== → surligné au feutre orange quand le paragraphe apparaît à l'écran
 */
export function rich(text: string) {
  return text.split(/(\*[^*]+\*|==[^=]+==)/g).map((part, i) => {
    if (part.startsWith("==") && part.endsWith("==")) return <mark key={i} className="hl">{part.slice(2, -2)}</mark>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Retire la mise en forme (pour les métadonnées et attributs). */
export const plain = (text: string) => text.replace(/\*|==/g, "");
