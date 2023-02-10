export interface ObjectClassNames {
    [key: string]: any;
}
export declare type ClassName = number | string | ObjectClassNames | false | null | undefined;
export declare function classNameBuilder(...classnames: ClassName[]): string;
