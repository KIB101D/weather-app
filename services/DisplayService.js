// src/js/services/DisplayService.js

import { getElementSafe } from '../utils/dom.js';

export class DisplayService {
    /**
     * Приховує елемент, якщо він існує
     * @param {string} selector - CSS-селектор елемента
     */
    static hide(selector) {
        const el = getElementSafe(selector);
        if (el) {
            el.classList.add('hidden');
        }
        // Якщо елемента немає — просто нічого не робимо, без помилки
    }

    /**
     * Показує елемент, якщо він існує
     * @param {string} selector - CSS-селектор елемента
     */
    static show(selector) {
        const el = getElementSafe(selector);
        if (el) {
            el.classList.remove('hidden');
        }
    }

    /**
     * Перемикає видимість, якщо елемент існує
     * @param {string} selector - CSS-селектор елемента
     */
    static toggle(selector) {
        const el = getElementSafe(selector);
        if (el) {
            el.classList.toggle('hidden');
        }
    }
}