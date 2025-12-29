// src/js/services/autocompleteService.js

import { getElement } from '../utils/dom.js';
import { loadWeatherByCoords } from '../services/weatherService.js';
import { loadWeather } from '../services/weatherService.js';
import { fetchCities } from '../api/geocodingApi.js';
import { DisplayService } from './DisplayService.js';

const cityInput = getElement('#city-input');
const autocompleteList = getElement('#autocomplete-list');

let currentItems = [];
let highlightedIndex = -1;

const renderList = (cities) => {
    if (cities.length === 0) {
        hideList();
        return;
    }

    autocompleteList.innerHTML = cities
        .map(
            (city) => `
                <li data-city="${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}"
                    data-lat="${city.lat}"
                    data-lon="${city.lon}">
                    <div class="city-name">${city.name}</div>
                    <div class="city-country">${city.state ? `${city.state}, ` : ''}${city.country}</div>
                </li>
            `
        )
        .join('');

    currentItems = Array.from(autocompleteList.querySelectorAll('li'));
    highlightedIndex = -1;
    DisplayService.show('#autocomplete-list');
};

const hideList = () => {
    DisplayService.hide('#autocomplete-list');
    currentItems = [];
    highlightedIndex = -1;
};

const selectCity = (cityName, lat, lon) => {
    cityInput.value = cityName;
    hideList();
    loadWeatherByCoords(lat, lon);
};

// === Події на інпуті ===
cityInput.addEventListener('input', debounce(async (e) => {
    const query = e.target.value.trim();
    const cities = await fetchCities(query);
    renderList(cities);
}, 300));

// === Клік по пропозиції ===
autocompleteList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) {
        const cityName = li.dataset.city;
        const lat = li.dataset.lat;
        const lon = li.dataset.lon;
        selectCity(cityName, lat, lon);
    }
});

// === Клавіатура (стрілки, Enter, Esc) ===
cityInput.addEventListener('keydown', (e) => {
    if (!currentItems.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex + 1) % currentItems.length;
        updateHighlight();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIndex = (highlightedIndex - 1 + currentItems.length) % currentItems.length;
        updateHighlight();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0) {
            const item = currentItems[highlightedIndex];
            const cityName = item.dataset.city;
            const lat = item.dataset.lat;
            const lon = item.dataset.lon;
            selectCity(cityName, lat, lon);
        } else {
            // Якщо нічого не виділено — шукаємо по введеному тексту (як раніше)
            const query = cityInput.value.trim();
            if (query) {
                loadWeather(query);
            }
        }
    } else if (e.key === 'Escape') {
        hideList();
    }
});

const updateHighlight = () => {
    currentItems.forEach((item, i) => {
        item.classList.toggle('highlighted', i === highlightedIndex);
    });
};

// === Закриття при кліку поза списком ===
document.addEventListener('click', (e) => {
    if (!e.target.closest('.autocomplete-wrapper')) {
        hideList();
    }
});

// === Debounce ===
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export const initAutocomplete = () => {
    // Ініціалізація
};