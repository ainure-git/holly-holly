# Holly Cards · Despliegue

Carpeta lista para subir a GitHub Pages. No requiere build, Node ni dependencias.

## Contenido

| Archivo | Tamaño | Para qué |
|---|---|---|
| `index.html` | 278 KB | Juego completo (HTML + CSS + JS inline) |
| `intro.mp3` | 2.3 MB | Música de menús |
| `batalla.mp3` | 8.3 MB | Música de combate |
| `favicon.svg` | 1 KB | Icono de la app |
| `manifest.webmanifest` | 1 KB | Metadatos para instalación PWA |

**Los cinco archivos deben estar juntos en la raíz del repo.** El HTML usa rutas relativas (`./intro.mp3`, `./favicon.svg`, etc.) — no hay que cambiar nada.

---

## GitHub Pages (ruta recomendada)

### 1. Crear el repositorio

Desde https://github.com/new crea un repo público (puede llamarse como quieras — `holly-cards`, `tcg-sevilla`, lo que sea).

### 2. Subir los archivos

Opción A — vía web (la más fácil):

1. En el repo vacío, pulsa **"uploading an existing file"**
2. Arrastra los 5 archivos (`index.html`, `intro.mp3`, `batalla.mp3`, `favicon.svg`, `manifest.webmanifest`)
3. **Commit changes**

Opción B — vía git:

```bash
cd E:\CODE_feliz\HOLLY-HOLLY\holly
git init
git add .
git commit -m "Holly Cards v0.5.0"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/holly-cards.git
git push -u origin main
```

### 3. Activar GitHub Pages

En tu repo:

1. **Settings** (arriba a la derecha)
2. Menú izquierdo → **Pages**
3. Section **"Build and deployment"**
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
4. **Save**

A los 30-60 segundos verás arriba: `Your site is live at https://TU_USUARIO.github.io/holly-cards/`

### 4. Probar

Abre esa URL en el móvil (en horizontal). La primera carga baja los 10.5 MB de música (unos 5-15 segundos con buena conexión) y queda cacheado. A partir de ahí arranca al instante.

---

## Notas

**Autoplay de música.** Los navegadores móviles bloquean autoplay hasta que tocas la pantalla. El juego lo tiene en cuenta — la música arranca en tu primer tap/click, que suele ser al pulsar "MODO CAMPAÑA" o "PARTIDA RÁPIDA".

**HTTPS.** GitHub Pages da HTTPS gratis. El juego lo requiere para que el Web Audio API funcione sin restricciones adicionales.

**Caché agresivo de GitHub Pages.** Si actualizas los MP3 o el HTML, puede tardar 5-10 min en verse el cambio. Fuerza refresh con `Ctrl+Shift+R` o añade `?v=2` al final de la URL.

**Dominio propio.** Si más adelante quieres `hollycards.app` en vez de `github.io/holly-cards`, en Settings → Pages → Custom domain añades el dominio y configuras un CNAME en tu DNS apuntando a `TU_USUARIO.github.io`.

---

## Alternativas a GitHub Pages

Los mismos 5 archivos funcionan en cualquier hosting estático:

- **Netlify**: arrastras la carpeta a netlify.com/drop → URL en 10 segundos
- **Cloudflare Pages**: conecta el repo de GitHub → deploy automático en cada push
- **Vercel**: igual que Cloudflare Pages

Ninguno requiere configuración especial porque el juego es 100% estático.

---

## Actualizar el juego

Cuando te mande una nueva versión, solo tienes que **sustituir los 5 archivos** por los nuevos y hacer push a `main`. GitHub Pages detecta el cambio y redeploys automáticamente.
