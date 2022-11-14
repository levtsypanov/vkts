"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVkClientInstance = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["TokenCreatedToAnotherAddress"] = 5] = "TokenCreatedToAnotherAddress";
})(ErrorCodes || (ErrorCodes = {}));
function createVkClientInstance(options) {
    const scope = options.scope || [];
    const { v, appId } = options;
    function getAccessToken() {
        return vk_bridge_1.default
            .send('VKWebAppGetAuthToken', { scope: (scope.join(',')), app_id: appId })
            .then((response) => response.access_token);
    }
    let accessToken;
    return {
        async call(method, params) {
            if (!accessToken) {
                accessToken = await getAccessToken().catch((error) => {
                    console.warn('[callVkMethod error while getting accessToken]', error);
                    throw error;
                });
            }
            function executeCall() {
                return vk_bridge_1.default
                    .send('VKWebAppCallAPIMethod', { method, params: { v, access_token: accessToken, ...params } })
                    .then(({ response }) => response);
            }
            return executeCall().catch(async (error) => {
                console.warn('[callVkMethod error]', error);
                if (error &&
                    error.error_data.error_reason &&
                    error.error_data.error_reason &&
                    error.error_data.error_reason.error_code === ErrorCodes.TokenCreatedToAnotherAddress) {
                    accessToken = await getAccessToken().catch(() => Promise.reject(error));
                    return executeCall();
                }
                return Promise.reject(error);
            });
        },
    };
}
exports.createVkClientInstance = createVkClientInstance;
