"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchParamsVkLanguage = void 0;
// Source:
// eslint-disable-next-line max-len
// https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0
const supportedLanguages = ['ru', 'uk', 'ua', 'en', 'be', 'kz', 'pt', 'es'];
/**
 * Извлекает язык пользователя из параметров запуска мини-приложения ВК
 * @param launchParams query-string параметров запуска мини-приложения ВК
 */
function getLaunchParamsVkLanguage(launchParams) {
    const foundLanguagePair = launchParams
        .split('&')
        .map((pair) => pair.split('='))
        .find((pair) => pair[0] === 'vk_language');
    return foundLanguagePair && foundLanguagePair[1] ? foundLanguagePair[1] : void 0;
}
exports.getLaunchParamsVkLanguage = getLaunchParamsVkLanguage;
