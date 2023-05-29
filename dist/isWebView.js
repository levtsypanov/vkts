"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebView = void 0;
function isWebView() {
    const webView = [
        "(Version/4.0|Version/4.1|Version/4.2|Version/4.3|Version/4.4|Version/5.0)",
        "wv",
    ].join("|");
    const androidRegex = new RegExp(`(Android);?\\s*[\\d./]+\\s*(?:${webView})?`, "i");
    const iosRegex = new RegExp(`(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)(?:.*(${webView}))?`, "i");
    return (navigator.userAgent.match(androidRegex) ||
        navigator.userAgent.match(iosRegex) != null);
}
exports.isWebView = isWebView;
