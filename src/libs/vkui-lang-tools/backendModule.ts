import { Services, ReadCallback, InitOptions } from 'i18next';
import { RawResourceLanguage, formatResourceLanguage } from './utils/resourceLanguage';
import { arrify } from './utils/misc';

export type BackendFallback = (lng: string) => Promise<RawResourceLanguage>;

export interface BackendOptions {
  /* Название проекта в системе переводов */
  name: string;
  /* Основной префикс ключей переводов, относящихся к проекту */
  defaultNsPrefix: string;
  /**
   * Источник получения переводов (по умолчанию: vk)
   * - vk - через платформу преводов ВК
   * - fallback - альтернативным способом с помощью fallback (необходим fallback)
   */
  source?: 'vk' | 'fallback';
  /**
   * Альтернатинвный способ получения данных, применяемый
   * в случае ошибки получения переводов ВК или при указанном source = 'fallback'
   */
  fallback?: BackendFallback;
}

export function validateBackendOptions(options: any): options is BackendOptions {
  return Boolean(
    options &&
      typeof options === 'object' &&
      typeof options.name === 'string' &&
      typeof options.defaultNsPrefix === 'string' &&
      (typeof options.source === 'undefined' || ['vk', 'fallback'].includes(options.source)) &&
      ['function', 'undefined'].includes(typeof options.fallback) &&
      (options.source !== 'fallback' || typeof options.fallback === 'function')
  );
}

class BackendError extends Error {}

/**
 * Модуль подгрузки словаря переводов ВК
 */
class Backend {
  static readonly type = 'backend';
  readonly type = 'backend';

  static readonly DEFAULT_SOURCE = 'vk';

  backendOptions: BackendOptions = {
    name: 'name',
    defaultNsPrefix: 'name',
  };

  services = {} as Services;

  defaultNs = 'translation'; // нэмспейс i18next по умолчанию

  /**
   * Инициализация модуля.
   * Выполняет проверку необходимых полей в backendOptions для работы модуля
   * и устанавливает необходимые параметры инициализации i18next
   */
  init(services: Services, backendOptions: any, i18nextOptions: InitOptions) {
    if (validateBackendOptions(backendOptions)) {
      this.backendOptions = backendOptions;
    } else {
      throw new BackendError('Объект backend не соответствует интерфейсу BackendOptions');
    }

    services.resourceStore.options.fallbackLng = false;

    services.resourceStore.options.interpolation = { prefix: '{', suffix: '}' };
    services.interpolator.reset();

    this.services = services;
    this.defaultNs = arrify(i18nextOptions.defaultNS || this.defaultNs)[0];
  }

  /**
   * Подгружает словарь переводов ВК и преобразует его для i18next
   */
  read(lng: string, namespace: string, callback: ReadCallback) {
    const { fallback, name, source } = this.backendOptions;

    const getRawResourceLanguage = {
      vk() {
        return Backend.fetchRawResourceLanguage(name, lng).catch((e) => (fallback ? fallback(lng) : Promise.reject(e)));
      },
      fallback() {
        return fallback
          ? fallback(lng)
          : Promise.reject(new BackendError('Поле fallback у объекта backend не было получено'));
      },
    };

    getRawResourceLanguage[source || Backend.DEFAULT_SOURCE]()
      .then((rawResourceLanguage) => {
        const resource = formatResourceLanguage(
          rawResourceLanguage,
          this.defaultNs,
          this.backendOptions.defaultNsPrefix
        );

        this.services.resourceStore.data[lng] = resource;

        callback(null, resource[namespace]);
      })
      .catch(() => {
        callback(new BackendError('Ошибка загрузки словаря через платформу переводов ВК'), false);
      });
  }

  /**
   * Скачивает словарь в платформе переводов ВК
   * @param name название проекта в платформе переводов ВК
   * @param lng язык перевода
   */
  static fetchRawResourceLanguage(name: string, lng: string): Promise<RawResourceLanguage> {
    const encodedName = encodeURIComponent(name);
    const encodedLang = encodeURIComponent(lng);

    const url = `https://vk.com/js/vkui_lang.js?name=${encodedName}&lang=${encodedLang}&format=json`;

    return fetch(url).then((response) => response.json());
  }

  create() {
    // nothing, but required by BackendModule interface
  }
}

export default Backend;
