"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteAPI = void 0;
class RemoteAPI {
    static get(subUrl) {
        return fetch(process.env.REACT_APP_API_URL + subUrl);
    }
    static post(subUrl, body) {
        return fetch(process.env.REACT_APP_API_URL + subUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        });
    }
    static getSearchUrl(searchToken) {
        return `${process.env.REACT_APP_API_URL}/search?query=${searchToken}&advancedSearch=false&from=vk`;
    }
    static openSearchWindow(searchToken) {
        window.open(`${process.env.REACT_APP_API_URL}/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }
}
exports.RemoteAPI = RemoteAPI;
