// src/js/components/weatherCard.js

import { getElement } from '../utils/dom.js';
import { getTranslation } from '../services/translationService.js';
import { convertTemp, getUnitSymbol } from '../services/unitService.js';


const getResultContainer = () => getElement('.weather-result');

export const renderWeather = (data) => {
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
        </div>
    `;
};

export const renderError = (message) => {
    const container = getResultContainer();
    container.innerHTML = `<p class="error-message">${message}</p>`;
};

export const renderLoading = () => {
    const container = getResultContainer();
    const loadingText = getTranslation('loading');
    container.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p class="loading-text">${loadingText}</p>
        </div>
    `;
};