'use strict';

/**
 * CONFIGURACIÓN EDITABLE DEL PORTFOLIO
 * Completa solamente los datos reales. Deja "" cuando todavía no exista un enlace.
 * No se publican automáticamente tecnologías, URLs o credenciales no confirmadas.
 *
 * email: dirección que recibirá los mensajes a través de la app de correo del visitante.
 * github / linkedin: URL pública absoluta https://...
 * cvUrl: ruta local del PDF, por ejemplo "docs/cv.pdf", o URL HTTPS.
 * f1Repository / f1Demo: URLs públicas del proyecto F1 Draft.
 * skills: tecnologías respaldadas por los proyectos (puedes editarlas o eliminarlas).
 */
const SITE_CONFIG = {
  email: '',
  github: '',
  linkedin: '',
  cvUrl: '',
  f1Repository: '',
  f1Demo: '',
  skills: {
    frontend: [
      { name: 'HTML5', icon: 'H5' },
      { name: 'CSS3', icon: 'C3' },
      { name: 'JavaScript', icon: 'JS' },
    ],
    backend: [],
    databases: [],
    tools: [],
  },
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const techIcons = {
  HTML5: 'assets/icons/html5.svg',
  CSS3: 'assets/icons/css3.svg',
  JavaScript: 'assets/icons/javascript.svg',
};

function externalUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function validCvUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  const trimmed = value.trim();
  if (/^docs\/[a-z0-9_\-./]+\.pdf$/i.test(trimmed) && !trimmed.includes('..')) return trimmed;
  return externalUrl(trimmed);
}

function validEmail(value) {
  return typeof value === 'string' && emailPattern.test(value.trim()) ? value.trim() : '';
}

