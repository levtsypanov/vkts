"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesHelper = void 0;
const plural_1 = __importDefault(require("./Plural/plural"));
/**
 * Библиотека для преобразования и форматирования размеров файлов и папок.
 */
const bounds = [
    1024,
    1024 ** 2,
    1024 ** 3,
    1024 ** 4,
    1024 ** 5, // 'ПБ'
];
const units = ['КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];
const unitsEn = ['KB', 'MB', 'GB', 'TB', 'PB'];
const bytesInUnit = Object.fromEntries([
    ...units.map((unit, index) => [unit, bounds[index]]),
    ...unitsEn.map((unit, index) => [unit, bounds[index]]),
]);
const NO_BREAK_SPACE = '\u00A0';
const BYTE_CASES = ['байт', 'байта', 'байт'];
// @ts-ignore (7006) FIXME: Parameter 'value' implicitly has an 'any' type.
function getDigitsCount(value) {
    return String(value).replace('.', '').length;
}
// @ts-ignore (7006) FIXME: Parameter 'value' implicitly has an 'any' type.
function round(value, precision) {
    return Math.round(value * precision) / precision;
}
// @ts-ignore (7023) FIXME: 'reducePrecision' implicitly has return type 'any'... Remove this comment to see the full error message
function reducePrecision({ bytes, divisor, maxDigitsCount, precision }) {
    const roundedValue = round(bytes / divisor, precision);
    if (getDigitsCount(roundedValue) > maxDigitsCount) {
        precision /= 10;
        if (precision >= 1) {
            return reducePrecision({
                bytes,
                divisor,
                maxDigitsCount,
                precision,
            });
        }
    }
    return roundedValue;
}
// @ts-ignore (7006) FIXME: Parameter 'bytes' implicitly has an 'any' type.
function getDivisor(bytes) {
    let i = bounds.length;
    let bound = 0;
    while (i--) {
        bound = bounds[i];
        if (bound < bytes) {
            return bound;
        }
    }
    return 1;
}
// @ts-ignore (7006) FIXME: Parameter 'maxDigitsCount' implicitly has an 'any'... Remove this comment to see the full error message
function getPrecision(maxDigitsCount) {
    return 10 ** (maxDigitsCount - 1);
}
// @ts-ignore (7023) FIXME: 'toNDigits' implicitly has return type 'any' becau... Remove this comment to see the full error message
function toNDigits(bytes, maxDigitsCount, divisor) {
    let currUnits = 'байт';
    let roundedSpace = bytes;
    if (getDigitsCount(bytes) > maxDigitsCount) {
        if (!divisor) {
            divisor = getDivisor(bytes);
        }
        roundedSpace = reducePrecision({
            bytes,
            divisor,
            maxDigitsCount,
            precision: getPrecision(maxDigitsCount),
        });
        if (getDigitsCount(roundedSpace) > maxDigitsCount) {
            return toNDigits(bytes, maxDigitsCount, divisor * 1024);
        }
        currUnits = units[bounds.indexOf(divisor)];
    }
    return {
        original: bytes,
        units: currUnits,
        space: roundedSpace,
        value: `${roundedSpace} ${currUnits}`,
    };
}
exports.BytesHelper = {
    toNDigits,
    // @ts-ignore (7006) FIXME: Parameter 'bytes' implicitly has an 'any' type.
    toHumanFriendlyValue(bytes, fractionDigits = 2) {
        let value = Number(bytes);
        let i = units.length;
        while (i--) {
            const bound = bounds[i];
            if (value > bound) {
                value /= bound;
                break;
            }
        }
        // Приводим к указанной точности и удаляем ненужные нули.
        value = parseFloat(value.toFixed(fractionDigits));
        let unit = units[i];
        if (!unit) {
            unit = (0, plural_1.default)(value, BYTE_CASES);
        }
        return { value, unit };
    },
    toHumanFriendlyString(bytes, fractionDigits) {
        const { value, unit } = exports.BytesHelper.toHumanFriendlyValue(bytes, fractionDigits);
        return value + NO_BREAK_SPACE + unit;
    },
    // all must be ok with translated units
    // @ts-ignore (7006) FIXME: Parameter 'bytes' implicitly has an 'any' type.
    bytesToUnit(bytes, targetUnit, fractionDigits) {
        const bound = bytesInUnit[targetUnit];
        if (!bound) {
            /* console.error(
                `Unknown unit "${targetUnit}" provided for bytes convertation!`,
            );*/
            return bytes;
        }
        const result = bytes / bound;
        if (fractionDigits == null) {
            return result;
        }
        return parseFloat(result.toFixed(fractionDigits));
    },
    bytesToKB(value) {
        return value / 1024;
    },
    bytesToMB(value) {
        return value / 1024 ** 2;
    },
    bytesToGB(value) {
        return value / 1024 ** 3;
    },
    kilobytesToBytes(value) {
        return value * 1024;
    },
    megabytesToBytes(value) {
        return value * 1024 ** 2;
    },
    gigabytesToBytes(value) {
        return value * 1024 ** 3;
    },
    gigabytesToMegabytes(value) {
        return value * 1024;
    },
    formatBytes(value = 0) {
        if (Number.isNaN(value)) {
            value = 0;
        }
        if (value < 1024) {
            return `${value.toFixed(2)} B`;
        }
        if (value < 1024 ** 2) {
            return `${exports.BytesHelper.bytesToKB(value).toFixed(2)} KB`;
        }
        if (value < 1024 ** 3) {
            return `${exports.BytesHelper.bytesToMB(value).toFixed(2)} MB`;
        }
        return `${exports.BytesHelper.bytesToGB(value).toFixed(2)} GB`;
    },
    enUnitToRu(value) {
        return units[unitsEn.indexOf(value)];
    },
    unitsEn,
};