"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewHeightClassName = void 0;
const adaptivity_1 = require("@vkontakte/vkui/dist/lib/adaptivity");
function getViewHeightClassName(base, viewHeight, 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    let className = `${String(base)}--viewHeight-`;
    switch (viewHeight) {
        case adaptivity_1.ViewHeight.EXTRA_SMALL:
            className += 'extraSmall';
            break;
        case adaptivity_1.ViewHeight.SMALL:
            className += 'small';
            break;
        case adaptivity_1.ViewHeight.MEDIUM:
            className += 'medium';
            break;
        default:
            className += 'none';
            break;
    }
    return styles ? styles[className] : className;
}
exports.getViewHeightClassName = getViewHeightClassName;
