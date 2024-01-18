"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAppearance = exports.deriveAppearance = exports.Appearance = exports.Scheme = void 0;
var Scheme;
(function (Scheme) {
    Scheme["BRIGHT_LIGHT"] = "bright_light";
    Scheme["SPACE_GRAY"] = "space_gray";
    Scheme["VKCOM_LIGHT"] = "vkcom_light";
    Scheme["VKCOM_DARK"] = "vkcom_dark";
})(Scheme = exports.Scheme || (exports.Scheme = {}));
var Appearance;
(function (Appearance) {
    Appearance["DARK"] = "dark";
    Appearance["LIGHT"] = "light";
})(Appearance = exports.Appearance || (exports.Appearance = {}));
const deriveAppearance = (scheme) => scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? 'dark' : 'light';
exports.deriveAppearance = deriveAppearance;
function resolveAppearance(data) {
    const { scheme, appearance } = data;
    // appearance пока приходит только на IOS и ANDROID
    if (appearance) {
        return appearance;
    }
    // Проверяем scheme если appearance не пришел
    return (0, exports.deriveAppearance)(scheme);
}
exports.resolveAppearance = resolveAppearance;
