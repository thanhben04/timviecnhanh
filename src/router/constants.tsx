export const routeNames = {
    HOME: '/',
    PROFILE: '/profile',
    AUTH: '/auth',
    APP_DOWNLOAD: '/app-download',
    TRANSLATION_DEMO: '/translation-demo',
    SEARCH: '/search',
    JOB_DETAIL: '/job/:id',
};

// Danh sách các public routes không cần authentication
export const publicRoutes = [
    '/',
    '/auth',
    '/search',
    '/app-download',
    '/translation-demo',
    '/job',
];