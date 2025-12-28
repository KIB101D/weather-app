// src/js/components/weatherCard.js

import { getElement } from '../utils/dom.js';
import { getTranslation } from '../services/translationService.js';
import { convertTemp, getUnitSymbol } from '../services/unitService.js';
import { DisplayService } from '../services/DisplayService.js';

const getResultContainer = () => getElement('.weather-result');

const removeOverlay = () => {
    const overlay = document.querySelector('.app-overlay');
    if (overlay) {
        overlay.remove();
    }
};

export const renderLoading = () => {
    removeOverlay();

    const loadingText = getTranslation('loading');

    const overlay = document.createElement('div');
    overlay.className = 'app-overlay loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p class="loading-text">${loadingText}</p>
        </div>
    `;
    document.body.appendChild(overlay);
};

export const renderError = (message) => {
    removeOverlay();

    const overlay = document.createElement('div');
    overlay.className = 'app-overlay error-overlay';
    overlay.innerHTML = `
        <div class="error-content">
            <p class="error-icon">⚠️</p>
            <p class="error-message">${message}</p>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(removeOverlay, 5000);
};

export const renderWeather = (data) => {
    removeOverlay();

    const container = getResultContainer();

    const t = {
        feelsLike: getTranslation('feelsLike'),
        humidity: getTranslation('humidity'),
        wind: getTranslation('wind')
    };

    const temp = convertTemp ? convertTemp(data.main.temp) : Math.round(data.main.temp);
    const feelsLike = convertTemp ? convertTemp(data.main.feels_like) : Math.round(data.main.feels_like);
    const symbol = getUnitSymbol ? getUnitSymbol() : '°C';

    container.innerHTML = `
        <div class="weather-card">
            <h2 class="weather-card__city">${data.name}, ${data.sys.country}</h2>
            <img 
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                alt="${data.weather[0].description}" 
                class="weather-card__icon"
            >
            <p class="weather-card__temp">${temp}${symbol}</p>
            <p class="weather-card__description">
                ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
            </p>
            <p class="weather-card__details">
                ${t.feelsLike}: ${feelsLike}${symbol} • 
                ${t.humidity}: ${data.main.humidity}% • 
                ${t.wind}: ${data.wind.speed} м/с
            </p>

            <div class="weather-card__actions">
                <button id="clear-btn" class="clear-btn">${getTranslation('clearButton')}</button>
            </div>
        </div>
    `;

    DisplayService.hide('.search-screen');
};
