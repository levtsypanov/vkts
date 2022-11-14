import { TapticNotificationType } from '@vkontakte/vk-bridge';
/**
 * Посылает тактильное уведомление если оно поддерживается
 * @param {TapticNotificationType} type
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export declare function tapticNotification(type: TapticNotificationType): Promise<{
    result: true;
} | undefined>;
/**
 * Посылает тактильное уведомление об изменении если оно поддерживается
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export declare function tapticSelectionChanged(): Promise<{
    result: true;
} | undefined>;
