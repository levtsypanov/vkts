export enum StatEventType {
  Navgo = 'type_navgo',
  View = 'type_view',
  Click = 'type_click',
}

export type StatEventData = {
  payload?: Record<string, any>;
  type: StatEventType;
};

export interface StatEventsInstance<T extends Record<string, StatEventData>> {
  send<K extends keyof T>(event: K, payload: T[K]['payload']): void;
  push<K extends keyof T>(event: K, payload: T[K]['payload']): void;

  destroy(): void;
}
