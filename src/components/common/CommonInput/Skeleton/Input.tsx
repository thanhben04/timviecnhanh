import { FC, memo } from 'react';
import cls from 'utils/functions/cls';

interface IInputSkeletonProps {
    size?: 'small' | 'middle' | 'large';
}

const InputSkeleton: FC<IInputSkeletonProps> = memo(({ size = 'middle' }) => {
    return <div className={cls('form-dataitem-skeleton', `size-${size}`)} />;
});
InputSkeleton.displayName = 'InputSkeleton';

export default InputSkeleton;
