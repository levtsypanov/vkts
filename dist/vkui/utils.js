"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.isPrimitiveReactNode = exports.leadingZero = exports.isFunction = exports.isNumeric = exports.hasReactNode = void 0;
function hasReactNode(value) {
    return (value !== undefined && value !== false && value !== null && value !== '');
}
exports.hasReactNode = hasReactNode;
// Является ли переданное значение числовым
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
exports.isNumeric = isNumeric;
// Является ли переданное значение функцией
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function leadingZero(val) {
    let strVal = val.toFixed();
    if (strVal.length === 1) {
        return '0' + strVal;
    }
    return strVal;
}
exports.leadingZero = leadingZero;
function isPrimitiveReactNode(node) {
    return typeof node === 'string' || typeof node === 'number';
}
exports.isPrimitiveReactNode = isPrimitiveReactNode;
// eslint-disable-next-line
const noop = () => { };
exports.noop = noop;
