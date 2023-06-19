"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = exports.fixTypography = void 0;
// Перенос предлогов
const fixTypography = (string, wordLength = 3) => {
    if (!string)
        return;
    let strSplit = string.split(" "); // разбиваем строку на массив
    strSplit = strSplit.map((str) => (str.length <= wordLength ? str + "\u00A0" : str + " ")); // если слово 3 символа, вставляем символ пробела
    strSplit = strSplit.join(""); // возвращаем обратно массив в строку
    return strSplit;
};
exports.fixTypography = fixTypography;
// pluralize(21, ['пользователь', 'пользователя', 'пользователей'])
function pluralize(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
exports.pluralize = pluralize;
