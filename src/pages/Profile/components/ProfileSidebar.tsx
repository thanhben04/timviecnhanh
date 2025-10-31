import { memo, useCallback, useMemo, useState } from 'react';
import { Layout, Menu, Button, Divider, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProfileSidebarProps } from '../types';
import ProfileHeader from './ProfileHeader';
import FeedbackModal from '../modals/FeedbackModal';
import { UserOutlinedIcon } from 'assets/icons/outlined/UserOutlinedIcon';
import { LocationOutlinedIcon } from 'assets/icons/outlined/LocationOutlinedIcon';
import { CartOutlinedIcon } from 'assets/icons/outlined/CartOutlinedIcon';
import { CreditOutlinedIcon } from 'assets/icons/outlined/CreditOutlinedIcon';
import { NotiSettingIcon } from 'assets/icons/outlined/NotiSettingIcon';
import { PrivateSettingIcon } from 'assets/icons/outlined/PrivateSettingIcon';
import { BlockIcon } from 'assets/icons/outlined/BlockIcon';
import { GlobeOutlinedIcon } from 'assets/icons/outlined/GlobeOutlinedIcon';
import { HeadphoneOutlinedIcon } from 'assets/icons/outlined/HeadphoneOutlinedIcon';
import { WarningOutlinedIcon } from 'assets/icons/outlined/WarningOutlinedIcon';
import { LogoutOutlinedIcon } from 'assets/icons/outlined/LogoutOutlinedIcon';

const { Sider } = Layout;

const ProfileSidebar = memo(({
    user,
    selectedKey,
    isEditing,
    onMenuClick,
    onEditToggle,
    onLogout,
}: ProfileSidebarProps) => {
    const { t } = useTranslation();
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

    const personalMenuItems = useMemo(() => [
        {
            key: 'personal',
            icon: <UserOutlinedIcon />,
            label: t('profile_personal_info'),
            url: '/profile/personal',
        },
        {
            key: 'address',
            icon: <LocationOutlinedIcon />,
            label: t('profile_address'),
            url: '/profile/address',
        },
        {
            key: 'orders',
            icon: <CartOutlinedIcon />,
            label: t('profile_my_orders'),
            url: '/profile/orders',
        },
        {
            key: 'credits',
            icon: <CreditOutlinedIcon />,
            label: t('profile_credits'),
            url: '/profile/credits',
        }
    ], [t]);

    const settingMenuItems = useMemo(() => [
        {
            key: 'notifications',
            icon: <NotiSettingIcon />,
            label: t('profile_notification_setting'),
            url: '/profile/notifications',
        },
        {
            key: 'settings',
            icon: <PrivateSettingIcon />,
            label: t('profile_private_setting'),
            url: '/profile/settings',
        },
        {
            key: 'blockedUsers',
            icon: <BlockIcon />,
            label: t('profile_blocked_users'),
            url: '/profile/blocked-users',
        },
        {
            key: 'language',
            icon: <GlobeOutlinedIcon />,
            label: t('profile_language_setting'),
            url: '/profile/language',
        }
    ], [t]);

    const helperMenuItems = useMemo(() => [
        {
            key: 'helpCenter',
            icon: <HeadphoneOutlinedIcon />,
            label: t('profile_help_center'),
            url: '/profile/help-center',
        },
        {
            key: 'feedbacks',
            icon: <WarningOutlinedIcon />,
            label: t('profile_feedbacks'),
            onClick: () => setFeedbackModalVisible(true), // Custom handler for feedback
        },
    ], [t, setFeedbackModalVisible]);

    const renderMenu = useCallback((label: string, menuItems: any[]) => {
        return (
            <Flex vertical gap={8} className='profile-menu-container'>
                <span className='profile-menu-label'>{label}</span>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    className="profile-menu-sidebar"
                    items={menuItems.map(item => ({
                        ...item,
                        onClick: () => {
                            if (item.key === 'feedbacks') {
                                setFeedbackModalVisible(true);
                                return;
                            }
                            onMenuClick(item.key);

                            // Handle custom onClick if provided
                            if (item.onClick) {
                                item.onClick();
                            }
                            // Desktop sidebar should NOT navigate to URLs
                            // Navigation is handled by mobile sidebar only
                        }
                    }))}
                />
            </Flex>
        )
    }, [selectedKey, onMenuClick])

    const handleFeedbackSubmit = useCallback((feedbackData: any) => {
        // TODO: Send feedback to backend
        console.log('Feedback submitted:', feedbackData);

        // Show success message or handle response
        // You can add your API call here
    }, []);

    const handleFeedbackCancel = useCallback(() => {
        setFeedbackModalVisible(false);
    }, []);

    return (
        <Sider
            width={280}
            className="profile-sider"
            collapsible={false}
        >

            <div className="profile-sider-content">
                <ProfileHeader
                    user={user}
                    onEditToggle={onEditToggle}
                    isEditing={isEditing}
                />

                {renderMenu(t('personal'), personalMenuItems)}
                <Divider className="profile-menu-divider" />
                {renderMenu(t('settings'), settingMenuItems)}
                <Divider className="profile-menu-divider" />
                {renderMenu(t('helps'), helperMenuItems)}

                <Button
                    type="text"
                    icon={<LogoutOutlinedIcon />}
                    onClick={onLogout}
                    className="logout-btn"
                >
                    {t('profile_logout')}
                </Button>
            </div>

            <FeedbackModal
                visible={feedbackModalVisible}
                onCancel={handleFeedbackCancel}
                onSubmit={handleFeedbackSubmit}
            />
        </Sider >
    );
});

export default ProfileSidebar;
