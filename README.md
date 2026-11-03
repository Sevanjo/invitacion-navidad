# Una Navidad entre amigos

Invitación digital interactiva (HTML, CSS y JavaScript puros, sin backend) pensada para celular y para compartir por WhatsApp.

## Estructura

```
index.html
css/styles.css
js/main.js
assets/images/     (vacía, para futuras imágenes)
assets/audio/      (aquí va navidad.mp3)
```

## Ejecutar en local

- **Rápido:** abre `index.html` con doble clic en el navegador.
- **Con VS Code:** instala la extensión *Live Server*, clic derecho en `index.html` → *Open with Live Server*. Para verla como en el celular, usa las herramientas de desarrollo del navegador (F12) y activa el modo móvil.

## Cambiar la fecha

En `js/main.js`, edita `EVENT_DATE`. El mes empieza en 0 (noviembre = 10):

```js
const EVENT_DATE = new Date(2026, 10, 8, 10, 0, 0); // 8 nov 2026, 10:00 am
```

Si cambias la fecha, actualiza también el texto en `index.html` (sección "Fecha").

## Música (opcional)

Copia un archivo de música libre de derechos con el nombre `navidad.mp3` en `assets/audio/`. Procura que pese poco (menos de 3 MB). Sin ese archivo, el botón ♪ muestra un aviso y todo lo demás funciona igual.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `invitacion-navidad`) y sube los archivos del proyecto.
2. En el repositorio: **Settings → Pages**.
3. En *Build and deployment*, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. Espera uno o dos minutos. La dirección será `https://TU-USUARIO.github.io/invitacion-navidad/`.
5. Comparte ese enlace por WhatsApp.

No contiene credenciales ni información privada.
