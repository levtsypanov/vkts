export declare const getUserToken: (setUserToken: string, app_id: number) => Promise<string>;
export declare function subscribeMessageFromGroupDefault(groupIDsubscription: any, setTemplatePage: any, nextPage: any): void;
export declare function subscribeMessageFromGroupTasks(openAlert: any, groupIDsubscription: any, typeState: any): void;
export declare function addGroup(group_id: number, page: string): void;
export declare function AddToCommunity(): void;
export declare function goToApp(app_id: number): void;
export declare const returnMethod: (count: any, asyncFn: any, fn: any, page: any) => Promise<void>;
export declare const returnAsyncMethod: (arr: any, seconds: any) => Promise<void>;
