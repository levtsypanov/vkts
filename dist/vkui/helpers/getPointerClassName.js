"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointerClassName = void 0;
function getPointerClassName(base, mouse, 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    let mouseState = 'none';
    if (mouse === true) {
        mouseState = 'has';
    }
    else if (mouse === false) {
        mouseState = 'has-not';
    }
    const className = `${String(base)}--pointer-${mouseState}`;
    return styles ? styles[className] : className;
}
exports.getPointerClassName = getPointerClassName;
