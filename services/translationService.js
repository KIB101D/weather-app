// src/js/services/translationService.js
const translations = {
    ua: {
        placeholder: "Введіть місто...",
        button: "Пошук",
        feelsLike: "Відчувається як",
        humidity: "Вологість",
        wind: "Вітер",
        errorEmpty: "Введіть назву міста!",
        errorCityNotFound: "Місто не знайдено :(",
        errorServer: "Помилка сервера, спробуйте пізніше",
        errorNetwork: "Немає інтернету",
        loading: "Завантаження...",
        clearButton: "Вихід",
    },
    en: {
        placeholder: "Enter city...",
        button: "Search",
        feelsLike: "Feels like",
        humidity: "Humidity",
        wind: "Wind",
        errorEmpty: "Enter city name!",
        errorCityNotFound: "City not found :(",
        errorServer: "Server error, try again later",
        errorNetwork: "No internet connection",
        loading: "Loading...",
        clearButton: "Clear",
    },
    pl: {
        placeholder: "Wprowadż miasto",
        button: "Szukaj",
        feelsLike: "Czuje się jak",
        humidity: "Wilgotność",
        wind: "Wiatr",
        errorEmpty: "Wprowadż nazwę miasta!",
        errorCityNotFound: "Miasto nieznalezione :(",
        errorServer: "Bład serweru, sprobój pożniej",
        errorNetwork: "Problem z dołaczeniem do internetu",
        loading: "Ładowanie...",
        clearButton: "Wyjdź",
    }
};

let currentLang = localStorage.getItem('weatherAppLang') || 'ua';

export const getTranslation = (key) => {
    return translations[currentLang][key] || key;
};

export const getCurrentLang = () => currentLang;

export const setLanguage = (lang) => {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('weatherAppLang', lang);
};

export const updatePageTexts = () => {
    document.getElementById('city-input').placeholder = getTranslation('placeholder');
    document.getElementById('search').textContent = getTranslation('button');

    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.textContent = getTranslation('clearButton');
    }
};

let lastWeatherData = null;

export const setLastWeatherData = (data) => {
    lastWeatherData = data;
};

export const getLastWeatherData = () => lastWeatherData;
