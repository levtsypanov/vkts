import { Services } from 'i18next';
import { VkLanguage } from './utils/vkLanguage';
export interface DetectionOptions {
    /**
     * Query-string параметров запуска мини-приложения ВК, содержащий в себе vk_language=lng,
     * по которому будет определен язык пользователя
     * (Пример: vk_app_id=123&vk_language=ru&vk_platform=desktop&vk_...)
     * */
    launchParams?: string;
    /**
     * Поддерживаемые языки (в случае, когда определен другой язык, будет использовано значение fallbackLng).
     * Если не указан - поддерживаются все языки
     */
    supportedLanguages?: VkLanguage[];
    fallbackLng?: VkLanguage;
}
export declare function validateDetectionOptions(options: any): options is DetectionOptions;
/**
 * Модуль определения языка пользователя ВК
 */
declare class Detection {
    static readonly type = "languageDetector";
    readonly type = "languageDetector";
    static readonly DEFAULT_FALLBACK_LNG = "ru";
    detectorOptions: DetectionOptions;
    /**
     * Инициализация модуля. Выполняет проверку необходимых полей в detectorOptions для работы модуля
     */
    init(services: Services, detectorOptions: any): void;
    /**
     * Определяет язык пользователя ВК на основе launchParams,
     * переданного в DetectionOptions, либо полученного из URL страницы
     */
    detect(): string;
    /**
     * Преобразует обозначение языка в ВК к обозначению для i18next
     * @param lng обозначение языка в ВК
     */
    static prepareLanguage(lng: VkLanguage): string;
    cacheUserLanguage(): void;
}
export default Detection;
