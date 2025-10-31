import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { Flex, Layout } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ProfileSidebar, ProfileContent } from './components';
import MobileProfileSidebar from './mobile';
import Breadcrumb from '../../components/Breadcrumb';
import { useProfileBreadcrumb } from '../../hooks/useProfileBreadcrumb';
import './Profile.scss';
import { DiscountIcon } from 'assets/icons/solid/DiscountIcon';
import { useTranslation } from 'react-i18next';
import { FavoriteIcon } from 'assets/icons/solid/FavoriteIcon';
import { ShoppingBagIcon } from 'assets/icons/solid/ShoppingBagIcon';
import { StoreIcon } from 'assets/icons/solid/StoreIcon';
import { ProductList } from 'pages/Home/ProductList/ProductList';
import { useIsMobile } from 'hooks/useIsMobile';

const { Content } = Layout;

// Map URL paths to keys
const urlToKeyMap = {
    '/profile/personal': 'personal',
    '/profile/address': 'address',
    '/profile/orders': 'orders',
    '/profile/credits': 'credits',
    '/profile/notifications': 'notifications',
    '/profile/settings': 'settings',
    '/profile/blocked-users': 'blockedUsers',
    '/profile/language': 'language',
    '/profile/help-center': 'helpCenter',
    '/profile/feedbacks': 'feedbacks',
};

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const isMobile = useIsMobile();

    // Update selectedKey based on current URL
    useEffect(() => {
        const currentKey = urlToKeyMap[location.pathname as keyof typeof urlToKeyMap];
        if (currentKey) {
            setSelectedKey(currentKey);
        } else if (location.pathname === '/profile') {
            setSelectedKey('personal');
        }
    }, [location.pathname]);

    // Generate breadcrumb items based on current section
    const breadcrumbItems = useProfileBreadcrumb(selectedKey as any);

    const statistics = useMemo(() => [
        {
            icon: <DiscountIcon />,
            total: 2,
            label: t('profile_discount_total')
        },
        {
            icon: <FavoriteIcon />,
            total: 15,
            label: t('profile_favorites_total')
        },
        {
            icon: <ShoppingBagIcon />,
            total: 2,
            label: t('profile_in_cart_total')
        },
        {
            icon: <StoreIcon />,
            total: 1,
            label: t('profile_registered_stores_total')
        }
    ], [t])

    const handleMenuClick = useCallback((key: string) => {
        setSelectedKey(key);
        setIsEditing(false); // Reset editing mode when switching tabs
    }, []);

    const handleEditToggle = useCallback(() => {
        setIsEditing(prev => !prev);
    }, []);

    const handleSaveProfile = useCallback((values: any) => {
        console.log('Saving profile:', values);
        // Implement profile save logic
        setIsEditing(false);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    // If mobile and on base /profile route, show mobile ProfileSidebar as full page
    if (isMobile && location.pathname === '/profile') {
        return (
            <div className='profile-wrapper mobile-profile-wrapper'>
                <MobileProfileSidebar
                    user={user}
                    selectedKey={selectedKey}
                    isEditing={isEditing}
                    onMenuClick={handleMenuClick}
                    onEditToggle={handleEditToggle}
                    onLogout={handleLogout}
                />
            </div>
        );
    }

    return (
        <div className='profile-wrapper'>
            <div className="profile-page container">
                <Breadcrumb items={breadcrumbItems} />
                <div className="statistics-grid">
                    {statistics.map((stat, index) => (
                        <Flex gap={16} align='center' className="profile-statistic" key={index}>
                            <Flex align='center' justify='center' className="stat-icon">{stat.icon}</Flex>
                            <Flex vertical className="stat-info">
                                <span className="stat-total">{stat.total}</span>
                                <span className="stat-label">{stat.label}</span>
                            </Flex>
                        </Flex>
                    ))}
                </div>

                <Layout className={`profile-layout`}>
                    <ProfileSidebar
                        user={user}
                        selectedKey={selectedKey}
                        isEditing={isEditing}
                        onMenuClick={handleMenuClick}
                        onEditToggle={handleEditToggle}
                        onLogout={handleLogout}
                    />

                    <Content className={`profile-content`}>
                        <ProfileContent
                            selectedKey={selectedKey}
                            user={user}
                            isEditing={isEditing}
                            onSave={handleSaveProfile}
                        />
                    </Content>
                </Layout>
                <ProductList />
            </div>
        </div>
    );
};

export default memo(Profile);
