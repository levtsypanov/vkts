/**
 * Возвращает цветовые компоненты r, g, b
 * @param input цвет (hex, rgb)
 */
export declare function parseColor(input: string): number[];
/**
 * Возвращает цвет, полученный в результате наложения
 * черного цвета с alpha прозначностью на цвет target
 * @param target фоновый цвет (hex, rgb)
 * @param alpha кэффициент заливки церным цветом
 */
export declare const blackedColor: (target: string, alpha: number) => string;
