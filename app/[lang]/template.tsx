"use client";

import { useEffect, useState } from "react";

// Vrai dès que l'application a été affichée une fois : seules les navigations suivantes sont animées
let mountedOnce = false;

/** Rejoué à chaque navigation : fondu d'entrée de la nouvelle page (pas au premier chargement). */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => mountedOnce);
  useEffect(() => { mountedOnce = true; }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
