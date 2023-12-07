"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequestDefault = exports.axiosRequestConfig = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axiosRequestConfig = { baseURL: '' }; // Изменили тип на {baseURL: string}
exports.axiosRequestDefault = axios_1.default.create(exports.axiosRequestConfig);
