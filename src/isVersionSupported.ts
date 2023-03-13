export const isVersionSupported = (selfVersion: string, fromVersion: string): boolean => {
    const selfComponents = selfVersion.split('.');
    const fromComponents = fromVersion.split('.');

    const componentsCount = Math.max(selfComponents.length, fromComponents.length);

    for (let i = 0; i < componentsCount; i++) {
        if (Number(selfComponents[i] ?? 0) > Number(fromComponents[i] ?? 0)) {
            return true;
        }

        if (Number(selfComponents[i] ?? 0) < Number(fromComponents[i] ?? 0)) {
            return false;
        }
    }

    return true;
};
