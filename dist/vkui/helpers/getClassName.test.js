"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_1 = require("@vkontakte/vkui/dist/lib/platform");
const getClassName_1 = require("./getClassName");
describe(getClassName_1.getClassName, () => {
    it('embeds platform name', () => expect((0, getClassName_1.getClassName)('base', platform_1.Platform.IOS)).toBe('base base--ios'));
});
