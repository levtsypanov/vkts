"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = void 0;
function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
exports.randomNumber = randomNumber;
