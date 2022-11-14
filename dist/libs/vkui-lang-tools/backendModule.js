"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBackendOptions = void 0;
const resourceLanguage_1 = require("./utils/resourceLanguage");
const misc_1 = require("./utils/misc");
function validateBackendOptions(options) {
    return Boolean(options &&
        typeof options === 'object' &&
        typeof options.name === 'string' &&
        typeof options.defaultNsPrefix === 'string' &&
        (typeof options.source === 'undefined' || ['vk', 'fallback'].includes(options.source)) &&
        ['function', 'undefined'].includes(typeof options.fallback) &&
        (options.source !== 'fallback' || typeof options.fallback === 'function'));
}
exports.validateBackendOptions = validateBackendOptions;
class BackendError extends Error {
}
/**
 * Модуль подгрузки словаря переводов ВК
 */
class Backend {
    static type = 'backend';
    type = 'backend';
    static DEFAULT_SOURCE = 'vk';
    backendOptions = {
        name: 'name',
        defaultNsPrefix: 'name',
    };
    services = {};
    defaultNs = 'translation'; // нэмспейс i18next по умолчанию
    /**
     * Инициализация модуля.
     * Выполняет проверку необходимых полей в backendOptions для работы модуля
     * и устанавливает необходимые параметры инициализации i18next
     */
    init(services, backendOptions, i18nextOptions) {
        if (validateBackendOptions(backendOptions)) {
            this.backendOptions = backendOptions;
        }
        else {
            throw new BackendError('Объект backend не соответствует интерфейсу BackendOptions');
        }
        services.resourceStore.options.fallbackLng = false;
        services.resourceStore.options.interpolation = { prefix: '{', suffix: '}' };
        services.interpolator.reset();
        this.services = services;
        this.defaultNs = (0, misc_1.arrify)(i18nextOptions.defaultNS || this.defaultNs)[0];
    }
    /**
     * Подгружает словарь переводов ВК и преобразует его для i18next
     */
    read(lng, namespace, callback) {
        const { fallback, name, source } = this.backendOptions;
        const getRawResourceLanguage = {
            vk() {
                return Backend.fetchRawResourceLanguage(name, lng).catch((e) => (fallback ? fallback(lng) : Promise.reject(e)));
            },
            fallback() {
                return fallback
                    ? fallback(lng)
                    : Promise.reject(new BackendError('Поле fallback у объекта backend не было получено'));
            },
        };
        getRawResourceLanguage[source || Backend.DEFAULT_SOURCE]()
            .then((rawResourceLanguage) => {
            const resource = (0, resourceLanguage_1.formatResourceLanguage)(rawResourceLanguage, this.defaultNs, this.backendOptions.defaultNsPrefix);
            this.services.resourceStore.data[lng] = resource;
            callback(null, resource[namespace]);
        })
            .catch(() => {
            callback(new BackendError('Ошибка загрузки словаря через платформу переводов ВК'), false);
        });
    }
    /**
     * Скачивает словарь в платформе переводов ВК
     * @param name название проекта в платформе переводов ВК
     * @param lng язык перевода
     */
    static fetchRawResourceLanguage(name, lng) {
        const encodedName = encodeURIComponent(name);
        const encodedLang = encodeURIComponent(lng);
        const url = `https://vk.com/js/vkui_lang.js?name=${encodedName}&lang=${encodedLang}&format=json`;
        return fetch(url).then((response) => response.json());
    }
    create() {
        // nothing, but required by BackendModule interface
    }
}
exports.default = Backend;
