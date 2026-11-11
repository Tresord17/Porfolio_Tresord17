import { rich } from "@/lib/rich";

/** En-tête de section. L'étiquette « 03 / projets » se « déchiffre » à son apparition (voir Effects). */
export function SectionHeading({ label, tag, title, lead }: { label: string; tag?: string; title: string; lead?: string }) {
  return (
    <header className="section-heading" data-reveal="">
      {/^\d+$/.test(label) && <span className="heading-num" aria-hidden="true">{label}</span>}
      <p className="section-label">
        <span aria-hidden="true" data-scramble="">{tag ? `${label} / ${tag.toLowerCase()}` : `${label} /`}</span>
      </p>
      <h2>{rich(title)}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}
