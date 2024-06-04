"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewHeightClassName = void 0;
const types_1 = require("./types");
function getViewHeightClassName(base, viewHeight, 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    let className = `${String(base)}--viewHeight-`;
    switch (viewHeight) {
        case types_1.ViewHeight.EXTRA_SMALL:
            className += 'extraSmall';
            break;
        case types_1.ViewHeight.SMALL:
            className += 'small';
            break;
        case types_1.ViewHeight.MEDIUM:
            className += 'medium';
            break;
        default:
            className += 'none';
            break;
    }
    return styles ? styles[className] : className;
}
exports.getViewHeightClassName = getViewHeightClassName;
