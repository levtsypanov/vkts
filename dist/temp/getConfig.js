"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
console.info("window.___APP_CONFIG___", window.___APP_CONFIG___);
function getConfig() {
    if (!window.___APP_CONFIG___)
        console.error("Provide window.___APP_CONFIG___");
    return window.___APP_CONFIG___;
}
exports.getConfig = getConfig;
