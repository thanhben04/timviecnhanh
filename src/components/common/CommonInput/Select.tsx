import { Select as SelectAntd } from 'antd';
import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { IInputProps } from './type';
import { ChevronDown } from 'assets/icons/outlined/ChevronDown';
import InputSkeleton from './Skeleton/Input';

const { Option } = SelectAntd;

const Select: FC<IInputProps> = memo(
    ({ value, onChange, options, inputRef, loading = false, ...props }) => {
        const [inputValue, setInputValue] = useState('');
        const ref = useRef(null);

        useEffect(() => {
            setInputValue(value || '');
        }, [value]);

        useEffect(() => {
            if (inputRef) {
                inputRef.current = ref.current;
            }
        }, [inputRef]);

        const handleChange = useCallback(
            (value: any) => {
                setInputValue(value || '');
                onChange && onChange(value || '');
            },
            [onChange]
        );

        const optionsData = useMemo(
            () => options?.map(option => ({ ...option })),
            [options]
        );

        return !loading ? (
            <div className='common-input-wrapper'>
                <SelectAntd
                    {...props}
                    value={inputValue || void 0}
                    onChange={handleChange}
                    ref={ref}
                    suffixIcon={<ChevronDown stroke='#737373' />}
                    options={optionsData}
                >
                    {options?.map(option => (
                        <Option
                            value={option.value}
                            key={option.value}
                            disabled={props.disabled || props.readOnly}
                        >
                            {option.label}
                        </Option>
                    ))}
                </SelectAntd>
            </div>
        ) : (
            <InputSkeleton />
        );
    }
);
Select.displayName = 'Select';

export default Select;
