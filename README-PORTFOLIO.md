# Fineas Havran — Portfolio profesional

Portfolio personal de **Fineas Havran**, desarrollador web junior y titulado en Desarrollo de Aplicaciones Web (DAW).

Web estática, **sin frameworks ni dependencias**, realizada con HTML5, CSS3 y JavaScript ES6+. Diseño oscuro editorial, responsive, navegación accesible, secciones de perfil/proyectos/formación/contacto y configuración para enlaces públicos.

## Vista rápida

1. Descarga y descomprime el proyecto.
2. Abre `index.html` directamente en el navegador o usa la extensión **Live Server** de VS Code.
3. Para ejecutar un servidor local, desde la raíz del proyecto:
   ```bash
   python -m http.server 8000
   ```
4. Visita http://localhost:8000 en el navegador.

No necesita instalar paquetes ni ejecutar un proceso de compilación.

## Cómo personalizar

### Enlaces, contacto y tecnologías

Edita el objeto `SITE_CONFIG` al principio de `js/script.js`:

```js
const SITE_CONFIG = {
  email: '',           // tu correo REAL: 'hola@tudominio.es'
  github: '',          // 'https://github.com/tuusuario'
  linkedin: '',        // 'https://www.linkedin.com/in/tuusuario/'
  cvUrl: '',           // 'docs/cv.pdf', después de añadir el PDF
  f1Repository: '',   // enlace real al repositorio
  f1Demo: '',         // enlace real a la demo
  skills: {
    frontend: [{ name: 'HTML5', icon: 'H5' }, { name: 'CSS3', icon: 'C3' }, { name: 'JavaScript', icon: 'JS' }],
    backend: [],
    databases: [],
    tools: [],
  },
};
```

- Los enlaces vacíos no se presentan como enlaces operativos. El botón de CV aparece **solo** cuando `cvUrl` está configurado.
- El formulario permanece desactivado mientras `email` esté vacío. Al configurar un correo válido, se habilita y prepara un mensaje mediante `mailto:`: esto **abre la aplicación de correo del visitante**, pero no envía nada desde la web ni confirma la entrega. Para envío real desde una web necesitas backend o proveedor de formularios.
- Las tres tecnologías iniciales son las que aparecen en el prototipo HTML/CSS/JS del proyecto F1 Draft descrito. El resto de categorías están vacías para que solo agregues habilidades verificadas. Puedes modificar cualquier tecnología si no quieres presentarla.
- Si configuras enlaces externos, comprueba que sean correctos y públicos.

### Datos personales y formación

Edita `index.html` directamente. En la sección Formación sustituye los textos «pendiente de añadir» por el centro y las fechas reales. Puedes ajustar descripción, proyectos, estado de desarrollo y experiencia conforme a tu perfil real.

### Proyectos

El proyecto **F1 Draft** aparece como **prototipo en desarrollo** (no como aplicación terminada). Su imagen `assets/images/f1-draft-concept.svg` es **una ilustración conceptual, no una captura real**. Reemplázala por una captura de pantalla auténtica cuando dispongas de ella y actualiza el texto alternativo de la etiqueta `<img>`.

Las tarjetas «Próximo proyecto» y «El siguiente reto» son espacios reservados. No simulan proyectos completados. Puedes duplicar el marcado de `<article class="featured-project">` para agregar trabajos reales.

### CV

Pon tu documento real en `docs/cv.pdf` y cambia en `js/script.js`:

```js
cvUrl: 'docs/cv.pdf',
```

No se incluye un currículum ficticio. La carpeta `docs` contiene únicamente un archivo explicativo hasta que añadas el CV.

### Estilo

Colores, espaciado y tipografías se definen con variables CSS en `:root` dentro de `css/style.css`. Se usan fuentes del sistema; no se descargan fuentes de terceros. El logo y los recursos visuales son SVG locales (excepto la composición de código, hecha en HTML/CSS).

## Estructura de archivos

```text
portfolio-fineas-havran/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── icons/
│   │   ├── favicon.svg
│   │   ├── html5.svg
│   │   ├── css3.svg
│   │   └── javascript.svg
│   └── images/
│       ├── f1-draft-concept.svg
│       └── og-cover.svg
├── docs/
│   └── LEEME.txt
└── README.md
```

## Despliegue

**GitHub Pages:** crea un repositorio, sube estos archivos y en Settings → Pages selecciona la rama de publicación con carpeta raíz. El sitio quedará disponible cuando GitHub lo publique.

**Netlify / Cloudflare Pages:** publica la carpeta del proyecto como sitio estático. No hay comando de build.

Antes de hacerlo:
- Configura links y correo reales.
- Sustituye los datos académicos incompletos.
- Añade proyectos demostrables con capturas y repositorios reales.
- Usa URL absolutas para `og:image` y el resto de metadatos sociales una vez conozcas el dominio público definitivo. El SVG actual es una portada visual, pero ciertas plataformas exigen imágenes PNG/JPG accesibles mediante URL absoluta.
- Ajusta el año y metadatos según tus necesidades (el copyright se actualiza automáticamente por JS).
- Si publicas un formulario mediante un proveedor externo, añade política de privacidad y documentación de tratamiento de datos si procede.

## Accesibilidad y funcionamiento

Incluye HTML semántico, skip link, etiquetas vinculadas a sus campos, mensajes de validación, navegación por teclado, indicador de sección activa, botón móvil con `aria-expanded`, Escape para cerrar, contraste oscuro, lazy loading de imagen y preferencia `prefers-reduced-motion`.

No se reclama una certificación de conformidad WCAG 2.2 AA. Requiere auditoría humana adicional, pruebas con lector de pantalla y verificación antes de uso profesional.

## Pruebas

El código se ha planteado para navegador moderno. Consulta el informe de verificaciones proporcionado junto a la entrega; cualquier comprobación no ejecutada debe interpretarse como pendiente, no como superada.
