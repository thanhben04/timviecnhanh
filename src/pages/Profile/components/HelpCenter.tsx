import React from 'react';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const HelpCenter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Card>
            <Text>{t('profile_helpCenter_content') || 'Help center content will be available soon'}</Text>
        </Card>
    );
};

export default HelpCenter;
