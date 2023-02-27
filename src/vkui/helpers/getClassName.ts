import { PlatformType, platform } from '@vkontakte/vkui/dist/lib/platform';

export function getClassName(base: string, osname: PlatformType = platform()): string {
  return `${base} ${base}--${osname}`;
}