"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchParams = exports.Platform = exports.ViewerGroupRole = exports.Scope = void 0;
var Scope;
(function (Scope) {
    Scope["FRIENDS"] = "friends";
    Scope["PHOTOS"] = "photos";
    Scope["VIDEO"] = "video";
    Scope["STORIES"] = "stories";
    Scope["PAGES"] = "pages";
    Scope["STATUS"] = "status";
    Scope["NOTES"] = "notes";
    Scope["WALL"] = "wall";
    Scope["DOCS"] = "docs";
    Scope["GROUPS"] = "groups";
    Scope["STATS"] = "stats";
    Scope["MARKET"] = "market";
    Scope["APP_WIDGET"] = "app_widget";
    Scope["MESSAGES"] = "messages";
    Scope["MANAGE"] = "manage";
})(Scope = exports.Scope || (exports.Scope = {}));
var ViewerGroupRole;
(function (ViewerGroupRole) {
    ViewerGroupRole["ADMIN"] = "admin";
    ViewerGroupRole["EDITOR"] = "editor";
    ViewerGroupRole["MEMBER"] = "member";
    ViewerGroupRole["MODER"] = "moder";
    ViewerGroupRole["NONE"] = "none";
})(ViewerGroupRole = exports.ViewerGroupRole || (exports.ViewerGroupRole = {}));
var Platform;
(function (Platform) {
    Platform["DESKTOP_WEB"] = "desktop_web";
    Platform["MOBILE_ANDROID"] = "mobile_android";
    Platform["MOBILE_ANDROID_MESSENGER"] = "mobile_android_messenger";
    Platform["MOBILE_IPAD"] = "mobile_ipad";
    Platform["MOBILE_IPHONE"] = "mobile_iphone";
    Platform["MOBILE_IPHONE_MESSENGER"] = "mobile_iphone_messenger";
    Platform["MOBILE_WEB"] = "mobile_web";
})(Platform = exports.Platform || (exports.Platform = {}));
const numberParams = ['user_id', 'app_id', 'group_id', 'ts'];
const booleanParams = ['is_app_user', 'are_notifications_enabled', 'is_favorite'];
const arrayParams = ['access_token_settings'];
const VK_KEY_PREFIX = 'vk_';
const converters = [
    [[numberParams, booleanParams], [Number, (value) => Boolean(Number(value))]],
    [[arrayParams], [(value) => value.split(',')]]
];
function getLaunchParams() {
    const params = new URLSearchParams(location.search);
    return [...params.entries()]
        .sort()
        .reduce((params, [key, value]) => {
        if (key.startsWith(VK_KEY_PREFIX)) {
            key = key.replace(VK_KEY_PREFIX, '');
        }
        converters.forEach(([params, handlers]) => {
            params.forEach((params, index) => {
                if (params.includes(key)) {
                    const handler = handlers[index];
                    value = handler(value);
                }
            });
        });
        params[key] = value;
        return params;
    }, {});
}
exports.getLaunchParams = getLaunchParams;
