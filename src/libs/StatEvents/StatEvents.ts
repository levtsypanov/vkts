import { StatEventData, StatEventsInstance } from './types';

interface QueueEvent extends StatEventData {
  event: string;
  timestamp: number;
}

function sendStatEvents(events: QueueEvent[], params: StatEventsParams) {
  params
    .callVkMethod('statEvents.addMiniApps', {
      events: JSON.stringify(
        events.map(({ event, type, payload, timestamp }) => ({
          user_id: params.userId,
          mini_app_id: params.appId,
          type,
          [type]: {
            type: 'type_mini_app_custom_event_item',
          },
          url: params.url,
          vk_platform: params.platform,
          event,
          json: JSON.stringify(payload || ''),
          timestamp,
        }))
      ),
    })
    .catch((e) => {
      console.warn('[sendStatEvents error]', e);
    });
}

interface StatEventsParams {
  appId: number;
  userId: number;
  platform: string;
  url: string;
  callVkMethod(method: string, params: object): Promise<void>;
}

interface StatEventOptions {
  batchInterval?: number;
}

const BATCH_INTERVAL_DEFAULT = 3000;

export function createStatEventsInstance<T extends Record<string, StatEventData>>(
  events: T,
  params: StatEventsParams,
  options: StatEventOptions = {}
): StatEventsInstance<T> {
  const { batchInterval = BATCH_INTERVAL_DEFAULT } = options;

  const eventsQueue: QueueEvent[] = [];

  const intervalId = setInterval(() => {
    if (eventsQueue.length > 0) {
      sendStatEvents(eventsQueue, params);
      eventsQueue.length = 0;
    }
  }, batchInterval);

  return {
    push(event, payload) {
      eventsQueue.push({ event: String(event), type: events[event].type, payload, timestamp: Date.now() });
    },
    send(event, payload) {
      sendStatEvents([{ event: String(event), type: events[event].type, payload, timestamp: Date.now() }], params);
    },
    destroy() {
      clearInterval(intervalId);
    },
  };
}
