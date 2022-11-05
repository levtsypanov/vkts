export class HashParameterHandler {
    static getLocationHash() {
        const locationHash = window.location.hash;

        if (locationHash.includes('#/')) {
            return locationHash.replace('#/','');
        } else {
            return locationHash.replace('#','');
        }

    }

    static getParametersFromHash(string: string) {
        let search = string
        return search === "" ? null : search.split("&").reduce((prev: any, curr: any) => {
            const [key, value] = curr.split("=");
            prev[decodeURIComponent(key)] = decodeURIComponent(value);
            return prev;
        }, {})
    }
}