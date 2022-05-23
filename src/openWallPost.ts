import vkBridge from '@vkontakte/vk-bridge';

export function openWallPost(ownerId: number, postId: number, isDesktop: any) {
  Promise.resolve()
    .then(() => {
      return vkBridge.supports('VKWebAppOpenWallPost') || isDesktop
        ? vkBridge.send('VKWebAppOpenWallPost' as any, { owner_id: ownerId, post_id: postId })
        : Promise.reject();
    })
    .catch(() => {
      const href = `https://${isDesktop ? '' : 'm.'}vk.com/wall${ownerId}_${postId}`;
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.setAttribute('target', '_blank');
      link.click();
    });
}
