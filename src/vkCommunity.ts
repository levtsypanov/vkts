import vkBridge from '@vkontakte/vk-bridge';

/**
 * Проверяет наличие прав доступа токена сообщества
 * @param accessToken токен сообщества
 * @param expectedScope набор названий ожидаемых прав доступа сообщества (https://vk.com/dev/permissions)
 */
export async function validateCommunityTokenScope(accessToken: string, expectedScope: string[]): Promise<boolean> {
  const { response } = await vkBridge.send('VKWebAppCallAPIMethod', {
    method: 'groups.getTokenPermissions',
    params: {
      v: '5.103',
      access_token: accessToken,
    },
  });

  const tokenScopes: string[] = response.permissions.map((permission: any) => permission.name);

  return expectedScope.every((expectedScope) => tokenScopes.includes(expectedScope));
}

/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
export async function getCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null> {
  return await vkBridge
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

/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
export async function getValidCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null> {
  const accessToken = await vkBridge
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

  if (!accessToken) return null;

  const isCorrectCommmunityTokenScope = await validateCommunityTokenScope(accessToken, scope).catch(() => {
    throw new Error('Не удалось получить ключ доступа сообщества');
  });

  if (!isCorrectCommmunityTokenScope) {
    throw new Error('У ключа доступа нет прав на работу с виджетом');
  }

  return accessToken;
}
