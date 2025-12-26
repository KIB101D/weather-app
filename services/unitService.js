// src/js/services/unitService.js

let currentUnit = localStorage.getItem('weatherUnit') || 'c';

export const getCurrentUnit = () => currentUnit;

export const setUnit = (unit) => {
    if (unit !== 'c' && unit !== 'f') return;
    currentUnit = unit;
    localStorage.setItem('weatherUnit', unit);
};

export const convertTemp = (tempInC, unit = currentUnit) => {
    if (unit === 'f') {
        return Math.round(tempInC * 9 / 5 + 32);
    }
    return Math.round(tempInC);
};

export const getUnitSymbol = () => {
    return currentUnit === 'f' ? '°F' : '°C';
};