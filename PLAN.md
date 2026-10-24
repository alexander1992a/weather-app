# PLAN: App de Clima

## Fase 1: Estructura HTML base
- **Qué hace:** Crea el `index.html` con el input de búsqueda, botón, contenedor de resultados, indicador de carga y mensajes de error.
- **Archivos que toca:** `index.html`
- **Verificación:** Se abre en el navegador y muestra todos los elementos visuales necesarios.

## Fase 2: Estilos CSS
- **Qué hace:** Da formato visual limpio y responsive a la aplicación con CSS.
- **Archivos que toca:** `style.css`
- **Verificación:** Se ve moderno, ordenado y centrado tanto en PC como en celular.

## Fase 3: Lógica con JavaScript y consumo de API (Open-Meteo)
- **Qué hace:** Implementa la búsqueda por nombre de ciudad, llamada a la API con fetch/async-await, manejo de estados (cargando, éxito, error) y renderizado en pantalla.
- **Archivos que toca:** `app.js`
- **Verificación:** Buscás una ciudad y muestra la temperatura, viento y humedad reales, o los mensajes de error previstos.

## Fase 4: Publicación en Cloudflare Pages
- **Qué hace:** Sube el código a GitHub y realiza el deploy público.
- **Archivos que toca:** Ninguno (configuración externa)
- **Verificación:** La app está online y funciona con su URL pública.
