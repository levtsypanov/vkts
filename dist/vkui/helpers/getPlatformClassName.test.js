"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPlatformClassName_1 = require("./getPlatformClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe(getPlatformClassName_1.getPlatformClassName, () => {
    describe('without `styles` argument', () => {
        it('return platform name', () => expect((0, getPlatformClassName_1.getPlatformClassName)('base', 'ios')).toBe('base--ios'));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--ios': 'some-hash-ios',
            'base--android': 'some-hash-android',
            'base--vkcom': 'some-hash-vkcom',
        };
        it('return platform name', () => expect((0, getPlatformClassName_1.getPlatformClassName)('base', 'ios', styles)).toBe(styles['base--ios']));
    });
});
