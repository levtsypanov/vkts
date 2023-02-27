"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMouseClassName_1 = require("./getMouseClassName");
/**
 * @deprecated Устарел в версии 5.0.0 будет удален, используйте getPointerClassName()
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe(getMouseClassName_1.getMouseClassName, () => {
    describe('without `styles` argument', () => {
        it("returns 'none' className if there is no mouse", () => expect((0, getMouseClassName_1.getMouseClassName)('base')).toBe('base--mouse-none'));
        it("returns className with 'has' if mouse is true", () => expect((0, getMouseClassName_1.getMouseClassName)('base', true)).toBe(`base--mouse-has`));
        it("returns className with 'has-not' if mouse is false", () => expect((0, getMouseClassName_1.getMouseClassName)('base', false)).toBe(`base--mouse-has-not`));
    });
    describe('with `styles` argument', () => {
        const styles = {
            'base': 'some-hash',
            'base--mouse-none': 'some-hash-none',
            'base--mouse-has': 'some-hash-has',
            'base--mouse-has-not': 'some-hash-has-not',
        };
        it("returns 'none' className if there is no mouse", () => expect((0, getMouseClassName_1.getMouseClassName)('base', undefined, styles)).toBe(styles['base--mouse-none']));
        it("returns className with 'has' if mouse is true", () => expect((0, getMouseClassName_1.getMouseClassName)('base', true, styles)).toBe(styles['base--mouse-has']));
        it("returns className with 'has-not' if mouse is false", () => expect((0, getMouseClassName_1.getMouseClassName)('base', false, styles)).toBe(styles['base--mouse-has-not']));
    });
});
