# Portail FSAT — TP Programmation Web 2

**Conversion fidèle du design Figma en HTML, CSS et JavaScript natif.** Version locale du 10 octobre 2026, pour Abdelbadie Khoubiza.

Les couleurs, typographies, images, grilles, espacements et filigrane vectoriel du portail d'origine sont repris. Le livrable n'utilise **ni React, ni TypeScript, ni Tailwind CSS, ni framework, ni compilation**. Le CSS est écrit avec des classes descriptives ; aucune feuille Tailwind compilée n'est incluse.

## Site et code source

- [Consulter le portail sur GitHub Pages](https://badie005.github.io/fsat-web2-html-css-js/)
- [Dépôt GitHub HTML/CSS/JavaScript](https://github.com/Badie005/fsat-web2-html-css-js)

Prototype académique indépendant réalisé dans le cadre du TP Programmation Web 2. Il ne remplace pas le site officiel de la faculté.

## Ouvrir et remettre le projet

1. Télécharger le dépôt avec **Code → Download ZIP**, puis décompresser l'archive entière. L'archive locale du TP `FSAT_TP_Web2_HTML_CSS_JS.zip` fonctionne également.
2. Conserver `assets` à côté d'`index.html`.
3. Ouvrir **index.html** dans un navigateur récent. Aucune installation et aucune connexion ne sont nécessaires pour afficher les images/polices et utiliser les interactions locales.

Les liens externes vers les services universitaires nécessitent Internet. Ils ouvrent la [page institutionnelle E-services](https://fsat.usmba.ac.ma/e-service/), vérifiée le 10 octobre. Le prototype n'implémente pas de connexion utilisateur ou de backend de scolarité.

GitHub Pages publie directement les fichiers de la branche `main`, à la racine du dépôt. Aucun serveur applicatif ni étape de compilation ne sont nécessaires.

## Fichiers du livrable

```text
index.html           Balisage HTML et contenus statiques
assets/styles.css    CSS classique, grilles, responsive, animations
assets/app.js        JavaScript natif : menu, recherche, en-tête
assets/fonts.css     Déclarations de polices locales
assets/fonts/        Polices du modèle et quatre licences OFL
assets/*.jpg, *.png  Photographies et logo d'origine
assets/*.svg         Favicon et masque du filigrane
README.md            Instructions
```

## Interactions et fidélité

En-tête transparent puis compact au défilement ; grand menu avec photo et filigrane ; fermeture par Échap ; gestion du focus et blocage du fond ; recherche locale insensible aux accents avec résultats liés aux sections ; ancres valides ; navigation mobile et contenus accessibles sans JavaScript.

**57 contrôles réussis**. Les positions, dimensions et typographies de 16 blocs correspondent au modèle sur cinq largeurs, à 1 pixel près. L'accueil et le grand menu desktop comparés à 1440 pixels présentent zéro pixel différent. Le menu et l'en-tête compact ont des écarts de rendu inférieurs à 0,05 % sur les captures comparées. Le rapport détaillé `VALIDATION.md`, les résultats `verification/resultats.json` et les captures sont conservés dans le dossier de travail, séparément de l'archive de remise.

Ajustements explicitement conservés : repli de la navigation sur mobile pour corriger le débordement du modèle ; libellé « ÉDITION ACADÉMIQUE » ; recherche réellement reliée aux contenus de cette page. La composition des sections est conservée.

## Design et ressources

Images et vecteurs repris des fichiers et URL présents dans le projet d'origine. Polices identiques : DM Sans, JetBrains Mono, Lora, Playfair Display ; licences du dépôt Google Fonts conservées avec leurs fichiers. Le contenu éditorial est celui du prototype Figma, pas un catalogue institutionnel validé.

La consigne connue est HTML/CSS/JavaScript sans framework. La conversion a été préparée avec assistance IA ; le TP n'est pas déclaré remis ou validé. Avant présentation, savoir expliquer les balises, grilles CSS, media queries, classes d'état, événements, recherche et focus. Préparer aussi un export des maquettes Figma utilisées avant développement.
