"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWallPost = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
function openWallPost(ownerId, postId, isDesktop) {
    Promise.resolve()
        .then(() => {
        return vk_bridge_1.default.supports('VKWebAppOpenWallPost') || isDesktop
            ? vk_bridge_1.default.send('VKWebAppOpenWallPost', { owner_id: ownerId, post_id: postId })
            : Promise.reject();
    })
        .catch(() => {
        const href = `https://${isDesktop ? '' : 'm.'}vk.com/wall${ownerId}_${postId}`;
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.setAttribute('target', '_blank');
        link.click();
    });
}
exports.openWallPost = openWallPost;
