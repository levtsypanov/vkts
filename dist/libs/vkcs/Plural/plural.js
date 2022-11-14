"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralWithNumber = exports.plural = void 0;
/**
 * plural(seconds, ['секунду', 'секунды', 'секунд'])
 */
function plural(n, [a, b = a, c = b]) {
    if (n % 10 === 1 && n % 100 !== 11) {
        return a;
    }
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return b;
    }
    return c;
}
exports.plural = plural;
function pluralWithNumber(n, values, separator = '\u00A0') {
    return `${n}${separator}${plural(n, values)}`;
}
exports.pluralWithNumber = pluralWithNumber;
exports.default = plural;
