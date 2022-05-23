export interface AppToggles {
    toggleShowFeed: boolean; // Показывать или нет пункт меню Лента
  }
  
  export async function getDefaultToggles(): Promise<AppToggles> {
    return {
      toggleShowFeed: false,
    }
  }
  
  export const loadAppToggles = (vkClient: any): Promise<AppToggles> => {
    return vkClient
      .call('execute.toggles')
      .then((res: any) => {
        return {
          toggleShowFeed: !!(res.toggleShowFeed || false),
        }
      } )
      .catch((e: any) => {
        console.warn("Fail load execute.toggles use default toggles", e)
        return getDefaultToggles();
      })
  };
  