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
  header.classList.toggle('is-compressed', window.scrollY > 50 && !menuOpen);
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
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  // Le lien conserve son comportement natif ; le focus suit sa destination.
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll: true});
}

for (const link of menu.querySelectorAll('a[href^="#"]')) {
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

// L'index est construit a partir du HTML du TP. Aucune requete reseau ni base.
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const index = [...main.querySelectorAll('h2, h3')].map(heading => {
  const section = heading.closest('[id]');
  return {
    title: heading.textContent.trim().replace(/\s+/g, ' '),
    text: normalize(section.textContent),
    target: '#' + section.id,
  };
});

function updateSearch() {
  const words = normalize(searchField.value).split(' ').filter(Boolean);
  searchResults.replaceChildren();
  searchResults.hidden = words.length === 0;
  if (!words.length) return;
  const matches = index.filter(item => words.every(word => item.text.includes(word))).slice(0, 8);
  if (!matches.length) {
    const message = document.createElement('p');
    message.textContent = 'Aucun résultat sur cette page. Essayez « informatique », « électronique » ou « master ».';
    searchResults.append(message);
    return;
  }
  for (const item of matches) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = item.target;
    link.textContent = item.title;
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
