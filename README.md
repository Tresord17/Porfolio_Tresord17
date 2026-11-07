# Portfolio · Brunel Trésor DSAMAGO JAFFO

Portfolio bilingue (FR/EN) construit avec **Next.js 16** et prévu pour **Vercel**. Toutes les pages sont générées en statique : le site est rapide, gratuit à héberger et ne dépend d'aucun service tiers (polices auto-hébergées, aucun script externe).

## Lancer le site en local

Prérequis : [Node.js](https://nodejs.org) 20.9 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run build` puis `npm start` permettent de tester la version de production (avec les en-têtes de sécurité).

## Modifier le contenu

Tout le texte se trouve dans le dossier `content/`, sans toucher au code :

| Fichier | Contenu |
|---|---|
| `content/profile.ts` | nom, titre, accroche, « À propos », centres d'intérêt, langues, e-mail, WhatsApp, LinkedIn, GitHub, photo, CV |
| `content/certifications.ts` | certifications et liens vers les badges Credly |
| `content/skills.ts` | les blocs de compétences, leurs outils, la carte « point fort » (`featured`) et les illustrations (`deco`) |
| `content/projects.ts` | les projets (catégorie de filtre, résumé, contexte, réalisations, résultats, liens GitHub, captures) et leur ordre d'affichage |
| `content/timeline.ts` | le parcours (formation, stages) |
| `content/ui.ts` | les libellés de l'interface (menus, boutons) |

Un champ laissé vide (`""`) masque automatiquement l'élément correspondant.

**Photo** : retirée ; le haut de page affiche un terminal animé. Pour en remettre une, la déposer dans `public/images/` puis renseigner `photo` dans `profile.ts` (elle apparaît en petit dans la barre du terminal). Le texte du terminal se modifie dans `terminal`, en bas de `profile.ts`.

**CV** : `public/cv/CV_Tresor_DSAMAGO.pdf`. Pour une version anglaise, déposer le PDF dans `public/cv/` et renseigner `cv.en` dans `profile.ts`.

**Thème** : clair, sombre ou système. Le bouton de la barre de navigation bascule entre clair et sombre ; le sélecteur du pied de page permet de revenir au réglage du système. Le choix est mémorisé dans le navigateur du visiteur. Les couleurs se règlent en haut de `app/globals.css` : bleu marine `#1b2559` (version adoucie du bleu du CV) et orange `#fe7f00`.

**Captures d'un projet** : déposer les images dans `public/images/projects/<slug>/` puis ajouter au projet :

```ts
gallery: [
  { src: "/images/projects/architecture-reseau-4-couches/topologie.png",
    caption: { fr: "Topologie EVE-NG", en: "EVE-NG topology" } },
],
```

## Style

- **Couleurs** : en-tête et pied de page bleu marine (même couleur), haut de page sur un fond clair légèrement teinté en thème clair et en dégradé bleu en thème sombre, orange pour les accents.
- **Typographies** (auto-hébergées, licence OFL) : Bricolage Grotesque pour les titres, Inter pour le texte, JetBrains Mono pour les détails, Instrument Serif en italique pour quelques mots d'accent.
- **Mot en italique dans un titre** : l'entourer d'astérisques dans `content/ui.ts`, par exemple `"Projets *et* laboratoires"`.

## Animations

- **Haut de page** : entrée en CSS pur, terminal avec effet de saisie, halo orange qui suit la souris (le halo bleu part à l'opposé), boutons « aimantés » qui suivent légèrement le curseur.
- **Étiquettes déchiffrées** : les étiquettes de section (« 03 / projets ») se décodent comme un message chiffré à leur apparition (attribut `data-scramble`).
- **Surligneur** : dans les textes, `==passage==` se surligne au feutre orange à l'écran (voir `content/profile.ts`).
- **Cartes** : inclinaison 3D qui suit la souris, halo lumineux, puces en points orange qui s'allument en cascade au survol, feuilles LaTeX / Word / PDF qui s'éventaillent (rédaction technique), pastilles de couleur (UI / UX).
- **Compétences** : bouton « Cartes / Code » qui affiche les compétences sous forme de fichier TypeScript coloré, généré à partir de `content/skills.ts`.
- **Parcours** : la frise se remplit au fil du défilement et les étapes s'allument une à une.
- Transition de thème en cercle, fondu entre les pages. Tout est désactivé si le visiteur a choisi de limiter les animations, et le contenu reste visible sans JavaScript.

## Mettre en ligne sur Vercel

1. Créer un compte [GitHub](https://github.com) puis un dépôt (ex. `portfolio`).
2. Dans ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Portfolio v1"
   git branch -M main
   git remote add origin https://github.com/<pseudo>/portfolio.git
   git push -u origin main
   ```
3. Se connecter sur [vercel.com](https://vercel.com) avec GitHub → **Add New… → Project** → importer le dépôt → **Deploy**. Aucun réglage n'est nécessaire.
4. Dans **Settings → Environment Variables**, ajouter `NEXT_PUBLIC_SITE_URL` = l'adresse finale du site (ex. `https://brunel-dsamago.vercel.app`), puis redéployer. Elle sert au sitemap et aux liens de partage.
5. Chaque `git push` met ensuite le site à jour automatiquement.

Pour un domaine personnalisé : **Settings → Domains** dans Vercel. Penser alors à mettre à jour `NEXT_PUBLIC_SITE_URL` et la ligne `Canonical` de `public/.well-known/security.txt`.

## Sécurité

- En-têtes HTTP en production : CSP stricte (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`), HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` (voir `next.config.ts`).
- En-tête `X-Powered-By` désactivé.
- Fichier `/.well-known/security.txt` (RFC 9116) ; sa date `Expires` est à renouveler avant octobre 2027.
- Aucune dépendance en dehors de Next.js et React ; `npm audit` à lancer régulièrement.

Après le déploiement, le résultat peut être vérifié sur [securityheaders.com](https://securityheaders.com) et [observatory.mozilla.org](https://developer.mozilla.org/en-US/observatory).

## Structure

```
app/
  [lang]/layout.tsx              mise en page, métadonnées, polices
  [lang]/page.tsx                page d'accueil (toutes les sections)
  [lang]/projects/[slug]/page.tsx  page détaillée d'un projet
  global-not-found.tsx           page 404
  globals.css                    styles (couleurs dans :root)
  sitemap.ts, robots.ts, icon.svg
components/                      en-tête, pied de page, icônes
content/                         tout le contenu modifiable
lib/i18n.ts                      langues et URL du site
public/                          CV, images, security.txt
```
