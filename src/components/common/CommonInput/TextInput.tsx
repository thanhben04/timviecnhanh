import { Input } from 'antd';
import { FC, memo, useCallback } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

const TextInput: FC<IInputProps> = memo(
    ({ value, onChange, options, inputRef, loading = false, ...props }) => {
        const handleChange = useCallback(
            (e: any) => {
                onChange && onChange(e.target.value);
            },
            [onChange]
        );

        return !loading ? (
            <div className='common-input-wrapper'>
                <Input
                    {...props}
                    type="text"
                    value={value}
                    ref={inputRef}
                    onChange={handleChange}
                    allowClear
                />
            </div>
        ) : (
            <InputSkeleton />
        );
    }
);
TextInput.displayName = 'TextInput';

export default TextInput;
