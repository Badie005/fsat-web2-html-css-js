# Portail FSAT — TP Programmation Web 2

**Quinze pages en HTML, CSS et JavaScript natif, sans framework.** Projet académique d’Abdelbadie Khoubiza, conçu dans Figma avant l’intégration.

[Voir le site](https://badie005.github.io/fsat-web2-html-css-js/) · [Dépôt GitHub](https://github.com/Badie005/fsat-web2-html-css-js)

## Design conservé

Le hero de l’accueil, l’identité du header et les cartes du portail existant sont conservés. Le menu donne maintenant accès aux horaires et aux ressources. Les nouvelles cartes reprennent les mêmes fonds blancs, bordures, arrondis et typographies : Playfair Display, DM Sans et JetBrains Mono, dans la palette bleu marine et bleu clair de la maquette.

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Campus, accès rapides et annonces officielles |
| `faculte.html` | Présentation et accès aux sept départements |
| `formations.html` | Douze parcours, recherche et filtre par cycle |
| `departement-*.html` | Sept fiches : responsable, courriel, parcours, enseignements de S1 à S6, horaires et sources |
| `emplois-du-temps.html` | Hiver 2026/2027 : huit PDF de licence disponibles, deux documents de Master signalés indisponibles |
| `ressources.html` | Treize ressources : espaces étudiants, documentation IMIST et services du campus |
| `services.html` | Repères de scolarité et liens vers les pages spécialisées |
| `contact.html` | Coordonnées et accès à la faculté |
| `sources.html` | Sources, dates, limites et crédits |

Les sept fiches couvrent Informatique, Mathématique, Physique, Biologie, Chimie, Mécanique & Énergétique et Géologie. Les dix fiches pédagogiques officielles sont liées depuis les parcours. Les aperçus des enseignements sont reformulés ; les intitulés complets restent dans les documents de la faculté.

## Utilisation

Télécharger le dépôt ou l’archive du TP, décompresser tous les fichiers, puis ouvrir **index.html**. Conserver `assets` à côté des quinze fichiers HTML. Aucune installation ni compilation n’est nécessaire.

Les images et les polices sont locales. Le contenu, les programmes et les liens sont consultables sans JavaScript. Le menu, la recherche et les filtres utilisent JavaScript natif. Les services externes et les PDF nécessitent Internet ; l’aperçu ne charge un PDF officiel qu’après une action sur son bouton. Le lien direct reste disponible si le navigateur ne propose pas de lecteur PDF intégré.

## Organisation du code

- `assets/styles.css` : header, hero, navigation et pied de page.
- `assets/pages.css` : composants des pages existantes.
- `assets/etudiants.css` : fiches de département, horaires et ressources, dans le même style.
- `assets/app.js` : menu et focus clavier, recherche sans accents, filtres, programmes dépliables et aperçu PDF.
- `assets/catalogue-sources.json` : sources, contacts publics et contrôles datés des PDF ; ce fichier n’est pas nécessaire à l’exécution des pages.
- `assets/fonts/` : polices locales et leurs licences OFL.

Aucun React, TypeScript, Tailwind, service de compte ou serveur applicatif. GitHub Pages publie la racine de `main`.

## Vérification du 11 octobre 2026

**351 contrôles locaux réussis** sur quinze pages : largeurs 1440, 1024, 768, 390 et 320 px, navigation clavier, recherche, filtres, liens et ancres, images, contenu sans JavaScript et ouverture directe des fichiers. Le hero reste identique, avec zéro pixel différent sous le header à 1440, 768 et 390 px ; les libellés du header ont été actualisés.

Les huit liens de licence ont répondu HTTP 200 avec des PDF valides, de trois ou quatre pages. L’aperçu réel a également été ouvert et inspecté dans Microsoft Edge, sans simulation du document. Le menu a été vérifié à 390 × 700 px. Les rapports et captures restent dans le dossier local de travail, hors du dépôt public.

## Sources et limites

Ce prototype indépendant ne remplace pas le [site officiel de la FSAT](https://fsat.usmba.ac.ma/). Sources consultées le **11 octobre 2026** :

- [Départements FSAT](https://fsat.usmba.ac.ma/nos-departements-fsat/) : responsables et contacts publics.
- [Catalogue Licence](https://fsat.usmba.ac.ma/licence-fsat/) : parcours et fiches pédagogiques.
- [Emplois du temps](https://fsat.usmba.ac.ma/emplois_fsat/index.php) : liens directs vers les PDF.
- [E-services](https://fsat.usmba.ac.ma/e-service/) : services annoncés et destinations des boutons.
- [Inscription 2026/2027](https://fsat.usmba.ac.ma/2026/08/26/annonce-relative-a-linscription-des-nouveaux-etudiants-au-titre-de-lannee-universitaire-2026-2027/) : conditions, pièces et période initiale désormais close.
- [Doctorat](https://fsat.usmba.ac.ma/category/doctorat/) et [IMIST](https://www.imist.ma/ressources-electroniques) : avis et documentation scientifique.

Les fichiers de Master G2M et SIM S3 indiqués par le service des horaires répondent 404 lors du contrôle. Le portail signale leur indisponibilité et propose la page officielle, sans faux bouton PDF. Plusieurs boutons e-services renvoient au même espace Licence : les cartes distinguent les accès confirmés des adresses spécifiques à demander. Le parcours énergétique apparaît sous Mécanique dans le catalogue, mais sa fiche porte l’en-tête Physique ; cette différence est indiquée.

La sélection est datée. Les documents sont ouverts sur le serveur de la faculté, sans copie périmée distribuée dans le TP. Les connexions et démarches se font sur les services institutionnels liés.

## Crédits et cadre pédagogique

Maquettage Figma avant développement. Logo, photographies et vecteurs issus du projet d’origine ; leurs droits restent ceux de leurs titulaires. Les polices sont fournies avec leurs licences OFL.

HTML/CSS/JavaScript sans framework : consigne confirmée par le candidat. Intégration préparée avec assistance IA ; aucune remise ou validation pédagogique n’est annoncée. Pour présenter ce TP, savoir expliquer les éléments HTML, les grilles CSS, les media queries, les événements JavaScript, le filtrage et la gestion du focus.
