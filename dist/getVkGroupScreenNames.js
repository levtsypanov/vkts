"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVkGroupScreenNames = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const cache = {};
function getVkGroupScreenNames(vkGroupIds, accessToken) {
    const groupIds = vkGroupIds.join(',');
    if (groupIds in cache) {
        return cache[groupIds];
    }
    cache[groupIds] = vk_bridge_1.default
        .send('VKWebAppCallAPIMethod', {
        method: 'groups.getById',
        params: { group_ids: groupIds, v: '5.126', access_token: accessToken },
    })
        .then((data) => data.response.map((group) => group.screen_name))
        .catch(() => vkGroupIds.map((vkGroupId) => `club${vkGroupId}`));
    return cache[groupIds];
}
exports.getVkGroupScreenNames = getVkGroupScreenNames;
