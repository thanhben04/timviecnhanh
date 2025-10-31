import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbItem } from '../components/Breadcrumb/types';

type ProfileSection =
    | 'personal'
    | 'address'
    | 'orders'
    | 'credits'
    | 'notifications'
    | 'settings'
    | 'blockedUsers'
    | 'language'
    | 'helpCenter'
    | 'feedbacks';

interface ProfileBreadcrumbConfig {
    section: ProfileSection;
    titleKey: string;
}

export const useProfileBreadcrumb = (
    currentSection?: ProfileSection
): BreadcrumbItem[] => {
    const { t } = useTranslation();

    const sectionConfig: Record<ProfileSection, ProfileBreadcrumbConfig> =
        useMemo(
            () => ({
                personal: {
                    section: 'personal',
                    titleKey: 'profile_personal_info',
                },
                address: {
                    section: 'address',
                    titleKey: 'profile_address',
                },
                orders: {
                    section: 'orders',
                    titleKey: 'profile_my_orders',
                },
                credits: {
                    section: 'credits',
                    titleKey: 'profile_credits',
                },
                notifications: {
                    section: 'notifications',
                    titleKey: 'profile_notification_setting',
                },
                settings: {
                    section: 'settings',
                    titleKey: 'profile_private_setting',
                },
                blockedUsers: {
                    section: 'blockedUsers',
                    titleKey: 'profile_blocked_users',
                },
                language: {
                    section: 'language',
                    titleKey: 'profile_language_setting',
                },
                helpCenter: {
                    section: 'helpCenter',
                    titleKey: 'profile_help_center',
                },
                feedbacks: {
                    section: 'feedbacks',
                    titleKey: 'profile_feedbacks',
                },
            }),
            []
        );

    const breadcrumbItems = useMemo(() => {
        const items: BreadcrumbItem[] = [
            {
                key: 'home',
                title: t('home'),
                href: '/',
            },
            {
                key: 'profile',
                title: t('profile'),
                href: currentSection ? '/profile' : undefined,
            },
        ];

        if (currentSection && sectionConfig[currentSection]) {
            const config = sectionConfig[currentSection];
            items.push({
                key: config.section,
                title: t(config.titleKey),
            });
        }

        return items;
    }, [currentSection, sectionConfig, t]);

    return breadcrumbItems;
};

export default useProfileBreadcrumb;
