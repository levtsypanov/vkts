import { FriendsGetParams, FriendsGetResponse, GroupsGetByIdParams, GroupsGetByIdResponse, GroupsGetParams, GroupsGetResponse, NewsfeedAddBanParams, NewsfeedAddBanResponse, NewsfeedDeleteBanParams, NewsfeedDeleteBanResponse, NewsfeedDeleteListParams, NewsfeedDeleteListResponse, NewsfeedGetBannedParams, NewsfeedGetBannedResponse, NewsfeedGetListsExtendedResponse, NewsfeedGetListsParams, NewsfeedSaveListParams, NewsfeedSaveListResponse, UsersGetParams, UsersGetResponse, UsersGetSubscriptionsParams, UsersGetSubscriptionsResponse } from '@vkontakte/api-schema-typescript';
export interface ApiSchema {
    'users.getSubscriptions': {
        params: UsersGetSubscriptionsParams;
        response: UsersGetSubscriptionsResponse;
    };
    'newsfeed.getBanned': {
        params: NewsfeedGetBannedParams;
        response: NewsfeedGetBannedResponse;
    };
    'users.get': {
        params: UsersGetParams;
        response: UsersGetResponse;
    };
    'groups.get': {
        params: GroupsGetParams;
        response: GroupsGetResponse;
    };
    'groups.getById': {
        params: GroupsGetByIdParams;
        response: GroupsGetByIdResponse;
    };
    'friends.get': {
        params: FriendsGetParams;
        response: FriendsGetResponse;
    };
    'newsfeed.addBan': {
        params: NewsfeedAddBanParams;
        response: NewsfeedAddBanResponse;
    };
    'newsfeed.deleteBan': {
        params: NewsfeedDeleteBanParams;
        response: NewsfeedDeleteBanResponse;
    };
    'newsfeed.deleteList': {
        params: NewsfeedDeleteListParams;
        response: NewsfeedDeleteListResponse;
    };
    'newsfeed.saveList': {
        params: NewsfeedSaveListParams;
        response: NewsfeedSaveListResponse;
    };
    'newsfeed.getLists': {
        params: NewsfeedGetListsParams;
        response: NewsfeedGetListsExtendedResponse;
    };
}
export declare type CallApiMethod = <T extends keyof ApiSchema = keyof ApiSchema>(method: T, data: ApiSchema[T]['params']) => Promise<ApiSchema[T]['response']>;
export declare const useApi: (token: string, version: string) => CallApiMethod;
