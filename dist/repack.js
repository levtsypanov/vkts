"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repackAndDownload = exports.BINARY_URL = void 0;
const jszip_1 = __importDefault(require("jszip"));
exports.BINARY_URL = "./users.bin";
async function repackAndDownload(users) {
    const usersAsset = JSON.stringify(users);
    const zip = new jszip_1.default();
    const binary = await fetch(await exports.BINARY_URL);
    const buffer = await binary.arrayBuffer();
    await zip.loadAsync(buffer);
    zip.file("assets/users.json", usersAsset);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); // Or maybe get it from the current document
    link.href = url;
    link.download = "users.bin";
    link.click();
}
exports.repackAndDownload = repackAndDownload;
