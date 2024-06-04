/**
 * Проверяет наличие прав доступа токена сообщества
 * @param accessToken токен сообщества
 * @param expectedScope набор названий ожидаемых прав доступа сообщества (https://dev.vk.com/ru/reference/access-rights)
 */
export declare function validateCommunityTokenScope(accessToken: string, expectedScope: string[]): Promise<boolean>;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://dev.vk.com/ru/reference/access-rights)
 */
export declare function getCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null>;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://dev.vk.com/ru/reference/access-rights)
 */
export declare function getValidCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null>;
