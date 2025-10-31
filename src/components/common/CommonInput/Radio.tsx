import { Radio as AntdRadio } from 'antd';
import {
    FC,
    memo,
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import cls from 'utils/functions/cls';
import { IInputProps, IOption } from './type';
import { generateId } from 'utils/functions/generateId';
import OptionSkeleton from './Skeleton/Option';

type ClickTarget = Parameters<
    MouseEventHandler<HTMLInputElement>
>[0]['target'] & {
    value: string;
};

const Radio: FC<IInputProps> = memo(
    ({
        value,
        onChange,
        options,
        gridOptionLayout = 1,
        inputRef,
        loading = false,
        readOnly,
        disabled,
        allowClear = true,
        className,
        ...props
    }) => {
        const [currentValue, setCurrentValue] = useState('');

        const optionGroups = useMemo(() => {
            if (!options?.length) {
                return [];
            }
            const numberOfGroups =
                typeof gridOptionLayout === 'number' ? gridOptionLayout : 1;
            const groups = Array.from(
                { length: numberOfGroups },
                () => [] as IOption[]
            );
            const numberOptionsPerGroup = Math.ceil(
                options.length / numberOfGroups
            );
            options?.forEach((option, index) => {
                groups[Math.floor(index / numberOptionsPerGroup)].push(option);
            });
            return groups;
        }, [options, gridOptionLayout]);

        useEffect(() => {
            setCurrentValue(value ?? '');
        }, [value]);

        const handleClick = useCallback<MouseEventHandler<HTMLInputElement>>(
            e => {
                if (readOnly || disabled) {
                    return;
                }
                const target = e.target as ClickTarget;
                if (target.value !== currentValue) {
                    setCurrentValue(target.value);
                    if (onChange) {
                        onChange(target.value);
                    }
                } else if (allowClear) {
                    setCurrentValue('');
                    if (onChange) {
                        onChange('');
                    }
                }
            },
            [readOnly, disabled, currentValue, allowClear, onChange]
        );

        return (
            <div
                className={cls(
                    'option-group-wrapper',
                    `option-col-${gridOptionLayout}`,
                    className
                )}
            >
                {optionGroups.map((group, index) => (
                    <div
                        className={`option-group`}
                        key={`option-group-${index}`}
                    >
                        {group.map(option => {
                            const isChecked = currentValue === option.value;
                            return (
                                <div
                                    key={option.value}
                                    className="radio-option"
                                >
                                    {!loading ? (
                                        <AntdRadio
                                            name={generateId()}
                                            value={option.value}
                                            checked={isChecked}
                                            disabled={option.disabled}
                                            onClick={handleClick}
                                            tabIndex={1}
                                        >
                                            {option.label && (
                                                <span className="checkbox-label">
                                                    {option.label}
                                                </span>
                                            )}
                                        </AntdRadio>
                                    ) : (
                                        <OptionSkeleton />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }
);
Radio.displayName = 'Radio';

export default Radio;
