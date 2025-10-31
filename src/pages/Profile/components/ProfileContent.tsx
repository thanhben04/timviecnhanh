import { memo, useMemo } from 'react';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProfileContentProps } from '../types';
import PersonalInfo from './PersonalInfo';
import AddressManagement from './AddressManagement';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import BlockedUsers from './BlockedUsers';
import LanguageSettings from './LanguageSettings';
import Orders from './Orders';
import Credits from './Credits';

const { Text } = Typography;

const ProfileContent = memo(({ selectedKey, user, onSave }: ProfileContentProps) => {
    const { t } = useTranslation();

    const renderContent = useMemo(() => {
        switch (selectedKey) {
            case 'personal':
                return (
                    <PersonalInfo />
                );
            case 'address':
                return (
                    <AddressManagement />
                );
            case 'orders':
                return <Orders />;
            case 'notifications':
                return <NotificationSettings />;
            case 'settings':
                return <PrivacySettings />;
            case 'blockedUsers':
                return <BlockedUsers />;
            case 'language':
                return <LanguageSettings />;
            case 'credits':
                return <Credits />;
            case 'helpCenter':
                return (
                    <Card>
                        <Text>{t(`profile_${selectedKey}_content`)}</Text>
                    </Card>
                );
        }
    }, [selectedKey, t]);

    return (
        <div className="profile-content-wrapper">
            {renderContent}
        </div>
    );
});

export default ProfileContent;
