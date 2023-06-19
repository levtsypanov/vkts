export declare type debounceType = {
    func: Function;
    wait: number;
    immediate?: boolean;
};
export declare function debounce({ func, wait, immediate }: debounceType): any;
