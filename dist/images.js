"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage300Width = exports.getLargestVkPhoto = exports.i = void 0;
let domain = null;
const scripts = document.getElementsByTagName("script");
for (let i = 0; i < scripts.length; i++) {
    const scriptSrc = scripts[i].src;
    if (scriptSrc.includes("/env.js")) {
        domain = new URL(scriptSrc).host;
    }
}
function i(url) {
    if (domain)
        return url[0] === "/" ? `https://${domain}${url}` : `https://${domain}/${url}`;
    else
        return url;
}
exports.i = i;
function getLargestVkPhoto(sizes) {
    const res = sizes.sort(({ a, b }) => (a.width < b.width ? 1 : -1));
    return res[0];
}
exports.getLargestVkPhoto = getLargestVkPhoto;
function getImage300Width(sizes = []) {
    const yPhoto = sizes.find((image) => image.type === "y");
    const xPhoto = sizes.find((image) => image.type === "x");
    return yPhoto || xPhoto || sizes[0];
}
exports.getImage300Width = getImage300Width;
