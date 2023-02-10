declare const units: readonly ["КБ", "МБ", "ГБ", "ТБ", "ПБ"];
declare const unitsEn: readonly ["KB", "MB", "GB", "TB", "PB"];
export declare type UnitEn = typeof unitsEn[number];
declare type Unit = typeof units[number];
declare function toNDigits(bytes: any, maxDigitsCount: any, divisor?: number): any;
export declare const BytesHelper: {
    toNDigits: typeof toNDigits;
    toHumanFriendlyValue(bytes: any, fractionDigits?: number): {
        value: number;
        unit: string;
    };
    toHumanFriendlyString(bytes: number, fractionDigits?: number): string;
    bytesToUnit(bytes: any, targetUnit: any, fractionDigits: any): any;
    bytesToKB(value: number): number;
    bytesToMB(value: number): number;
    bytesToGB(value: number): number;
    kilobytesToBytes(value: number): number;
    megabytesToBytes(value: number): number;
    gigabytesToBytes(value: number): number;
    gigabytesToMegabytes(value: number): number;
    formatBytes(value?: number): string;
    enUnitToRu(value: UnitEn): Unit;
    unitsEn: readonly ["KB", "MB", "GB", "TB", "PB"];
};
export {};
