import { Insets } from '@vkontakte/vk-bridge';

/**
 * Returns device insets
 */
export function getInsets(): Insets {
  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top')),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom')),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left')),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right')),
  };
}
