"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMiniAppEvent = exports.callApiMethod = exports.subscribeToPush = exports.getUserProfilePhoto = exports.getUserId = exports.allowMessages = exports.suggestToJoin = exports.getPermissionForPhotos = exports.getUserProfileInfo = exports.getAppGetLaunchParams = exports.share = exports.copyLink = exports.shareLink = exports.returnAsyncMethod = exports.returnMethod = exports.goToApp = exports.AddToCommunity = exports.addGroup = exports.subscribeMessageFromGroupTasks = exports.subscribeMessageFromGroupDefault = exports.getUserToken = exports.queryParams = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const reduceHandler = (acc, item, i) => {
    if (i === 0 && !item.includes('='))
        return { ...acc, shortId: parseInt(item, 10), shortValue: item, [item]: item };
    const [key, value] = decodeURIComponent(item).split('=');
    return key ? { ...acc, [key]: value } : acc;
};
exports.queryParams = window.location.search.replace('?', '').split('&').reduce(reduceHandler, {});
// получение токена пользователя
const getUserToken = async (setUserToken, app_id) => {
    let token = '';
    await vk_bridge_1.default
        .send('VKWebAppGetAuthToken', {
        app_id: app_id,
        scope: 'friends,wall,photos, stories',
    })
        .then((res) => {
        token = res.access_token;
    })
        .catch((err) => { });
    if (!token) {
        await vk_bridge_1.default
            .send('VKWebAppGetAuthToken', {
            app_id: app_id,
            scope: 'friends,wall,photos, stories',
        })
            .then((res) => {
            token = res.access_token;
        })
            .catch((err) => { });
    }
    return token;
};
exports.getUserToken = getUserToken;
// разрешение на отправку сообщений от имени группы
function subscribeMessageFromGroupDefault(groupIDsubscription, setTemplatePage, nextPage) {
    vk_bridge_1.default
        .send('VKWebAppAllowMessagesFromGroup', {
        group_id: groupIDsubscription,
    })
        .then((res) => {
        setTemplatePage(nextPage);
    })
        .catch((err) => {
        vk_bridge_1.default
            .send('VKWebAppAllowMessagesFromGroup', {
            group_id: groupIDsubscription,
        })
            .then((res) => {
            setTemplatePage(nextPage);
        })
            .catch((err) => {
            vk_bridge_1.default
                .send('VKWebAppAllowMessagesFromGroup', {
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
exports.subscribeMessageFromGroupDefault = subscribeMessageFromGroupDefault;
// разрешение на отправку сообщений от имени группы
function subscribeMessageFromGroupTasks(openAlert, groupIDsubscription, typeState) {
    vk_bridge_1.default
        .send('VKWebAppAllowMessagesFromGroup', {
        group_id: groupIDsubscription,
    })
        .then((res) => {
        typeState(true);
    })
        .catch((err) => {
        openAlert(`Чтобы узнать результат, разрешите отправку сообщений от имени группы`, 'red');
        typeState(false);
    });
}
exports.subscribeMessageFromGroupTasks = subscribeMessageFromGroupTasks;
function addGroup(group_id, page) {
    vk_bridge_1.default
        .send('VKWebAppJoinGroup', { group_id: group_id })
        .then(({ result }) => {
        // incrementCountButton(`stats.buttonPage_${page}`);
    })
        .catch((err) => {
        vk_bridge_1.default
            .send('VKWebAppJoinGroup', { group_id: group_id })
            .then(({ result }) => {
            // incrementCountButton(`stats.buttonPage_${page}`);
        });
    });
}
exports.addGroup = addGroup;
// добавление сервиса в сообщество
function AddToCommunity() {
    vk_bridge_1.default
        .send('VKWebAppAddToCommunity', {})
        .then((res) => {
        if (res.group_id) {
            return true;
        }
    })
        .catch((err) => {
        return false;
    });
}
exports.AddToCommunity = AddToCommunity;
// открытие др приложение
function goToApp(app_id) {
    vk_bridge_1.default.send('VKWebAppOpenApp', { app_id: app_id, location: 'GLI' });
}
exports.goToApp = goToApp;
const returnMethod = async (count, asyncFn, fn, page) => {
    let success = false;
    for (let i = 0; i < count; i++) {
        if (success === true) {
            fn(page);
            return;
        }
        else {
            success = await asyncFn();
        }
    }
};
exports.returnMethod = returnMethod;
const returnAsyncMethod = async (arr, seconds) => {
    const promise = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout * 1000);
        });
    };
    for (const seconds of arr) {
        await promise(seconds);
    }
};
exports.returnAsyncMethod = returnAsyncMethod;
function shareLink(link) {
    vk_bridge_1.default.send('VKWebAppShare', {
        link: link,
    });
}
exports.shareLink = shareLink;
// Копирование в буфер
function copyLink(openAlert, link) {
    vk_bridge_1.default
        .send('VKWebAppGetClientVersion')
        .then((result) => {
        if (result.platform === 'web' || result.platform === 'mobile-web') {
            window.navigator.clipboard.writeText(link).then(() => { }, () => { });
        }
        else {
            vk_bridge_1.default.send('VKWebAppCopyText', { text: link });
        }
    })
        .catch((error) => { });
}
exports.copyLink = copyLink;
//  ДОБАВЛЕНИЕ РЕПОСТА НА СТЕНУ ПОЛЬЗОВАТЕЛЯ
function share(e, urlSharing, app_id) {
    e.preventDefault();
    const url = `https://vk.com/app${app_id}`;
    const urlPhotoWall = `${urlSharing},https://vk.com/app${app_id}`;
    const text = `Узнай если не боишься! Приложение - ${url}`;
    vk_bridge_1.default.send('VKWebAppShowWallPostBox', {
        message: text,
        attachments: urlPhotoWall,
    });
}
exports.share = share;
const getAppGetLaunchParams = async () => {
    return await vk_bridge_1.default
        .send('VKWebAppGetLaunchParams', {})
        .then((data) => {
        if (data) {
            return data;
        }
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.getAppGetLaunchParams = getAppGetLaunchParams;
const getUserProfileInfo = async (user_id) => {
    return await vk_bridge_1.default
        .send('VKWebAppGetUserInfo', {
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
exports.getUserProfileInfo = getUserProfileInfo;
const getPermissionForPhotos = async (app_id) => {
    return await vk_bridge_1.default
        .send('VKWebAppGetAuthToken', {
        app_id: app_id,
        scope: 'photo',
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
exports.getPermissionForPhotos = getPermissionForPhotos;
const suggestToJoin = async (group_id) => {
    return await vk_bridge_1.default.send('VKWebAppJoinGroup', {
        group_id: group_id
    })
        .then((data) => {
        if (data.result) {
            return data.result;
        }
    })
        .catch((error) => {
        return error.error_reason;
    });
};
exports.suggestToJoin = suggestToJoin;
const allowMessages = async (group_id) => {
    return await vk_bridge_1.default.send('VKWebAppAllowMessagesFromGroup', {
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
};
exports.allowMessages = allowMessages;
const getUserId = async () => {
    return await (0, exports.getAppGetLaunchParams)().then((data) => {
        return data.vk_user_id;
    });
};
exports.getUserId = getUserId;
const getUserProfilePhoto = async () => {
    return await (0, exports.getUserId)().then(async (user_id) => {
        const data = await (0, exports.getUserProfileInfo)(user_id);
        return data.photo_max_orig;
    });
};
exports.getUserProfilePhoto = getUserProfilePhoto;
const subscribeToPush = () => {
    return vk_bridge_1.default.send('VKWebAppAllowNotifications');
};
exports.subscribeToPush = subscribeToPush;
async function callApiMethod(method, params, { token } = {}) {
    const resp = await vk_bridge_1.default.send('VKWebAppCallAPIMethod', {
        method: method,
        params: {
            v: '5.158',
            ...params,
            access_token: token,
        },
    });
    return resp.response;
}
exports.callApiMethod = callApiMethod;
async function sendMiniAppEvent(event, customAppId, token, userId, appId) {
    const params = {
        events: [
            {
                user_id: userId,
                mini_app_id: customAppId || appId,
                type: 'type_navgo',
                type_navgo: {
                    type: 'type_mini_app_custom_event_item',
                },
                url: window.location.href,
                vk_platform: exports.queryParams.vk_platform,
                event,
                screen: 'main',
                json: '',
            },
        ],
    };
    console.info('send mini app event', params);
    const res = await callApiMethod('statEvents.addMiniApps', params, { token });
    console.log('mini app event resp', res);
    return res;
}
exports.sendMiniAppEvent = sendMiniAppEvent;
