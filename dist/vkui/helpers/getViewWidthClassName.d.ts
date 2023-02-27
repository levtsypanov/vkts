import { ViewWidth } from '@vkontakte/vkui/dist/lib/adaptivity';
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
export declare function getViewWidthClassName(base: string, viewWidth?: ViewWidth): string;
export declare function getViewWidthClassName<Styles extends Record<string, string>>(base: keyof Styles, viewWidth?: ViewWidth, styles?: Styles): string | undefined;
