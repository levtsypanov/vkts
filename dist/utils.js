"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.getPlatform = exports.currentScheme = exports.getQueryVariable = exports.isJsonString = exports.getNewRequestId = exports.findObjectIndex = exports.findObjectById = exports.getLocalStorage = exports.setLocalStorage = exports.isKeyInObj = exports.fullScreen = exports.declOfNum = exports.unique = exports.chunk = exports.dynamicSort = exports.isDeviceSupported = exports.getIosVersion = exports.getAndroidVersion = exports._inlineShare = exports.desktopShare = exports.getHash = exports.getParams = exports.isRetina = exports.throwDevError = exports.devLog = exports.devErrorLog = exports.getCurrencyAmount = exports.getLangPlural = exports.rusDate = exports.randInt = exports.disableEAndMinusOnKeyDown = exports.schemeChanger = exports.FireEvent = exports.pluralize = exports.fixTypography = void 0;
const moment_1 = __importDefault(require("moment"));
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const vkui_1 = require("@vkontakte/vkui");
const wordPad_1 = require("./wordPad");
const fixTypography = (string, wordLength = 3) => {
    if (!string)
        return;
    let strSplit = string.split(" "); //разбиваем строку на массив
    strSplit = strSplit.map((str) => (str.length <= wordLength ? str + "\u00A0" : str + " ")); //если слово 3 символа, вставляем символ пробела
    strSplit = strSplit.join(""); //возвращаем обратно массив в строку
    return strSplit;
};
exports.fixTypography = fixTypography;
// pluralize(21, ['пользователь', 'пользователя', 'пользователей'])
function pluralize(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
exports.pluralize = pluralize;
const FireEvent = (link) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.dispatchEvent(new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
};
exports.FireEvent = FireEvent;
const schemeChanger = ({ detail: { type, data } }) => {
    if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
        document.body.attributes.setNamedItem(schemeAttribute);
        switch (data.scheme) {
            case 'bright_light': {
                return vk_bridge_1.default.send('VKWebAppSetViewSettings', {
                    status_bar_style: 'dark',
                });
            }
            case 'client_light': {
                return vk_bridge_1.default.send('VKWebAppSetViewSettings', {
                    status_bar_style: 'dark',
                });
            }
            case 'space_gray': {
                return vk_bridge_1.default.send('VKWebAppSetViewSettings', {
                    status_bar_style: 'light',
                });
            }
            case 'client_dark': {
                return vk_bridge_1.default.send('VKWebAppSetViewSettings', {
                    status_bar_style: 'light',
                });
            }
            default:
        }
    }
};
exports.schemeChanger = schemeChanger;
function disableEAndMinusOnKeyDown(e) {
    if (["-", "e"].includes(e.key))
        e.preventDefault();
}
exports.disableEAndMinusOnKeyDown = disableEAndMinusOnKeyDown;
// Случайное в промежутке
const randInt = (from, to) => {
    return Math.floor(Math.random() * (to - from + 1)) + from;
};
exports.randInt = randInt;
// DATE в RUS  DATE
const rusDate = (date) => {
    return (0, moment_1.default)(date).format('DD.MM.YYYY');
};
exports.rusDate = rusDate;
function getLangPlural(key, string, t) {
    return `${key} ${(0, wordPad_1.wordPad)(key, `${string}.0`, `${string}.1`, `${string}.2`, t)}`;
}
exports.getLangPlural = getLangPlural;
function getCurrencyAmount(e) {
    var t = e.split("");
    return +"".concat(t.slice(0, t.length - 2).join(""), ".").concat(t.slice(-2).join(""));
}
exports.getCurrencyAmount = getCurrencyAmount;
/*
    Работа с логами и ошибками в env = development
*/
function devErrorLog(e) {
    if (process.env.NODE_ENV === 'development') {
        console.error(e);
    }
}
exports.devErrorLog = devErrorLog;
function devLog(any) {
    if (process.env.NODE_ENV === 'development') {
        console.log(any);
    }
}
exports.devLog = devLog;
function throwDevError(error) {
    if (process.env.NODE_ENV === 'development') {
        throw error;
    }
}
exports.throwDevError = throwDevError;
/*
    Проверяет на ретину
*/
function isRetina() {
    return window.devicePixelRatio > 1;
}
exports.isRetina = isRetina;
/*
    Получает параметры запуска
*/
function getParams() {
    let params = window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(function (p, e) {
        var a = e.split('=');
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});
    return params;
}
exports.getParams = getParams;
/*
    Получает hash
*/
function getHash() {
    let itog;
    let params = window
        .location
        .href
        .replace('?', '')
        .split('#');
    if (params[1]) {
        itog = params[1]
            .replace('#', '')
            .split('&')
            .reduce(function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {});
    }
    if (itog) {
        return itog;
    }
    else {
        return false;
    }
}
exports.getHash = getHash;
/*
    Репост для десктоп версии
*/
function desktopShare(url, image, title, comment = '') {
    let params = {
        title: title,
        image: image,
        noparse: "1",
        comment: comment
    };
    let popupName = '_blank', width = 650, height = 610, left = Math.max(0, (window.screen.width - width) / 2), top = Math.max(0, (window.screen.height - height) / 2), surl = 'https://vk.com/share.php?url=' + encodeURIComponent(url), popupParams = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',menubar=0,toolbar=0,location=0,status=0', popup = false;
    try {
        let doc_dom = '', loc_hos = '';
        try {
            doc_dom = document.domain;
            loc_hos = window.location.host;
        }
        catch (e) {
        }
        if (doc_dom !== loc_hos) {
            let ua = window.navigator.userAgent.toLowerCase();
            if (!/opera/i.test(ua) && /msie/i.test(ua)) {
                _inlineShare(popup, surl, params);
            }
        }
        popup = window.open('', popupName, popupParams);
        let text = '<form accept-charset="UTF-8" action="' + surl + '" method="POST" id="share_form">';
        for (let i in params) {
            text += '<input type="hidden" name="' + i + '" value="' + params[i].toString().replace(/"/g, '&myquot;').replace(/&quot/ig, '&myquot') + '" />';
        }
        text += '</form>';
        text += '<script type="text/javascript">document.getElementById("share_form").submit()</script>';
        text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
            '<head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /></head>' +
            '<body>' + text + '</body></html>';
        popup.document.write(text);
        popup.focus();
    }
    catch (e) { // ie with changed domain.
        _inlineShare(popup, surl, params, popupName, popupParams);
    }
}
exports.desktopShare = desktopShare;
function _inlineShare(popup, surl, params, popupName, popupParams) {
    try {
        if (popup) {
            popup.close();
        }
        surl += '?';
        for (let i in params) {
            surl += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) + '&';
        }
        popup = window.open(surl, popupName, popupParams);
        popup.focus();
    }
    catch (e) {
        alert("Sharing error: " + e.message);
    }
}
exports._inlineShare = _inlineShare;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (window.decodeURIComponent(pair[0]) === variable) {
            return window.decodeURIComponent(pair[1]);
        }
        ;
    }
    ;
}
exports.getQueryVariable = getQueryVariable;
;
function currentScheme() {
    let query = getQueryVariable("scheme");
    if (query === "amoled")
        return "amoled";
    if (query === "dark")
        return vkui_1.Scheme.SPACE_GRAY;
    if (query === "")
        return vkui_1.Scheme.BRIGHT_LIGHT;
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            return vkui_1.Scheme.SPACE_GRAY;
        return vkui_1.Scheme.BRIGHT_LIGHT;
    }
    ;
    return vkui_1.Scheme.BRIGHT_LIGHT;
}
exports.currentScheme = currentScheme;
;
function getPlatform() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(window.navigator.userAgent)) {
        return 'phone';
    }
    else
        return "computer";
}
exports.getPlatform = getPlatform;
;
function copy(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
exports.copy = copy;
;
/*
    Получает Android версию
*/
function getAndroidVersion() {
    let ua = (window.navigator.userAgent).toLowerCase();
    // eslint-disable-next-line
    let match = ua.match(/android\s([0-9\.]*)/);
    if (ua.indexOf('chrome/6') !== -1) {
        return false;
    }
    return match ? parseInt(match[1], 10) : false;
}
exports.getAndroidVersion = getAndroidVersion;
/*
    Получает iOS версию
*/
function getIosVersion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return parseInt(v[1], 10);
    }
    else {
        return false;
    }
}
exports.getIosVersion = getIosVersion;
/*
    Проверка на поддерживаемые версии iOS и Android
*/
function isDeviceSupported() {
    return !(getAndroidVersion() && getAndroidVersion() <= 4) || (getIosVersion() && getIosVersion() <= 8);
}
exports.isDeviceSupported = isDeviceSupported;
/*
    Сортирует объект по ключу
*/
function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
exports.dynamicSort = dynamicSort;
/*
    Разбивает массив на чанки
*/
function chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize));
    return R;
}
exports.chunk = chunk;
/*
    Убирает повторы из массива возвращает новый без повторов
*/
function unique(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}
exports.unique = unique;
/*
    Склонение по числительному titles = ['подписчик', 'подписчика', 'подписчиков']
*/
function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
exports.declOfNum = declOfNum;
/*
    Развернуть приложение во весь экран
*/
function fullScreen() {
    let elem = document.querySelector("html");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
            devLog(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
    else {
        document.exitFullscreen();
    }
}
exports.fullScreen = fullScreen;
/*
    Проверяет есть ли ключ в объекте, если есть возвращает его значение.
*/
function isKeyInObj(obj, key) {
    //
    if (obj) {
        if (typeof obj[key] !== "undefined") {
            return obj[key];
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.isKeyInObj = isKeyInObj;
/*
    Устанавливает переменную в LocalStorage
*/
function setLocalStorage(key, val) {
    try {
        if (typeof window.localStorage !== 'undefined') {
            localStorage.setItem(key, val);
        }
        else {
            console.log('localStorage не поддерживается');
        }
    }
    catch (e) {
        console.log(e);
    }
}
exports.setLocalStorage = setLocalStorage;
/*
    Получает значение переменной из LocalStorage
*/
function getLocalStorage(key) {
    try {
        if (typeof window.localStorage !== 'undefined') {
            let item = localStorage.getItem(key);
            return item;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.getLocalStorage = getLocalStorage;
/*
    Ищет объект в массиве объектов по ид объекта
*/
function findObjectById(arr, _id) {
    const obj = arr.find(({ id }) => {
        return (id === _id) ? true : false;
    });
    if (obj) {
        return obj;
    }
    else {
        return false;
    }
}
exports.findObjectById = findObjectById;
/*
    Ищет индекс объекта в массиве объектов по ид объекта
*/
function findObjectIndex(arr, _id) {
    const index = arr.findIndex(({ id }) => {
        return (id === _id) ? true : false;
    });
    if (index !== -1) {
        return index;
    }
    else {
        return false;
    }
}
exports.findObjectIndex = findObjectIndex;
/*
    Получает большое число для request id
*/
function getNewRequestId() {
    return (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
}
exports.getNewRequestId = getNewRequestId;
/*
    Является ли строка валидным json
*/
function isJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isJsonString = isJsonString;
