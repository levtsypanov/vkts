export function makeUrl(url: string, params: any) {
    const paramsString = makeParams(params);
    const hasQuery = url.includes('?');

    url = url + (hasQuery ? '&' : '?') + paramsString;

    return url;
}

export function makeParams(params: any): string {
    const pairs = Object.keys(params).map((key) => {
        let param = params[key];
        key = encodeURIComponent(key);
        param = encodeURIComponent(param);

        return `${key}=${param}`;
    });

    return pairs.join('&');
}

export function request(url: string, params: any) {
    const paramsString = makeParams(params);

    return fetch(url, {
        method: 'POST',
        body: paramsString,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => res.json());
}
