import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useLanguageNavigation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const navigateWithLanguage = useCallback(
        (path: string, options?: { replace?: boolean }) => {
            const currentLang = searchParams.get('lng');

            // Preserve language parameter if it exists
            if (currentLang && ['en', 'zh'].includes(currentLang)) {
                const separator = path.includes('?') ? '&' : '?';
                const pathWithLang = `${path}${separator}lng=${currentLang}`;
                navigate(pathWithLang, options);
            } else {
                navigate(path, options);
            }
        },
        [navigate, searchParams]
    );

    return { navigateWithLanguage };
};
