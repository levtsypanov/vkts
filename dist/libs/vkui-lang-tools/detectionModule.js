"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDetectionOptions = void 0;
const vkLanguage_1 = require("./utils/vkLanguage");
function validateDetectionOptions(options) {
    return Boolean(options &&
        typeof options === 'object' &&
        ['string', 'undefined'].includes(typeof options.fallbackLng) &&
        ['string', 'undefined'].includes(typeof options.launchParams) &&
        (typeof options.supportedLanguages === 'undefined' || Array.isArray(options.supportedLanguages)));
}
exports.validateDetectionOptions = validateDetectionOptions;
class DetectionError extends Error {
}
/**
 * Модуль определения языка пользователя ВК
 */
class Detection {
    static type = 'languageDetector';
    type = 'languageDetector';
    static DEFAULT_FALLBACK_LNG = 'ru';
    detectorOptions = {
        fallbackLng: Detection.DEFAULT_FALLBACK_LNG,
    };
    /**
     * Инициализация модуля. Выполняет проверку необходимых полей в detectorOptions для работы модуля
     */
    init(services, detectorOptions) {
        if (typeof detectorOptions === 'undefined' || validateDetectionOptions(detectorOptions)) {
            this.detectorOptions = detectorOptions || {};
        }
        else {
            throw new DetectionError('Объект detection не соответствует интерфейсу DetectionOptions');
        }
    }
    /**
     * Определяет язык пользователя ВК на основе launchParams,
     * переданного в DetectionOptions, либо полученного из URL страницы
     */
    detect() {
        const { launchParams = window.location.search.slice(1), supportedLanguages } = this.detectorOptions;
        const language = (0, vkLanguage_1.getLaunchParamsVkLanguage)(launchParams) || Detection.DEFAULT_FALLBACK_LNG;
        const resultLanguage = supportedLanguages
            ? supportedLanguages.includes(language)
                ? language
                : Detection.DEFAULT_FALLBACK_LNG
            : language;
        return Detection.prepareLanguage(resultLanguage);
    }
    /**
     * Преобразует обозначение языка в ВК к обозначению для i18next
     * @param lng обозначение языка в ВК
     */
    static prepareLanguage(lng) {
        // для Украины есть два обозначения: ua и uk. Приводим к одному - uk,
        // т.к. i18next знает именно его правила плюрализации
        return lng === 'ua' ? 'uk' : lng;
    }
    cacheUserLanguage() {
        // nothing, but required by LanguageDetectorModule interface
    }
}
exports.default = Detection;
