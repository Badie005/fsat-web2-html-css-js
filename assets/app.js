/* JavaScript natif : en-tete, navigation et recherche locale. Aucun framework. */
'use strict';

document.documentElement.classList.replace('no-js', 'js');

const header = document.querySelector('#global-header');
const shell = header.parentElement;
const menu = document.querySelector('#mega-menu');
const menuToggle = document.querySelector('#menu-toggle');
const searchToggle = document.querySelector('#search-toggle');
const searchPanel = document.querySelector('#search-panel');
const searchField = document.querySelector('#site-search');
const searchResults = document.querySelector('#search-results');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const menuIcon = menuToggle.querySelector('svg');
const originalIcon = menuIcon.innerHTML;
const closeIcon = '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />';
const label = document.createElement('span');
label.textContent = 'Menu';
for (const node of [...menuToggle.childNodes]) {
  if (node.nodeType === Node.TEXT_NODE) node.remove();
}
menuToggle.append(label);

let menuOpen = false;
let searchOpen = false;
let previousOverflow = '';
let scrollScheduled = false;

function updateHeader() {
  header.classList.toggle('is-compressed', (window.scrollY > 50 || document.body.classList.contains('inner-page')) && !menuOpen);
  header.classList.toggle('menu-is-open', menuOpen);
}

function setSearch(open, restoreFocus = true) {
  searchOpen = open;
  searchPanel.hidden = !open;
  searchToggle.setAttribute('aria-expanded', String(open));
  if (open) searchField.focus();
  else if (restoreFocus) searchToggle.focus();
}

function setMenu(open, restoreFocus = true) {
  if (open === menuOpen) return;
  if (open) {
    if (searchOpen) setSearch(false, false);
    previousOverflow = document.body.style.overflow;
  }
  menuOpen = open;
  // Le bouton Fermer et les liens d'en-tete doivent appartenir au dialogue ARIA.
  // Le deplacement du meme noeud conserve ses evenements et sa position visuelle fixe.
  if (open) menu.prepend(header);
  else shell.insertBefore(header, menu);
  menu.hidden = !open;
  menu.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Menu');
  label.textContent = open ? 'Fermer' : 'Menu';
  menuIcon.setAttribute('viewBox', open ? '0 0 24 24' : '0 0 25 25');
  menuIcon.setAttribute('fill', open ? 'none' : 'currentColor');
  menuIcon.innerHTML = open ? closeIcon : originalIcon;
  main.inert = open;
  footer.inert = open;
  document.body.style.overflow = open ? 'hidden' : previousOverflow;
  updateHeader();
  if (open) menu.querySelector('.menu-link').focus();
  else if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => setMenu(!menuOpen));
searchToggle.addEventListener('click', () => {
  if (menuOpen) setMenu(false, false);
  setSearch(!searchOpen);
});
document.querySelector('#search-close').addEventListener('click', () => setSearch(false));

window.addEventListener('scroll', () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => {
    updateHeader();
    scrollScheduled = false;
  });
}, {passive: true});
updateHeader();

function focusDestination(link) {
  const destination = new URL(link.href, location.href);
  if (destination.origin !== location.origin || destination.pathname !== location.pathname || !destination.hash) return;
  const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
  if (!target) return;
  // Le lien conserve son comportement natif ; le focus suit sa destination.
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll: true});
}

for (const link of menu.querySelectorAll('a[href]')) {
  link.addEventListener('click', () => {
    setMenu(false, false);
    focusDestination(link);
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (menuOpen) setMenu(false);
    else if (searchOpen) setSearch(false);
  }
  if (event.key !== 'Tab' || !menuOpen) return;
  const focusable = [...menu.querySelectorAll('a[href], button, input')].filter(element => element.getClientRects().length > 0 && !element.disabled);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))) {
    event.preventDefault();
    first.focus();
  }
});

