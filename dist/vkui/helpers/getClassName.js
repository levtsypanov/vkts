"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassName = void 0;
const platform_1 = require("@vkontakte/vkui/dist/lib/platform");
function getClassName(base, osname = (0, platform_1.platform)()) {
    return `${base} ${base}--${osname}`;
}
exports.getClassName = getClassName;
