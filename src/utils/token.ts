import Cookies from 'js-cookie';

export const getToken = (): string | null => {
    try {
        const token = Cookies.get('authToken');
        return token ?? null;
    } catch (error) {
        console.error('Error getting auth token from cookies:', error);
        return null;
    }
};