// Index local du portail. Aucune requete ni base de donnees pour la recherche.
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const index = [
  ['Accueil — FSAT Taza', 'Découvrir le campus et les ressources universitaires.', 'index.html', 'universite campus accueil'],
  ['La faculté et ses départements', 'Les sept départements de la FSAT.', 'faculte.html#departements', 'biologie chimie mathematique informatique physique mecanique energetique geologie'],
  ['Sciences de Données', 'Licence · Informatique', 'formations.html#sciences-donnees', 'data science informatique appliquee'],
  ['Ingénierie des Systèmes d’Information', 'Licence · Informatique', 'formations.html#isi', 'isi informatique logiciel'],
  ['Mathématiques Appliquées, Modélisation et calcul scientifique', 'Licence · Mathématique', 'formations.html#math-appliquees', 'mathematiques calcul'],
  ['Mathématiques Fondamentales et Applications', 'Licence · Mathématique', 'formations.html#math-fondamentales', 'mathematiques'],
  ['Électronique et Signaux', 'Licence · Physique', 'formations.html#electronique-signaux', 'electronique physique'],
  ['Efficacité énergétique et énergies renouvelables', 'Licence · Mécanique & Énergétique', 'formations.html#energies', 'energies mecanique'],
  ['Matériaux, Procédés et Analyses Physicochimiques', 'Licence · Chimie', 'formations.html#materiaux', 'materiaux chimie'],
  ['Ingénierie Agroalimentaire', 'Licence · Biologie', 'formations.html#agroalimentaire', 'biologie alimentation'],
  ['Sciences Biomédicales', 'Licence · Biologie', 'formations.html#biomedicales', 'biologie sante'],
  ['Géomatique et Ressources en Eau', 'Licence · Géologie', 'formations.html#geomatique', 'geologie eau'],
  ['Électronique — Licence d’excellence', 'Avis officiel publié le 2 octobre 2026.', 'formations.html#excellence', 'electronique licence excellence'],
  ['Systèmes Intelligents et Mobiles (SIM)', 'Master spécialisé · Avis officiel', 'formations.html#sim', 'master sim informatique'],
  ['Espace étudiant Licence', 'Accès au portail institutionnel de scolarité.', 'services.html#etudiant', 'inscription notes releves scolarite licence'],
  ['Espace étudiant Master', 'Accès au portail institutionnel du cycle Master.', 'services.html#master', 'inscription notes releves scolarite master'],
  ['Emplois du temps', 'PDF officiels de la session hiver 2026/2027.', 'emplois-du-temps.html', 'planning horaires emploi temps cours pdf'],
  ['Admission USMBA', 'Plateforme universitaire des admissions.', 'services.html#admission', 'concours inscription candidature'],
  ['Ressources et e-services', 'Accès étudiants, documentation et services du campus.', 'ressources.html', 'bibliotheque apprentissage cours ressources'],
  ['Département Informatique', 'Responsable : Pr. Mohamed Nemiche. Deux parcours de licence.', 'departement-informatique.html', 'logiciel informatique nemiche'],
  ['Département Mathématique', 'Responsable : Pr. Abdelhai El Azzouzi. Deux parcours de licence.', 'departement-mathematique.html', 'mathematiques calcul modelisation azzouzi'],
  ['Département Physique', 'Responsable : Pr. Abdelaziz Ahaitouf. Électronique et Signaux.', 'departement-physique.html', 'physique electronique ahaitouf'],
  ['Département Biologie', 'Responsable : Pr. Yahia Rharrabti. Agroalimentaire et sciences biomédicales.', 'departement-biologie.html', 'biologie sante rharrabti'],
  ['Département Chimie', 'Responsable : Pr. Mostafa Nawdali. Matériaux et procédés.', 'departement-chimie.html', 'chimie materiaux nawdali'],
  ['Département Mécanique & Énergétique', 'Responsable : Pr. Driss Achemlal. Parcours énergétique.', 'departement-mecanique-energetique.html', 'mecanique energie renouvelable achemlal'],
  ['Département Géologie', 'Responsable : Pr. Ali Lhachmi. Géomatique et Ressources en Eau.', 'departement-geologie.html', 'geologie eau terrain lhachmi'],
  ['Moodle et supports de cours', 'Accès spécifique à demander à votre enseignant.', 'ressources.html#moodle', 'moodle apprentissage devoir cours'],
  ['Bibliothèque de la faculté', 'Catalogue annoncé : accès spécifique à préciser.', 'ressources.html#bibliotheque', 'bibliotheque catalogue livres prets'],
  ['Messagerie académique', 'Obtenir le bon accès auprès de la faculté.', 'ressources.html#messagerie', 'mail email compte courriel'],
  ['Campus connecté', 'Aide pour la connexion Wi-Fi.', 'ressources.html#wifi', 'wifi connexion internet campus'],
  ['Documentation IMIST', 'Ressources scientifiques et accès à distance.', 'ressources.html#imist', 'imist documentation article recherche revue'],
  ['Doctorat : avis et démarches', 'Accès à la rubrique officielle de la FSAT.', 'ressources.html#recherche', 'doctorat these recherche soutenance'],
  ['Calendrier et annonces', 'Dates à consulter dans les avis officiels.', 'ressources.html#calendrier', 'calendrier date inscription examen'],
  ['Contact et accès au campus', 'Adresse, téléphone et courriel de la FSAT.', 'contact.html', 'email telephone adresse contact plan carte'],
  ['Sources et périmètre', 'Cadre pédagogique, sources et crédits du prototype.', 'sources.html', 'web2 web 2 projet auteur credits sources'],
].map(([title, description, target, keywords]) => ({title, description, target, text: normalize(`${title} ${description} ${keywords}`)}));

function updateSearch() {
  const words = normalize(searchField.value).split(' ').filter(Boolean);
  searchResults.replaceChildren();
  searchResults.hidden = words.length === 0;
  if (!words.length) return;
  const matches = index.filter(item => words.every(word => item.text.includes(word))).slice(0, 8);
  if (!matches.length) {
    const message = document.createElement('p');
    message.textContent = 'Aucun résultat dans le portail. Essayez « informatique », « électronique » ou « horaires ».';
    searchResults.append(message);
    return;
  }
  for (const item of matches) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = item.target;
    const title = document.createElement('span');
    title.textContent = item.title;
    const description = document.createElement('small');
    description.textContent = item.description;
    link.append(title, description);
    link.addEventListener('click', () => {
      setSearch(false, false);
      focusDestination(link);
    });
    searchResults.append(link);
  }
}

