import { PlatformType } from '@vkontakte/vkui/dist/lib/platform';
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 *
 * Подставляйте соответствующий селектор самостоятельно.
 * @deprecated
 */
export declare function getPlatformClassName(base: string, osname?: PlatformType): string;
/**
 * Подставляйте соответствующий селектор самостоятельно.
 *
 * @deprecated
 */
export declare function getPlatformClassName<Styles extends Record<string, string>>(base: keyof Styles, osname?: PlatformType, styles?: Styles): string | undefined;
