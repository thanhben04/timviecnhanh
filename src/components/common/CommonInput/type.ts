import { InputRef } from 'antd';
import dayjs from 'dayjs';
import {
    KeyboardEventHandler,
    MutableRefObject,
    ReactComponentElement,
    ReactNode,
} from 'react';

export type CommonElementType = ReactComponentElement<any, any> | null;

export interface IOption {
    label?: string | CommonElementType;
    value?: string;
    children?: CommonElementType;
    className?: string;
    disabled?: boolean;
}

export interface CommonRefType extends HTMLElement, InputRef {
    focus: () => void;
}

export enum Input {
    TEXT = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT',
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIME = 'TIME',
    FILE = 'FILE',
    IMAGE = 'IMAGE',
    PASSWORD = 'PASSWORD',
    NUMBER = 'NUMBER',
    EMAIL = 'EMAIL',
    AUTOCOMPLETE = 'AUTOCOMPLETE',
    HIDDEN = 'HIDDEN',
    MULTIPLE_SELECT = 'MULTIPLE_SELECT',
}

export enum FileStatus {
    NEW = 'NEW',
    UPLOADED = 'UPLOADED',
    REMOVED = 'REMOVED',
    ERROR = 'ERROR',
}

// for specific input
export interface FileItem {
    name: string;
    uid: string;
    status: FileStatus;
    url: string;
    file?: File;
    ordinal: number;
    itemCode?: string;
    itemOrdinal?: number;
}
export interface IInputProps {
    inputRef?: MutableRefObject<CommonRefType | null>;
    value?: string;
    onChange?: (value: string) => void;
    onFilesChange?: (value: FileItem[], changed: boolean) => void;
    placeholder?: string;
    options?: Array<IOption>;
    suffixIcon?: ReactNode;
    addonBefore?: CommonElementType;
    addonAfter?: CommonElementType;
    disabled?: boolean;
    readOnly?: boolean;
    focus?: boolean;
    prefix?: any;
    suffix?: any;
    onKeyDown?: KeyboardEventHandler;
    onBlur?: () => void;
    className?: string;
    autoCompleteType?: Input.TEXT | Input.TEXTAREA;
    autoCompleteHintDisplay?: boolean;
    maxLength?: any;
    minLength?: any;
    max?: any;
    min?: any;
    tooltip?: any;
    picker?: 'date' | 'month' | 'year' | 'quarter';
    typeDatePicker?: string;
    gridOptionLayout?: 1 | 2 | 3 | 'horizontal';
    modal?: any;
    loading?: boolean;
    defaultPickerValue?: dayjs.Dayjs;
    allowClear?: boolean;
    showSearch?: boolean;
    showNowBtn?: boolean;
    virtual?: boolean;
    optionFilterProp?: string;
}

// for wrapper component
export interface ICommonInputProps extends IInputProps {
    type: Input;
}

export interface IInputOption {
    value: string;
    label: string;
    disabled?: boolean;
}
