import { Switch as AntdSwitch } from 'antd';
import { FC, memo, useCallback } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

interface ISwitchProps extends Omit<IInputProps, 'value' | 'onChange'> {
    value?: boolean;
    onChange?: (checked: boolean) => void;
}

const Switch: FC<ISwitchProps> = memo(
    ({ value, onChange, options, inputRef, loading = false, ...props }) => {
        const handleChange = useCallback(
            (checked: boolean) => {
                onChange && onChange(checked);
            },
            [onChange]
        );

        return !loading ? (
            <div className='common-input-wrapper'>
                <AntdSwitch
                    checked={value}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        ) : (
            <InputSkeleton />
        );
    }
);
Switch.displayName = 'Switch';

export default Switch;
