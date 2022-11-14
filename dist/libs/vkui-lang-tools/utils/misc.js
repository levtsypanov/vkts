"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrify = void 0;
const arrify = (data) => (Array.isArray(data) ? data : [data]);
exports.arrify = arrify;
