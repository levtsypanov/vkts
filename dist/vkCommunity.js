"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidCommunityToken = exports.getCommunityToken = exports.validateCommunityTokenScope = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
/**
 * Проверяет наличие прав доступа токена сообщества
 * @param accessToken токен сообщества
 * @param expectedScope набор названий ожидаемых прав доступа сообщества (https://vk.com/dev/permissions)
 */
async function validateCommunityTokenScope(accessToken, expectedScope) {
    const { response } = await vk_bridge_1.default.send('VKWebAppCallAPIMethod', {
        method: 'groups.getTokenPermissions',
        params: {
            v: '5.103',
            access_token: accessToken,
        },
    });
    const tokenScopes = response.permissions.map((permission) => permission.name);
    return expectedScope.every((expectedScope) => tokenScopes.includes(expectedScope));
}
exports.validateCommunityTokenScope = validateCommunityTokenScope;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
async function getCommunityToken(appId, groupId, scope) {
    return await vk_bridge_1.default
        .send('VKWebAppGetCommunityToken', {
        app_id: appId,
        group_id: groupId,
        scope: scope.join(),
    })
        .then(({ access_token }) => access_token)
        .catch((error) => {
        if (error && error.error_data && error.error_data.error_code === 4) {
            // Пользователь закрыл окно с запросом токена
            return null;
        }
        throw error;
    });
}
exports.getCommunityToken = getCommunityToken;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
async function getValidCommunityToken(appId, groupId, scope) {
    const accessToken = await vk_bridge_1.default
        .send('VKWebAppGetCommunityToken', {
        app_id: appId,
        group_id: groupId,
        scope: scope.join(),
    })
        .then(({ access_token }) => access_token)
        .catch((error) => {
        if (error && error.error_data && error.error_data.error_code === 4) {
            // Пользователь закрыл окно с запросом токена
            return null;
        }
        throw error;
    });
    if (!accessToken)
        return null;
    const isCorrectCommmunityTokenScope = await validateCommunityTokenScope(accessToken, scope).catch(() => {
        throw new Error('Не удалось получить ключ доступа сообщества');
    });
    if (!isCorrectCommmunityTokenScope) {
        throw new Error('У ключа доступа нет прав на работу с виджетом');
    }
    return accessToken;
}
exports.getValidCommunityToken = getValidCommunityToken;
