"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResourceLanguage = exports.LanguageNamespace = void 0;
const COMMON_PREFIX = 'vkui_common';
var LanguageNamespace;
(function (LanguageNamespace) {
    // Ключи из объекта keys с основным префиксом для текущего проекта (указанным в defaultNsPrefix)
    LanguageNamespace["TRANSLATION"] = "translation";
    // Ключи из объекта keys с общим префиксом (указанным в COMMON_PREFIX)
    LanguageNamespace["COMMON"] = "common";
    // Ключи из объекта config
    LanguageNamespace["CONFIG"] = "config";
})(LanguageNamespace = exports.LanguageNamespace || (exports.LanguageNamespace = {}));
function getNamespaceKey(key, translationsPrefix) {
    if (key.startsWith(translationsPrefix)) {
        return [LanguageNamespace.TRANSLATION, key.slice(translationsPrefix.length + 1)];
    }
    if (key.startsWith(COMMON_PREFIX)) {
        return [LanguageNamespace.COMMON, key.slice(COMMON_PREFIX.length + 1)];
    }
    return null;
}
const entities = [
    ['amp', '&'],
    ['apos', "'"],
    ['#x27', "'"],
    ['#x2F', '/'],
    ['#39', "'"],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"'],
];
function decodeHTMLEntities(text) {
    for (let i = 0, max = entities.length; i < max; i++) {
        text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    }
    return text;
}
function getPluralForms(key, values) {
    switch (values.length) {
        case 0:
            return [];
        case 1:
            return [[key, values[0]]];
        case 2:
            return [
                [key, values[0]],
                [`${key}_plural`, values[1]],
            ];
        default:
            return values.map((value, index) => [`${key}_${index}`, value]);
    }
}
/**
 * Преобразует сырые данные словаря переводов ВК к данным в формате i18next
 * @param rawResourceLanguage сырые данные словаря переводов ВК
 * @param defaultNs название нэймспейса по умолчанию
 * @param defaultNsPrefix основной префикс ключей переводов, относящихся к проекту
 */
function formatResourceLanguage(rawResourceLanguage, defaultNs, defaultNsPrefix) {
    const resource = {};
    // rawResourceLanguage.сonfig кладем в неймспейс CONFIG
    resource[LanguageNamespace.CONFIG] = rawResourceLanguage.config;
    // Преобразуем html-коды ключей rawResourceLanguage.keys
    for (const key in rawResourceLanguage.keys) {
        const value = rawResourceLanguage.keys[key];
        if (typeof value === 'string') {
            rawResourceLanguage.keys[key] = decodeHTMLEntities(value);
        }
        else if (Array.isArray(value) && typeof value[0] === 'string') {
            value.forEach((innerValue, index) => {
                rawResourceLanguage.keys[key][index] = decodeHTMLEntities(innerValue);
            });
        }
    }
    // Разбиваем ключи из rawResourceLanguage.keys на TRANSLATION и COMMONS
    Object.entries(rawResourceLanguage.keys).forEach(([key, value]) => {
        const nameSpaceKey = getNamespaceKey(key, defaultNsPrefix);
        if (nameSpaceKey) {
            const [ns, nsKey] = nameSpaceKey;
            resource[ns] = resource[ns] || {};
            if (typeof resource[ns] === 'object') {
                resource[ns][nsKey] = value;
            }
        }
    }, resource);
    // Для нэймспейса TRANSLATION подключаем склонения
    const translationResourceNamespace = resource[LanguageNamespace.TRANSLATION];
    if (translationResourceNamespace) {
        Object.entries(translationResourceNamespace).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                const pluralForms = getPluralForms(key, value.splice(1));
                delete translationResourceNamespace[key];
                pluralForms.forEach(([newKey, newValue]) => {
                    translationResourceNamespace[newKey] = newValue;
                });
            }
        });
    }
    // Кладем ключи из TRANSLATION в основной нэймспейс
    if (defaultNs !== LanguageNamespace.TRANSLATION) {
        resource[defaultNs] = resource[LanguageNamespace.TRANSLATION];
        delete resource[LanguageNamespace.TRANSLATION];
    }
    return resource;
}
exports.formatResourceLanguage = formatResourceLanguage;
