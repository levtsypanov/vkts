import React from 'react';
export declare const fixTypography: (string: string, wordLength?: number) => string | undefined;
interface TypoProps {
    children: React.ReactNode;
}
export declare function Typo({ children }: TypoProps): React.ReactNode;
export declare function pluralize(number: number, titles: string[]): string;
export {};
