"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnAsyncMethod = exports.returnMethod = exports.goToApp = exports.AddToCommunity = exports.addGroup = exports.subscribeMessageFromGroupTasks = exports.subscribeMessageFromGroupDefault = exports.getUserToken = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
// получение токена пользователя
const getUserToken = async (setUserToken, app_id) => {
    let token = "";
    await vk_bridge_1.default
        .send("VKWebAppGetAuthToken", {
        app_id: app_id,
        scope: "friends,wall,photos, stories",
    })
        .then((res) => {
        token = res.access_token;
    })
        .catch((err) => { });
    if (!token) {
        await vk_bridge_1.default
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
exports.getUserToken = getUserToken;
// разрешение на отправку сообщений от имени группы
function subscribeMessageFromGroupDefault(groupIDsubscription, setTemplatePage, nextPage) {
    vk_bridge_1.default
        .send("VKWebAppAllowMessagesFromGroup", {
        group_id: groupIDsubscription,
    })
        .then((res) => {
        setTemplatePage(nextPage);
    })
        .catch((err) => {
        vk_bridge_1.default
            .send("VKWebAppAllowMessagesFromGroup", {
            group_id: groupIDsubscription,
        })
            .then((res) => {
            setTemplatePage(nextPage);
        })
            .catch((err) => {
            vk_bridge_1.default
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
exports.subscribeMessageFromGroupDefault = subscribeMessageFromGroupDefault;
// разрешение на отправку сообщений от имени группы
function subscribeMessageFromGroupTasks(openAlert, groupIDsubscription, typeState) {
    vk_bridge_1.default
        .send("VKWebAppAllowMessagesFromGroup", {
        group_id: groupIDsubscription,
    })
        .then((res) => {
        typeState(true);
    })
        .catch((err) => {
        openAlert(`Чтобы узнать результат, разрешите отправку сообщений от имени группы`, "red");
        typeState(false);
    });
}
exports.subscribeMessageFromGroupTasks = subscribeMessageFromGroupTasks;
function addGroup(group_id, page) {
    vk_bridge_1.default
        .send("VKWebAppJoinGroup", { group_id: group_id })
        .then(({ result }) => {
        // incrementCountButton(`stats.buttonPage_${page}`);
    })
        .catch((err) => {
        vk_bridge_1.default
            .send("VKWebAppJoinGroup", { group_id: group_id })
            .then(({ result }) => {
            // incrementCountButton(`stats.buttonPage_${page}`);
        });
    });
}
exports.addGroup = addGroup;
// добавление сервиса в сообщество
function AddToCommunity() {
    vk_bridge_1.default
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
exports.AddToCommunity = AddToCommunity;
// открытие др приложение
function goToApp(app_id) {
    vk_bridge_1.default.send("VKWebAppOpenApp", { app_id: app_id, location: "GLI" });
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
    vk_bridge_1.default.send("VKWebAppShare", {
        link: link,
    });
}
// Копирование в буфер
function copyLink(openAlert, link) {
    vk_bridge_1.default
        .send("VKWebAppGetClientVersion")
        .then((result) => {
        if (result.platform === "web" || result.platform === "mobile-web") {
            window.navigator.clipboard.writeText(link).then(() => { }, () => { });
        }
        else {
            vk_bridge_1.default.send("VKWebAppCopyText", { text: link });
        }
    })
        .catch((error) => { });
}
//  ДОБАВЛЕНИЕ РЕПОСТА НА СТЕНУ ПОЛЬЗОВАТЕЛЯ
function share(e, urlSharing, app_id) {
    e.preventDefault();
    const url = `https://vk.com/app${app_id}`;
    const urlPhotoWall = `${urlSharing},https://vk.com/app${app_id}`;
    const text = `Узнай если не боишься! Приложение - ${url}`;
    vk_bridge_1.default.send("VKWebAppShowWallPostBox", {
        message: text,
        attachments: urlPhotoWall,
    });
}
