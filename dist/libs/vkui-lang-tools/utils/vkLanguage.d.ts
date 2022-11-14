declare const supportedLanguages: readonly ["ru", "uk", "ua", "en", "be", "kz", "pt", "es"];
export declare type VkLanguage = typeof supportedLanguages[number];
/**
 * Извлекает язык пользователя из параметров запуска мини-приложения ВК
 * @param launchParams query-string параметров запуска мини-приложения ВК
 */
export declare function getLaunchParamsVkLanguage(launchParams: string): VkLanguage | undefined;
export {};
