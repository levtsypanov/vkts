"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoverClassName = void 0;
function getHoverClassName(base, hover, 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    let hoverState = 'none';
    if (hover === true) {
        hoverState = 'has';
    }
    else if (hover === false) {
        hoverState = 'has-not';
    }
    const hoverClassName = `${String(base)}--hover-${hoverState}`;
    return styles ? styles[hoverClassName] : hoverClassName;
}
exports.getHoverClassName = getHoverClassName;
