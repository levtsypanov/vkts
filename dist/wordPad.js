"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordPad = void 0;
const wordPad = (num, m, ma, mov, t) => {
    num %= 100;
    if (num % 10 === 1 && (num < 10 || num > 20)) {
        return t(m);
    }
    if (num % 10 >= 2 && num % 10 <= 4 && (num < 10 || num > 20)) {
        return t(ma);
    }
    return t(mov);
};
exports.wordPad = wordPad;
