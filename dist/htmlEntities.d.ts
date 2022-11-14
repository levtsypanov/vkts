/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export declare function escape(input: string): string;
/**
 * Unescape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export declare function unescape(input: string): string;
export declare const outOfBoundsChar: string;
export declare function encodeHTMLEntities(input: string): string;
export declare function decodeHTMLEntities(input: string): string;
