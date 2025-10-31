import { DatePicker } from 'antd';
import moment from 'moment';
import { FC, memo, useCallback, useMemo } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

const displayFormat = 'DD/MM/YYYY HH:mm';
const valueFormat = 'YYYY-MM-DD HH:mm:ss';

const DateTimeInput: FC<IInputProps> = memo(
    ({ value, onChange, loading = false, showNowBtn = true, ...props }) => {
        const handleChange = useCallback(
            (_: any, dateValue: any) => {
                onChange?.(
                    dateValue
                        ? moment(dateValue, displayFormat).format(valueFormat)
                        : ''
                );
            },
            [onChange]
        );

        const setNow = useCallback(() => {
            onChange?.(moment().format(valueFormat));
        }, [onChange]);

        const dateValue = useMemo(() => {
            if (!loading && value) {
                return moment(value, valueFormat);
            }
            return null;
        }, [loading, value]);

        return !loading ? (
            <>
                <DatePicker
                    {...props}
                    placeholder={props.placeholder || 'Select date and time'}
                    popupClassName="ems-picker-dropdown"
                    allowClear={true}
                    value={dateValue}
                    format={displayFormat}
                    showTime={{ format: 'HH:mm' }}
                    onChange={handleChange}
                />
                {showNowBtn && (
                    <div className="now" onClick={setNow}>
                        Now
                    </div>
                )}
            </>
        ) : (
            <InputSkeleton />
        );
    }
);
DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
