/**
 * Возвращает цветовые компоненты r, g, b
 * @param input цвет (hex, rgb)
 */
 export function parseColor(input: string) {
    if (input[0] === '#') {
        const collen = (input.length - 1) / 3;
        const fact = [17, 1, 0.062272][collen - 1];

        return [
            Math.round(parseInt(input.substr(1, collen), 16) * fact),
            Math.round(parseInt(input.substr(collen + 1, collen), 16) * fact),
            Math.round(parseInt(input.substr(2 * collen + 1, collen), 16) * fact),
        ];
    }

    return input.split('(')[1].split(')')[0].split(',').map(Number).map(Math.round);
}

/**
 * Возвращает цвет, полученный в результате наложения
 * черного цвета с alpha прозначностью на цвет target
 * @param target фоновый цвет (hex, rgb)
 * @param alpha кэффициент заливки церным цветом
 */
export const blackedColor = (target: string, alpha: number) => {
    const [r1, g1, b1] = parseColor('#000000');
    const [r2, g2, b2] = parseColor(target);

    const r3 = r2 + (r1 - r2) * alpha;
    const g3 = g2 + (g1 - g2) * alpha;
    const b3 = b2 + (b1 - b2) * alpha;

    return `#${[r3, g3, b3]
        .map(Math.round)
        .map((n) => n.toString(16).padStart(2, '0'))
        .join('')}`;
};
