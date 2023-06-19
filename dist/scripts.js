"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStyle = exports.loadScript = void 0;
function loadScript(src, waitLoading = false) {
    return new Promise(function (resolve, reject) {
        const js = document.createElement('script');
        js.src = src;
        if (waitLoading)
            js.onload = () => resolve();
        js.onerror = () => reject(new Error("Failed to load script " + src));
        document.head.appendChild(js);
        if (!waitLoading)
            resolve();
    });
}
exports.loadScript = loadScript;
function loadStyle(src) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    document.head.appendChild(link);
}
exports.loadStyle = loadStyle;
