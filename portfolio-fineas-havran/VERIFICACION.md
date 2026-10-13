# Verificación técnica de la entrega

**Fecha:** 13 de octubre de 2026.

## Comprobaciones ejecutadas

- **JavaScript:** análisis sintáctico con `node --check js/script.js` — correcto.
- **HTML:** parseado del documento y comprobación de anclas internas, IDs, destinos de etiquetas `label`, referencias `aria-describedby`, textos alternativos de imágenes y nombres de sección — sin referencias rotas detectadas.
- **Assets locales:** verificación de los archivos usados en `src` y `href` (CSS, JS, SVG e icono de sitio) — todos presentes.
- **CSS:** análisis sintáctico de reglas principales con `tinycss2` — sin errores de parseo de reglas detectados.
- **Responsive en código:** existen reglas específicas para anchuras <=1100, <=920, <=650 y <=390 px; incluye menú móvil y reducción de movimiento.
- **Datos personales:** no se han introducido correo, redes, centro educativo, fechas, CV, URLs de repositorio o demo inventados.

## Limitación de las pruebas

Se intentó iniciar **Chromium/Playwright** para pruebas de interacción, inspección de consola y capturas de pantalla con diferentes viewports. El navegador no logró iniciarse dentro del entorno de ejecución. **No se certifican** por ello las comprobaciones visuales, la ausencia de errores de consola en navegador ni la conformidad WCAG 2.2 AA. Hay que revisar manualmente antes de publicar.

## Lista de pruebas manuales recomendada

1. Ejecutar un servidor local (`python -m http.server 8000`) y abrir http://localhost:8000.
2. Probar anchos **320, 390, 768, 1024 y 1440 px**. Confirmar que no aparece scroll horizontal.
3. Abrir el menú móvil, navegar a Proyectos, cerrarlo con Escape y utilizar Tab / Shift+Tab.
4. Verificar los enlaces de navegación y el indicador de sección actual al desplazar la página.
5. Expandir «Cómo funciona el proyecto» mediante ratón y teclado.
6. Confirmar que los enlaces opcionales no aparecen mientras su valor es vacío y que se muestran después de configurarlos.
7. Configurar temporalmente un correo real en `SITE_CONFIG.email`, introducir datos inválidos y válidos en el formulario y comprobar que `mailto:` abre el cliente sin simular el envío. **No envíes correos de prueba sin consentimiento del destinatario**.
8. Activar «Reducir movimiento» en el sistema y comprobar que la información permanece visible y legible.
9. Revisar la consola de desarrollador y ejecutar Lighthouse / axe o equivalente; hacer una revisión manual con lector de pantalla.
10. Antes del despliegue, actualizar los datos pendientes y la URL absoluta de la imagen Open Graph.
