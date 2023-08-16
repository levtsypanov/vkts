/**
 * Библиотека для преобразования и форматирования размеров файлов и папок.
 */
const bounds = [
    1024, // 'КБ'
    1024 ** 2, // 'МБ'
    1024 ** 3, // 'ГБ'
    1024 ** 4, // 'ТБ'
    1024 ** 5, // 'ПБ'
  ];
  
  const siUnits = ['КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];
  const siUnitsEn = ['KB', 'MB', 'GB', 'TB', 'PB'];
  
  const bytesInUnit = Object.fromEntries([
    ...siUnits.map((unit, index) => [unit, bounds[index]]),
    ...siUnitsEn.map((unit, index) => [unit, bounds[index]]),
  ]);
  
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
  function toNDigits(bytes, maxDigitsCount, divisor?: number) {
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
  
        currUnits = siUnits[bounds.indexOf(divisor)];
    }
  
    return {
        original: bytes,
        units: currUnits,
        space: roundedSpace,
        value: `${roundedSpace} ${currUnits}`,
    };
  }
  
  export const BytesHelper = {
    toNDigits,
  
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
  
    bytesToKB(value: number) {
        return value / 1024;
    },
  
    ceilBytesToKB(value: number) {
        return Math.ceil(BytesHelper.bytesToKB(value));
    },
  
    bytesToMB(value: number) {
        return value / 1024 ** 2;
    },
  
    bytesToGiB(value: number) {
        return value / 1024 ** 3;
    },
  
    bytesToGB(value: number) {
        return value / 10 ** 9;
    },
  
    kilobytesToBytes(value: number) {
        return value * 1024;
    },
  
    megabytesToBytes(value: number) {
        return value * 1024 ** 2;
    },
  
    gigabytesToBytes(value: number) {
        return value * 1024 ** 3;
    },
  
    standardGigabytesToBytes(value: number) {
        return value * 1000 ** 3;
    },
  
    gigabytesToMegabytes(value: number) {
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
            return `${BytesHelper.bytesToKB(value).toFixed(2)} KB`;
        }
  
        if (value < 1024 ** 3) {
            return `${BytesHelper.bytesToMB(value).toFixed(2)} MB`;
        }
  
        return `${BytesHelper.bytesToGiB(value).toFixed(2)} GB`;
    },
  
    enUnitToRu(value: string): string {
        return siUnits[siUnitsEn.indexOf(value)];
    },
  
    bounds,
    siUnits,
    siUnitsEn,
  };
  