"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashParameterHandler = void 0;
class HashParameterHandler {
    static getLocationHash() {
        const locationHash = window.location.hash;
        if (locationHash.includes('#/')) {
            return locationHash.replace('#/', '');
        }
        else {
            return locationHash.replace('#', '');
        }
    }
    static getParametersFromHash(string) {
        let search = string;
        return search === "" ? null : search.split("&").reduce((prev, curr) => {
            const [key, value] = curr.split("=");
            prev[decodeURIComponent(key)] = decodeURIComponent(value);
            return prev;
        }, {});
    }
}
exports.HashParameterHandler = HashParameterHandler;
