import vkBridge from '@vkontakte/vk-bridge';

const cache: { [groupIds: string]: Promise<string[]> } = {};

export function getVkGroupScreenNames(vkGroupIds: number[], accessToken: string): Promise<string[]> {
  const groupIds = vkGroupIds.join(',');

  if (groupIds in cache) {
    return cache[groupIds];
  }

  cache[groupIds] = vkBridge
    .send('VKWebAppCallAPIMethod', {
      method: 'groups.getById',
      params: { group_ids: groupIds, v: '5.126', access_token: accessToken },
    })
    .then((data) => data.response.map((group: any) => group.screen_name))
    .catch(() => vkGroupIds.map((vkGroupId) => `club${vkGroupId}`));

  return cache[groupIds];
}
