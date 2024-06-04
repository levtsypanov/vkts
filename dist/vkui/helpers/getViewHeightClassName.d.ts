import { ViewHeight } from './types';
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
export declare function getViewHeightClassName(base: string, viewHeight?: ViewHeight): string;
export declare function getViewHeightClassName<Styles extends Record<string, string>>(base: keyof Styles, viewHeight?: ViewHeight, styles?: Styles): string | undefined;
