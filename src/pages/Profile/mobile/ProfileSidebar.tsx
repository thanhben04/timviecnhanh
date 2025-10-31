import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, List, Typography } from 'antd';
import { BlockIcon } from 'assets/icons/outlined/BlockIcon';
import { CartOutlinedIcon } from 'assets/icons/outlined/CartOutlinedIcon';
import { ChevronRight } from 'assets/icons/outlined/ChevronRight';
import { CreditOutlinedIcon } from 'assets/icons/outlined/CreditOutlinedIcon';
import { GlobeOutlinedIcon } from 'assets/icons/outlined/GlobeOutlinedIcon';
import { HeadphoneOutlinedIcon } from 'assets/icons/outlined/HeadphoneOutlinedIcon';
import { LocationOutlinedIcon } from 'assets/icons/outlined/LocationOutlinedIcon';
import { LogoutOutlinedIcon } from 'assets/icons/outlined/LogoutOutlinedIcon';
import { NotiSettingIcon } from 'assets/icons/outlined/NotiSettingIcon';
import { PrivateSettingIcon } from 'assets/icons/outlined/PrivateSettingIcon';
import { UserOutlinedIcon } from 'assets/icons/outlined/UserOutlinedIcon';
import { WarningOutlinedIcon } from 'assets/icons/outlined/WarningOutlinedIcon';
import { DiscountIcon } from 'assets/icons/solid/DiscountIcon';
import { FavoriteIcon } from 'assets/icons/solid/FavoriteIcon';
import { ShoppingBagIcon } from 'assets/icons/solid/ShoppingBagIcon';
import { StoreIcon } from 'assets/icons/solid/StoreIcon';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../modals/FeedbackModal';
import { ProfileSidebarProps } from '../types';
import './MobileProfileSidebar.scss';

const { Text } = Typography;

interface MobileProfileSidebarProps extends ProfileSidebarProps {
    className?: string;
}

