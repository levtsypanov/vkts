"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireEvent = void 0;
const FireEvent = (link) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.dispatchEvent(new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
};
exports.FireEvent = FireEvent;
