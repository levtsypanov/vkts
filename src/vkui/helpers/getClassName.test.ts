import { getClassName } from './getClassName';

describe(getClassName, () => {
  it('embeds platform name', () =>
    expect(getClassName('base', 'ios')).toBe('base base--ios'));
});