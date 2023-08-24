"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBase64FromUrl = void 0;
const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
    });
};
exports.getBase64FromUrl = getBase64FromUrl;
