/**
 * Public API.
 * Брейкпоинты на ширину.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
export declare enum ViewWidth {
    SMALL_MOBILE = 1,
    MOBILE = 2,
    SMALL_TABLET = 3,
    TABLET = 4,
    DESKTOP = 5
}
/**
 * Public API.
 * Брейкпоинт на высоту.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
export declare enum ViewHeight {
    EXTRA_SMALL = 1,
    SMALL = 2,
    MEDIUM = 3
}
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
export type SizeYType = 'compact' | 'regular' | 'none';
export type SizeXType = 'compact' | 'regular' | 'none';
