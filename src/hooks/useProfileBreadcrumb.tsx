import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbItem } from '../components/Breadcrumb/types';
import {
    UserOutlined,
    HomeOutlined,
    SafetyOutlined,
    BellOutlined,
    ShoppingOutlined,
    HeartOutlined,
    SettingOutlined
} from '@ant-design/icons';

type ProfileSection = 'personal' | 'security' | 'notifications' | 'orders' | 'favorites' | 'settings';

interface ProfileBreadcrumbConfig {
    section: ProfileSection;
    titleKey: string;
    icon: React.ReactNode;
}

export const useProfileBreadcrumb = (currentSection?: ProfileSection): BreadcrumbItem[] => {
    const { t } = useTranslation();

    const sectionConfig: Record<ProfileSection, ProfileBreadcrumbConfig> = useMemo(() => ({
        personal: {
            section: 'personal',
            titleKey: 'profile_personal_info',
            icon: <UserOutlined />
        },
        security: {
            section: 'security',
            titleKey: 'profile_security',
            icon: <SafetyOutlined />
        },
        notifications: {
            section: 'notifications',
            titleKey: 'profile_notifications',
            icon: <BellOutlined />
        },
        orders: {
            section: 'orders',
            titleKey: 'profile_my_orders',
            icon: <ShoppingOutlined />
        },
        favorites: {
            section: 'favorites',
            titleKey: 'profile_favorites',
            icon: <HeartOutlined />
        },
        settings: {
            section: 'settings',
            titleKey: 'profile_settings',
            icon: <SettingOutlined />
        }
    }), []);

    const breadcrumbItems = useMemo(() => {
        const items: BreadcrumbItem[] = [
            {
                key: 'home',
                title: t('home'),
                href: '/',
                icon: <HomeOutlined />
            },
            {
                key: 'profile',
                title: t('profile'),
                href: currentSection ? '/profile' : undefined,
                icon: <UserOutlined />
            }
        ];

        if (currentSection && sectionConfig[currentSection]) {
            const config = sectionConfig[currentSection];
            items.push({
                key: config.section,
                title: t(config.titleKey),
                icon: config.icon
            });
        }

        return items;
    }, [currentSection, sectionConfig, t]);

    return breadcrumbItems;
};

export default useProfileBreadcrumb;
