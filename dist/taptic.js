"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tapticSelectionChanged = exports.tapticNotification = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
/**
 * Посылает тактильное уведомление если оно поддерживается
 * @param {TapticNotificationType} type
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
async function tapticNotification(type) {
    if (vk_bridge_1.default.supports('VKWebAppTapticNotificationOccurred')) {
        return vk_bridge_1.default.send('VKWebAppTapticNotificationOccurred', { type });
    }
}
exports.tapticNotification = tapticNotification;
/**
 * Посылает тактильное уведомление об изменении если оно поддерживается
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
async function tapticSelectionChanged() {
    if (vk_bridge_1.default.supports('VKWebAppTapticSelectionChanged')) {
        return vk_bridge_1.default.send('VKWebAppTapticSelectionChanged', {});
    }
}
exports.tapticSelectionChanged = tapticSelectionChanged;
