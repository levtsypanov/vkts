import { ApiSchema, CallApiMethod } from '../hooks/useApiNewsFeed';
type ExtendableMethods = Pick<ApiSchema, 'groups.get' | 'friends.get'>;
export type GetApiList = <T extends keyof ExtendableMethods = keyof ExtendableMethods>(callApi: CallApiMethod, method: T, data: ApiSchema[T]['params'], count: number, maxOffset: number) => Promise<ApiSchema[T]['response']['items']>;
export declare const getApiList: GetApiList;
export {};
