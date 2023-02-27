"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivity_1 = require("@vkontakte/vkui/dist/lib/adaptivity");
const getViewHeightClassName_1 = require("./getViewHeightClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe('getViewHeightClassName', () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no viewHeight", () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base')).toBe('base--viewHeight-none'));
        it('returns desktop className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.EXTRA_SMALL)).toBe(`base--viewHeight-extraSmall`));
        it('returns mobile className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.MEDIUM)).toBe(`base--viewHeight-medium`));
        it('returns smallMobile className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.SMALL)).toBe(`base--viewHeight-small`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--viewHeight-none': 'some-hash-none',
            'base--viewHeight-extraSmall': 'some-hash-desktop',
            'base--viewHeight-medium': 'some-hash-mobile',
            'base--viewHeight-small': 'some-hash-smallMobile',
        };
        it("returns 'none' className if there is no viewHeight", () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', undefined, styles)).toBe(styles['base--viewHeight-none']));
        it('returns desktop className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.EXTRA_SMALL, styles)).toBe(styles[`base--viewHeight-extraSmall`]));
        it('returns mobile className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.MEDIUM, styles)).toBe(styles[`base--viewHeight-medium`]));
        it('returns smallMobile className', () => expect((0, getViewHeightClassName_1.getViewHeightClassName)('base', adaptivity_1.ViewHeight.SMALL, styles)).toBe(styles[`base--viewHeight-small`]));
    });
});
