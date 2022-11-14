"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeodata = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const NATIVE_CLIENT_REJECT_LIMIT = 15;
const ALREADY_DENIED_MAX_DELAY = 600;
let currentNativeRejectCount = 0;
/**
 * Обертка над VKWebAppGetGeodata, позволяет различать запрет и отказ предоставления доступа к геолокации
 * @param isNativeClient флаг нативного приложения, нужен для правильной обработки исключения
 */
function getGeodata(isNativeClient) {
    const callTimeMarker = performance.now();
    return vk_bridge_1.default
        .send('VKWebAppGetGeodata')
        .then((data) => {
        if (data.available) {
            return { permission: 'available', lat: data.lat, long: data.long };
        }
        // доступ к геолокации запрещен на уровне нативного приложения ВК или всей ОС
        return { permission: 'denied' };
    })
        .catch(() => {
        const errorTimeMarker = performance.now();
        // Если ошибка выскочила слишком быстро, значит доступ к геолокации
        // запрещен самим приложением, а не пользователем
        if (errorTimeMarker - callTimeMarker <= ALREADY_DENIED_MAX_DELAY) {
            return { permission: 'denied' };
        }
        // На нативных клиентах можно повторно запросить доступ к геолокации до 15 раз
        if (isNativeClient) {
            currentNativeRejectCount += 1;
            return { permission: currentNativeRejectCount <= NATIVE_CLIENT_REJECT_LIMIT ? 'prompt' : 'denied' };
        }
        // В вебе пытаемся проверить доступ через Permission API
        if ('permissions' in navigator) {
            return navigator.permissions.query({ name: 'geolocation' }).then((status) => {
                return { permission: status.state === 'prompt' ? 'prompt' : 'denied' };
            });
        }
        // Фоллбек
        return { permission: 'denied' };
    });
}
exports.getGeodata = getGeodata;
