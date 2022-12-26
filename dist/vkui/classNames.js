"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classNamesString = exports.classNames = void 0;
function classNames() {
    let result = [];
    for (let i = 0; i < arguments.length; i++) {
        const item = arguments[i];
        if (!item) {
            continue;
        }
        switch (typeof item) {
            case 'string':
                result.push(item);
                break;
            case 'object':
                for (let key in item) {
                    if (item[key]) {
                        result.push(key);
                    }
                }
                break;
            default:
                result.push(`${item}`);
        }
    }
    return result.length > 1 ? result : result[0] || '';
}
exports.classNames = classNames;
function classNamesString(...args) {
    const res = classNames(...args);
    return typeof res === 'string' ? res : res.join(' ');
}
exports.classNamesString = classNamesString;
