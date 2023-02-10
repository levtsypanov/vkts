
import { ApiSchema, CallApiMethod } from '../hooks/useApiNewsFeed';

type ExtendableMethods = Pick<ApiSchema, 'groups.get' | 'friends.get'>

export type GetApiList = <T extends keyof ExtendableMethods = keyof ExtendableMethods>(
  callApi: CallApiMethod,
  method: T, data: ApiSchema[T]['params'],
  count: number,
  maxOffset: number,
) => Promise<ApiSchema[T]['response']['items']>;

export const getApiList: GetApiList = async (callApi, method, data, count, maxOffset) => {
  const getBatch = (offset: number, count: number) => callApi(method, { ...data, offset, count });
  let list: any[] = [];
  let offset = 0;

  while (offset < maxOffset) {
    const batch = await getBatch(offset, count);
    offset += count;

    if (typeof batch !== 'object' || !Array.isArray(batch.items)) {
      break;
    }

    list = list.concat(batch.items as any[]);
    if (batch.count < offset) {
      break;
    }
  }

  return list;
}
