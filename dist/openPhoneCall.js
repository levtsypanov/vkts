"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openPhoneCall = void 0;
function openPhoneCall(phone) {
    const link = document.createElement('a');
    link.setAttribute('href', `tel:${phone}`);
    link.setAttribute('target', '_blank');
    link.click();
}
exports.openPhoneCall = openPhoneCall;
