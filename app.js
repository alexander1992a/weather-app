// Referencias a elementos del DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-msg');
const weatherResult = document.getElementById('weather-result');

const cityNameEl = document.getElementById('city-name');
const tempValueEl = document.getElementById('temp-value');
const conditionValueEl = document.getElementById('condition-value');
const apparentTempValueEl = document.getElementById('apparent-temp-value');
const humidityValueEl = document.getElementById('humidity-value');
const windValueEl = document.getElementById('wind-value');

// Traductor básico de códigos de clima WMO de Open-Meteo
function getWeatherCondition(code) {
    const conditions = {
        0: 'Despejado ☀️',
        1: 'Mayormente despejado 🌤️',
        2: 'Parcialmente nublado ⛅',
        3: 'Nublado ☁️',
        45: 'Neblina 🌫️',
        48: 'Neblina con escarcha 🌫️',
        51: 'Llovizna ligera 🌧️',
        61: 'Lluvia ligera 🌧️',
        63: 'Lluvia moderada 🌧️',
        65: 'Lluvia intensa 🌧️',
        71: 'Nevada ligera ❄️',
        95: 'Tormenta eléctrica ⚡'
    };
    return conditions[code] || 'Variable / Desconocido';
}

// Función principal de búsqueda
async function getWeatherData(cityName) {
    if (!cityName.trim()) return;

    // Reiniciar estados visuales
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherResult.classList.add('hidden');

    try {
        // 1. Obtener coordenadas de la ciudad usando la API de Geocoding
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=es&format=json`);
        
        if (!geoResponse.ok) {
            throw new Error('Error de conexión');
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('Ciudad no encontrada');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Obtener el clima actual usando latitud y longitud
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&wind_speed_unit=kmh`);

        if (!weatherResponse.ok) {
            throw new Error('Error de conexión');
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        // 3. Mostrar resultados en pantalla
        cityNameEl.textContent = `${name}, ${country || ''}`;
        tempValueEl.textContent = current.temperature_2m;
        conditionValueEl.textContent = getWeatherCondition(current.weather_code);
        apparentTempValueEl.textContent = current.apparent_temperature;
        humidityValueEl.textContent = current.relative_humidity_2m;
        windValueEl.textContent = current.wind_speed_10m;

        weatherResult.classList.remove('hidden');

    } catch (err) {
        // Manejo de errores según la SPEC
        if (err.message === 'Ciudad no encontrada') {
            errorDiv.textContent = 'Ciudad no encontrada, verifica el nombre.';
        } else {
            errorDiv.textContent = 'Error de conexión con el servicio de clima.';
        }
        errorDiv.classList.remove('hidden');
    } finally {
        // Ocultar indicador de carga siempre al terminar
        loadingDiv.classList.add('hidden');
    }
}

// Eventos de búsqueda
searchBtn.addEventListener('click', () => {
    getWeatherData(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData(cityInput.value);
    }
});
