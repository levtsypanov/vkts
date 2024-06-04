"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewWidthClassName = void 0;
const types_1 = require("./types");
function getViewWidthClassName(base, viewWidth, 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    let className = `${String(base)}--viewWidth-`;
    switch (viewWidth) {
        case types_1.ViewWidth.SMALL_MOBILE:
            className += 'smallMobile';
            break;
        case types_1.ViewWidth.MOBILE:
            className += 'mobile';
            break;
        case types_1.ViewWidth.SMALL_TABLET:
            className += 'smallTablet';
            break;
        case types_1.ViewWidth.TABLET:
            className += 'tablet';
            break;
        case types_1.ViewWidth.DESKTOP:
            className += 'desktop';
            break;
        default:
            className += 'none';
            break;
    }
    className = styles ? styles[className] : className;
    if (viewWidth && viewWidth >= types_1.ViewWidth.SMALL_TABLET) {
        if (styles) {
            className += ' ' + styles[`${String(base)}--viewWidth-smallTabletPlus`];
        }
        else {
            className += ` ${String(base)}--viewWidth-smallTabletPlus`;
        }
    }
    if (viewWidth && viewWidth >= types_1.ViewWidth.TABLET) {
        if (styles) {
            className += ' ' + styles[`${String(base)}--viewWidth-tabletPlus`];
        }
        else {
            className += ` ${String(base)}--viewWidth-tabletPlus`;
        }
    }
    return className;
}
exports.getViewWidthClassName = getViewWidthClassName;
