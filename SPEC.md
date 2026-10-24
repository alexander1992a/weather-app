# SPEC: App de Clima

## 1. Problema
Las personas necesitan consultar de forma rápida y sencilla la temperatura actual y el clima de su ciudad sin distracciones ni anuncios molestos.

## 2. Usuario
Cualquier usuario de internet que necesite saber el clima actual de su ciudad al instante.

## 3. Qué hace (alcance)
- Permite buscar una ciudad por nombre mediante una entrada de texto.
- Consulta una API pública gratuita (Open-Meteo) para obtener los datos.
- Muestra temperatura actual, estado del cielo, humedad, viento y sensación térmica.
- Muestra un indicador de "Cargando..." mientras realiza la consulta.
- Muestra mensajes claros de error si la ciudad no existe o si falla la conexión.

## 4. Qué NO hace (fuera de alcance)
- No incluye pronóstico extendido de 7 días.
- No incluye mapas interactivos.
- No guarda ciudades favoritas en el almacenamiento local.
- No utiliza geolocalización automática del navegador.

## 5. Criterios de aceptación
- [x] CA1: Dado que busco una ciudad válida, cuando presiono buscar, entonces se muestra la temperatura, estado del cielo, viento, humedad y sensación térmica.
- [x] CA2: Dado que la búsqueda está en curso, cuando espero la respuesta de la API, entonces se muestra un indicador de "Cargando...".
- [x] CA3: Dado que busco una ciudad inexistente, cuando el servidor responde con error, entonces se muestra "Ciudad no encontrada, verifica el nombre".
- [x] CA4: Dado que hay un fallo de red o conexión con la API, cuando intento buscar, entonces se muestra "Error de conexión con el servicio de clima".

## 6. Stack
- Front: HTML + CSS + JavaScript (Vanilla) + Open-Meteo API
- Deploy: Cloudflare Pages

## 7. Listo cuando
Está online en una URL pública de Cloudflare y todos los criterios de aceptación dan sí.
