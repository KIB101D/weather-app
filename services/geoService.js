// src/js/services/geoService.js

import { getElement } from '../utils/dom.js';
import { API_KEY } from '../api/weatherApi.js';

const cityInput = getElement('#city-input');

export const handleGeolocation = () => {
    if (!navigator.geolocation) {
        alert('Геолокація не підтримується вашим браузером');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const res = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
                );
                const data = await res.json();

                if (data && data.length > 0 && data[0].name) {
                    let cityName = data[0].name;

                    if (cityName.includes(' / ')) {
                        cityName = cityName.split(' / ')[0].trim();
                    }

                    const country = data[0].country || '';

                    cityInput.value = `${cityName}${country ? ', ' + country : ''}`;
                    cityInput.focus();
                } else {
                    alert('Не вдалося точно визначити місто');
                }
            } catch (err) {
                alert('Помилка при визначенні міста');
            }
        },
        () => {
            alert('Дозвіл на геолокацію відхилено');
        }
    );
};