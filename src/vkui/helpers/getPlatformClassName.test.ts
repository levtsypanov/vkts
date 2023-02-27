import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { getPlatformClassName } from './getPlatformClassName';

/**
 * Note: VKUI оказалось от использования динамических вычислений свойств на мапы, но мы продолжаем их поддержку в частичной форме.
 */
describe(getPlatformClassName, () => {
  describe('without `styles` argument', () => {
    it('return platform name', () =>
      expect(getPlatformClassName('base', Platform.IOS)).toBe('base--ios'));
  });

  describe('with `styles` argument', () => {
    const styles = {
      'base': 'some-hash',
      'base--ios': 'some-hash-ios',
      'base--android': 'some-hash-android',
      'base--vkcom': 'some-hash-vkcom',
    };
    it('return platform name', () =>
      expect(getPlatformClassName('base', Platform.IOS, styles)).toBe(styles['base--ios']));
  });
});