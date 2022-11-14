"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incline = void 0;
/**
 * Returns inclined word
 * @param count
 * @param ifOneString
 * @param ifTwoString
 * @param ifFiveString
 */
function incline(count, ifOneString, ifTwoString, ifFiveString) {
    let tempNumber = Math.abs(count) % 100;
    if (tempNumber >= 5 && tempNumber <= 20) {
        return ifFiveString;
    }
    tempNumber %= 10;
    if (tempNumber === 1) {
        return ifOneString;
    }
    if (tempNumber >= 2 && tempNumber <= 4) {
        return ifTwoString;
    }
    return ifFiveString;
}
exports.incline = incline;
