"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const react_1 = require("react");
//type UseAuth = () => [string, () => Promise<string>];
const useAuth = ({ scope, app_id }) => {
    const [token, setToken] = (0, react_1.useState)('');
    const auth = (0, react_1.useCallback)(async () => {
        const { access_token } = await vk_bridge_1.default.send('VKWebAppGetAuthToken', {
            scope: scope,
            app_id: app_id,
        });
        setToken(access_token);
        return access_token;
    }, []);
    return [token, auth];
};
exports.useAuth = useAuth;
