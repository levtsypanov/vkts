"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivity_1 = require("@vkontakte/vkui/dist/lib/adaptivity");
const getViewWidthClassName_1 = require("./getViewWidthClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe('getViewWidthClassName', () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no viewWidth", () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base')).toBe('base--viewWidth-none'));
        it('returns desktop className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.DESKTOP)).toBe(`base--viewWidth-desktop base--viewWidth-smallTabletPlus base--viewWidth-tabletPlus`));
        it('returns tablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.TABLET)).toBe(`base--viewWidth-tablet base--viewWidth-smallTabletPlus base--viewWidth-tabletPlus`));
        it('returns smallTablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.SMALL_TABLET)).toBe(`base--viewWidth-smallTablet base--viewWidth-smallTabletPlus`));
        it('returns mobile className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.MOBILE)).toBe(`base--viewWidth-mobile`));
        it('returns smallMobile className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.SMALL_MOBILE)).toBe(`base--viewWidth-smallMobile`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--viewWidth-none': 'some-hash-none',
            'base--viewWidth-desktop': 'some-hash-desktop',
            'base--viewWidth-mobile': 'some-hash-mobile',
            'base--viewWidth-smallMobile': 'some-hash-smallMobile',
            'base--viewWidth-smallTablet': 'some-hash-smallTablet',
            'base--viewWidth-tablet': 'some-hash-tablet',
            'base--viewWidth-smallTabletPlus': 'some-hash-smallTabletPlus',
            'base--viewWidth-tabletPlus': 'some-hash-tabletPlus',
        };
        it("returns 'none' className if there is no viewWidth", () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', undefined, styles)).toBe(styles['base--viewWidth-none']));
        it('returns desktop className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.DESKTOP, styles)).toContain(styles[`base--viewWidth-desktop`]));
        it('returns desktop className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.DESKTOP, styles)).toContain(styles[`base--viewWidth-smallTabletPlus`]));
        it('returns desktop className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.DESKTOP, styles)).toContain(styles[`base--viewWidth-tabletPlus`]));
        it('returns tablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.TABLET, styles)).toContain(styles[`base--viewWidth-tablet`]));
        it('returns tablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.TABLET, styles)).toContain(styles[`base--viewWidth-smallTabletPlus`]));
        it('returns tablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.TABLET, styles)).toContain(styles[`base--viewWidth-tabletPlus`]));
        it('returns smallTablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.SMALL_TABLET, styles)).toContain(styles[`base--viewWidth-smallTablet`]));
        it('returns smallTablet className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.SMALL_TABLET, styles)).toContain(styles[`base--viewWidth-smallTabletPlus`]));
        it('returns mobile className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.MOBILE, styles)).toBe(styles[`base--viewWidth-mobile`]));
        it('returns smallMobile className', () => expect((0, getViewWidthClassName_1.getViewWidthClassName)('base', adaptivity_1.ViewWidth.SMALL_MOBILE, styles)).toBe(styles[`base--viewWidth-smallMobile`]));
    });
});
