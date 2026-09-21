const CONFIG = window.CONFIG || {
  companyName: 'LogiCode',
  email: 'softwarelogicode@gmail.com',
  whatsapp: '323 450 7432',
  city: 'Puerto Boyacá, Boyacá, Colombia',
  address: 'MI_DIRECCION',
  businessHours: 'HORARIO DE ATENCIÓN',
  existingCatalogUrl: 'https://mazosam69-source.github.io/CATALOGO/',
  whatsappMessage: 'Hola LogiCode, quiero solicitar información sobre sus servicios.',
  catalogProUrl: 'https://mazosam69-source.github.io/CATALOGOPRO/catalogo-pro.html#productos'
};

document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

console.info('LogiCode landing initialized');
