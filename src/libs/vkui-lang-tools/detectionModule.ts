import { Services } from 'i18next';
import { VkLanguage, getLaunchParamsVkLanguage } from './utils/vkLanguage';

export interface DetectionOptions {
  /**
   * Query-string параметров запуска мини-приложения ВК, содержащий в себе vk_language=lng,
   * по которому будет определен язык пользователя
   * (Пример: vk_app_id=123&vk_language=ru&vk_platform=desktop&vk_...)
   * */
  launchParams?: string;
  /**
   * Поддерживаемые языки (в случае, когда определен другой язык, будет использовано значение fallbackLng).
   * Если не указан - поддерживаются все языки
   */
  supportedLanguages?: VkLanguage[];
  /* Язык по умолчанию, на случай невозможности определения (по умолчанию: ru) */
  fallbackLng?: VkLanguage;
}

export function validateDetectionOptions(options: any): options is DetectionOptions {
  return Boolean(
    options &&
      typeof options === 'object' &&
      ['string', 'undefined'].includes(typeof options.fallbackLng) &&
      ['string', 'undefined'].includes(typeof options.launchParams) &&
      (typeof options.supportedLanguages === 'undefined' || Array.isArray(options.supportedLanguages))
  );
}

class DetectionError extends Error {}

/**
 * Модуль определения языка пользователя ВК
 */
class Detection {
  static readonly type = 'languageDetector';
  readonly type = 'languageDetector';

  static readonly DEFAULT_FALLBACK_LNG = 'ru';

  detectorOptions: DetectionOptions = {
    fallbackLng: Detection.DEFAULT_FALLBACK_LNG,
  };

  /**
   * Инициализация модуля. Выполняет проверку необходимых полей в detectorOptions для работы модуля
   */
  init(services: Services, detectorOptions: any) {
    if (typeof detectorOptions === 'undefined' || validateDetectionOptions(detectorOptions)) {
      this.detectorOptions = detectorOptions || {};
    } else {
      throw new DetectionError('Объект detection не соответствует интерфейсу DetectionOptions');
    }
  }

  /**
   * Определяет язык пользователя ВК на основе launchParams,
   * переданного в DetectionOptions, либо полученного из URL страницы
   */
  detect() {
    const { launchParams = window.location.search.slice(1), supportedLanguages } = this.detectorOptions;

    const language = getLaunchParamsVkLanguage(launchParams) || Detection.DEFAULT_FALLBACK_LNG;

    const resultLanguage = supportedLanguages
      ? supportedLanguages.includes(language)
        ? language
        : Detection.DEFAULT_FALLBACK_LNG
      : language;

    return Detection.prepareLanguage(resultLanguage);
  }

  /**
   * Преобразует обозначение языка в ВК к обозначению для i18next
   * @param lng обозначение языка в ВК
   */
  static prepareLanguage(lng: VkLanguage): string {
    // для Украины есть два обозначения: ua и uk. Приводим к одному - uk,
    // т.к. i18next знает именно его правила плюрализации
    return lng === 'ua' ? 'uk' : lng;
  }

  cacheUserLanguage() {
    // nothing, but required by LanguageDetectorModule interface
  }
}

export default Detection;
