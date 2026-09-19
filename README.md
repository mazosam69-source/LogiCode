# LogiCode

Proyecto frontend para la empresa LogiCode, centrado en una landing page corporativa y una demostración de catálogo PRO con carrito, filtros, variantes, cupones demo y flujo de pedido por WhatsApp.

## Estructura

- `index.html` — landing principal de LogiCode
- `catalogo-pro.html` — catálogo avanzado demo
- `admin.html` — panel administrativo de demostración
- `css/` — estilos principales y responsive
- `js/` — lógica del proyecto
- `img/` — recursos visuales y favicon

## Archivos clave

- `js/config.js` — configuración central del proyecto
- `js/products.js` — productos, categorías y cupones demo
- `js/cart.js` — carrito, descuentos y mensajes para WhatsApp
- `js/catalogo-pro.js` — catálogo, búsqueda, filtros y modal de producto
- `js/form.js` — validación y preparación de envío del formulario
- `js/main.js` — configuración general y navegación

## Cómo editar datos reales

1. Abre `js/config.js`.
2. Cambia `companyName`, `email`, `whatsapp`, `city`, `address`, `businessHours`.
3. Ajusta `existingCatalogUrl` y `catalogProUrl` si es necesario.
4. En `js/products.js` modifica productos, precios, imágenes y categorías.
5. Crea un formulario en [Formspree](https://formspree.io/), confirma `softwarelogicode@gmail.com` y copia el endpoint recibido.
6. Pega ese endpoint en `contactFormEndpoint` dentro de `js/config.js`, por ejemplo `https://formspree.io/f/xxxxxxxx`.

## Cómo ejecutar

Abre la carpeta en VS Code y usa Live Server, o ejecuta:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000/
```

## Notas importantes

- El botón “VER CATÁLOGO” apunta al catálogo externo actual.
- El botón “VER CATÁLOGO PRO” abre `catalogo-pro.html`.
- El formulario usa Formspree para enviar todas las solicitudes al correo configurado en la cuenta de Formspree.
- El endpoint de Formspree es público por diseño; nunca guardes contraseñas, tokens privados o claves de API en este frontend.
- El correo, teléfono, ciudad y dirección de negocio pueden aparecer en GitHub porque son datos públicos del sitio. No subas datos personales de clientes ni credenciales.
- El carrito usa `localStorage` para guardar la sesión del usuario en el navegador.
- Los productos y promociones son demo; puedes reemplazarlos por información real.
