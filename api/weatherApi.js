// src/js/api/weatherApi.js

import { getCurrentLang } from '../services/translationService.js';

const API_KEY = '0a178768b73fa365b9ac852db3d15da2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
    const lang = getCurrentLang();

    const langMap = {
        ua: 'uk',
        en: 'en',
        pl: 'pl'
    };

    const apiLang = langMap[lang] || 'en';

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=${apiLang}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.status === 404 ? 'city_not_found' : 'server_error');
    }

    return await response.json();
};