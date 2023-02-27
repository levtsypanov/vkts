"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivity_1 = require("@vkontakte/vkui/dist/lib/adaptivity");
const getSizeYClassName_1 = require("./getSizeYClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe('getSizeYClassName', () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no sizeY", () => expect((0, getSizeYClassName_1.getSizeYClassName)('base')).toBe('base--sizeY-none'));
        it('returns className with actual sizeY if there is sizeY', () => expect((0, getSizeYClassName_1.getSizeYClassName)('base', adaptivity_1.SizeType.COMPACT)).toBe(`base--sizeY-${adaptivity_1.SizeType.COMPACT}`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--sizeY-none': 'some-hash-none',
            [`base--sizeY-${adaptivity_1.SizeType.REGULAR}`]: 'some-hash-regular',
            [`base--sizeY-${adaptivity_1.SizeType.COMPACT}`]: 'some-hash-compact',
        };
        it("returns 'none' className if there is no sizeY", () => expect((0, getSizeYClassName_1.getSizeYClassName)('base', undefined, styles)).toBe(styles['base--sizeY-none']));
        it('returns className with actual sizeY if there is sizeY', () => expect((0, getSizeYClassName_1.getSizeYClassName)('base', adaptivity_1.SizeType.COMPACT, styles)).toBe(styles[`base--sizeY-${adaptivity_1.SizeType.COMPACT}`]));
    });
});
