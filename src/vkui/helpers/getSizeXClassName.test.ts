import { SizeType } from '@vkontakte/vkui/dist/lib/adaptivity';
import { getSizeXClassName } from './getSizeXClassName';

/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe('getSizeXClassName', () => {
  describe('without `styles` argument', () => {
    it("returns 'none' className if there is no sizeX", () =>
      expect(getSizeXClassName('base')).toBe('base--sizeX-none'));

    it('returns className with actual sizeX if there is sizeX', () =>
      expect(getSizeXClassName('base', SizeType.COMPACT)).toBe(
        `base--sizeX-${SizeType.COMPACT}`
      ));
  });

  describe('with `styles` argument', () => {
    const styles = {
      'base': 'some-hash',
      'base--sizeX-none': 'some-hash-none',
      [`base--sizeX-${SizeType.REGULAR}` as const]: 'some-hash-regular',
      [`base--sizeX-${SizeType.COMPACT}` as const]: 'some-hash-compact',
    };

    it("returns 'none' className if there is no sizeX", () =>
      expect(getSizeXClassName('base', undefined, styles)).toBe(styles['base--sizeX-none']));

    it("returns className with actual sizeX if there is sizeX", () =>
      expect(getSizeXClassName('base', SizeType.COMPACT, styles)).toBe(
        styles[`base--sizeX-${SizeType.COMPACT}`]
      ));
  });
});