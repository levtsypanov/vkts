import { ResourceLanguage } from 'i18next';
export interface RawResourceLanguage {
    id: number;
    code: string;
    keys: {
        [key: string]: any;
    };
    config: {
        id: number;
        numDel: string;
        numDelS: string;
        numDec: string;
        timeSys: string[];
        RTL: boolean;
        yearOffset: number;
        [key: string]: any;
    };
}
export declare enum LanguageNamespace {
    TRANSLATION = "translation",
    COMMON = "common",
    CONFIG = "config"
}
/**
 * Преобразует сырые данные словаря переводов ВК к данным в формате i18next
 * @param rawResourceLanguage сырые данные словаря переводов ВК
 * @param defaultNs название нэймспейса по умолчанию
 * @param defaultNsPrefix основной префикс ключей переводов, относящихся к проекту
 */
export declare function formatResourceLanguage(rawResourceLanguage: RawResourceLanguage, defaultNs: string, defaultNsPrefix: string): ResourceLanguage;
