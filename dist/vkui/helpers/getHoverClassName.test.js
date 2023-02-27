"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHoverClassName_1 = require("./getHoverClassName");
/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe(getHoverClassName_1.getHoverClassName, () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no hover", () => expect((0, getHoverClassName_1.getHoverClassName)('base')).toBe('base--hover-none'));
        it("returns className with 'has' if hover is true", () => expect((0, getHoverClassName_1.getHoverClassName)('base', true)).toBe(`base--hover-has`));
        it("returns className with 'has-not' if hover is false", () => expect((0, getHoverClassName_1.getHoverClassName)('base', false)).toBe(`base--hover-has-not`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            base: 'some-hash',
            'base--hover-none': 'some-hash-none',
            'base--hover-has': 'some-hash-has',
            'base--hover-has-not': 'some-hash-has-not',
        };
        it("returns 'none' className if there is no hover", () => expect((0, getHoverClassName_1.getHoverClassName)('base', undefined, styles)).toBe(styles['base--hover-none']));
        it("returns className with 'has' if hover is true", () => expect((0, getHoverClassName_1.getHoverClassName)('base', true, styles)).toBe(styles['base--hover-has']));
        it("returns className with 'has-not' if hover is false", () => expect((0, getHoverClassName_1.getHoverClassName)('base', false, styles)).toBe(styles['base--hover-has-not']));
    });
});
