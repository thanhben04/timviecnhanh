import { Input } from 'antd';
import { FC, memo, useCallback } from 'react';
import { IInputProps } from './type';
import InputSkeleton from './Skeleton/Input';

const Textarea: FC<IInputProps> = memo(
    ({ value, onChange, inputRef, loading = false, ...props }) => {
        const handleChange = useCallback(
            (e: any) => {
                onChange && onChange(e.target.value);
            },
            [onChange]
        );

        return !loading ? (
            <div className='common-input-wrapper'>
                <Input.TextArea
                    {...props}
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    rows={3}
                />
            </div>
        ) : (
            <InputSkeleton size="large" />
        );
    }
);
Textarea.displayName = 'Textarea';

export default Textarea;
