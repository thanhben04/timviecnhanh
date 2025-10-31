import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BreadcrumbItem } from '../components/Breadcrumb/types';

interface RouteBreadcrumb {
    path: string;
    titleKey: string;
    iconName?: string;
    parentPath?: string;
}

export const useBreadcrumb = (): BreadcrumbItem[] => {
    const location = useLocation();
    const { t } = useTranslation();

    const routeConfig: RouteBreadcrumb[] = useMemo(
        () => [
            {
                path: '/',
                titleKey: 'home',
                iconName: 'home',
            },
            {
                path: '/profile',
                titleKey: 'profile',
                iconName: 'user',
                parentPath: '/',
            },
            {
                path: '/profile/personal',
                titleKey: 'profile_personal_info',
                parentPath: '/profile',
            },
            {
                path: '/profile/security',
                titleKey: 'profile_security',
                parentPath: '/profile',
            },
            {
                path: '/profile/notifications',
                titleKey: 'profile_notifications',
                parentPath: '/profile',
            },
            {
                path: '/profile/orders',
                titleKey: 'profile_my_orders',
                iconName: 'shopping',
                parentPath: '/profile',
            },
            {
                path: '/profile/favorites',
                titleKey: 'profile_favorites',
                iconName: 'heart',
                parentPath: '/profile',
            },
            {
                path: '/profile/settings',
                titleKey: 'profile_settings',
                iconName: 'setting',
                parentPath: '/profile',
            },
            {
                path: '/auth',
                titleKey: 'login',
                iconName: 'phone',
                parentPath: '/',
            },
            {
                path: '/about',
                titleKey: 'about_us',
                iconName: 'info',
                parentPath: '/',
            },
            {
                path: '/contact',
                titleKey: 'contact_us',
                iconName: 'mail',
                parentPath: '/',
            },
        ],
        []
    );

    const breadcrumbItems = useMemo(() => {
        const currentPath = location.pathname;

        // Find current route config
        const currentRoute = routeConfig.find(
            (route) => route.path === currentPath
        );

        if (!currentRoute) {
            // If route not found, just return home
            return [
                {
                    key: 'home',
                    title: t('home'),
                    href: '/',
                },
            ];
        }

        // Build breadcrumb chain by following parent paths
        const buildChain = (route: RouteBreadcrumb): RouteBreadcrumb[] => {
            const chain = [route];

            if (route.parentPath) {
                const parent = routeConfig.find(
                    (r) => r.path === route.parentPath
                );
                if (parent) {
                    chain.unshift(...buildChain(parent));
                }
            }

            return chain;
        };

        const chain = buildChain(currentRoute);

        return chain.map((route, index) => ({
            key: route.path,
            title: t(route.titleKey),
            href: index === chain.length - 1 ? undefined : route.path, // Last item shouldn't be clickable
        }));
    }, [location.pathname, routeConfig, t]);

    return breadcrumbItems;
};

export default useBreadcrumb;
