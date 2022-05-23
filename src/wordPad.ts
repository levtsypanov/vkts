export const wordPad = (num: any, m: string, ma: string, mov: string, t: any) => {
    num %= 100;
    if (num % 10 === 1 && (num < 10 || num > 20)) {
        return t(m);
    }
    if (num % 10 >= 2 && num % 10 <= 4 && (num < 10 || num > 20)) {
        return t(ma);
    }
    return t(mov);
};