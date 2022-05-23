import vkBridge from '@vkontakte/vk-bridge';

export type GetGeodataResult =
  | {
      permission: 'available';
      lat: number;
      long: number;
    }
  | { permission: 'prompt' }
  | { permission: 'denied' };

const NATIVE_CLIENT_REJECT_LIMIT = 15;
const ALREADY_DENIED_MAX_DELAY = 600;

let currentNativeRejectCount = 0;

/**
 * Обертка над VKWebAppGetGeodata, позволяет различать запрет и отказ предоставления доступа к геолокации
 * @param isNativeClient флаг нативного приложения, нужен для правильной обработки исключения
 */
export function getGeodata(isNativeClient: boolean): Promise<GetGeodataResult> {
  const callTimeMarker = performance.now();

  return vkBridge
    .send('VKWebAppGetGeodata')
    .then((data) => {
      if (data.available) {
        return { permission: 'available', lat: data.lat, long: data.long } as const;
      }

      // доступ к геолокации запрещен на уровне нативного приложения ВК или всей ОС
      return { permission: 'denied' } as const;
    })
    .catch(() => {
      const errorTimeMarker = performance.now();

      // Если ошибка выскочила слишком быстро, значит доступ к геолокации
      // запрещен самим приложением, а не пользователем
      if (errorTimeMarker - callTimeMarker <= ALREADY_DENIED_MAX_DELAY) {
        return { permission: 'denied' } as const;
      }

      // На нативных клиентах можно повторно запросить доступ к геолокации до 15 раз
      if (isNativeClient) {
        currentNativeRejectCount += 1;
        return { permission: currentNativeRejectCount <= NATIVE_CLIENT_REJECT_LIMIT ? 'prompt' : 'denied' } as const;
      }

      // В вебе пытаемся проверить доступ через Permission API
      if ('permissions' in navigator) {
        return navigator.permissions.query({ name: 'geolocation' }).then((status) => {
          return { permission: status.state === 'prompt' ? 'prompt' : 'denied' } as const;
        });
      }

      // Фоллбек
      return { permission: 'denied' } as const;
    });
}
