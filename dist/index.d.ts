import { Insets, TapticNotificationType } from '@vkontakte/vk-bridge';
import { Context } from 'react';
import { Scheme } from '@vkontakte/vkui';
import { ResourceLanguage, Services, InitOptions, ReadCallback } from 'i18next';

declare const reduceHandler: (acc: any, item: any, i: any) => any;
declare const queryParams: any;
declare const getCurrentHashParams: () => any;
declare const getInitialHashParams: () => any;
declare const appId: number;
declare const userId: number;
declare function getUtmParamsQueryString(): string;
declare const isDesktopVk: any;
declare const isSafari: boolean;
declare const isDesktopSafari: any;

/**
 * Возвращает цветовые компоненты r, g, b
 * @param input цвет (hex, rgb)
 */
declare function parseColor(input: string): number[];
/**
 * Возвращает цвет, полученный в результате наложения
 * черного цвета с alpha прозначностью на цвет target
 * @param target фоновый цвет (hex, rgb)
 * @param alpha кэффициент заливки церным цветом
 */
declare const blackedColor: (target: string, alpha: number) => string;

/**
 * Returns device insets
 */
declare function getInsets(): Insets;

declare type GetGeodataResult = {
    permission: 'available';
    lat: number;
    long: number;
} | {
    permission: 'prompt';
} | {
    permission: 'denied';
};
/**
 * Обертка над VKWebAppGetGeodata, позволяет различать запрет и отказ предоставления доступа к геолокации
 * @param isNativeClient флаг нативного приложения, нужен для правильной обработки исключения
 */
declare function getGeodata(isNativeClient: boolean): Promise<GetGeodataResult>;

declare const getNiceDate: (unix: any, t: any, times?: boolean | undefined) => string;
declare function TimeConverter(unixtime: any, text?: any): string;
declare const randomInteger: (min: any, max: any) => number;

declare function getVkGroupScreenNames(vkGroupIds: number[], accessToken: string): Promise<string[]>;

/**
 * Returns inclined word
 * @param count
 * @param ifOneString
 * @param ifTwoString
 * @param ifFiveString
 */
declare function incline(count: number, ifOneString: string, ifTwoString: string, ifFiveString: string): string;

interface AppToggles {
    toggleShowFeed: boolean;
}
declare function getDefaultToggles(): Promise<AppToggles>;
declare const loadAppToggles: (vkClient: any) => Promise<AppToggles>;

declare function openPhoneCall(phone: string): void;

declare function openWallPost(ownerId: number, postId: number, isDesktop: any): void;

declare function parseQueryParams<T extends Record<string, any>>(query: string): Partial<T>;
declare function stringifyQueryParams(params: Record<string, any>): string;

/**
 * Посылает тактильное уведомление если оно поддерживается
 * @param {TapticNotificationType} type
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
declare function tapticNotification(type: TapticNotificationType): Promise<{
    result: true;
} | undefined>;
/**
 * Посылает тактильное уведомление об изменении если оно поддерживается
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
declare function tapticSelectionChanged(): Promise<{
    result: true;
} | undefined>;

/**
 * Creates function which calls useContext and throws an error in case, when
 * context value is null
 * @param {string} hookName
 * @param {React.Context<C>} context
 * @returns {() => React.Context<Exclude<C, null>>}
 */
declare function createUseNullableContext<C>(hookName: string, context: Context<C | null>): () => C;

declare function getLangPlural(key: any, string: any, t: any): string;
declare function getCurrencyAmount(e: any): number;
declare function devErrorLog(e: any): void;
declare function devLog(any: any): void;
declare function throwDevError(error: any): void;
declare function isRetina(): boolean;
declare function getParams(): any;
declare function getHash(): any;
declare function desktopShare(url: string, image: string, title: string, comment?: any): void;
declare function _inlineShare(popup?: any, surl?: any, params?: any, popupName?: any, popupParams?: any): void;
declare function getQueryVariable(variable: any): string | undefined;
declare function currentScheme(): "amoled" | Scheme.BRIGHT_LIGHT | Scheme.SPACE_GRAY;
declare function getPlatform(): "phone" | "computer";
declare function copy(text: string): void;
declare function getAndroidVersion(): number | false;
declare function getIosVersion(): number | false;
declare function isDeviceSupported(): boolean | 0;
declare function dynamicSort(property: any): (a: any, b: any) => number;
declare function chunk(arr: any, chunkSize: any): any[];
declare function unique(arr: any): string[];
declare function declOfNum(number: any, titles: any): any;
declare function fullScreen(): void;
declare function isKeyInObj(obj: any, key: any): any;
declare function setLocalStorage(key: any, val: any): void;
declare function getLocalStorage(key: any): string | false | null;
declare function findObjectById(arr: any, _id: any): any;
declare function findObjectIndex(arr: any, _id: any): any;
declare function getNewRequestId(): string;
declare function isJsonString(str: any): boolean;

