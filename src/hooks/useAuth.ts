import bridge from '@vkontakte/vk-bridge';
import { useCallback, useState } from 'react';

type TAuthToken = {
    scope: string;
    app_id: number;
}

//type UseAuth = () => [string, () => Promise<string>];

export const useAuth = ({ scope, app_id }: TAuthToken) => {
  const [token, setToken] = useState('');

  const auth = useCallback(async (): Promise<string> => {
    const { access_token } = await bridge.send('VKWebAppGetAuthToken', {
      scope: scope,
      app_id: app_id,
    });

    setToken(access_token);

    return access_token;
  }, []);

  return [token, auth];
}