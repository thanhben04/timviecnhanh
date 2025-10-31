import { memo, useState, useCallback, useMemo } from 'react';
import { Card, Typography, Divider, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { NotificationSettings as NotificationSettingsType, NotificationCategory, NotificationSubSetting } from '../types';
import Switch from 'components/common/CommonInput/Switch';

const { Text } = Typography;

const NotificationSettings = memo(() => {
    const { t } = useTranslation();

    const [settings, setSettings] = useState<NotificationSettingsType>({
        email: {
            key: 'email',
            label: t('profile_email_notifications'),
            description: t('profile_email_notifications_desc'),
            enabled: true,
            subSettings: [
                {
                    key: 'email_order_updates',
                    label: t('profile_email_order_updates'),
                    description: t('profile_email_order_updates_desc'),
                    enabled: true
                },
                {
                    key: 'email_promotions',
                    label: t('profile_email_promotions'),
                    description: t('profile_email_promotions_desc'),
                    enabled: false
                },
                {
                    key: 'email_survey',
                    label: t('profile_email_survey'),
                    description: t('profile_email_survey_desc'),
                    enabled: false
                }
            ]
        },
        sms: {
            key: 'sms',
            label: t('profile_sms_notifications'),
            description: t('profile_sms_notifications_desc'),
            enabled: true,
            subSettings: [
                {
                    key: 'sms_order_updates',
                    label: t('profile_sms_order_updates'),
                    description: t('profile_sms_order_updates_desc'),
                    enabled: true
                },
                {
                    key: 'sms_promotions',
                    label: t('profile_sms_promotions'),
                    description: t('profile_sms_promotions_desc'),
                    enabled: false
                }
            ]
        },
        zalo: {
            key: 'zalo',
            label: t('profile_zalo_notifications'),
            description: t('profile_zalo_notifications_desc'),
            enabled: true,
            subSettings: [
                {
                    key: 'zalo_promotions',
                    label: t('profile_zalo_promotions'),
                    description: t('profile_zalo_promotions_desc'),
                    enabled: true
                }
            ]
        }
    });

    const handleCategoryChange = useCallback((categoryKey: keyof NotificationSettingsType, enabled: boolean) => {
        setSettings(prev => ({
            ...prev,
            [categoryKey]: {
                ...prev[categoryKey],
                enabled,
                // Keep sub-settings as they are, don't auto-disable them
                subSettings: prev[categoryKey].subSettings
            }
        }));
    }, []);

    const handleSubSettingChange = useCallback((categoryKey: keyof NotificationSettingsType, subKey: string, enabled: boolean) => {
        setSettings(prev => ({
            ...prev,
            [categoryKey]: {
                ...prev[categoryKey],
                subSettings: prev[categoryKey].subSettings.map(sub =>
                    sub.key === subKey ? { ...sub, enabled } : sub
                )
            }
        }));
    }, []);

    const renderSubSetting = useCallback((category: NotificationCategory, subSetting: NotificationSubSetting) => {
        return (
            <div
                key={subSetting.key}
                className="notification-sub-setting-item"
            >
                <div className="setting-info">
                    <Text>{subSetting.label}</Text>
                    <br />
                    <Text type="secondary">{subSetting.description}</Text>
                </div>
                <Switch
                    value={subSetting.enabled}
                    onChange={(checked) => handleSubSettingChange(category.key as keyof NotificationSettingsType, subSetting.key, checked)}
                />
            </div>
        );
    }, [handleSubSettingChange]);

    const renderCategory = useCallback((category: NotificationCategory) => {
        return (
            <div key={category.key} className="notification-category">
                <div className="notification-setting-item">
                    <div className="setting-info">
                        <Text>{category.label}</Text>
                        <br />
                        <Text type="secondary">{category.description}</Text>
                    </div>
                    <Switch
                        value={category.enabled}
                        onChange={(checked) => handleCategoryChange(category.key as keyof NotificationSettingsType, checked)}
                    />
                </div>

                {/* Render sub-settings with indentation, only show when main category is enabled */}
                {category.enabled && (
                    <div className="notification-sub-settings">
                        {category.subSettings.map(subSetting => renderSubSetting(category, subSetting))}
                    </div>
                )}
            </div>
        );
    }, [handleCategoryChange, renderSubSetting]);

    const notificationCategories = useMemo(() => [
        settings.email,
        settings.sms,
        settings.zalo
    ], [settings]);

    return (
        <Card className="notification-settings-card">
            <Flex vertical>
                {notificationCategories.map((category, index) => (
                    <div key={category.key}>
                        {renderCategory(category)}
                        {index < notificationCategories.length - 1 && (
                            <Divider />
                        )}
                    </div>
                ))}
            </Flex>
        </Card>
    );
});

export default NotificationSettings;
