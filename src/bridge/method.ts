import bridge from "@vkontakte/vk-bridge";

const reduceHandler = (acc: any, item: any, i: any) => {
    if (i === 0 && !item.includes("=")) return { ...acc, shortId: parseInt(item, 10), shortValue: item, [item]: item };
    const [key, value] = decodeURIComponent(item).split("=");
    return key ? { ...acc, [key]: value } : acc;
  };

export const queryParams = window.location.search.replace("?", "").split("&").reduce(reduceHandler, {});

// получение токена пользователя
export const getUserToken = async (setUserToken: string, app_id: number) => {
  let token = "";

  await bridge
    .send("VKWebAppGetAuthToken", {
      app_id: app_id,
      scope: "friends,wall,photos, stories",
    })
    .then((res) => {
      token = res.access_token;
    })
    .catch((err) => { });

  if (!token) {
    await bridge
      .send("VKWebAppGetAuthToken", {
        app_id: app_id,
        scope: "friends,wall,photos, stories",
      })
      .then((res) => {
        token = res.access_token;
      })
      .catch((err) => { });
  }

  return token;
};

// разрешение на отправку сообщений от имени группы
export function subscribeMessageFromGroupDefault(
  groupIDsubscription: any,
  setTemplatePage: any,
  nextPage: any
) {
  bridge
    .send("VKWebAppAllowMessagesFromGroup", {
      group_id: groupIDsubscription,
    })
    .then((res) => {
      setTemplatePage(nextPage);
    })
    .catch((err) => {
      bridge
        .send("VKWebAppAllowMessagesFromGroup", {
          group_id: groupIDsubscription,
        })
        .then((res) => {
          setTemplatePage(nextPage);
        })
        .catch((err) => {
          bridge
            .send("VKWebAppAllowMessagesFromGroup", {
              group_id: groupIDsubscription,
            })
            .then((res) => {
              setTemplatePage(nextPage);
            })
            .catch((err) => {
              setTemplatePage(nextPage);
            });
        });
    });
}

// разрешение на отправку сообщений от имени группы
export function subscribeMessageFromGroupTasks(
  openAlert: any,
  groupIDsubscription: any,
  typeState: any
) {
  bridge
    .send("VKWebAppAllowMessagesFromGroup", {
      group_id: groupIDsubscription,
    })
    .then((res) => {
      typeState(true);
    })
    .catch((err) => {
      openAlert(
        `Чтобы узнать результат, разрешите отправку сообщений от имени группы`,
        "red"
      );
      typeState(false);
    });
}

export function addGroup(group_id: number, page: string) {
  bridge
    .send("VKWebAppJoinGroup", { group_id: group_id })
    .then(({ result }) => {
      // incrementCountButton(`stats.buttonPage_${page}`);
    })
    .catch((err) => {
      bridge
        .send("VKWebAppJoinGroup", { group_id: group_id })
        .then(({ result }) => {
          // incrementCountButton(`stats.buttonPage_${page}`);
        });
    });
}

// добавление сервиса в сообщество
export function AddToCommunity() {
  bridge
    .send("VKWebAppAddToCommunity", {})
    .then((res) => {
      if (res.group_id) {
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
}

// открытие др приложение
export function goToApp(app_id: number) {
  bridge.send("VKWebAppOpenApp", { app_id: app_id, location: "GLI" });
}

export const returnMethod = async (count: any, asyncFn: any, fn: any, page: any) => {
  let success = false;

  for (let i = 0; i < count; i++) {
    if (success === true) {
      fn(page);
      return;
    } else {
      success = await asyncFn();
    }
  }
};

export const returnAsyncMethod = async (arr: any, seconds: any) => {
  const promise = (timeout: any) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, timeout * 1000);
    });
  };

  for (const seconds of arr) {
    await promise(seconds);
  }
};

export function shareLink(link: string) {
  bridge.send("VKWebAppShare", {
    link: link,
  });
}

// Копирование в буфер
export function copyLink(openAlert: any, link: string) {
  bridge
    .send("VKWebAppGetClientVersion")
    .then((result) => {
      if (result.platform === "web" || result.platform === "mobile-web") {
        window.navigator.clipboard.writeText(link).then(
          () => { },
          () => { }
        );
      } else {
        bridge.send("VKWebAppCopyText", { text: link });
      }
    })
    .catch((error) => { });
}

//  ДОБАВЛЕНИЕ РЕПОСТА НА СТЕНУ ПОЛЬЗОВАТЕЛЯ
export function share(e: any, urlSharing: any, app_id: number) {
  e.preventDefault();

  const url = `https://vk.com/app${app_id}`;
  const urlPhotoWall = `${urlSharing},https://vk.com/app${app_id}`;
  const text = `Узнай если не боишься! Приложение - ${url}`;

  bridge.send("VKWebAppShowWallPostBox", {
    message: text,
    attachments: urlPhotoWall,
  });
}

export const getAppGetLaunchParams = async () => {
  return await bridge
    .send("VKWebAppGetLaunchParams", {})
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserProfileInfo = async (user_id: number) => {
  return await bridge
    .send("VKWebAppGetUserInfo", {
      user_id: user_id,
    })
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPermissionForPhotos = async (app_id: number) => {
  return await bridge
    .send("VKWebAppGetAuthToken", {
      app_id: app_id,
      scope: "photo",
    })
    .then((data) => {
      if (data.access_token) {
        return data.access_token;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const suggestToJoin = async (group_id: number) => {
  return await bridge.send('VKWebAppJoinGroup', {
    group_id: group_id
  })
    .then((data) => {
      if (data.result) {
        return data.result
      }
    })
    .catch((error) => {
      return error.error_reason
    });
}

export const allowMessages = async (group_id: number) => {
  return await bridge.send('VKWebAppAllowMessagesFromGroup', {
    group_id: group_id,
    key: ''
  })
    .then((data) => {
      if (data.result) {
        // Пользователь разрешил отправку сообщений от имени сообщества
        console.log((data.result));
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });
}

export const getUserId = async () => {
  return await getAppGetLaunchParams().then((data: any) => {
    return data.vk_user_id;
  });
};

export const getUserProfilePhoto = async () => {
  return await getUserId().then(async (user_id) => {
    const data: any = await getUserProfileInfo(user_id);
    return data.photo_max_orig;
  });
};

export const subscribeToPush = () => {
    return bridge.send("VKWebAppAllowNotifications");
};

export async function callApiMethod(method: any, params: any, { token }: any = {}) {
    const resp = await bridge.send("VKWebAppCallAPIMethod", {
      method: method,
      params: {
        v: "5.158",
        ...params,
        access_token: token,
      },
    });
  
    return resp.response;
}

export async function sendMiniAppEvent(event: any, customAppId: number, token: string, userId: number, appId: number) {
  
    const params = {
      events: [
        {
          user_id: userId,
          mini_app_id: customAppId || appId,
          type: "type_navgo",
          type_navgo: {
            type: "type_mini_app_custom_event_item",
          },
          url: window.location.href,
          vk_platform: queryParams.vk_platform,
          event,
          screen: "main",
          json: "",
        },
      ],
    };
    console.info("send mini app event", params);
    const res = await callApiMethod("statEvents.addMiniApps", params, { token });
    console.log("mini app event resp", res);
    return res;
  }
