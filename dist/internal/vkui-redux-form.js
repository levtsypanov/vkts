"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayToChipSelectFormat = exports.convertDictionaryToChipSelectFormat = exports.RFRadioGroup = exports.RFChipsSelect = exports.RFDatePicker = exports.RFTextarea = exports.RFSelect = exports.RFCheckbox = exports.RFInput = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const moment_1 = __importDefault(require("moment"));
const vkui_1 = require("@vkontakte/vkui");
const vkui_2 = require("@vkontakte/vkui");
const getStatus = (error, submitFailed) => {
    if (error && submitFailed) {
        return 'error';
    }
    return 'default';
};
const makeField = (Component) => ({ className, input, meta, children, top, bottom, ...rest }) => {
    const { error, submitFailed } = meta;
    return ((0, jsx_runtime_1.jsx)(vkui_1.FormItem, { className: className, top: top, status: getStatus(error, submitFailed), bottom: getStatus(error, submitFailed) === 'error' ? error : bottom, children: (0, jsx_runtime_1.jsx)(Component, { ...input, ...rest, meta: meta, children: children }) }));
};
const makeCheckboxField = (Component) => ({ className, input, meta, children, top, bottom, ...rest }) => {
    const { error, submitFailed } = meta;
    const { value } = input;
    return ((0, jsx_runtime_1.jsx)(vkui_1.FormItem, { className: className, top: top, status: getStatus(error, submitFailed), bottom: getStatus(error, submitFailed) === 'error' ? error : bottom, children: (0, jsx_runtime_1.jsx)(Component, { ...input, ...rest, meta: meta, checked: value, children: children }) }));
};
const makeDatePickerField = (Component) => ({ className, input, meta, children, top, bottom, ...rest }) => {
    const { error, submitFailed } = meta;
    let { onChange, value } = input;
    return ((0, jsx_runtime_1.jsx)(vkui_1.FormItem, { className: className, top: top, status: getStatus(error, submitFailed), bottom: getStatus(error, submitFailed) === 'error' ? error : bottom, children: (0, jsx_runtime_1.jsx)(Component, { ...input, ...rest, meta: meta, defaultValue: value, value: value, onDateChange: (value) => onChange(value), onBlur: () => { }, 
            // нужно убрать onChange, иначе вызовется два action change у redux-form
            // первый с объектом со значениями всех трех Selectов
            // второй - со значением измененного Selectа
            onChange: () => { }, children: children }) }));
};
(0, moment_1.default)();
const makeChipsSelectField = (Component) => ({ className, value, input, meta, children, top, bottom, maxOptionsToSelect, ...rest }) => {
    const { error, submitFailed } = meta;
    const { onChange } = input;
    return ((0, jsx_runtime_1.jsx)(vkui_1.FormItem, { className: className, top: top, status: getStatus(error, submitFailed), bottom: getStatus(error, submitFailed) === 'error' ? error : bottom, children: (0, jsx_runtime_1.jsx)(Component, { ...input, ...rest, meta: meta, selectedOptions: value, onBlur: () => { }, onChange: (selectedItems) => {
                if (maxOptionsToSelect) {
                    onChange(selectedItems.slice(selectedItems.length - maxOptionsToSelect));
                }
                else {
                    onChange(selectedItems);
                }
            }, children: children }) }));
};
const makeRadioGroupField = (Component) => ({ className, items, input, meta, top, bottom, ...rest }) => {
    const { error, submitFailed } = meta;
    const { value } = input;
    return ((0, jsx_runtime_1.jsx)(vkui_1.FormItem, { className: className, top: top, status: getStatus(error, submitFailed), bottom: getStatus(error, submitFailed) === 'error' ? error : bottom, children: items.map((it, index) => ((0, react_1.createElement)(Component, { ...input, ...rest, value: it.value, key: `radio-${it.value}-${index}`, checked: value === it.value }, it.title))) }));
};
exports.RFInput = makeField(vkui_1.Input);
exports.RFCheckbox = makeCheckboxField(vkui_1.Checkbox);
exports.RFSelect = makeField(vkui_1.Select);
exports.RFTextarea = makeField(vkui_1.Textarea);
exports.RFDatePicker = makeDatePickerField(vkui_1.DatePicker);
exports.RFChipsSelect = makeChipsSelectField(vkui_2.unstable_ChipsSelect);
exports.RFRadioGroup = makeRadioGroupField(vkui_1.Radio);
/**
 * конвертирует словарь Dictionary из Redux-toolkit в массив объектов для ChipsSelect
 * @param entities {object} - словарь с данными
 * @param nameProperty {string} - название поля, где хранится название сущности для отображения в выпадашке ChipsSelect
 * @return - массив объектов для ChipsSelect
* */
const convertDictionaryToChipSelectFormat = (entities, nameProperty) => Object.values(entities).map((it) => ({
    ...it,
    value: it.id,
    label: it[nameProperty],
}));
exports.convertDictionaryToChipSelectFormat = convertDictionaryToChipSelectFormat;
/**
 * конвертирует массив строк в массив объектов для ChipsSelect
 * @param strArray {object} - словарь с данными
 * @return - массив объектов для ChipsSelect
* */
const convertArrayToChipSelectFormat = (strArray) => strArray?.map((it) => ({
    value: it,
    label: it,
}));
exports.convertArrayToChipSelectFormat = convertArrayToChipSelectFormat;
