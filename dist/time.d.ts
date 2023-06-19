export declare const addLeadingZero: (number: number) => string;
interface TimeComponents {
    hours: string;
    mins: string;
    secs: string;
}
export declare const seconds2components: (seconds: number) => TimeComponents;
export declare const formatSeconds: (seconds: number) => string;
export {};
