/**
* Lib VK StatEvents
*/
export { createStatEventsInstance } from './StatEvents/StatEvents';
export { StatEventType, StatEventData, StatEventsInstance } from './StatEvents/types';
/**
* Lib VK VkClient
*/
export { createVkClientInstance } from './VkClient/VkClient';
export { VkClientType, VkClientData, VkClientInstance } from './VkClient/types';
/**
* Lib VK Cloud Solutions
*/
/**
* Lib VKUI Lang Tools
*/
export { default as Backend } from './vkui-lang-tools/backendModule';
export { validateBackendOptions } from './vkui-lang-tools/backendModule';
export { BackendFallback, BackendOptions } from './vkui-lang-tools/backendModule';
export { default as Detection } from './vkui-lang-tools/backendModule';
export { validateDetectionOptions } from './vkui-lang-tools/detectionModule';
export { DetectionOptions } from './vkui-lang-tools/detectionModule';
export { arrify } from './vkui-lang-tools/utils/misc';
export { formatResourceLanguage } from './vkui-lang-tools/utils/resourceLanguage';
export { RawResourceLanguage, LanguageNamespace } from './vkui-lang-tools/utils/resourceLanguage';
export { getLaunchParamsVkLanguage } from './vkui-lang-tools/utils/vkLanguage';
export type { VkLanguage } from './vkui-lang-tools/utils/vkLanguage';
