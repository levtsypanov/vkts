export const reduceHandler = (acc: any, item: any, i: any) => {
    if (i === 0 && !item.includes("=")) return { ...acc, shortId: parseInt(item, 10), shortValue: item };
    const [key, value] = decodeURIComponent(item).split("=");
    return key ? { ...acc, [key]: value } : acc;
  };
  
  export const queryParams = window.location.search.replace("?", "").split("&").reduce(reduceHandler, {});
  
  export const getCurrentHashParams = () =>
    window.location.hash.replace("#", "").replace("?", "").split("&").reduce(reduceHandler, {});
  
  let savedHashParams = window.location.hash;
  export const getInitialHashParams = () =>
    savedHashParams.replace("#", "").replace("?", "").split("&").reduce(reduceHandler, {});
  
  export const appId = parseInt(queryParams.vk_app_id, 10);
  export const userId = parseInt(queryParams.vk_user_id, 10);
  
  export function getUtmParamsQueryString() {
    const params = getInitialHashParams();
    return Object.keys(params)
      .filter((param: any) => param?.includes("utm_"))
      .map((paramName) => `${paramName}=${params[paramName]}`)
      .join("&");
  }
  
  export const isDesktopVk = queryParams.vk_platform?.includes("desktop");
  export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  export const isDesktopSafari = isDesktopVk && isSafari;
  