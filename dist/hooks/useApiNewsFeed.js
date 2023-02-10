"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const react_1 = require("react");
const queue = [];
const useApi = (token, version) => {
    const rand = () => Math.random().toString(32).substring(2);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            const task = queue.shift();
            if (task) {
                task();
            }
        }, 334);
        return () => clearInterval(timer);
    }, []);
    const callApi = (method, data) => {
        const request_id = rand() + rand();
        return vk_bridge_1.default.send('VKWebAppCallAPIMethod', {
            params: {
                access_token: token,
                v: version,
                ...(data || {}),
            },
            request_id: request_id,
            method: String(method),
        }).then(({ response }) => {
            return response;
        });
    };
    const pushQueue = (method, data) => {
        return new Promise((resolve, reject) => {
            queue.push(() => callApi(method, data).then(resolve, reject));
        }).catch((reason) => {
            const api_error_code = reason?.error_data?.error_reason?.error_code;
            if (api_error_code === 6) {
                return pushQueue(method, data);
            }
            throw reason;
        });
    };
    return pushQueue;
};
exports.useApi = useApi;
