# Portail FSAT — TP Programmation Web 2

**Six pages en HTML, CSS et JavaScript natif, sans framework.** Prototype académique réalisé par Abdelbadie Khoubiza, à partir de ses maquettes Figma.

[Voir le site](https://badie005.github.io/fsat-web2-html-css-js/) · [Voir le dépôt](https://github.com/Badie005/fsat-web2-html-css-js)

## Design et pages

Le header et le hero de l’accueil sont conservés. Les autres composants reprennent le prototype de référence : repères pratiques, catalogue de formations, départements, services et contacts. Typographie et couleurs sont harmonisées : **Playfair Display** pour les titres, **DM Sans** pour les textes, **JetBrains Mono** pour les repères ; bleu marine `#0b2545`, bleu nuit et fonds bleu clair.

| Page | Contenu |
|---|---|
| `index.html` | Hero, accès rapides, repères, annonces |
| `faculte.html` | Campus et sept départements |
| `formations.html` | Douze parcours, recherche et filtre par cycle |
| `services.html` | Accès étudiants, horaires, admissions et ressources |
| `contact.html` | Coordonnées, carte et liens institutionnels |
| `sources.html` | Sources, crédits et cadre du TP |

## Ouvrir le projet

1. Sur GitHub, utiliser **Code → Download ZIP**, puis décompresser toute l’archive. L’archive locale `FSAT_TP_Web2_HTML_CSS_JS.zip` fonctionne aussi.
2. Conserver le dossier `assets` à côté des six fichiers HTML.
3. Ouvrir **index.html** dans un navigateur récent.

Aucune installation ni compilation. Images, polices, navigation, recherche et filtres fonctionnent localement. Les liens vers les services officiels nécessitent Internet. GitHub Pages publie la racine de la branche `main`.

## Fichiers et interactions

- `assets/styles.css` : header, hero et grand menu.
- `assets/pages.css` : composants et pages intérieures, responsive.
- `assets/app.js` : menu, focus, Échap, recherche dans les six pages et catalogue filtrable.
- `assets/fonts.css`, `assets/fonts/` : polices locales et licences OFL.
- `assets/*.jpg`, `*.png`, `*.svg` : photographies, logo et filigrane.

Le menu bloque le fond et contient le focus. La recherche est locale et insensible aux accents ; ses résultats ouvrent la bonne page et la bonne section. Les formations se filtrent par mots et cycle, avec compteur, état vide et réinitialisation. Les pages et leurs liens restent consultables sans JavaScript. Aucun React, TypeScript, Tailwind ou serveur applicatif n’est nécessaire.

## Vérification

Avant publication : **141 contrôles réussis** sur les six pages, aux largeurs 1440, 1024, 768, 390 et 320 px. Navigation, recherche, filtres, liens, images, mode sans JavaScript et ouverture directe vérifiés. L’accueil conserve zéro pixel différent sur les captures comparées à 1440, 768 et 390 px. Les rapports et captures détaillés restent dans le dossier de travail, séparément du code public et de l’archive du TP.

## Sources et crédits

Ce projet indépendant ne remplace pas le [portail officiel de la FSAT](https://fsat.usmba.ac.ma/). La page `sources.html` identifie les informations institutionnelles retenues et leur date de consultation. Les démarches et connexions se font sur les plateformes officielles liées.

Maquettage Figma avant développement. Photographie du campus, logo et vecteurs repris des fichiers du projet d’origine. Leurs droits restent ceux de leurs titulaires. Les polices sont fournies avec leurs licences OFL : DM Sans, Playfair Display, Lora et JetBrains Mono.

HTML/CSS/JavaScript sans framework, consigne confirmée par le candidat. Intégration préparée avec assistance IA ; aucune remise ou validation pédagogique n’est annoncée. Pour présenter le TP, savoir expliquer la structure HTML, les grilles CSS, les media queries, les événements, les filtres et le focus clavier.
