"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDesktopSafari = exports.isSafari = exports.isDesktopVk = exports.getUtmParamsQueryString = exports.userId = exports.appId = exports.getInitialHashParams = exports.getCurrentHashParams = exports.queryParams = exports.reduceHandler = void 0;
const reduceHandler = (acc, item, i) => {
    if (i === 0 && !item.includes('='))
        return { ...acc, shortId: parseInt(item, 10), shortValue: item };
    const [key, value] = decodeURIComponent(item).split('=');
    return key ? { ...acc, [key]: value } : acc;
};
exports.reduceHandler = reduceHandler;
exports.queryParams = window.location.search.replace('?', '').split('&').reduce(exports.reduceHandler, {});
const getCurrentHashParams = () => window.location.hash.replace('#', '').replace('?', '').split('&').reduce(exports.reduceHandler, {});
exports.getCurrentHashParams = getCurrentHashParams;
let savedHashParams = window.location.hash;
const getInitialHashParams = () => savedHashParams.replace('#', '').replace('?', '').split('&').reduce(exports.reduceHandler, {});
exports.getInitialHashParams = getInitialHashParams;
exports.appId = parseInt(exports.queryParams.vk_app_id, 10);
exports.userId = parseInt(exports.queryParams.vk_user_id, 10);
function getUtmParamsQueryString() {
    const params = (0, exports.getInitialHashParams)();
    return Object.keys(params)
        .filter((param) => param?.includes('utm_'))
        .map((paramName) => `${paramName}=${params[paramName]}`)
        .join('&');
}
exports.getUtmParamsQueryString = getUtmParamsQueryString;
exports.isDesktopVk = exports.queryParams.vk_platform?.includes('desktop');
exports.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
exports.isDesktopSafari = exports.isDesktopVk && exports.isSafari;
