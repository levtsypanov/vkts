"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyQueryParams = exports.parseQueryParams = void 0;
function parseQueryParams(query) {
    return query
        .substring(1)
        .split('&')
        .map((pair) => pair.split('=').map(decodeURIComponent))
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}
exports.parseQueryParams = parseQueryParams;
function stringifyQueryParams(params) {
    return `?${Object.entries(params)
        .filter((component) => component)
        .map((components) => components.map(encodeURIComponent).join('='))
        .join('&')}`;
}
exports.stringifyQueryParams = stringifyQueryParams;