searchField.addEventListener('input', updateSearch);
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  updateSearch();
  const result = searchResults.querySelector('a');
  if (result) result.click();
});

// Catalogue : filtre par mots et cycle, compteur, etat vide et reinitialisation.
const filterForm = document.getElementById('filter-form');
if (filterForm) {
  const query = document.getElementById('formation-query');
  const cycle = document.getElementById('formation-cycle');
  const cards = [...document.querySelectorAll('.formation-card')];
  const status = document.getElementById('filter-status');
  const empty = document.getElementById('filter-empty');
  function updateFilters() {
    const words = normalize(query.value).split(' ').filter(Boolean);
    let count = 0;
    for (const card of cards) {
      const text = normalize(card.dataset.search);
      const visible = (cycle.value === 'all' || card.dataset.cycle === cycle.value) && words.every(word => text.includes(word));
      card.hidden = !visible;
      if (visible) count++;
    }
    status.textContent = `${count} formation${count > 1 ? 's' : ''} affichée${count > 1 ? 's' : ''}`;
    empty.hidden = count > 0;
  }
  filterForm.addEventListener('submit', event => { event.preventDefault(); updateFilters(); });
  query.addEventListener('input', updateFilters);
  cycle.addEventListener('change', updateFilters);
  filterForm.addEventListener('reset', event => {
    event.preventDefault();
    query.value = '';
    cycle.value = 'all';
    updateFilters();
  });
  document.getElementById('clear-filters').addEventListener('click', () => { filterForm.reset(); query.focus(); });
  updateFilters();
}

// Filtres des horaires et ressources : le contenu complet reste dans le HTML.
for (const form of document.querySelectorAll('[data-list-filter]')) {
  const query = form.querySelector('[data-query]');
  const category = form.querySelector('[data-category]');
  const cards = [...document.getElementsByClassName(form.dataset.listFilter)];
  const count = document.getElementById(form.dataset.count);
  const empty = document.getElementById(form.dataset.empty);
  function filterList() {
    const words = normalize(query.value).split(' ').filter(Boolean);
    let visible = 0;
    let available = 0;
    for (const card of cards) {
      const match = (!category.value || card.dataset.category === category.value)
        && words.every(word => normalize(card.dataset.search).includes(word));
      card.hidden = !match;
      if (match) {
        visible += 1;
        if (!card.classList.contains('unavailable')) available += 1;
      }
    }
    count.textContent = form.dataset.listFilter === 'schedule-card'
      ? `${visible} document${visible !== 1 ? 's' : ''} référencé${visible !== 1 ? 's' : ''} · ${available} disponible${available !== 1 ? 's' : ''}`
      : `${visible} ressource${visible !== 1 ? 's' : ''}`;
    empty.hidden = visible !== 0;
  }
  form.addEventListener('submit', event => event.preventDefault());
  query.addEventListener('input', filterList);
  category.addEventListener('change', filterList);
  form.addEventListener('reset', () => requestAnimationFrame(filterList));
  document.querySelector(`[data-clear="${form.dataset.listFilter}"]`).addEventListener('click', () => {
    form.reset();
    query.focus();
  });
  filterList();
}

// L'aperçu ne contacte le serveur officiel qu'après l'action de l'étudiant.
const preview = document.getElementById('pdf-preview');
if (preview) {
  const viewer = document.getElementById('schedule-viewer');
  const title = document.getElementById('pdf-preview-title');
  const close = document.getElementById('close-preview');
  let trigger;
  for (const button of document.querySelectorAll('[data-pdf]')) {
    button.addEventListener('click', () => {
      const url = new URL(button.dataset.pdf);
      if (url.origin !== 'https://fsat.usmba.ac.ma' || !url.pathname.startsWith('/emplois_fsat/PDF/')) return;
      trigger = button;
      title.textContent = button.dataset.title;
      viewer.title = `Emploi du temps — ${button.dataset.title}`;
      viewer.src = url.href;
      preview.hidden = false;
      close.focus({preventScroll:true});
      preview.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'});
    });
  }
  close.addEventListener('click', () => {
    preview.hidden = true;
    viewer.removeAttribute('src');
    if (trigger) trigger.focus();
  });
}

// Une URL de parcours révèle son panneau, y compris lors d'un accès direct.
function revealProgramme() {
  const id = location.hash.slice(1);
  if (!id) return;
  let target;
  try { target = document.getElementById(decodeURIComponent(id)); } catch { return; }
  if (!target) return;
  const details = target.closest('details');
  if (details) details.open = true;
}
window.addEventListener('hashchange', revealProgramme);
revealProgramme();
