"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeXClassName = void 0;
function getSizeXClassName(base, sizeX = 'none', 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    const sizeXClassName = `${String(base)}--sizeX-${sizeX}`;
    return styles ? styles[sizeXClassName] : sizeXClassName;
}
exports.getSizeXClassName = getSizeXClassName;
