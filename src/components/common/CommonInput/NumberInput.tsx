import { InputNumber } from 'antd';
import { FC, memo, useCallback } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';
const NumberInput: FC<IInputProps> = memo(
    ({ value, onChange, options, inputRef, loading = false, ...props }) => {
        const handleChange = useCallback(
            (e: any) => {
                onChange && onChange(e);
            },
            [onChange]
        );

        return !loading ? (
            <InputNumber
                {...props}
                value={value}
                onChange={handleChange}
                controls={false}
                max={
                    typeof props?.max === 'number'
                        ? String(props.max)
                        : undefined
                }
                min={
                    typeof props?.min === 'number'
                        ? String(props.min)
                        : undefined
                }
            />
        ) : (
            <InputSkeleton />
        );
    }
);
NumberInput.displayName = 'NumberInput';

export default NumberInput;
