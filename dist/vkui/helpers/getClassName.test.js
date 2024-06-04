"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getClassName_1 = require("./getClassName");
describe(getClassName_1.getClassName, () => {
    it('embeds platform name', () => expect((0, getClassName_1.getClassName)('base', 'ios')).toBe('base base--ios'));
});
