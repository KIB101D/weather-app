// src/js/main.js

import { loadWeather } from './services/weatherService.js';

import { getElement } from './utils/dom.js';

import {

    setLanguage,

    updatePageTexts,

    getCurrentLang,

    getLastWeatherData

} from './services/translationService.js';

import { renderWeather as renderWeatherCard } from './components/weatherCard.js';

import { setUnit, getCurrentUnit } from './services/unitService.js';

const searchBtn = getElement('#search');

const cityInput = getElement('#city-input');

const langSwitcher = document.querySelector('.lang-switcher');

const langCurrentBtn = document.querySelector('.lang-current');

const langCurrentText = document.querySelector('.lang-current-text');

const langDropdown = document.querySelector('.lang-dropdown');

const langOptions = document.querySelectorAll('.lang-option');

const unitsButtons = document.querySelectorAll('.units-btn');

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

        }

    });

    if (btn.dataset.unit === getCurrentUnit()) {

        btn.classList.add('active');

    }

});

// === search btn ===

searchBtn.addEventListener('click', () => {

    const city = cityInput.value.trim();

    loadWeather(city);

});

cityInput.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        loadWeather(cityInput.value.trim());

    }

});
