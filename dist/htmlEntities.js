"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHTMLEntities = exports.encodeHTMLEntities = exports.outOfBoundsChar = exports.unescape = exports.escape = void 0;
/* eslint-disable @typescript-eslint/quotes */
const codepoints_1 = require("./libs/codepoints");
const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
};
const unescapeMap = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
};
const namedEntities = [
    ['&amp;', '&'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&quot;', '"'],
    ['&apos;', `'`],
];
const ESCAPE_REGEX = /[&<>'"]/g;
/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
function escape(input) {
    if (input == null) {
        return '';
    }
    return input.replace(ESCAPE_REGEX, (entity) => {
        return escapeMap[entity];
    });
}
exports.escape = escape;
const UNESCAPE_REGEX = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
/**
 * Unescape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
function unescape(input) {
    if (input == null) {
        return '';
    }
    return input.replace(UNESCAPE_REGEX, (entity) => {
        return unescapeMap[entity];
    });
}
exports.unescape = unescape;
exports.outOfBoundsChar = String.fromCharCode(65533);
const ENCODE_REGEX = /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
function encodeHTMLEntities(input) {
    if (input == null) {
        return '';
    }
    return input.replace(ENCODE_REGEX, (entity) => {
        const code = entity.length > 1 ? (0, codepoints_1.getCodePointAt)(entity, 0) : entity.charCodeAt(0);
        return '&#' + String(code) + ';';
    });
}
exports.encodeHTMLEntities = encodeHTMLEntities;
const DECODE_REGEX = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
function decodeHTMLEntities(input) {
    if (input == null) {
        return '';
    }
    input = namedEntities.reduce((result, [mask, char]) => result.replace(new RegExp(mask, 'ig'), char), input);
    return input.replace(DECODE_REGEX, (entity) => {
        if (entity[0] === '&' && entity[1] === '#') {
            const secondChar = entity[2];
            const code = secondChar === 'x' || secondChar === 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            if (code >= 0x10ffff) {
                return exports.outOfBoundsChar;
            }
            if (code > 65535) {
                return (0, codepoints_1.fromCodePoint)(code);
            }
            return String.fromCharCode(codepoints_1.numericUnicodeMap[code] || code);
        }
        return entity;
    });
}
exports.decodeHTMLEntities = decodeHTMLEntities;
