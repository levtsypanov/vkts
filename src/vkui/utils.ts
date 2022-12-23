// Является ли переданное значение числовым
export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
// Является ли переданное значение функцией
export function isFunction(value: any): value is (...args: any[]) => any {
    return typeof value === 'function';
}

export function leadingZero(val: number) {
    let strVal = val.toFixed();

    if (strVal.length === 1) {
        return '0' + strVal;
    }

    return strVal;
}

export function isPrimitiveReactNode(node: React.ReactNode): boolean {
    return typeof node === 'string' || typeof node === 'number';
}

// eslint-disable-next-line
export const noop = () => {}