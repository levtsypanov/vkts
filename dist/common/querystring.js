"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectString = exports.querystring = void 0;
exports.querystring = {
    parse: (string = '') => {
        if (typeof string !== 'string')
            return {};
        const matches = /\?(.+)$/ig.exec(string);
        const str = matches ? matches[1] : string;
        return str
            .split('&')
            .reduce((acc, item) => {
            const param = item.split('=');
            if (param[1]) {
                acc[param[0]] = decodeURIComponent(param[1]);
            }
            return acc;
        }, {});
    },
    create: (data = {}, opts) => {
        if (typeof data !== 'object' || data === null)
            return '';
        let options = { encode: true, ...opts };
        return Object.keys(data).reduce((acc, item) => {
            const type = typeof data[item];
            if (type === 'string' || type === 'number' || type === 'boolean') {
                acc.push(item + '=' + (options.encode ? encodeURIComponent(data[item]) : data[item]));
            }
            if (Array.isArray(data[item])) {
                data[item].forEach(value => {
                    acc.push(item + '[]=' + (options.encode ? encodeURIComponent(value) : value));
                });
            }
            return acc;
        }, []).join('&');
    }
};
function create(data) {
    return Object.keys(data).reduce((acc, key) => {
        const item = data[key];
        const type = typeof item;
        if (type === 'string' || type === 'number' || type === 'boolean') {
            acc.push(`${key}=${encodeURIComponent(item)}`);
        }
        if (Array.isArray(item)) {
            item.forEach((value) => {
                acc.push(`${key}[]=${value}`);
            });
        }
        return acc;
    }, []).join('&');
}
function parse(string) {
    if (typeof string !== 'string') {
        return {};
    }
    return string.split('&')
        .reduce((acc, item) => {
        const [key, value] = item.split('=');
        if (value !== undefined) {
            acc[key] = decodeURIComponent(value);
        }
        return acc;
    }, {});
}
exports.ObjectString = { create, parse };
