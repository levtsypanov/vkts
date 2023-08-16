declare type ToHumanFriendlyParams = {
    bytes: number;
    fractionDigits?: number;
    useSi?: boolean;
};
declare function toHumanFriendlyString({ bytes, fractionDigits, useSi, }: ToHumanFriendlyParams): string;
declare function toHumanFriendlyValue({ bytes, fractionDigits, useSi, }: ToHumanFriendlyParams): {
    value: number;
    unit: string;
};
export declare const BytesHelperLang: {
    toHumanFriendlyValue: typeof toHumanFriendlyValue;
    toHumanFriendlyString: typeof toHumanFriendlyString;
};
export {};
