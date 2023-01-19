import React from 'react';
import moment from 'moment';
import { Input, Checkbox, Select, FormItem, Radio, Textarea, DatePicker, DatePickerDateFormat } from '@vkontakte/vkui';
import { unstable_ChipsSelect as ChipsSelect } from '@vkontakte/vkui';
import { ChipOption } from '@vkontakte/vkui/dist/components/Chip/Chip';

const getStatus = (error: string, submitFailed: boolean): 'default' | 'error' | 'valid' => {
    if (error && submitFailed) {
        return 'error';
    }

    return 'default';
};

const makeField = (Component: any) =>
    ({ className, input, meta, children, top, bottom, ...rest }: any) => {
        const { error, submitFailed } = meta;

        return (
            <FormItem
                className={className}
                top={top}
                status={getStatus(error, submitFailed)}
                bottom={getStatus(error, submitFailed) === 'error' ? error : bottom}
            >
                <Component {...input} {...rest} meta={meta} >
                    {children}
                </Component>
            </FormItem>
        );
    };

const makeCheckboxField = (Component: any) =>
        ({ className, input, meta, children, top, bottom, ...rest }: any) => {
            const { error, submitFailed } = meta;
            const { value } = input;

            return (
                <FormItem
                    className={className}
                    top={top}
                    status={getStatus(error, submitFailed)}
                    bottom={getStatus(error, submitFailed) === 'error' ? error : bottom}
                >
                    <Component {...input} {...rest} meta={meta} checked={value} >
                        {children}
                    </Component>
                </FormItem>
        );
    };

const makeDatePickerField = (Component: any) =>
    ({className, input, meta, children, top, bottom, ...rest }: any) => {
        const {error, submitFailed} = meta;
        let {onChange, value} = input;

        return (
            <FormItem
                className={className}
                top={top}
                status={getStatus(error, submitFailed)}
                bottom={getStatus(error, submitFailed) === 'error' ? error : bottom}
            >
                <Component
                    {...input}
                    {...rest}
                    meta={meta}
                    defaultValue={value}
                    value={value}
                    onDateChange={(value: DatePickerDateFormat) => onChange(value)}
                    onBlur={() => { }}
                    // нужно убрать onChange, иначе вызовется два action change у redux-form
                    // первый с объектом со значениями всех трех Selectов
                    // второй - со значением измененного Selectа
                    onChange={() => { }}
                >
                    {children}
                </Component>
            </FormItem>
        );
    };

    moment();

const makeChipsSelectField = (Component: any) =>
    ({className, value, input, meta, children, top, bottom, maxOptionsToSelect, ...rest }: any) => {
        const {error, submitFailed} = meta;
        const {onChange} = input;

        return (
            <FormItem
                className={className}
                top={top}
                status={getStatus(error, submitFailed)}
                bottom={getStatus(error, submitFailed) === 'error' ? error : bottom}
            >
                {/* onBlur-костыль, чтобы при потере фокуса не падало приложение */}
                <Component
                    {...input}
                    {...rest}
                    meta={meta}
                    selectedOptions={value}
                    onBlur={() => { }}
                    onChange={(selectedItems: any[]) => {
                        if (maxOptionsToSelect) {
                            onChange(selectedItems.slice(selectedItems.length - maxOptionsToSelect));
                        } else {
                            onChange(selectedItems);
                        }
                    }}
                >
                    {children}
                </Component>
            </FormItem>               
        );
  };

const makeRadioGroupField = (Component: any) =>
    ({className, items, input, meta, top, bottom, ...rest }: any) => {
        const {error, submitFailed} = meta;
        const {value} = input;

        return (
            <FormItem
                className={className}
                top={top}
                status={getStatus(error, submitFailed)}
                bottom={getStatus(error, submitFailed) === 'error' ? error : bottom}
            >
                {items.map((it: { title: string; value: any }, index: number) => (
                    <Component
                        {...input}
                        {...rest}
                        value={it.value}
                        key={`radio-${it.value}-${index}`}
                        checked={value === it.value}
                    >
                        {it.title}
                    </Component>
                ))}
            </FormItem>
        );
  };

export const RFInput = makeField(Input);
export const RFCheckbox = makeCheckboxField(Checkbox);
export const RFSelect = makeField(Select);
export const RFTextarea = makeField(Textarea);
export const RFDatePicker = makeDatePickerField(DatePicker);
export const RFChipsSelect = makeChipsSelectField(ChipsSelect);
export const RFRadioGroup = makeRadioGroupField(Radio);

/**
 * конвертирует словарь Dictionary из Redux-toolkit в массив объектов для ChipsSelect
 * @param entities {object} - словарь с данными
 * @param nameProperty {string} - название поля, где хранится название сущности для отображения в выпадашке ChipsSelect
 * @return - массив объектов для ChipsSelect
* */
export const convertDictionaryToChipSelectFormat = (
    entities: Record<string, any>,
    nameProperty: string
): ChipOption[] =>
    Object.values(entities).map((it) => ({
        ...it,
        value: it.id,
        label: it[nameProperty],
    }));

/**
 * конвертирует массив строк в массив объектов для ChipsSelect
 * @param strArray {object} - словарь с данными
 * @return - массив объектов для ChipsSelect
* */
export const convertArrayToChipSelectFormat = (strArray: string[]): ChipOption[] =>
    strArray?.map((it) => ({
        value: it,
        label: it,
    }));