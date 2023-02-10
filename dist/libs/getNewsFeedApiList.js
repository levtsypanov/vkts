"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiList = void 0;
const getApiList = async (callApi, method, data, count, maxOffset) => {
    const getBatch = (offset, count) => callApi(method, { ...data, offset, count });
    let list = [];
    let offset = 0;
    while (offset < maxOffset) {
        const batch = await getBatch(offset, count);
        offset += count;
        if (typeof batch !== 'object' || !Array.isArray(batch.items)) {
            break;
        }
        list = list.concat(batch.items);
        if (batch.count < offset) {
            break;
        }
    }
    return list;
};
exports.getApiList = getApiList;
