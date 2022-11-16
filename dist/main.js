"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatform = exports.currentScheme = exports.getQueryVariable = exports._inlineShare = exports.desktopShare = exports.getHash = exports.getParams = exports.isRetina = exports.throwDevError = exports.devLog = exports.devErrorLog = exports.getCurrencyAmount = exports.getLangPlural = exports.rusDate = exports.randInt = exports.disableEAndMinusOnKeyDown = exports.schemeChanger = exports.FireEvent = exports.pluralize = exports.fixTypography = exports.createUseNullableContext = exports.tapticSelectionChanged = exports.tapticNotification = exports.stringifyQueryParams = exports.parseQueryParams = exports.openWallPost = exports.openPhoneCall = exports.loadAppToggles = exports.getDefaultToggles = exports.incline = exports.getVkGroupScreenNames = exports.getImage300Width = exports.getLargestVkPhoto = exports.i = exports.TimeConverter = exports.getNiceDate = exports.getGeodata = exports.getInsets = exports.blackedColor = exports.parseColor = exports.isDesktopSafari = exports.isSafari = exports.isDesktopVk = exports.userId = exports.appId = exports.queryParams = exports.getUtmParamsQueryString = exports.getInitialHashParams = exports.getCurrentHashParams = exports.reduceHandler = void 0;
exports.classNameBuilder = exports.arrayRandomItem = exports.randomNumber = exports.decodeHTMLEntities = exports.encodeHTMLEntities = exports.unescape = exports.escape = exports.RemoteAPI = exports.HashParameterHandler = exports.DeviceService = exports.wordPad = exports.getStorage = exports.dropStorage = exports.dropStorageValues = exports.getStorageValues = exports.setStorageValues = exports.setStorageValue = exports.StorageField = exports.openApplication = exports.getValidCommunityToken = exports.getCommunityToken = exports.validateCommunityTokenScope = exports.isJsonString = exports.getNewRequestId = exports.findObjectIndex = exports.findObjectById = exports.getLocalStorage = exports.setLocalStorage = exports.isKeyInObj = exports.fullScreen = exports.declOfNum = exports.unique = exports.chunk = exports.dynamicSort = exports.isDeviceSupported = exports.getIosVersion = exports.getAndroidVersion = exports.copy = void 0;
/**
 *  Working with launch options
 */
var app_params_1 = require("./app_params");
Object.defineProperty(exports, "reduceHandler", { enumerable: true, get: function () { return app_params_1.reduceHandler; } });
Object.defineProperty(exports, "getCurrentHashParams", { enumerable: true, get: function () { return app_params_1.getCurrentHashParams; } });
Object.defineProperty(exports, "getInitialHashParams", { enumerable: true, get: function () { return app_params_1.getInitialHashParams; } });
Object.defineProperty(exports, "getUtmParamsQueryString", { enumerable: true, get: function () { return app_params_1.getUtmParamsQueryString; } });
Object.defineProperty(exports, "queryParams", { enumerable: true, get: function () { return app_params_1.queryParams; } });
Object.defineProperty(exports, "appId", { enumerable: true, get: function () { return app_params_1.appId; } });
Object.defineProperty(exports, "userId", { enumerable: true, get: function () { return app_params_1.userId; } });
Object.defineProperty(exports, "isDesktopVk", { enumerable: true, get: function () { return app_params_1.isDesktopVk; } });
Object.defineProperty(exports, "isSafari", { enumerable: true, get: function () { return app_params_1.isSafari; } });
Object.defineProperty(exports, "isDesktopSafari", { enumerable: true, get: function () { return app_params_1.isDesktopSafari; } });
__exportStar(require("./app_params"), exports);
/**
 *  Working with rgb colors
 */
var color_1 = require("./color");
Object.defineProperty(exports, "parseColor", { enumerable: true, get: function () { return color_1.parseColor; } });
Object.defineProperty(exports, "blackedColor", { enumerable: true, get: function () { return color_1.blackedColor; } });
__exportStar(require("./color"), exports);
/**
 *  Working with device insertion
 */
var dom_1 = require("./dom");
Object.defineProperty(exports, "getInsets", { enumerable: true, get: function () { return dom_1.getInsets; } });
__exportStar(require("./dom"), exports);
/**
 *  Working with geolocation
 */
