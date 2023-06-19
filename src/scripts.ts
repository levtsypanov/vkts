export function loadScript(src: string, waitLoading = false): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
        const js = document.createElement('script');
        js.src = src;

        if (waitLoading) js.onload = () => resolve();
        js.onerror = () => reject(new Error("Failed to load script " + src));

        document.head.appendChild(js);
        if (!waitLoading) resolve();
    });
}

export function loadStyle(src: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    document.head.appendChild(link);
}
