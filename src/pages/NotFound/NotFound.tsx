import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './NotFound.scss';
import { Button } from 'antd';

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found">
            <div className="container">
                <div className="not-found-content">
                    <h1>404</h1>
                    <h2>{t('page_not_found')}</h2>
                    <p>{t('sorry_page_not_exist')}</p>
                    <div className="not-found-actions">
                        <Link to="/">
                            <Button type="primary" icon={<HomeOutlined />}>
                                {t('go_back_home')}
                            </Button>
                        </Link>
                        <Link to="/posts">
                            <Button type="default" icon={<UnorderedListOutlined />}>
                                Browse Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