var getGeodata_1 = require("./getGeodata");
Object.defineProperty(exports, "getGeodata", { enumerable: true, get: function () { return getGeodata_1.getGeodata; } });
__exportStar(require("./getGeodata"), exports);
/**
 *  Working with connecting dates
 */
var getNiceDate_1 = require("./getNiceDate");
Object.defineProperty(exports, "getNiceDate", { enumerable: true, get: function () { return getNiceDate_1.getNiceDate; } });
Object.defineProperty(exports, "TimeConverter", { enumerable: true, get: function () { return getNiceDate_1.TimeConverter; } });
__exportStar(require("./getNiceDate"), exports);
/**
*  To work with photos
*/
var images_1 = require("./images");
Object.defineProperty(exports, "i", { enumerable: true, get: function () { return images_1.i; } });
Object.defineProperty(exports, "getLargestVkPhoto", { enumerable: true, get: function () { return images_1.getLargestVkPhoto; } });
Object.defineProperty(exports, "getImage300Width", { enumerable: true, get: function () { return images_1.getImage300Width; } });
__exportStar(require("./images"), exports);
/**
 *  @ignore
 */
var getVkGroupScreenNames_1 = require("./getVkGroupScreenNames");
Object.defineProperty(exports, "getVkGroupScreenNames", { enumerable: true, get: function () { return getVkGroupScreenNames_1.getVkGroupScreenNames; } });
__exportStar(require("./getVkGroupScreenNames"), exports);
/**
 *  Returns inclined word
 */
var incline_1 = require("./incline");
Object.defineProperty(exports, "incline", { enumerable: true, get: function () { return incline_1.incline; } });
__exportStar(require("./incline"), exports);
/**
 *  To work with switches (Available only for developers)
 */
var loadAppToggles_1 = require("./loadAppToggles");
Object.defineProperty(exports, "getDefaultToggles", { enumerable: true, get: function () { return loadAppToggles_1.getDefaultToggles; } });
Object.defineProperty(exports, "loadAppToggles", { enumerable: true, get: function () { return loadAppToggles_1.loadAppToggles; } });
__exportStar(require("./loadAppToggles"), exports);
/**
 *  @ignore
 */
var openPhoneCall_1 = require("./openPhoneCall");
Object.defineProperty(exports, "openPhoneCall", { enumerable: true, get: function () { return openPhoneCall_1.openPhoneCall; } });
__exportStar(require("./openPhoneCall"), exports);
/**
 *  @ignore
 */
var openWallPost_1 = require("./openWallPost");
Object.defineProperty(exports, "openWallPost", { enumerable: true, get: function () { return openWallPost_1.openWallPost; } });
__exportStar(require("./openWallPost"), exports);
/**
 *  To work with query params
 */
var query_params_1 = require("./query-params");
Object.defineProperty(exports, "parseQueryParams", { enumerable: true, get: function () { return query_params_1.parseQueryParams; } });
Object.defineProperty(exports, "stringifyQueryParams", { enumerable: true, get: function () { return query_params_1.stringifyQueryParams; } });
__exportStar(require("./query-params"), exports);
/**
 *  To work with tactile notifications
 */
var taptic_1 = require("./taptic");
Object.defineProperty(exports, "tapticNotification", { enumerable: true, get: function () { return taptic_1.tapticNotification; } });
Object.defineProperty(exports, "tapticSelectionChanged", { enumerable: true, get: function () { return taptic_1.tapticSelectionChanged; } });
__exportStar(require("./taptic"), exports);
/**
 *  Creates function which calls useContext and throws an error in case, when
 */
var UseNullableContext_1 = require("./UseNullableContext");
Object.defineProperty(exports, "createUseNullableContext", { enumerable: true, get: function () { return UseNullableContext_1.createUseNullableContext; } });
__exportStar(require("./UseNullableContext"), exports);
/**
 *  All Utilites
 */
