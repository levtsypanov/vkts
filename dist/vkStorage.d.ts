/**
 * Список полей, которые могут храниться в хранилище bridge.
 */
export declare enum StorageField {
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
export interface StorageValuesMap {
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
export type StorageValueType<T extends StorageField> = StorageValuesMap[T];
/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {StorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export declare function setStorageValue<F extends StorageField>(field: F, value: StorageValueType<F>): Promise<void>;
/**
 * То же самое что setStorageValue только сразу для нескольких значений.
 * @param {Partial<StorageValuesMap>} values
 * @returns {Promise<void>}
 */
export declare function setStorageValues(values: Partial<StorageValuesMap>): Promise<void>;
/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: StorageValueType<Key>}>}
 */
export declare function getStorageValues<F extends StorageField>(...fields: F[]): Promise<{
    [Key in F]?: StorageValueType<Key>;
}>;
/**
 * Удаляет значения из хранилища.
 * @param {StorageField} fields
 * @returns {Promise<void>}
 */
export declare function dropStorageValues(...fields: StorageField[]): Promise<void>;
/**
 * Полностью удаляет все значения из хранилища
 * @returns {Promise<void>}
 */
export declare function dropStorage(): Promise<void>;
/**
 * Возвращает хранилище
 * @returns {Promise<{[Key in any]?: StorageValueType<Key>}>}
 */
export declare function getStorage(): Promise<{
    "application-visited"?: boolean | undefined;
    "onboarding-completed"?: boolean | undefined;
    "todo-tooltip-seen"?: boolean | undefined;
    "main-tooltip-seen"?: boolean | undefined;
    "asked-notificatiions"?: boolean | undefined;
    "is-working-with-notify-via-backend"?: boolean | undefined;
}>;
