import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { FC, memo, useCallback, useMemo } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

const valueFormat = 'YYYY-MM-DD';

const DateInput: FC<IInputProps> = memo(
    ({
        value,
        onChange,
        typeDatePicker,
        picker = 'date',
        min,
        max,
        loading = false,
        showNowBtn = true,
        ...props
    }) => {
        const minDate = useMemo(() => {
            if (!loading && min) {
                return dayjs(min, valueFormat);
            }
            return undefined;
        }, [loading, min]);

        const maxDate = useMemo(() => {
            if (!loading && max) {
                return dayjs(max, valueFormat);
            }
            return undefined;
        }, [loading, max]);

        const displayFormat = useMemo(() => {
            switch (picker) {
                case 'date':
                    return 'DD/MM/YYYY';
                case 'month':
                    return 'MM/YYYY';
                case 'year':
                    return 'YYYY';
                case 'quarter':
                    return 'Q/YYYY';
            }
        }, [picker]);

        const placeholder = useMemo(() => {
            switch (picker) {
                case 'date':
                    return 'Select date';
                case 'month':
                    return 'Select month';
                case 'year':
                    return 'Select year';
                case 'quarter':
                    return 'Select quarter';
            }
        }, [picker]);

        const disabledDate = useCallback(
            (current: any) => {
                const today = dayjs().startOf('day');
                const currentDay = current?.startOf('day');
                if (currentDay) {
                    if (typeDatePicker === 'previous' && currentDay >= today) {
                        return true;
                    }
                    if (
                        typeDatePicker === 'previousAndToday' &&
                        currentDay > today
                    ) {
                        return true;
                    }
                    if (typeDatePicker === 'future' && currentDay <= today) {
                        return true;
                    }
                    if (
                        typeDatePicker === 'futureAndToday' &&
                        currentDay < today
                    ) {
                        return true;
                    }
                    if (minDate && currentDay < minDate) {
                        return true;
                    }
                    if (maxDate && currentDay > maxDate) {
                        return true;
                    }
                    return false;
                }
                return false;
            },
            [maxDate, minDate, typeDatePicker]
        );

        const handleChange = useCallback(
            (_: any, dateValue: any) => {
                onChange &&
                    onChange(
                        dateValue
                            ? dayjs(dateValue, displayFormat).format(
                                valueFormat
                            )
                            : ''
                    );
            },
            [onChange, displayFormat]
        );

        const setNow = useCallback(() => {
            onChange && onChange(dayjs().format(valueFormat));
        }, [onChange]);

        const dateValue = useMemo(() => {
            if (!loading && value) {
                return dayjs(value, valueFormat);
            }
            return null;
        }, [loading, value]);

        return !loading ? (
            <ConfigProvider locale={locale}>
                <div className='common-input-wrapper'>
                    <DatePicker
                        {...props}
                        defaultPickerValue={dateValue ?? props.defaultPickerValue}
                        placeholder={props.placeholder || placeholder}
                        popupClassName="ems-picker-dropdown"
                        allowClear={true}
                        value={dateValue}
                        format={displayFormat}
                        onChange={handleChange}
                        picker={picker}
                        disabledDate={disabledDate}
                    />
                    {showNowBtn && (
                        <div className="now" onClick={setNow}>
                            Now
                        </div>
                    )}
                </div>
            </ConfigProvider>
        ) : (
            <InputSkeleton />
        );
    }
);
DateInput.displayName = 'DateInput';

export default DateInput;
