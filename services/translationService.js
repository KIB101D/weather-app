// src/js/services/translationService.js
const translations = {
    ua: {
        placeholder: "Введіть місто...",
        button: "Пошук",
        feelsLike: "Відчувається як",
        humidity: "Вологість",
        wind: "Вітер",
        windUnit: "м/с",
        errorEmpty: "<strong>Будь ласка, введіть назву міста</strong>",
        errorCityNotFound: "<strong>Місто не знайдено</strong><br>Перевірте правильність написання або спробуйте інше",
        errorServer: "<strong>Виникла помилка на сервері</strong><br>Спробуйте ще раз через кілька хвилин",
        errorNetwork: "<strong>Немає підключення до інтернету</strong><br>Перевірте мережу та оновіть сторінку",
        loading: "Завантажуємо дані...",
        clearButton: "Назад",
    },
    en: {
        placeholder: "Enter city...",
        button: "Search",
        feelsLike: "Feels like",
        humidity: "Humidity",
        wind: "Wind",
        windUnit: "m/s",
        errorEmpty: "<strong>Please enter a city name</strong>",
        errorCityNotFound: "<strong>City not found</strong><br>Please check the spelling or try another city",
        errorServer: "<strong>A server error occurred</strong><br>Please try again in a few minutes",
        errorNetwork: "<strong>No internet connection</strong><br>Please check your network and refresh the page",
        loading: "Loading weather data...",
        clearButton: "Back",
    },
    pl: {
        placeholder: "Wprowadź miasto",
        button: "Szukaj",
        feelsLike: "Czuje się jak",
        humidity: "Wilgotność",
        wind: "Prędkość wiatru",
        windUnit: "m/s",
        errorEmpty: "<strong>Proszę wprowadzić nazwę miasta</strong>",
        errorCityNotFound: "<strong>Miasto nie zostało znalezione</strong><br>Sprawdź pisownię lub spróbuj innego miasta",
        errorServer: "<strong>Wystąpił błąd serwera</strong><br>Spróbuj ponownie za kilka minut",
        errorNetwork: "<strong>Brak połączenia z internetem</strong><br>Sprawdź połączenie sieciowe i odśwież stronę",
        loading: "Ładowanie danych pogodowych...",
        clearButton: "Powrót",
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