var utils_1 = require("./utils");
Object.defineProperty(exports, "fixTypography", { enumerable: true, get: function () { return utils_1.fixTypography; } });
Object.defineProperty(exports, "pluralize", { enumerable: true, get: function () { return utils_1.pluralize; } });
Object.defineProperty(exports, "FireEvent", { enumerable: true, get: function () { return utils_1.FireEvent; } });
Object.defineProperty(exports, "schemeChanger", { enumerable: true, get: function () { return utils_1.schemeChanger; } });
Object.defineProperty(exports, "disableEAndMinusOnKeyDown", { enumerable: true, get: function () { return utils_1.disableEAndMinusOnKeyDown; } });
Object.defineProperty(exports, "randInt", { enumerable: true, get: function () { return utils_1.randInt; } });
Object.defineProperty(exports, "rusDate", { enumerable: true, get: function () { return utils_1.rusDate; } });
Object.defineProperty(exports, "getLangPlural", { enumerable: true, get: function () { return utils_1.getLangPlural; } });
Object.defineProperty(exports, "getCurrencyAmount", { enumerable: true, get: function () { return utils_1.getCurrencyAmount; } });
Object.defineProperty(exports, "devErrorLog", { enumerable: true, get: function () { return utils_1.devErrorLog; } });
Object.defineProperty(exports, "devLog", { enumerable: true, get: function () { return utils_1.devLog; } });
Object.defineProperty(exports, "throwDevError", { enumerable: true, get: function () { return utils_1.throwDevError; } });
Object.defineProperty(exports, "isRetina", { enumerable: true, get: function () { return utils_1.isRetina; } });
Object.defineProperty(exports, "getParams", { enumerable: true, get: function () { return utils_1.getParams; } });
Object.defineProperty(exports, "getHash", { enumerable: true, get: function () { return utils_1.getHash; } });
Object.defineProperty(exports, "desktopShare", { enumerable: true, get: function () { return utils_1.desktopShare; } });
Object.defineProperty(exports, "_inlineShare", { enumerable: true, get: function () { return utils_1._inlineShare; } });
Object.defineProperty(exports, "getQueryVariable", { enumerable: true, get: function () { return utils_1.getQueryVariable; } });
Object.defineProperty(exports, "currentScheme", { enumerable: true, get: function () { return utils_1.currentScheme; } });
Object.defineProperty(exports, "getPlatform", { enumerable: true, get: function () { return utils_1.getPlatform; } });
Object.defineProperty(exports, "copy", { enumerable: true, get: function () { return utils_1.copy; } });
Object.defineProperty(exports, "getAndroidVersion", { enumerable: true, get: function () { return utils_1.getAndroidVersion; } });
Object.defineProperty(exports, "getIosVersion", { enumerable: true, get: function () { return utils_1.getIosVersion; } });
Object.defineProperty(exports, "isDeviceSupported", { enumerable: true, get: function () { return utils_1.isDeviceSupported; } });
Object.defineProperty(exports, "dynamicSort", { enumerable: true, get: function () { return utils_1.dynamicSort; } });
Object.defineProperty(exports, "chunk", { enumerable: true, get: function () { return utils_1.chunk; } });
Object.defineProperty(exports, "unique", { enumerable: true, get: function () { return utils_1.unique; } });
Object.defineProperty(exports, "declOfNum", { enumerable: true, get: function () { return utils_1.declOfNum; } });
Object.defineProperty(exports, "fullScreen", { enumerable: true, get: function () { return utils_1.fullScreen; } });
Object.defineProperty(exports, "isKeyInObj", { enumerable: true, get: function () { return utils_1.isKeyInObj; } });
Object.defineProperty(exports, "setLocalStorage", { enumerable: true, get: function () { return utils_1.setLocalStorage; } });
Object.defineProperty(exports, "getLocalStorage", { enumerable: true, get: function () { return utils_1.getLocalStorage; } });
Object.defineProperty(exports, "findObjectById", { enumerable: true, get: function () { return utils_1.findObjectById; } });
Object.defineProperty(exports, "findObjectIndex", { enumerable: true, get: function () { return utils_1.findObjectIndex; } });
Object.defineProperty(exports, "getNewRequestId", { enumerable: true, get: function () { return utils_1.getNewRequestId; } });
Object.defineProperty(exports, "isJsonString", { enumerable: true, get: function () { return utils_1.isJsonString; } });
__exportStar(require("./utils"), exports);
/**
 *  For working with VKontakte communities
 */
