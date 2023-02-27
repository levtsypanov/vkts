"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformClassName = void 0;
// TODO v6 удалить этот хеллпер
const platform_1 = require("@vkontakte/vkui/dist/lib/platform");
function getPlatformClassName(base, osname = (0, platform_1.platform)(), 
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
    const platformClassName = `${String(base)}--${osname}`;
    return styles ? styles[platformClassName] : platformClassName;
}
exports.getPlatformClassName = getPlatformClassName;
