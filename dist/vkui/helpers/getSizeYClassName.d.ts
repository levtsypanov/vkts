import { SizeYType } from './types';
export declare function getSizeYClassName(base: string, sizeY?: SizeYType): string;
export declare function getSizeYClassName<Styles extends Record<string, string>>(base: keyof Styles, sizeY?: SizeYType, styles?: Styles): string | undefined;
