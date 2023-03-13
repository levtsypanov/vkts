"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTarget = exports.TargetType = void 0;
const bridge_plus_1 = require("@happysanta/bridge-plus");
var TargetType;
(function (TargetType) {
    TargetType["SHARE_FACEBOOK"] = "share_facebook";
    TargetType["SHARE_TELEGRAM"] = "share_telegram";
    TargetType["SHARE_TWITTER"] = "share_twitter";
    TargetType["SHARE_ODNOKLASSNIKI"] = "share_odnoklassniki";
    TargetType["COPY_BUTTON"] = "copy_button";
    TargetType["COPY_INPUT"] = "copy_input";
})(TargetType = exports.TargetType || (exports.TargetType = {}));
const context = window;
let sendTarget;
exports.sendTarget = sendTarget;
if (bridge_plus_1.BridgePlus.supports('VKWebAppRetargetingPixel')) {
    exports.sendTarget = sendTarget = (event) => {
        bridge_plus_1.BridgePlus.send('VKWebAppRetargetingPixel', {
            pixel_code: process.env.REACT_APP_VK_PIXEL ?? '',
            event,
        });
    };
}
else {
    if (!context.VK) {
        context.VK = {};
        const onload = () => {
            // eslint-disable-next-line new-cap
            context.VK.Retargeting.Init(process.env.REACT_APP_VK_PIXEL);
            // eslint-disable-next-line new-cap
            context.VK.Retargeting.Hit();
        };
        const onerror = () => {
            const img = Object.assign(document.createElement('img'), {
                loading: 'eager',
                importance: 'low',
                src: `https://vk.com/rtrg?p=${process.env.REACT_APP_VK_PIXEL}`,
            });
            img.style.position = 'fixed';
            img.style.left = '-999px';
            document.body.appendChild(img);
        };
        document.body.appendChild(Object.assign(document.createElement('script'), {
            async: true,
            importance: 'low',
            src: 'https://vk.com/js/api/openapi.js?169',
            onload,
            onerror,
            onabort: onerror,
        }));
    }
    context.VK.pending = [];
    exports.sendTarget = sendTarget = (event) => {
        context.VK.pending.push(event);
        let next = event;
        try {
            while (context.VK.pending.length > 0) {
                next = context.VK.pending.pop();
                // eslint-disable-next-line new-cap
                context.VK.Retargeting.Event(next);
            }
        }
        catch {
            // re-push
            context.VK.pending.push(next);
        }
    };
}
