import bridge from "@vkontakte/vk-bridge";

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

function shareLink(link: string) {
    bridge.send("VKWebAppShare", {
      link: link,
    });
  }

// Копирование в буфер
function copyLink(openAlert: any, link: string) {
    bridge
      .send("VKWebAppGetClientVersion")
      .then((result) => {
        if (result.platform === "web" || result.platform === "mobile-web") {
          window.navigator.clipboard.writeText(link).then(
            () => {},
            () => {}
          );
        } else {
          bridge.send("VKWebAppCopyText", { text: link });
        }
      })
      .catch((error) => {});
  }

//  ДОБАВЛЕНИЕ РЕПОСТА НА СТЕНУ ПОЛЬЗОВАТЕЛЯ
function share(e: any, urlSharing: any, app_id: number) {
    e.preventDefault();
  
    const url = `https://vk.com/app${app_id}`;
    const urlPhotoWall = `${urlSharing},https://vk.com/app${app_id}`;
    const text = `Узнай если не боишься! Приложение - ${url}`;
  
    bridge.send("VKWebAppShowWallPostBox", {
      message: text,
      attachments: urlPhotoWall,
    });
  }