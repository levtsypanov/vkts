"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeYClassName = void 0;
function getSizeYClassName(base, sizeY = 'none', 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    const sizeYClassName = `${String(base)}--sizeY-${sizeY}`;
    return styles ? styles[sizeYClassName] : sizeYClassName;
}
exports.getSizeYClassName = getSizeYClassName;
