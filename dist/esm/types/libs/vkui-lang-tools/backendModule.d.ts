import { Services, ReadCallback, InitOptions } from 'i18next';
import { RawResourceLanguage } from './utils/resourceLanguage';
export declare type BackendFallback = (lng: string) => Promise<RawResourceLanguage>;
export interface BackendOptions {
    name: string;
    defaultNsPrefix: string;
    /**
     * Источник получения переводов (по умолчанию: vk)
     * - vk - через платформу преводов ВК
     * - fallback - альтернативным способом с помощью fallback (необходим fallback)
     */
    source?: 'vk' | 'fallback';
    /**
     * Альтернатинвный способ получения данных, применяемый
     * в случае ошибки получения переводов ВК или при указанном source = 'fallback'
     */
    fallback?: BackendFallback;
}
export declare function validateBackendOptions(options: any): options is BackendOptions;
/**
 * Модуль подгрузки словаря переводов ВК
 */
declare class Backend {
    static readonly type = "backend";
    readonly type = "backend";
    static readonly DEFAULT_SOURCE = "vk";
    backendOptions: BackendOptions;
    services: Services;
    defaultNs: string;
    /**
     * Инициализация модуля.
     * Выполняет проверку необходимых полей в backendOptions для работы модуля
     * и устанавливает необходимые параметры инициализации i18next
     */
    init(services: Services, backendOptions: any, i18nextOptions: InitOptions): void;
    /**
     * Подгружает словарь переводов ВК и преобразует его для i18next
     */
    read(lng: string, namespace: string, callback: ReadCallback): void;
    /**
     * Скачивает словарь в платформе переводов ВК
     * @param name название проекта в платформе переводов ВК
     * @param lng язык перевода
     */
    static fetchRawResourceLanguage(name: string, lng: string): Promise<RawResourceLanguage>;
    create(): void;
}
export default Backend;
