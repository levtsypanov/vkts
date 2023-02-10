/// <reference types="react" />
export declare function hasReactNode(value: React.ReactNode): boolean;
export declare function isNumeric(value: any): boolean;
export declare function isFunction(value: any): value is (...args: any[]) => any;
export declare function leadingZero(val: number): string;
export declare function isPrimitiveReactNode(node: React.ReactNode): boolean;
export declare const noop: () => void;
