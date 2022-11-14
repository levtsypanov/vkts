"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApplication = void 0;
const openApplication = (appId, options = {}) => {
    const { groupId, hash, mVk } = options;
    const href = `https://${mVk ? 'm.' : ''}vk.com/app${appId}${groupId ? '_-' + groupId : ''}${hash ? '#' + hash : ''}`;
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('target', '_parent');
    link.click();
};
exports.openApplication = openApplication;
