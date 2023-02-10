import bridge from '@vkontakte/vk-bridge';
import {
  FriendsGetParams,
  FriendsGetResponse,
  GroupsGetByIdParams,
  GroupsGetByIdResponse,
  GroupsGetParams,
  GroupsGetResponse,
  NewsfeedAddBanParams,
  NewsfeedAddBanResponse,
  NewsfeedDeleteBanParams, NewsfeedDeleteBanResponse,
  NewsfeedDeleteListParams,
  NewsfeedDeleteListResponse,
  NewsfeedGetBannedParams,
  NewsfeedGetBannedResponse,
  NewsfeedGetListsExtendedResponse,
  NewsfeedGetListsParams,
  NewsfeedSaveListParams,
  NewsfeedSaveListResponse,
  UsersGetParams,
  UsersGetResponse,
  UsersGetSubscriptionsParams,
  UsersGetSubscriptionsResponse,
} from '@vkontakte/api-schema-typescript';
import { useEffect } from 'react';

export interface ApiSchema {
  'users.getSubscriptions': { params: UsersGetSubscriptionsParams, response: UsersGetSubscriptionsResponse } ,
  'newsfeed.getBanned': { params: NewsfeedGetBannedParams, response: NewsfeedGetBannedResponse },
  'users.get': { params: UsersGetParams, response: UsersGetResponse },
  'groups.get': { params: GroupsGetParams, response: GroupsGetResponse },
  'groups.getById': { params: GroupsGetByIdParams, response: GroupsGetByIdResponse },
  'friends.get': { params: FriendsGetParams, response: FriendsGetResponse },
  'newsfeed.addBan': { params: NewsfeedAddBanParams, response: NewsfeedAddBanResponse },
  'newsfeed.deleteBan': { params: NewsfeedDeleteBanParams, response: NewsfeedDeleteBanResponse },
  'newsfeed.deleteList': { params: NewsfeedDeleteListParams, response: NewsfeedDeleteListResponse },
  'newsfeed.saveList': { params: NewsfeedSaveListParams, response: NewsfeedSaveListResponse },
  'newsfeed.getLists': { params: NewsfeedGetListsParams, response: NewsfeedGetListsExtendedResponse },
}

export type CallApiMethod = <T extends keyof ApiSchema = keyof ApiSchema,>(method: T, data: ApiSchema[T]['params']) => Promise<ApiSchema[T]['response']>;

const queue: (() => void)[] = [];


export const useApi = (token: string, version: string): CallApiMethod => {
  const rand = () => Math.random().toString(32).substring(2);

  useEffect(() => {
    const timer = setInterval(() => {
      const task = queue.shift();
      if (task) {
        task();
      }
    }, 334);

    return () => clearInterval(timer);
  }, []);

  const callApi: CallApiMethod = (method, data) => {
    const request_id = rand() + rand();

    return bridge.send('VKWebAppCallAPIMethod', {
      params: {
        access_token: token,
        v: version,
        ...(data as any || {}),
      },
      request_id: request_id,
      method: String(method),
    }).then(({ response }) => {
      return response;
    });
  }

  const pushQueue: CallApiMethod = (method, data) => {
    return new Promise<any>((resolve, reject) => {
      queue.push(() => callApi(method, data).then(resolve, reject));
    }).catch((reason) => {
      const api_error_code = reason?.error_data?.error_reason?.error_code;
      if (api_error_code === 6) {
        return pushQueue(method, data);
      }

      throw reason;
    });
  };

  return pushQueue;
}