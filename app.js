let language = 'es'; try { language = localStorage.getItem('fineas-language') === 'en' ? 'en' : 'es' } catch { }
const dialog = document.querySelector('#detail'); let currentDetail = null;
const projectDetails = { es: [['CONCEPTO', 'F1 Fantasy', 'Una idea de juego digital de cartas ambientado en Fórmula 1: reunir pilotos, formar una alineación y conectar la estrategia con el rendimiento en pista. Es un concepto en desarrollo.'], ['INTERACCIÓN', 'Mi rincón digital', 'Una imagen de oficina al atardecer con movimiento flotante e inclinación en respuesta al cursor. Se conserva la ilustración original. El movimiento respeta la preferencia de movimiento reducido del dispositivo.'], ['DESARROLLO WEB', 'Portafolio personal', 'Un portafolio desarrollado con HTML, CSS y JavaScript: navegación por secciones, diseño adaptable, selector de idioma y un carrusel de tecnologías.']], en: [['CONCEPT', 'F1 Fantasy', 'A Formula 1 digital card game idea: collect drivers, build a lineup and connect strategy with on-track performance. This is a concept in development.'], ['INTERACTION', 'My digital corner', 'Sunset office artwork with a gentle floating motion and cursor-responsive tilt. The original illustration is preserved. Motion respects the device’s reduced-motion preference.'], ['WEB DEVELOPMENT', 'Personal portfolio', 'A portfolio built with HTML, CSS and JavaScript: section navigation, responsive design, language selection and a technology carousel.']] };
function renderDetail() { if (!currentDetail) return; const data = projectDetails[language][currentDetail.value];['detail-tag', 'detail-title', 'detail-body'].forEach((id, i) => document.getElementById(id).textContent = data[i]); }
function setLanguage(lang) { language = lang; document.documentElement.lang = lang; document.querySelectorAll('[data-es][data-en]').forEach(el => el.textContent = el.dataset[lang]); document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang))); document.title = 'Fineas Iosif Havran'; document.querySelector('meta[name=description]').content = lang === 'es' ? 'Fineas Iosif Havran — Programador web. Sobre mí, tecnologías, experiencia, proyectos y formación.' : 'Fineas Iosif Havran — Web developer. About, technologies, experience, projects and education.'; document.querySelector('header nav').setAttribute('aria-label', lang === 'es' ? 'Navegación principal' : 'Main navigation'); try { localStorage.setItem('fineas-language', lang) } catch { } renderDetail() }
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => setLanguage(b.dataset.lang)); setLanguage(language);
document.querySelectorAll('[data-project]').forEach(b => b.onclick = () => { currentDetail = { type: 'project', value: Number(b.dataset.project) }; renderDetail(); dialog.showModal() }); document.querySelector('.close').onclick = () => dialog.close(); document.querySelector('#detail-done').onclick = () => dialog.close(); dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close() } });
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('header'); new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px')).observe(header);
const photo = document.querySelector('#photo-view'); photo.addEventListener('pointermove', e => { if (motion.matches || e.pointerType === 'touch') return; const r = photo.getBoundingClientRect(); photo.style.setProperty('--tilt-y', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg'); photo.style.setProperty('--tilt-x', -((e.clientY - r.top) / r.height - .5) * 7 + 'deg') }); photo.addEventListener('pointerleave', () => { photo.style.setProperty('--tilt-x', '0deg'); photo.style.setProperty('--tilt-y', '0deg') });
document.querySelector('#year').textContent = new Date().getFullYear();
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const mobileMenu = matchMedia("(max-width: 800px)");

function closeMenu(returnFocus = false) {
  menuButton.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("menu-open");

  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";

  menuButton.setAttribute("aria-expanded", String(open));
  mainNav.classList.toggle("menu-open", open);
});

// Cierra el desplegable al elegir una sección.
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

// Permite cerrarlo con Escape.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu(true);
  }
});

// Cierra al pulsar fuera.
document.addEventListener("click", (event) => {
  if (
    !mainNav.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});

// Restablece el menú al cambiar entre móvil y escritorio.
mobileMenu.addEventListener("change", () => closeMenu());