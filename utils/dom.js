// src/js/utils/dom.js

/**
 * Суворий пошук елемента — кидає помилку, якщо не знайдено
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const getElement = (selector) => {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    return el;
};

/**
 * Безпечний пошук елемента — повертає елемент або null
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
export const getElementSafe = (selector) => {
    return document.querySelector(selector);
};
