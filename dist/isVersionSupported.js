"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVersionSupported = void 0;
const isVersionSupported = (selfVersion, fromVersion) => {
    const selfComponents = selfVersion.split('.');
    const fromComponents = fromVersion.split('.');
    const componentsCount = Math.max(selfComponents.length, fromComponents.length);
    for (let i = 0; i < componentsCount; i++) {
        if (Number(selfComponents[i] ?? 0) > Number(fromComponents[i] ?? 0)) {
            return true;
        }
        if (Number(selfComponents[i] ?? 0) < Number(fromComponents[i] ?? 0)) {
            return false;
        }
    }
    return true;
};
exports.isVersionSupported = isVersionSupported;
