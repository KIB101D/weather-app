// src/js/main.js

import { loadWeather } from './services/weatherService.js';

import { setLastWeatherData } from './services/translationService.js';

import { getElement } from './utils/dom.js';

import {
    setLanguage,
    updatePageTexts,
    getCurrentLang,
    getLastWeatherData
} from './services/translationService.js';

import { renderWeather as renderWeatherCard } from './components/weatherCard.js';

import { setUnit, getCurrentUnit } from './services/unitService.js';

import { DisplayService } from './services/DisplayService.js';

import { initAutocomplete } from './services/autocompleteService.js';

import { initCloudParticles } from './utils/cloudParticles.js';

import { handleGeolocation } from './services/geoService.js';

const searchBtn = getElement('#search');
const cityInput = getElement('#city-input');
const searchForm = document.querySelector('form'); // Додано: посилання на форму
const langSwitcher = document.querySelector('.lang-switcher');
const langCurrentBtn = document.querySelector('.lang-current');
const langCurrentText = document.querySelector('.lang-current-text');
const langDropdown = document.querySelector('.lang-dropdown');
const langOptions = document.querySelectorAll('.lang-option');
const unitsButtons = document.querySelectorAll('.units-btn');
const geoBtn = document.getElementById('geo-btn');

// Re-safe
DisplayService.hide('.weather-card');
DisplayService.hide('.weather-card__actions');
DisplayService.show('.search-screen'); // Якщо використовуєш .search-screen — показуємо на старті

updatePageTexts();

const updateCurrentLangText = () => {
    const current = getCurrentLang();
    const labels = {
        ua: 'UA',
        en: 'EN',
        pl: 'PL'
    };
    langCurrentText.textContent = labels[current] || 'UA';
    // hide dropdown
    langSwitcher.dataset.open = 'false';
    langCurrentBtn.setAttribute('aria-expanded', 'false');
    langDropdown.hidden = true;
};


// === Toggle open/close dropdown ===
langCurrentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langSwitcher.dataset.open === 'true';
    if (isOpen) {
        updateCurrentLangText();
    } else {
        langSwitcher.dataset.open = 'true';
        langCurrentBtn.setAttribute('aria-expanded', 'true');
        langDropdown.hidden = false;
    }
});

// === Change language with dropdown ===
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const newLang = option.dataset.lang;
        if (newLang === getCurrentLang()) {
            updateCurrentLangText();
            return;
        }
        setLanguage(newLang);
        updatePageTexts();
        updateCurrentLangText();
        const lastCity = localStorage.getItem('lastSearchedCity');
        if (lastCity) {
            loadWeather(lastCity);
        }
    });
});

document.addEventListener('click', () => {
    if (langSwitcher.dataset.open === 'true') {
        updateCurrentLangText();
    }
});

updateCurrentLangText();

// === Unit switch °C / °F ===
unitsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const unit = btn.dataset.unit;
        if (unit === getCurrentUnit()) return;
        setUnit(unit);
        unitsButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lastData = getLastWeatherData();
        if (lastData) {
            renderWeatherCard(lastData);
            DisplayService.show('.weather-card');
        }
    });
    if (btn.dataset.unit === getCurrentUnit()) {
        btn.classList.add('active');
    }
});

// === Search btn ===
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        loadWeather(city);
    }
});

// === Enter key support (fixed) ===
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            loadWeather(city);
        }
    }
});

// Absolute Defence for default submit form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        loadWeather(city);
    }
});

// === Button "Exit" ===
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'clear-btn') {
        cityInput.value = '';

        localStorage.removeItem('lastSearchedCity');

        setLastWeatherData(null);

        DisplayService.hide('.weather-card');
        DisplayService.hide('.weather-card__actions');

        DisplayService.show('.search-screen');
    }
});

initAutocomplete();
initCloudParticles();

// === Load latest city from storage ===
const lastCity = localStorage.getItem('lastSearchedCity');
if (lastCity) {
    loadWeather(lastCity);
}

// Geo
geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Геолокація не підтримується');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const res = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=0a178768b73fa365b9ac852db3d15da2`
                );
                const data = await res.json();

                if (data && data.length > 0) {
                    let cityName = data[0].name;

                    if (cityName.includes(' / ')) {
                        cityName = cityName.split(' / ')[0].trim();
                    }

                    const country = data[0].country;

                    cityInput.value = `${cityName}, ${country}`;
                    cityInput.focus();
                } else {
                    alert('Не вдалося визначити місто за вашими координатами');
                }
            } catch (err) {
                alert('Не вдалося визначити місто');
            }
        },
        () => {
            alert('Дозвіл на геолокацію відхилено');
        }
    );
});

geoBtn.addEventListener('click', handleGeolocation);
