"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
class DeviceService {
    static MAX_MOBILE_SCREEN_WIDTH = 576;
    static isMobileDevice() {
        return document.body.clientWidth <= this.MAX_MOBILE_SCREEN_WIDTH;
    }
    static isDeviceWithMaxMobileSizeOrGreater() {
        return document.body.clientWidth >= this.MAX_MOBILE_SCREEN_WIDTH;
    }
}
exports.DeviceService = DeviceService;
