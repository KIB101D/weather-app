// src/js/services/weatherService.js

import { fetchWeather, fetchWeatherByCoords } from '../api/weatherApi.js';
import { renderWeather, renderError, renderLoading } from '../components/weatherCard.js';
import { setLastWeatherData } from '../services/translationService.js';
import { getTranslation } from '../services/translationService.js';

export const loadWeather = async (city) => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
        renderError(getTranslation('errorEmpty'));
        return;
    }

    renderLoading();

    try {
        const data = await fetchWeather(trimmedCity);

        renderWeather(data);
        setLastWeatherData(data);
        localStorage.setItem('lastSearchedCity', trimmedCity);

    } catch (error) {
        let message;

        if (error.message === 'city_not_found') {
            message = getTranslation('errorCityNotFound');
        } else if (error.message === 'server_error') {
            message = getTranslation('errorServer');
        } else {
            message = getTranslation('errorNetwork');
        }

        renderError(message);
    }
};

export const loadWeatherByCoords = async (lat, lon) => {
    renderLoading();

    try {
        const data = await fetchWeatherByCoords(lat, lon);

        const cityName = `${data.name}, ${data.sys.country}`;

        renderWeather(data);
        setLastWeatherData(data);
        localStorage.setItem('lastSearchedCity', cityName);

    } catch (error) {
        let message;

        if (error.message === 'city_not_found') {
            message = getTranslation('errorCityNotFound');
        } else if (error.message === 'server_error') {
            message = getTranslation('errorServer');
        } else {
            message = getTranslation('errorNetwork');
        }

        renderError(message);
    }
};
