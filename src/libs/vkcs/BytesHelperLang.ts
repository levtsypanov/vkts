import { plural } from './Plural/plural';
import { BytesHelper } from './BytesHelper';

// don't mix with anything before localisationSetup
const siUnits = ['КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];
const siBounds = [1000, 1000 ** 2, 1000 ** 3, 1000 ** 4, 1000 ** 5];
const NO_BREAK_SPACE = '\u00A0';
const BYTE_CASES = ['байт', 'байта', 'байт'];

type ToHumanFriendlyParams = {
    bytes: number;
    fractionDigits?: number;
    useSi?: boolean;
};
function toHumanFriendlyString({
    bytes,
    fractionDigits = 2,
    useSi,
}: ToHumanFriendlyParams) {
    const { value, unit } = toHumanFriendlyValue({
        bytes,
        fractionDigits,
        useSi,
    });
    return value + NO_BREAK_SPACE + unit;
}

function toHumanFriendlyValue({
    bytes,
    fractionDigits = 2,
    useSi,
}: ToHumanFriendlyParams) {
    let value = Number(bytes);
    let i = siUnits.length;

    const _bounds = useSi ? siBounds : BytesHelper.bounds;

    while (i--) {
        const bound = _bounds[i];

        if (value >= bound) {
            value /= bound;

            break;
        }
    }

    // Приводим к указанной точности и удаляем ненужные нули.
    value = parseFloat(value.toFixed(fractionDigits));

    let unit: string = siUnits[i]; // todo сейчас везде используются единицы СИ, надо переделать на KиБ, ГиБ и т.д.

    if (!unit) {
        unit = plural(value, BYTE_CASES);
    }

    return { value, unit };
}

export const BytesHelperLang = {
    toHumanFriendlyValue,
    toHumanFriendlyString,
};