/**
 * Проверяет наличие прав доступа токена сообщества
 * @param accessToken токен сообщества
 * @param expectedScope набор названий ожидаемых прав доступа сообщества (https://vk.com/dev/permissions)
 */
declare function validateCommunityTokenScope(accessToken: string, expectedScope: string[]): Promise<boolean>;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
declare function getCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null>;
/**
 * Запрашивает у пользователя токен сообщества с определенным набором прав и проверяет токен на соответствие прав
 * @param appId идентификатор приложения
 * @param groupId идентификатор сообщества
 * @param scope набор названий прав доступа сообщества (https://vk.com/dev/permissions)
 */
declare function getValidCommunityToken(appId: number, groupId: number, scope: string[]): Promise<string | null>;

interface OpenApplicationOptions {
    groupId?: number;
    hash?: string;
    mVk?: boolean;
}
declare const openApplication: (appId: number, options?: OpenApplicationOptions) => void;

/**
 * Список полей, которые могут храниться в хранилище bridge.
 */
declare enum StorageField {
    ApplicationVisited = "application-visited",
    OnboardingCompleted = "onboarding-completed",
    TodoToolTipSeen = "todo-tooltip-seen",
    MainToolTipSeen = "main-tooltip-seen",
    IsAskedAboutNotify = "asked-notificatiions",
    IsWorkingWithNotifyViaBackend = "is-working-with-notify-via-backend"
}
/**
 * Описывает то, какое поле имеет какой тип данных в хранилище bridge.
 * Пример - [StorageField.Joined]: boolean или [StorageField.Clubs]: IClub[]
 */
interface StorageValuesMap {
    [StorageField.ApplicationVisited]: boolean;
    [StorageField.OnboardingCompleted]: boolean;
    [StorageField.TodoToolTipSeen]: boolean;
    [StorageField.MainToolTipSeen]: boolean;
    [StorageField.IsAskedAboutNotify]: boolean;
    [StorageField.IsWorkingWithNotifyViaBackend]: boolean;
}
/**
 * Возвращает тип данных для указанного поля хранилища.
 */
declare type StorageValueType<T extends StorageField> = StorageValuesMap[T];
/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {StorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
declare function setStorageValue<F extends StorageField>(field: F, value: StorageValueType<F>): Promise<void>;
/**
 * То же самое что setStorageValue только сразу для нескольких значений.
 * @param {Partial<StorageValuesMap>} values
 * @returns {Promise<void>}
 */
declare function setStorageValues(values: Partial<StorageValuesMap>): Promise<void>;
/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: StorageValueType<Key>}>}
 */
declare function getStorageValues<F extends StorageField>(...fields: F[]): Promise<{
    [Key in F]?: StorageValueType<Key>;
}>;
/**
 * Удаляет значения из хранилища.
 * @param {StorageField} fields
 * @returns {Promise<void>}
 */
declare function dropStorageValues(...fields: StorageField[]): Promise<void>;
/**
 * Полностью удаляет все значения из хранилища
 * @returns {Promise<void>}
 */
declare function dropStorage(): Promise<void>;
/**
 * Возвращает хранилище
 * @returns {Promise<{[Key in any]?: StorageValueType<Key>}>}
 */
declare function getStorage(): Promise<{
    "application-visited"?: boolean | undefined;
    "onboarding-completed"?: boolean | undefined;
    "todo-tooltip-seen"?: boolean | undefined;
    "main-tooltip-seen"?: boolean | undefined;
    "asked-notificatiions"?: boolean | undefined;
    "is-working-with-notify-via-backend"?: boolean | undefined;
}>;

declare const wordPad: (num: any, m: string, ma: string, mov: string, t: any) => any;

declare enum StatEventType {
    Navgo = "type_navgo",
    View = "type_view",
    Click = "type_click"
}
declare type StatEventData = {
    payload?: Record<string, any>;
    type: StatEventType;
};
interface StatEventsInstance<T extends Record<string, StatEventData>> {
    send<K extends keyof T>(event: K, payload: T[K]['payload']): void;
    push<K extends keyof T>(event: K, payload: T[K]['payload']): void;
    destroy(): void;
}

interface StatEventsParams {
    appId: number;
    userId: number;
    platform: string;
    url: string;
    callVkMethod(method: string, params: object): Promise<void>;
}
interface StatEventOptions {
    batchInterval?: number;
}
declare function createStatEventsInstance<T extends Record<string, StatEventData>>(events: T, params: StatEventsParams, options?: StatEventOptions): StatEventsInstance<T>;

interface VkClientOptions {
    scope?: string[];
    appId: number;
    v: string;
}
declare function createVkClientInstance(options: VkClientOptions): {
    call(method: any, params: any): Promise<any>;
};

