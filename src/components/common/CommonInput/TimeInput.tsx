import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FC, memo, useCallback, useMemo } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

const timeFormat = 'HH:mm';

const TimeInput: FC<IInputProps> = memo(
    ({ value, onChange, loading = false, showNowBtn, ...props }) => {
        const handleChange = useCallback(
            (_: any, timeValue: any) => {
                onChange && onChange(timeValue);
            },
            [onChange]
        );

        const setNow = useCallback(() => {
            onChange && onChange(dayjs().format(timeFormat));
        }, [onChange]);

        const timeValue = useMemo(() => {
            if (value) {
                return dayjs(value, timeFormat);
            }
            return null;
        }, [value]);

        return !loading ? (
            <>
                <TimePicker
                    {...props}
                    popupClassName="ems-picker-dropdown"
                    value={timeValue}
                    format={timeFormat}
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
TimeInput.displayName = 'TimeInput';

export default TimeInput;
