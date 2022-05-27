let domain: any = null;

const scripts = document.getElementsByTagName("script");
for (let i = 0; i < scripts.length; i++) {
    const scriptSrc = scripts[i].src;
    if (scriptSrc.includes("/env.js")) {
        domain = new URL(scriptSrc).host;
    }
}

export function i(url: string) {
    if (domain) return url[0] === "/" ? `https://${domain}${url}` : `https://${domain}/${url}`;
    else return url;
}

export function getLargestVkPhoto(sizes: any) {
    const res = sizes.sort(({ a, b }: any) => (a.width < b.width ? 1 : -1));
    return res[0];
}

export function getImage300Width(sizes = []) {
    const yPhoto = sizes.find((image: any) => image.type === "y");
    const xPhoto = sizes.find((image: any) => image.type === "x");
    return yPhoto || xPhoto || sizes[0];
}
