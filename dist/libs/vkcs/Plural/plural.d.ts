/**
 * plural(seconds, ['секунду', 'секунды', 'секунд'])
 */
export declare function plural(n: number, [a, b, c]: string[]): string;
export declare function pluralWithNumber(n: number, values: string[], separator?: string): string;
export default plural;
