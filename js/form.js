const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const APP_CONFIG = window.CONFIG || {
  contactFormEndpoint: 'https://formspree.io/f/MI_FORM_ID_AQUI',
  contactFormEmail: 'softwarelogicode@gmail.com'
};

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const requiredFields = [
      'fullName',
      'businessName',
      'email',
      'phone',
      'city',
      'service',
      'message',
      'consent'
    ];

    const missing = requiredFields.some((field) => {
      if (field === 'consent') return !values[field];
      return !String(values[field] || '').trim();
    });

    if (missing) {
      formStatus.textContent = 'Por favor completa todos los campos obligatorios.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(String(values.email).trim())) {
      formStatus.textContent = 'Introduce un correo electrónico válido.';
      formStatus.className = 'form-status error';
      return;
    }

    const endpoint = String(APP_CONFIG.contactFormEndpoint || '').trim();
    if (!endpoint || endpoint.includes('MI_FORM_ID_AQUI')) {
      formStatus.textContent = 'El formulario está preparado, pero falta configurar el endpoint de Formspree en js/config.js.';
      formStatus.className = 'form-status error';
      return;
    }

    try {
      const payload = {
        _subject: 'Nueva solicitud de contacto - LogiCode',
        _replyto: values.email,
        email: values.email,
        fullName: values.fullName,
        businessName: values.businessName,
        phone: values.phone,
        city: values.city,
        service: values.service,
        message: values.message
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('La plataforma de envío no respondió correctamente.');
      }

      formStatus.textContent = 'Tu solicitud fue enviada correctamente. Pronto te contactaremos.';
      formStatus.className = 'form-status success';
      form.reset();
    } catch (error) {
      formStatus.textContent = 'Hubo un problema al enviar el formulario. Revisa la configuración y el correo de destino.';
      formStatus.className = 'form-status error';
      console.error('Contact form error:', error);
    }
  });
}
