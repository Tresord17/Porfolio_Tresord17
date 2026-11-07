import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404" };

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <main className="notfound">
          <p className="muted" style={{ fontFamily: "monospace" }}>HTTP 404</p>
          <h1>Page introuvable · Page not found</h1>
          <p className="muted">La ressource demandée n'existe pas. The requested resource does not exist.</p>
          <p className="notfound-links">
            <a href="/fr" className="btn btn-primary">Accueil</a>
            <a href="/en" className="btn btn-ghost">Home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
