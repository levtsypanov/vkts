interface OpenApplicationOptions {
    groupId?: number;
    hash?: string;
    mVk?: boolean;
}

export const openApplication = (appId: number, options: OpenApplicationOptions = {}) => {
    const { groupId, hash, mVk } = options;
    const href = `https://${mVk ? 'm.' : ''}vk.com/app${appId}${groupId ? '_-' + groupId : ''}${hash ? '#' + hash : ''}`;
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('target', '_parent');
    link.click();
};
