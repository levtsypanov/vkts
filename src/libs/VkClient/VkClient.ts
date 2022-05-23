import vkBridge from '@vkontakte/vk-bridge';

interface VkClientOptions {
  scope?: string[];
  appId: number;
  v: string;
}

enum ErrorCodes {
  TokenCreatedToAnotherAddress = 5,
}

export function createVkClientInstance(options: VkClientOptions) {
  const scope = options.scope || [];
  const { v, appId } = options;

  function getAccessToken() {
    return vkBridge
      .send('VKWebAppGetAuthToken', { scope: (scope.join(',')), app_id: appId })
      .then((response) => response.access_token);
  }

  let accessToken: string;

  return {
    async call(method: any, params: any) {
      if (!accessToken) {
        accessToken = await getAccessToken().catch((error) => {
          console.warn('[callVkMethod error while getting accessToken]', error);
          throw error;
        });
      }

      function executeCall() {
        return vkBridge
          .send('VKWebAppCallAPIMethod', { method, params: { v, access_token: accessToken, ...params } })
          .then(({ response }) => response);
      }

      return executeCall().catch(async (error) => {
        console.warn('[callVkMethod error]', error);

        if (
          error &&
          error.error_data.error_reason &&
          error.error_data.error_reason &&
          error.error_data.error_reason.error_code === ErrorCodes.TokenCreatedToAnotherAddress
        ) {
          accessToken = await getAccessToken().catch(() => Promise.reject(error));

          return executeCall();
        }

        return Promise.reject(error);
      });
    },
  };
}
