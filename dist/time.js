"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSeconds = exports.seconds2components = exports.addLeadingZero = void 0;
const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : String(number);
};
exports.addLeadingZero = addLeadingZero;
const seconds2components = (seconds) => {
    let hours = (0, exports.addLeadingZero)(Math.floor(seconds / 3600));
    let mins = (0, exports.addLeadingZero)(Math.floor((seconds - hours * 3600) / 60));
    let secs = (0, exports.addLeadingZero)(seconds - hours * 3600 - mins * 60);
    return {
        hours,
        mins,
        secs,
    };
};
exports.seconds2components = seconds2components;
const formatSeconds = (seconds) => {
    const { hours, mins, secs } = (0, exports.seconds2components)(seconds);
    return `${hours}:${mins}:${secs}`;
};
exports.formatSeconds = formatSeconds;
