/**
 * plural(seconds, ['секунду', 'секунды', 'секунд'])
 */
 export function plural(n: number, [a, b = a, c = b]: string[]) {
    if (n % 10 === 1 && n % 100 !== 11) {
        return a;
    }

    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return b;
    }

    return c;
}

export function pluralWithNumber(
    n: number,
    values: string[],
    separator = '\u00A0',
) {
    return `${n}${separator}${plural(n, values)}`;
}

export default plural;
