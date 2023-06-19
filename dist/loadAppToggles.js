"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppToggles = exports.getDefaultToggles = void 0;
async function getDefaultToggles() {
    return {
        toggleShowFeed: false,
    };
}
exports.getDefaultToggles = getDefaultToggles;
const loadAppToggles = (vkClient) => {
    return vkClient
        .call('execute.toggles')
        .then((res) => {
        return {
            toggleShowFeed: !!(res.toggleShowFeed || false),
        };
    })
        .catch((e) => {
        console.warn('Fail load execute.toggles use default toggles', e);
        return getDefaultToggles();
    });
};
exports.loadAppToggles = loadAppToggles;
