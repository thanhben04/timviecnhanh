import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './Loading.scss';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'default' | 'large';
    spinning?: boolean;
    children?: React.ReactNode;
    tip?: string;
}

const Loading: React.FC<LoadingProps> = ({
    message = 'Loading...',
    size = 'default',
    spinning = true,
    children,
    tip,
}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    if (children) {
        return (
            <Spin
                spinning={spinning}
                tip={tip || message}
                size={size}
                indicator={antIcon}
                className="custom-loading"
            >
                {children}
            </Spin>
        );
    }

    return (
        <div className="loading-container">
            <Spin
                size={size}
                indicator={antIcon}
                className="custom-loading"
            />
            {message && <div className="loading-message">{message}</div>}
        </div>
    );
};

export default Loading;