var vkCommunity_1 = require("./vkCommunity");
Object.defineProperty(exports, "validateCommunityTokenScope", { enumerable: true, get: function () { return vkCommunity_1.validateCommunityTokenScope; } });
Object.defineProperty(exports, "getCommunityToken", { enumerable: true, get: function () { return vkCommunity_1.getCommunityToken; } });
Object.defineProperty(exports, "getValidCommunityToken", { enumerable: true, get: function () { return vkCommunity_1.getValidCommunityToken; } });
__exportStar(require("./vkCommunity"), exports);
/**
 *  @ignore
 */
var vkOpenApplication_1 = require("./vkOpenApplication");
Object.defineProperty(exports, "openApplication", { enumerable: true, get: function () { return vkOpenApplication_1.openApplication; } });
__exportStar(require("./vkOpenApplication"), exports);
/**
 *  To work with VKontakte storage based on VK Bridge
 */
var vkStorage_1 = require("./vkStorage");
Object.defineProperty(exports, "StorageField", { enumerable: true, get: function () { return vkStorage_1.StorageField; } });
Object.defineProperty(exports, "setStorageValue", { enumerable: true, get: function () { return vkStorage_1.setStorageValue; } });
Object.defineProperty(exports, "setStorageValues", { enumerable: true, get: function () { return vkStorage_1.setStorageValues; } });
Object.defineProperty(exports, "getStorageValues", { enumerable: true, get: function () { return vkStorage_1.getStorageValues; } });
Object.defineProperty(exports, "dropStorageValues", { enumerable: true, get: function () { return vkStorage_1.dropStorageValues; } });
Object.defineProperty(exports, "dropStorage", { enumerable: true, get: function () { return vkStorage_1.dropStorage; } });
Object.defineProperty(exports, "getStorage", { enumerable: true, get: function () { return vkStorage_1.getStorage; } });
__exportStar(require("./vkStorage"), exports);
/**
 *  @ignore
 */
var wordPad_1 = require("./wordPad");
Object.defineProperty(exports, "wordPad", { enumerable: true, get: function () { return wordPad_1.wordPad; } });
__exportStar(require("./wordPad"), exports);
/**
* Libraries for official use VK Team
*/
/**
* Libraries for official use VK Team
*/
/**
*  @ignore
*/
var DeviceService_1 = require("./DeviceService");
Object.defineProperty(exports, "DeviceService", { enumerable: true, get: function () { return DeviceService_1.DeviceService; } });
var HashParameterHandler_1 = require("./HashParameterHandler");
Object.defineProperty(exports, "HashParameterHandler", { enumerable: true, get: function () { return HashParameterHandler_1.HashParameterHandler; } });
var RemoteAPI_1 = require("./RemoteAPI");
Object.defineProperty(exports, "RemoteAPI", { enumerable: true, get: function () { return RemoteAPI_1.RemoteAPI; } });
var htmlEntities_1 = require("./htmlEntities");
Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return htmlEntities_1.escape; } });
Object.defineProperty(exports, "unescape", { enumerable: true, get: function () { return htmlEntities_1.unescape; } });
Object.defineProperty(exports, "encodeHTMLEntities", { enumerable: true, get: function () { return htmlEntities_1.encodeHTMLEntities; } });
Object.defineProperty(exports, "decodeHTMLEntities", { enumerable: true, get: function () { return htmlEntities_1.decodeHTMLEntities; } });
/**
 *  @ignore
 */
var randomNumber_1 = require("./randomNumber");
Object.defineProperty(exports, "randomNumber", { enumerable: true, get: function () { return randomNumber_1.randomNumber; } });
var arrayRandomItem_1 = require("./arrayRandomItem");
Object.defineProperty(exports, "arrayRandomItem", { enumerable: true, get: function () { return arrayRandomItem_1.arrayRandomItem; } });
var classNameBuilder_1 = require("./classNameBuilder");
Object.defineProperty(exports, "classNameBuilder", { enumerable: true, get: function () { return classNameBuilder_1.classNameBuilder; } });
