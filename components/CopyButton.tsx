"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Copie une valeur (ex. l'adresse e-mail) dans le presse-papiers, avec confirmation. */
export function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={`copy-btn${copied ? " is-done" : ""}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          /* presse-papiers indisponible : le lien mailto reste utilisable */
        }
      }}
    >
      <span className="copy-icon"><Icon name={copied ? "check" : "copy"} size={16} /></span>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
