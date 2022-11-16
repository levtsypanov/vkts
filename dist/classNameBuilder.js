"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classNameBuilder = void 0;
function classNameBuilder(...classnames) {
    const result = [];
    for (let i = 0; i < classnames.length; i++) {
        const item = classnames[i];
        if (!item) {
            continue;
        }
        switch (typeof item) {
            case 'string':
                result.push(item);
                break;
            case 'object':
                for (const key in item) {
                    if (item[key]) {
                        result.push(key);
                    }
                }
                break;
            default:
                result.push(String(item));
        }
    }
    return result.join(' ');
}
exports.classNameBuilder = classNameBuilder;
