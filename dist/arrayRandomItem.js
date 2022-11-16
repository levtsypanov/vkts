"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayRandomItem = void 0;
const randomNumber_1 = require("./randomNumber");
function arrayRandomItem(array) {
    return array[(0, randomNumber_1.randomNumber)(0, array.length)];
}
exports.arrayRandomItem = arrayRandomItem;
