// src/js/api/geocodingApi.js

import { getCurrentLang } from '../services/translationService.js';

const API_KEY = '0a178768b73fa365b9ac852db3d15da2';
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

const langMap = {
    ua: 'uk',
    en: 'en',
    pl: 'pl'
};

export const fetchCities = async (query) => {
    if (query.length < 3) return [];

    const lang = langMap[getCurrentLang()] || 'en';

    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&limit=8&appid=${API_KEY}&lang=${lang}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Geocoding API error:', err);
        return [];
    }
};