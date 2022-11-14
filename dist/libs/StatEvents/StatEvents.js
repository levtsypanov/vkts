"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatEventsInstance = void 0;
function sendStatEvents(events, params) {
    params
        .callVkMethod('statEvents.addMiniApps', {
        events: JSON.stringify(events.map(({ event, type, payload, timestamp }) => ({
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
        }))),
    })
        .catch((e) => {
        console.warn('[sendStatEvents error]', e);
    });
}
const BATCH_INTERVAL_DEFAULT = 3000;
function createStatEventsInstance(events, params, options = {}) {
    const { batchInterval = BATCH_INTERVAL_DEFAULT } = options;
    const eventsQueue = [];
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
exports.createStatEventsInstance = createStatEventsInstance;
