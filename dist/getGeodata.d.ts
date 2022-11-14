export declare type GetGeodataResult = {
    permission: 'available';
    lat: number;
    long: number;
} | {
    permission: 'prompt';
} | {
    permission: 'denied';
};
/**
 * Обертка над VKWebAppGetGeodata, позволяет различать запрет и отказ предоставления доступа к геолокации
 * @param isNativeClient флаг нативного приложения, нужен для правильной обработки исключения
 */
export declare function getGeodata(isNativeClient: boolean): Promise<GetGeodataResult>;