function createLink(label, url, className = 'social-link', newTab = true) {
  const link = document.createElement('a');
  link.className = className;
  link.textContent = label;
  link.href = url;
  if (newTab) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${label} (abre en una pestaña nueva)`);
  }
  return link;
}

function populateLinks() {
  const cv = qs('#nav-cv');
  const cvUrl = validCvUrl(SITE_CONFIG.cvUrl);
  if (cvUrl) {
    cv.href = cvUrl;
    cv.hidden = false;
    if (/^https?:\/\//i.test(cvUrl)) {
      cv.target = '_blank';
      cv.rel = 'noopener noreferrer';
      cv.removeAttribute('download');
      cv.setAttribute('aria-label', 'Consultar CV (abre en una pestaña nueva)');
    }
  }

  const socialContainer = qs('#social-links');
  const socialLinks = [
    ['GitHub ↗', externalUrl(SITE_CONFIG.github)],
    ['LinkedIn ↗', externalUrl(SITE_CONFIG.linkedin)],
    ['Correo ↗', validEmail(SITE_CONFIG.email) ? `mailto:${SITE_CONFIG.email.trim()}` : ''],
  ];
  const enabledSocial = socialLinks.filter(([, url]) => Boolean(url));
  if (enabledSocial.length) {
    socialContainer.replaceChildren();
    enabledSocial.forEach(([label, url]) => socialContainer.append(createLink(label, url, 'social-link', !url.startsWith('mailto:'))));
  }

  const projectContainer = qs('#f1-links');
  const projectLinks = [
    ['Repositorio ↗', externalUrl(SITE_CONFIG.f1Repository)],
    ['Ver demostración ↗', externalUrl(SITE_CONFIG.f1Demo)],
  ].filter(([, url]) => Boolean(url));
  if (projectLinks.length) {
    projectContainer.replaceChildren();
    projectLinks.forEach(([label, url]) => projectContainer.append(createLink(label, url, 'project-action')));
  }
  if (!validEmail(SITE_CONFIG.email)) {
    qs('.form-help').textContent = 'El formulario está listo para activarse. Antes de publicarlo, configura una dirección de destino real en js/script.js.';
    qs('#form-submit').textContent = 'Contacto sin configurar';
    qs('#form-submit').disabled = true;
    qs('#form-submit').setAttribute('aria-describedby', 'form-message');
    const msg = qs('#form-message');
    msg.textContent = 'Falta el correo de destino. No se envían ni almacenan mensajes.';
    msg.className = 'form-message is-info';
  }
}

function populateSkills() {
  const descriptions = {
    backend: 'Añade aquí lenguajes y frameworks backend que hayas utilizado (por ejemplo, Java o PHP).',
    databases: 'Añade aquí bases de datos y herramientas de consulta con las que hayas trabajado.',
    tools: 'Añade aquí herramientas reales de tu entorno de desarrollo (por ejemplo, Git o VS Code).',
    frontend: 'Completa esta sección con tecnologías verificadas en tus proyectos.',
  };
  Object.entries(descriptions).forEach(([category, placeholder]) => {
    const container = qs(`[data-skills="${category}"]`);
    const skills = SITE_CONFIG.skills[category] || [];
    container.replaceChildren();
    if (!skills.length) {
      const empty = document.createElement('p');
      empty.className = 'skill-empty';
      empty.textContent = placeholder;
      container.append(empty);
      return;
    }
    skills.forEach(({ name, icon }) => {
      if (!name || typeof name !== 'string') return;
      const item = document.createElement('span');
      item.className = 'skill-tag';
      const iconPath = techIcons[name];
      const symbol = document.createElement(iconPath ? 'img' : 'span');
      symbol.className = iconPath ? 'skill-logo' : 'skill-tag-icon';
      symbol.setAttribute('aria-hidden', 'true');
      if (iconPath) { symbol.src = iconPath; symbol.alt = ''; symbol.width = 23; symbol.height = 23; }
      else { symbol.textContent = typeof icon === 'string' ? icon.slice(0, 4) : '•'; }
      item.append(symbol, document.createTextNode(name));
      container.append(item);
    });
  });
}

function setupMobileMenu() {
  const toggle = qs('#menu-toggle');
  const nav = qs('#navegacion');
  const media = window.matchMedia('(max-width: 920px)');

  function closeMenu(restoreFocus = false) {
    if (toggle.getAttribute('aria-expanded') === 'false') return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open && media.matches);
    if (open) qs('a', nav)?.focus();
  });
  qsa('a', nav).forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu(true);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  media.addEventListener('change', () => { if (!media.matches) closeMenu(); });
}

function setupActiveSection() {
  const links = qsa('.nav-link');
  const sections = links.map((link) => qs(link.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window)) {
    links[0]?.classList.add('active');
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (!visible.length) return;
    visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    const id = visible[0].target.id;
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-12% 0px -55% 0px', threshold: [0, .05, .2, .4] });
  sections.forEach((section) => observer.observe(section));
  links[0]?.classList.add('active');
}

function setupReveals() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const elements = qsa('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px 60px 0px' });
  document.documentElement.classList.add('motion-ready');
  elements.forEach((element) => observer.observe(element));
}

function setupTyping() {
  const target = qs('#typing-text');
  if (!target || reducedMotion.matches) return;
  const phrase = target.textContent;
  const characters = [...phrase];
  let i = 0;
  target.textContent = '';
  const timer = window.setInterval(() => {
    target.textContent += characters[i];
    i += 1;
    if (i >= characters.length) window.clearInterval(timer);
  }, 58);
}

function setupContactForm() {
  const form = qs('#contact-form');
  const inputs = [
    { element: qs('#contact-name'), error: qs('#name-error'), label: 'nombre' },
    { element: qs('#contact-email'), error: qs('#email-error'), label: 'correo' },
    { element: qs('#contact-message'), error: qs('#message-error'), label: 'mensaje' },
  ];
  const status = qs('#form-message');

  function validationMessage(input, label) {
    const text = input.value.trim();
    if (!text) return `Introduce tu ${label}.`;
    if (label === 'correo' && !emailPattern.test(text)) return 'Introduce una dirección de correo válida.';
    if (label === 'mensaje' && text.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    if (text.length > Number(input.maxLength)) return `Has superado el límite de caracteres del campo ${label}.`;
    return '';
  }

  function validateField(field) {
    const message = validationMessage(field.element, field.label);
    field.error.textContent = message;
    field.element.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }

  inputs.forEach((field) => {
    field.element.addEventListener('blur', () => validateField(field));
    field.element.addEventListener('input', () => {
      if (field.element.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = inputs.map(validateField).every(Boolean);
    if (!valid) {
      status.className = 'form-message is-error';
      status.textContent = 'Revisa los campos señalados antes de continuar.';
      inputs.find((field) => field.element.getAttribute('aria-invalid') === 'true')?.element.focus();
      return;
    }

    const recipient = validEmail(SITE_CONFIG.email);
    if (!recipient) {
      status.className = 'form-message is-error';
      status.textContent = 'Este formulario aún no tiene correo de destino. Configúralo en js/script.js antes de publicar.';
      return;
    }
    const name = qs('#contact-name').value.trim();
    const email = qs('#contact-email').value.trim();
    const message = qs('#contact-message').value.trim();
    const subject = `Contacto desde el portfolio — ${name}`;
    const body = `Hola, Fineas:\n\n${message}\n\n---\nEnviado por: ${name}\nCorreo de respuesta: ${email}`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = 'form-message is-info';
    status.textContent = 'Se intentará abrir tu aplicación de correo con el mensaje preparado. Debes enviarlo desde allí; esta web no puede confirmar la entrega.';
    window.location.href = mailto;
  });
}

function init() {
  qsa('[data-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });
  populateSkills();
  populateLinks();
  setupMobileMenu();
  setupActiveSection();
  setupReveals();
  setupTyping();
  setupContactForm();
}

init();
