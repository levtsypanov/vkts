import { SizeType } from '@vkontakte/vkui/dist/lib/adaptivity';
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
declare type SizeYType = SizeType | 'none';
export declare function getSizeYClassName(base: string, sizeY?: SizeYType): string;
export declare function getSizeYClassName<Styles extends Record<string, string>>(base: keyof Styles, sizeY?: SizeYType, styles?: Styles): string | undefined;
export {};
