/**
 *  Working with launch options
 */
 export { 
    reduceHandler,
    getCurrentHashParams,
    getInitialHashParams,
    getUtmParamsQueryString,

    queryParams,
    appId,
    userId,
    isDesktopVk,
    isSafari,
    isDesktopSafari,
} from './app_params';
export * from './app_params';

/**
 *  Working with rgb colors
 */
export { parseColor, blackedColor } from './color';
export * from './color';

/**
 *  Working with device insertion
 */
 export { getInsets } from './dom';
 export * from './dom';

/**
 *  Working with geolocation
 */
 export { getGeodata } from './getGeodata';
 export type { GetGeodataResult } from './getGeodata';
 export * from './getGeodata';

/**
 *  Working with connecting dates
 */
 export { getNiceDate, TimeConverter } from './getNiceDate';
 export * from './getNiceDate';

 /**
 *  To work with photos
 */
  export { i, getLargestVkPhoto, getImage300Width } from './images';
  export * from './images';

/**
 *  @ignore
 */
 export { getVkGroupScreenNames } from './getVkGroupScreenNames';
 export * from './getVkGroupScreenNames';

/**
 *  Returns inclined word
 */
 export { incline } from './incline';
 export * from './incline';

/**
 *  To work with switches (Available only for developers)
 */
 export { 
    getDefaultToggles,
    loadAppToggles
} from './loadAppToggles';
export type { AppToggles } from './loadAppToggles';
export * from './loadAppToggles';

/**
 *  @ignore
 */
 export { openPhoneCall } from './openPhoneCall';
 export * from './openPhoneCall';

/**
 *  @ignore
 */
 export { openWallPost } from './openWallPost';
 export * from './openWallPost';

/**
 *  To work with query params
 */
 export { parseQueryParams, stringifyQueryParams } from './query-params';
 export * from './query-params';

/**
 *  To work with tactile notifications
 */
 export { tapticNotification, tapticSelectionChanged } from './taptic';
 export * from './taptic';

/**
 *  Creates function which calls useContext and throws an error in case, when
 */
 export { createUseNullableContext } from './UseNullableContext';
 export * from './UseNullableContext';

/**
 *  All Utilites
 */
 export {
    fixTypography,
    pluralize,
    FireEvent,
    schemeChanger,
    disableEAndMinusOnKeyDown,
    randInt,
    rusDate,
    getLangPlural,
    getCurrencyAmount,
    devErrorLog,
    devLog,
    throwDevError,
    isRetina,
    getParams,
    getHash,
    desktopShare,
    _inlineShare,
    getQueryVariable,
    currentScheme,
    getPlatform,
    copy,
    getAndroidVersion,
    getIosVersion,
    dynamicSort,
    chunk,
    unique,
    declOfNum,
    fullScreen,
    isKeyInObj,
    setLocalStorage,
    getLocalStorage,
    findObjectById,
    findObjectIndex,
    getNewRequestId,
    isJsonString
} from './utils';
export * from './utils';

/**
 *  For working with VKontakte communities
 */
 export { 
    validateCommunityTokenScope,
    getCommunityToken,
    getValidCommunityToken
} from './vkCommunity';
export * from './vkCommunity';

/**
 *  @ignore
 */
 export { openApplication } from './vkOpenApplication';
 export * from './vkOpenApplication';
/**
 *  To work with VKontakte storage based on VK Bridge
 */
 export { 
    StorageField,
    StorageValueType,
    StorageValuesMap,

    setStorageValue,
    setStorageValues,
    getStorageValues,
    dropStorageValues,
    dropStorage,
    getStorage
} from './vkStorage';
export * from './vkStorage';

/**
 *  @ignore
 */
 export { wordPad } from './wordPad';
 export * from './wordPad';

 /**
 * Libraries for official use VK Team
 */

  /**
 * Libraries for official use VK Team
 */

  /**
 *  @ignore
 */
   export { DeviceService } from './DeviceService';

   export { HashParameterHandler } from './HashParameterHandler';

   export { RemoteAPI } from './RemoteAPI';

   export { escape, unescape, encodeHTMLEntities, decodeHTMLEntities } from './htmlEntities';

/**
 *  @ignore
 */
export { randomNumber } from './randomNumber';
export { arrayRandomItem } from './arrayRandomItem';
export { ObjectClassNames, ClassName } from './classNameBuilder';
export { classNameBuilder } from './classNameBuilder';

export { isNumeric, isFunction, leadingZero, isPrimitiveReactNode, noop } from './vkui/utils';
export { classNames } from './vkui/classNames';
export { classNamesString } from './vkui/classNames';

export { isWebView } from './isWebView';

export { LaunchParams, Scope, ViewerGroupRole } from './miniapp/getLaunchParams';
export { getLaunchParams } from './miniapp/getLaunchParams';
export { useLaunchParams } from './miniapp/useLaunchParams';

export { compareDates } from './tools/compareDates';
