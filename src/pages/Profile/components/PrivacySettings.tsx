import { memo, useState } from 'react';
import { Card, Typography, List, message, Flex, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import Switch from 'components/common/CommonInput/Switch';

const { Text } = Typography;

interface PrivacySettingItem {
    key: string;
    titleKey: string;
    descriptionKey: string;
    defaultValue: boolean;
}

const PrivacySettings = memo(() => {
    const { t } = useTranslation();

    // Privacy settings state
    const [settings, setSettings] = useState({
        allowVirtualAssistant: true,
        allowBusinessContact: false,
        allowMicrophone: true,
        allowLibraryVideo: true,
        allowCamera: true,
        hideOnlineStatus: false,
        hideContactInfo: false
    });

    const privacySettingsItems: PrivacySettingItem[] = [
        {
            key: 'allowVirtualAssistant',
            titleKey: 'privacy_virtual_assistant_title',
            descriptionKey: 'privacy_virtual_assistant_desc',
            defaultValue: true
        },
        {
            key: 'allowBusinessContact',
            titleKey: 'privacy_business_contact_title',
            descriptionKey: 'privacy_business_contact_desc',
            defaultValue: false
        },
        {
            key: 'allowMicrophone',
            titleKey: 'privacy_microphone_title',
            descriptionKey: 'privacy_microphone_desc',
            defaultValue: true
        },
        {
            key: 'allowLibraryVideo',
            titleKey: 'privacy_library_video_title',
            descriptionKey: 'privacy_library_video_desc',
            defaultValue: true
        },
        {
            key: 'allowCamera',
            titleKey: 'privacy_camera_title',
            descriptionKey: 'privacy_camera_desc',
            defaultValue: true
        },
        {
            key: 'hideOnlineStatus',
            titleKey: 'privacy_hide_online_title',
            descriptionKey: 'privacy_hide_online_desc',
            defaultValue: false
        },
        {
            key: 'hideContactInfo',
            titleKey: 'privacy_hide_contact_title',
            descriptionKey: 'privacy_hide_contact_desc',
            defaultValue: false
        }
    ];

    const handleSettingChange = (key: string, checked: boolean) => {
        setSettings(prev => ({
            ...prev,
            [key]: checked
        }));

        // Show success message
        message.success(t('privacy_setting_updated'));
    };

    const handleDeleteAccount = () => {
        // This would typically show a confirmation modal
        message.warning(t('privacy_delete_account_warning'));
    };

    return (
        <div className="privacy-settings">
            <Card>
                <List
                    dataSource={privacySettingsItems}
                    renderItem={(item) => (
                        <List.Item
                            key={item.key}
                            actions={[
                                <Switch
                                    value={settings[item.key as keyof typeof settings]}
                                    onChange={(checked) => handleSettingChange(item.key, checked)}
                                />
                            ]}
                        >
                            <List.Item.Meta
                                title={t(item.titleKey)}
                                description={t(item.descriptionKey)}
                            />
                        </List.Item>
                    )}
                />
                <Flex vertical gap={12} className='delete-account-section'>
                    <Text>{t('privacy_delete_account')}</Text>
                    <div className="danger-zone">
                        <Text type="secondary">{t('privacy_delete_account_desc')}</Text>
                        <Button
                            type="primary"
                            onClick={handleDeleteAccount}
                            className='delete-account-button'
                        >
                            {t('privacy_delete_account')}
                        </Button>
                    </div>
                </Flex>
            </Card>
        </div>
    );
});

export default PrivacySettings;
