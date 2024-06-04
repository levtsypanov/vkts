"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewHeight = exports.ViewWidth = void 0;
/**
 * Public API.
 * Брейкпоинты на ширину.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
var ViewWidth;
(function (ViewWidth) {
    ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
    ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
    ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
    ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
    ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth = exports.ViewWidth || (exports.ViewWidth = {}));
;
/**
 * Public API.
 * Брейкпоинт на высоту.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
var ViewHeight;
(function (ViewHeight) {
    ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
    ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
    ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight = exports.ViewHeight || (exports.ViewHeight = {}));
;
