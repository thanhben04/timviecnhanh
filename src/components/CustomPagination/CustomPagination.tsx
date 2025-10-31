import React, { memo, useCallback } from 'react';
import { Pagination as AntPagination } from 'antd';
import './CustomPagination.scss';

interface CustomPaginationProps {
    total: number;
    current: number;
    pageSize: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
    pageSizeOptions?: string[];
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
    className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = memo(({
    total,
    current,
    pageSize,
    showSizeChanger = true,
    showQuickJumper = false,
    showTotal = true,
    pageSizeOptions = ['12', '24', '48', '96'],
    onChange,
    onShowSizeChange,
    className = ''
}) => {
    const handleChange = useCallback((page: number, size: number) => {
        onChange?.(page, size);
    }, [onChange]);

    const handleShowSizeChange = useCallback((current: number, size: number) => {
        onShowSizeChange?.(current, size);
    }, [onShowSizeChange]);

    // const showTotalItems = useCallback((total: number, range: [number, number]) => {
    //     return `${range[0]}-${range[1]} của ${total} sản phẩm`;
    // }, []);

    return (
        <div className={`custom-pagination ${className}`}>
            <AntPagination
                total={total}
                current={current}
                pageSize={pageSize}
                showSizeChanger={false}
                showQuickJumper={showQuickJumper}
                // showTotal={showTotal ? showTotalItems : undefined}
                pageSizeOptions={pageSizeOptions}
                onChange={handleChange}
                onShowSizeChange={handleShowSizeChange}
                showLessItems
                responsive
            />
        </div>
    );
});

CustomPagination.displayName = 'CustomPagination';

export default CustomPagination;