const MobileProfileSidebar = memo(({
    user,
    selectedKey,
    isEditing,
    onMenuClick,
    onEditToggle,
    onLogout,
    className = ''
}: MobileProfileSidebarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

    // Mock stats - you can replace with real data
    const personalMenuItems = useMemo(() => [
        {
            key: 'personal',
            icon: <UserOutlinedIcon />,
            label: t('profile_personal_info') || 'Tài khoản & Bảo mật',
            url: '/profile/personal',
        },
        {
            key: 'address',
            icon: <LocationOutlinedIcon />,
            label: t('profile_address') || 'Địa chỉ',
            url: '/profile/address',
        },
        {
            key: 'orders',
            icon: <CartOutlinedIcon />,
            label: t('profile_my_orders') || 'Đơn hàng của tôi',
            url: '/profile/orders',
        },
        {
            key: 'credits',
            icon: <CreditOutlinedIcon />,
            label: t('profile_credits') || 'Tài khoản/Thẻ ngân hàng',
            url: '/profile/credits',
        }
    ], [t]);

    const settingMenuItems = useMemo(() => [
        {
            key: 'notifications',
            icon: <NotiSettingIcon />,
            label: t('profile_notification_setting') || 'Cài đặt thông báo',
            url: '/profile/notifications',
        },
        {
            key: 'settings',
            icon: <PrivateSettingIcon />,
            label: t('profile_private_setting') || 'Cài đặt riêng tư',
            url: '/profile/settings',
        },
        {
            key: 'blockedUsers',
            icon: <BlockIcon />,
            label: t('profile_blocked_users') || 'Danh sách chặn',
            url: '/profile/blocked-users',
        },
        {
            key: 'language',
            icon: <GlobeOutlinedIcon />,
            label: t('profile_language_setting') || 'Ngôn ngữ',
            url: '/profile/language',
        }
    ], [t]);

    const helperMenuItems = useMemo(() => [
        {
            key: 'helpCenter',
            icon: <HeadphoneOutlinedIcon />,
            label: t('profile_help_center') || 'Trung tâm hỗ trợ',
            url: '/profile/help-center',
        },
        {
            key: 'feedbacks',
            icon: <WarningOutlinedIcon />,
            label: t('profile_feedbacks') || 'Góp ý sản phẩm',
            onClick: () => setFeedbackModalVisible(true),
        },
        {
            key: 'logout',
            icon: <LogoutOutlinedIcon />,
            label: t('profile_logout') || 'Đăng xuất',
            onClick: onLogout
        }
    ], [t, onLogout]);

    const handleMenuItemClick = useCallback((item: any) => {
        onMenuClick(item.key);

        if (item.onClick) {
            item.onClick();
        } else if (item.url) {
            navigate(item.url);
        }
    }, [onMenuClick, navigate]);

    const handleFeedbackSubmit = useCallback((feedbackData: any) => {
        console.log('Feedback submitted:', feedbackData);
        // TODO: Send feedback to backend
    }, []);

    const handleFeedbackCancel = useCallback(() => {
        setFeedbackModalVisible(false);
    }, []);

    const renderMenuSection = useCallback((title: string, items: any[]) => {
        return (
            <div className="mobile-profile-menu-section">
                <Text className="mobile-profile-section-title">{title}</Text>
                <List
                    dataSource={items}
                    renderItem={(item) => (
                        <List.Item
                            className={`mobile-profile-menu-item ${selectedKey === item.key ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                                <Flex align="center" gap={12}>
                                    <span className="mobile-profile-menu-icon">{item.icon}</span>
                                    <Text className="mobile-profile-menu-label">{item.label}</Text>
                                </Flex>
                                <ChevronRight />
                            </Flex>
                        </List.Item>
                    )}
                />
            </div>
        );
    }, [selectedKey, handleMenuItemClick]);

    const statistics = useMemo(() => [
        {
            icon: <DiscountIcon size={14} />,
            total: 2,
            label: t('profile_discount_total')
        },
        {
            icon: <FavoriteIcon size={14} />,
            total: 15,
            label: t('profile_favorites_total')
        },
        {
            icon: <ShoppingBagIcon size={14} />,
            total: 2,
            label: t('profile_in_cart_total')
        },
        {
            icon: <StoreIcon size={14} />,
            total: 1,
            label: t('profile_registered_stores_total')
        }
    ], [t])

    return (
        <div className={`mobile-profile-sidebar ${className}`}>
            {/* User Profile Header */}
            <Flex vertical gap={16} className="mobile-profile-header">
                {/* User Info */}
                <Flex vertical align="center" justify='center' gap={12}>
                    <Avatar
                        size={60}
                        src={user?.avatar}
                        icon={<UserOutlined />}
                        className="mobile-profile-avatar"
                    />
                    <Text className="mobile-profile-name">
                        {user?.nick_name || t('profile_unknown_user') || 'Nguyễn Hồ Thanh Bến'}
                    </Text>
                </Flex>

                <div className="statistics-grid">
                    {statistics.map((stat, index) => (
                        <Flex gap={4} align='center' className="profile-statistic" key={index}>
                            <Flex align='center' justify='center' gap={4}>
                                <Flex align='center' justify='center' className="stat-icon">
                                    {stat.icon}
                                </Flex>
                                <span className="stat-total">{stat.total}</span>
                            </Flex>

                            <span className="stat-label">{stat.label}</span>
                        </Flex>
                    ))}
                </div>
            </Flex>

            {/* Menu Sections */}
            <div className="mobile-profile-menu">
                {renderMenuSection(t('personal') || 'Cá nhân', personalMenuItems)}
                {renderMenuSection(t('settings') || 'Cài đặt', settingMenuItems)}
                {renderMenuSection(t('helps') || 'Trợ giúp', helperMenuItems)}
            </div>
            {/* Feedback Modal */}
            <FeedbackModal
                visible={feedbackModalVisible}
                onCancel={handleFeedbackCancel}
                onSubmit={handleFeedbackSubmit}
            />
        </div>
    );
});

export default MobileProfileSidebar;
