"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appearance_1 = require("./appearance");
describe('deriveAppearance', () => {
    it("Returns 'light' if scheme is undefined", () => {
        expect((0, appearance_1.deriveAppearance)(undefined)).toEqual('light');
    });
    it("Returns 'light' if scheme is 'bright_light'", () => {
        expect((0, appearance_1.deriveAppearance)(appearance_1.Scheme.BRIGHT_LIGHT)).toEqual('light');
    });
    it("Returns 'light' if scheme is 'vkcom_light'", () => {
        expect((0, appearance_1.deriveAppearance)(appearance_1.Scheme.VKCOM_LIGHT)).toEqual('light');
    });
    it("Returns 'dark' if scheme is 'space_gray'", () => {
        expect((0, appearance_1.deriveAppearance)(appearance_1.Scheme.SPACE_GRAY)).toEqual('dark');
    });
    it("Returns 'dark' if scheme is 'vkcom_dark'", () => {
        expect((0, appearance_1.deriveAppearance)(appearance_1.Scheme.VKCOM_DARK)).toEqual('dark');
    });
});
