import { memo } from 'react';

const OptionSkeleton = memo(() => {
    return <div className="form-dataitem-option-skeleton" />;
});
OptionSkeleton.displayName = 'InputSkeleton';

export default OptionSkeleton;
