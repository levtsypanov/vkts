import { StatEventData, StatEventsInstance } from './types';
interface StatEventsParams {
    appId: number;
    userId: number;
    platform: string;
    url: string;
    callVkMethod(method: string, params: object): Promise<void>;
}
interface StatEventOptions {
    batchInterval?: number;
}
export declare function createStatEventsInstance<T extends Record<string, StatEventData>>(events: T, params: StatEventsParams, options?: StatEventOptions): StatEventsInstance<T>;
export {};
