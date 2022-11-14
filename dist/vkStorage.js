"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorage = exports.dropStorage = exports.dropStorageValues = exports.getStorageValues = exports.setStorageValues = exports.setStorageValue = exports.StorageField = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
/**
 * Список полей, которые могут храниться в хранилище bridge.
 */
var StorageField;
(function (StorageField) {
    StorageField["ApplicationVisited"] = "application-visited";
    StorageField["OnboardingCompleted"] = "onboarding-completed";
    StorageField["TodoToolTipSeen"] = "todo-tooltip-seen";
    StorageField["MainToolTipSeen"] = "main-tooltip-seen";
    StorageField["IsAskedAboutNotify"] = "asked-notificatiions";
    StorageField["IsWorkingWithNotifyViaBackend"] = "is-working-with-notify-via-backend";
})(StorageField = exports.StorageField || (exports.StorageField = {}));
/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {StorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
async function setStorageValue(field, value) {
    await vk_bridge_1.default.send('VKWebAppStorageSet', {
        key: field,
        // encodeURIComponent - хак для русских букв. Они некорректно записываются
        // в хранилище.
        value: encodeURIComponent(JSON.stringify(value)),
    });
}
exports.setStorageValue = setStorageValue;
/**
 * То же самое что setStorageValue только сразу для нескольких значений.
 * @param {Partial<StorageValuesMap>} values
 * @returns {Promise<void>}
 */
async function setStorageValues(values) {
    await Promise.all(Object.entries(values).map(([field, value]) => {
        return vk_bridge_1.default.send('VKWebAppStorageSet', {
            key: field,
            value: encodeURIComponent(JSON.stringify(value)),
        });
    }));
}
exports.setStorageValues = setStorageValues;
/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: StorageValueType<Key>}>}
 */
async function getStorageValues(...fields) {
    const { keys } = await vk_bridge_1.default.send('VKWebAppStorageGet', {
        keys: fields,
    });
    return keys.reduce((acc, k) => {
        try {
            acc[k.key] = JSON.parse(decodeURIComponent(k.value));
        }
        catch (e) {
        }
        return acc;
    }, {});
}
exports.getStorageValues = getStorageValues;
/**
 * Удаляет значения из хранилища.
 * @param {StorageField} fields
 * @returns {Promise<void>}
 */
async function dropStorageValues(...fields) {
    await Promise.all(fields.map(f => vk_bridge_1.default.send('VKWebAppStorageSet', {
        key: f,
        value: '',
    })));
}
exports.dropStorageValues = dropStorageValues;
/**
 * Полностью удаляет все значения из хранилища
 * @returns {Promise<void>}
 */
function dropStorage() {
    return dropStorageValues(...Object.values(StorageField));
}
exports.dropStorage = dropStorage;
/**
 * Возвращает хранилище
 * @returns {Promise<{[Key in any]?: StorageValueType<Key>}>}
 */
function getStorage() {
    return getStorageValues(...Object.values(StorageField));
}
exports.getStorage = getStorage;