declare enum VkClientType {
    Navgo = "type_navgo",
    View = "type_view",
    Click = "type_click"
}
declare type VkClientData = {
    res?: Record<string, any>;
    type: VkClientType;
    e: VkClientType;
};
interface VkClientInstance<T extends Record<string, VkClientData>> {
    call<K extends keyof T>(event: K, payload: T[K]['res']): void;
    then<K extends keyof T>(event: K, payload: T[K]['res']): void;
    catch<K extends keyof T>(event: K, payload: T[K]['e']): void;
    destroy(): void;
}

interface RawResourceLanguage {
    id: number;
    code: string;
    keys: {
        [key: string]: any;
    };
    config: {
        id: number;
        numDel: string;
        numDelS: string;
        numDec: string;
        timeSys: string[];
        RTL: boolean;
        yearOffset: number;
        [key: string]: any;
    };
}
declare enum LanguageNamespace {
    TRANSLATION = "translation",
    COMMON = "common",
    CONFIG = "config"
}
/**
 * Преобразует сырые данные словаря переводов ВК к данным в формате i18next
 * @param rawResourceLanguage сырые данные словаря переводов ВК
 * @param defaultNs название нэймспейса по умолчанию
 * @param defaultNsPrefix основной префикс ключей переводов, относящихся к проекту
 */
declare function formatResourceLanguage(rawResourceLanguage: RawResourceLanguage, defaultNs: string, defaultNsPrefix: string): ResourceLanguage;

declare type BackendFallback = (lng: string) => Promise<RawResourceLanguage>;
interface BackendOptions {
    name: string;
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
declare function validateBackendOptions(options: any): options is BackendOptions;
/**
 * Модуль подгрузки словаря переводов ВК
 */
declare class Backend {
    static readonly type = "backend";
    readonly type = "backend";
    static readonly DEFAULT_SOURCE = "vk";
    backendOptions: BackendOptions;
    services: Services;
    defaultNs: string;
    /**
     * Инициализация модуля.
     * Выполняет проверку необходимых полей в backendOptions для работы модуля
     * и устанавливает необходимые параметры инициализации i18next
     */
    init(services: Services, backendOptions: any, i18nextOptions: InitOptions): void;
    /**
     * Подгружает словарь переводов ВК и преобразует его для i18next
     */
    read(lng: string, namespace: string, callback: ReadCallback): void;
    /**
     * Скачивает словарь в платформе переводов ВК
     * @param name название проекта в платформе переводов ВК
     * @param lng язык перевода
     */
    static fetchRawResourceLanguage(name: string, lng: string): Promise<RawResourceLanguage>;
    create(): void;
}

declare const supportedLanguages: readonly ["ru", "uk", "ua", "en", "be", "kz", "pt", "es"];
declare type VkLanguage = typeof supportedLanguages[number];
/**
 * Извлекает язык пользователя из параметров запуска мини-приложения ВК
 * @param launchParams query-string параметров запуска мини-приложения ВК
 */
declare function getLaunchParamsVkLanguage(launchParams: string): VkLanguage | undefined;

interface DetectionOptions {
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
    fallbackLng?: VkLanguage;
}
declare function validateDetectionOptions(options: any): options is DetectionOptions;

declare const arrify: (data: any) => any[];

export { AppToggles, Backend, BackendFallback, BackendOptions, Backend as Detection, DetectionOptions, GetGeodataResult, LanguageNamespace, RawResourceLanguage, StatEventData, StatEventType, StatEventsInstance, StorageField, StorageValueType, StorageValuesMap, TimeConverter, VkClientData, VkClientInstance, VkClientType, VkLanguage, _inlineShare, appId, arrify, blackedColor, chunk, copy, createStatEventsInstance, createUseNullableContext, createVkClientInstance, currentScheme, declOfNum, desktopShare, devErrorLog, devLog, dropStorage, dropStorageValues, dynamicSort, findObjectById, findObjectIndex, formatResourceLanguage, fullScreen, getAndroidVersion, getCommunityToken, getCurrencyAmount, getCurrentHashParams, getDefaultToggles, getGeodata, getHash, getInitialHashParams, getInsets, getIosVersion, getLangPlural, getLaunchParamsVkLanguage, getLocalStorage, getNewRequestId, getNiceDate, getParams, getPlatform, getQueryVariable, getStorage, getStorageValues, getUtmParamsQueryString, getValidCommunityToken, getVkGroupScreenNames, incline, isDesktopSafari, isDesktopVk, isDeviceSupported, isJsonString, isKeyInObj, isRetina, isSafari, loadAppToggles, openApplication, openPhoneCall, openWallPost, parseColor, parseQueryParams, queryParams, randomInteger, reduceHandler, setLocalStorage, setStorageValue, setStorageValues, stringifyQueryParams, tapticNotification, tapticSelectionChanged, throwDevError, unique, userId, validateBackendOptions, validateCommunityTokenScope, validateDetectionOptions, wordPad };
