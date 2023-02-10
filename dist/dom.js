"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsets = void 0;
/**
 * Returns device insets
 */
function getInsets() {
    const computedStyle = getComputedStyle(document.documentElement);
    return {
        top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top')),
        bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom')),
        left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left')),
        right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right')),
    };
}
exports.getInsets = getInsets;
