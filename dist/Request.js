"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const Request = (url, params, updatedParams) => new Promise((resolve, reject) => {
    const preparedParams = Object.keys(params).reduce((a, x) => {
        a += `${x}=${updatedParams[x]}&`;
        return a;
    }, "");
    fetch(url + '?' + preparedParams)
        .then((response) => response.json())
        .then((response) => {
        if (!response.response) {
            console.log({
                type: 'error',
                url,
                params,
                response: JSON.stringify(response),
            });
            return reject(response.error);
        }
        return resolve(response.response);
    })
        .catch((e) => reject(e));
});
exports.Request = Request;
