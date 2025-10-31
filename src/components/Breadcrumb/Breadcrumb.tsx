import React, { memo } from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { BreadcrumbProps } from './types';
import './Breadcrumb.scss';

const Breadcrumb: React.FC<BreadcrumbProps> = memo(({
    items,
    separator = '/',
    className = ''
}) => {
    const { t } = useTranslation();

    const breadcrumbItems = items.map((item, index) => {
        const isLast = index === items.length - 1;

        return {
            key: item.key,
            title: (
                <span className={`breadcrumb-item ${isLast ? 'breadcrumb-current' : ''}`}>
                    {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                    {isLast || !item.href ? (
                        <span className="breadcrumb-text">{item.title}</span>
                    ) : (
                        <Link to={item.href} className="breadcrumb-link">
                            {item.title}
                        </Link>
                    )}
                </span>
            )
        };
    });

    // Always add home as the first item if not present
    const hasHome = items.some(item => item.key === 'home');
    if (!hasHome && items.length > 0) {
        breadcrumbItems.unshift({
            key: 'home',
            title: (
                <span className="breadcrumb-item">
                    <span className="breadcrumb-icon">
                        <HomeOutlined />
                    </span>
                    <Link to="/" className="breadcrumb-link">
                        {t('home')}
                    </Link>
                </span>
            )
        });
    }

    return (
        <div className={`custom-breadcrumb ${className}`}>
            <AntBreadcrumb
                separator={separator}
                items={breadcrumbItems}
            />
        </div>
    );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
