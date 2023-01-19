/// <reference types="react" />
import { ChipOption } from '@vkontakte/vkui/dist/components/Chip/Chip';
export declare const RFInput: ({ className, input, meta, children, top, bottom, ...rest }: any) => JSX.Element;
export declare const RFCheckbox: ({ className, input, meta, children, top, bottom, ...rest }: any) => JSX.Element;
export declare const RFSelect: ({ className, input, meta, children, top, bottom, ...rest }: any) => JSX.Element;
export declare const RFTextarea: ({ className, input, meta, children, top, bottom, ...rest }: any) => JSX.Element;
export declare const RFDatePicker: ({ className, input, meta, children, top, bottom, ...rest }: any) => JSX.Element;
export declare const RFChipsSelect: ({ className, value, input, meta, children, top, bottom, maxOptionsToSelect, ...rest }: any) => JSX.Element;
export declare const RFRadioGroup: ({ className, items, input, meta, top, bottom, ...rest }: any) => JSX.Element;
/**
 * конвертирует словарь Dictionary из Redux-toolkit в массив объектов для ChipsSelect
 * @param entities {object} - словарь с данными
 * @param nameProperty {string} - название поля, где хранится название сущности для отображения в выпадашке ChipsSelect
 * @return - массив объектов для ChipsSelect
* */
export declare const convertDictionaryToChipSelectFormat: (entities: Record<string, any>, nameProperty: string) => ChipOption[];
/**
 * конвертирует массив строк в массив объектов для ChipsSelect
 * @param strArray {object} - словарь с данными
 * @return - массив объектов для ChipsSelect
* */
export declare const convertArrayToChipSelectFormat: (strArray: string[]) => ChipOption[];
