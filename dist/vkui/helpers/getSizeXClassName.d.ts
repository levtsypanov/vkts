import { SizeXType } from './types';
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
export declare function getSizeXClassName(base: string, sizeX?: SizeXType): string;
export declare function getSizeXClassName<Styles extends Record<string, string>>(base: keyof Styles, sizeX?: SizeXType, styles?: Styles): string | undefined;
