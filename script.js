// Weather Dashboard Application
// Using OpenWeatherMap API (Free tier)

// Configuration
const CONFIG = {
    API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY', // Get free key from https://openweathermap.org/api
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    UNITS: 'metric' // Use metric for Celsius
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastGrid = document.getElementById('forecastGrid');
const historyList = document.getElementById('historyList');

// State
let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    loadDefaultCity();
    displaySearchHistory();
    setInterval(updateDateTime, 60000); // Update time every minute
});

/**
 * Handle search functionality
 */
function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    searchInput.value = '';
    fetchWeatherByCity(city);
}

/**
 * Fetch weather data by city name
 */
async function fetchWeatherByCity(city) {
    try {
        if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
            showError('Please set your OpenWeatherMap API key in script.js');
            loadMockData();
            return;
        }

        const currentUrl = `${CONFIG.BASE_URL}/weather?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`;
        const forecastUrl = `${CONFIG.BASE_URL}/forecast?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`;

        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok) throw new Error('City not found');
        if (!forecastRes.ok) throw new Error('Forecast data not available');

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        addToSearchHistory(currentData.name, currentData.sys.country);
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Display current weather information
 */
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, visibility, clouds, dt } = data;

    // Update header
    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('dateTime').textContent = formatDate(new Date(dt * 1000));

    // Update weather icon and description
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherDescription').textContent = weather[0].description;

    // Update temperature and feels like
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('feelsLike').textContent = Math.round(main.feels_like) + '°C';

    // Update weather details
    document.getElementById('humidity').textContent = main.humidity + '%';
    document.getElementById('windSpeed').textContent = (wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1) + ' km';
    document.getElementById('pressure').textContent = main.pressure + ' mb';
    document.getElementById('maxTemp').textContent = Math.round(main.temp_max) + '°C';
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    const forecastList = data.list;
    const dailyForecasts = {};

    // Group forecasts by date and get one per day (at noon)
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    // Display only 5 days
    forecastGrid.innerHTML = '';
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const card = createForecastCard(forecast);
        forecastGrid.appendChild(card);
    });
}

/**
 * Create a forecast card element
 */
function createForecastCard(forecast) {
    const { dt, main, weather } = forecast;
    const date = new Date(dt * 1000);
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
        <div class="forecast-date">${formatDate(date)}</div>
        <img src="${iconUrl}" alt="Weather icon" class="forecast-icon">
        <div class="forecast-temps">
            <span class="forecast-high">H: ${Math.round(main.temp_max)}°</span>
            <span class="forecast-low">L: ${Math.round(main.temp_min)}°</span>
        </div>
        <div class="forecast-description">${weather[0].description}</div>
    `;

    return card;
}

/**
 * Add city to search history
 */
function addToSearchHistory(city, country) {
    const entry = `${city}, ${country}`;
    
    // Remove if already exists
    searchHistory = searchHistory.filter(item => item !== entry);
    
    // Add to beginning
    searchHistory.unshift(entry);
    
    // Keep only last 8 searches
    searchHistory = searchHistory.slice(0, 8);
    
    // Save to localStorage
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    
    displaySearchHistory();
}

/**
 * Display search history
 */
function displaySearchHistory() {
    historyList.innerHTML = '';

    if (searchHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-message">No search history yet</div>';
        return;
    }

    searchHistory.forEach(city => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<span>${city}</span>`;
        item.addEventListener('click', () => fetchWeatherByCity(city.split(',')[0]));
        historyList.appendChild(item);
    });
}

/**
 * Load default city (example: London)
 */
function loadDefaultCity() {
    if (searchHistory.length > 0) {
        fetchWeatherByCity(searchHistory[0].split(',')[0]);
    } else {
        // Use London as default
        fetchWeatherByCity('London');
    }
}

/**
 * Load mock data (for demo without API key)
 */
function loadMockData() {
    const mockData = {
        name: 'San Francisco',
        sys: { country: 'US' },
        main: {
            temp: 22,
            feels_like: 20,
            temp_max: 25,
            temp_min: 18,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            description: 'partly cloudy',
            icon: '02d'
        }],
        wind: { speed: 4.5 },
        visibility: 10000,
        dt: Math.floor(Date.now() / 1000)
    };

    displayCurrentWeather(mockData);
    
    const mockForecast = {
        list: [
            { dt: Math.floor(Date.now() / 1000) + 86400, main: { temp: 23, temp_max: 26, temp_min: 19 }, weather: [{ icon: '02d', description: 'partly cloudy' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, main: { temp: 21, temp_max: 24, temp_min: 17 }, weather: [{ icon: '03d', description: 'cloudy' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, main: { temp: 19, temp_max: 22, temp_min: 16 }, weather: [{ icon: '04d', description: 'overcast' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, main: { temp: 20, temp_max: 23, temp_min: 18 }, weather: [{ icon: '10d', description: 'light rain' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, main: { temp: 24, temp_max: 27, temp_min: 21 }, weather: [{ icon: '01d', description: 'sunny' }] }
        ]
    };
    
    displayForecast(mockForecast);
}

/**
 * Display error message
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    currentWeatherSection.insertAdjacentElement('beforebegin', errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

/**
 * Format date for display
 */
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Update date and time
 */
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('dateTime').textContent = now.toLocaleDateString('en-US', options);
}