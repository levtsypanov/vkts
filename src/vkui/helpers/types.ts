/**
 * Public API.
 * Брейкпоинты на ширину.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
export enum ViewWidth {
    SMALL_MOBILE = 1,
    MOBILE,
    SMALL_TABLET,
    TABLET,
    DESKTOP,
};

/**
 * Public API.
 * Брейкпоинт на высоту.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
export enum ViewHeight {
    EXTRA_SMALL = 1,
    SMALL,
    MEDIUM,
};

/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
export type SizeYType = 'compact' | 'regular' | 'none';

export type SizeXType = 'compact' | 'regular' | 'none';