import React from 'react';
import { Layout as AntLayout, Button, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MobileProfilePageLayout.scss';

const { Content } = AntLayout;

interface MobileProfilePageLayoutProps {
    children: React.ReactNode;
}

const MobileProfilePageLayout: React.FC<MobileProfilePageLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleBack = () => {
        navigate('/profile');
    };

    return (
        <AntLayout className="mobile-profile-page-layout">
            <Header />

            <Content className="mobile-profile-page-content">
                <div className="profile-page-container">
                    <Flex gap={16} vertical>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={handleBack}
                            className="back-button"
                        >
                            {t('back') || 'Quay lại'}
                        </Button>

                        {children}
                    </Flex>
                </div>
            </Content>

            <Footer />
        </AntLayout>
    );
};

export default MobileProfilePageLayout;
