"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivity_1 = require("@vkontakte/vkui/dist/lib/adaptivity");
const getSizeXClassName_1 = require("./getSizeXClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe('getSizeXClassName', () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no sizeX", () => expect((0, getSizeXClassName_1.getSizeXClassName)('base')).toBe('base--sizeX-none'));
        it('returns className with actual sizeX if there is sizeX', () => expect((0, getSizeXClassName_1.getSizeXClassName)('base', adaptivity_1.SizeType.COMPACT)).toBe(`base--sizeX-${adaptivity_1.SizeType.COMPACT}`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--sizeX-none': 'some-hash-none',
            [`base--sizeX-${adaptivity_1.SizeType.REGULAR}`]: 'some-hash-regular',
            [`base--sizeX-${adaptivity_1.SizeType.COMPACT}`]: 'some-hash-compact',
        };
        it("returns 'none' className if there is no sizeX", () => expect((0, getSizeXClassName_1.getSizeXClassName)('base', undefined, styles)).toBe(styles['base--sizeX-none']));
        it("returns className with actual sizeX if there is sizeX", () => expect((0, getSizeXClassName_1.getSizeXClassName)('base', adaptivity_1.SizeType.COMPACT, styles)).toBe(styles[`base--sizeX-${adaptivity_1.SizeType.COMPACT}`]));
    });
});
