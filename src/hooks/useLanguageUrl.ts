import { useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useLanguageUrl = () => {
    const { i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Update URL when language changes
    const handleLanguageChange = useCallback(
        (language: string) => {
            // Update i18next language
            i18n.changeLanguage(language);

            // Store in localStorage for persistence
            localStorage.setItem('language', language);

            // Update URL parameter while preserving the current path
            const newSearchParams = new URLSearchParams(searchParams);
            if (language !== 'vi') {
                // Don't add param for default language
                newSearchParams.set('lng', language);
            } else {
                newSearchParams.delete('lng');
            }

            // Navigate to the same path with updated query params
            const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
            navigate(newUrl, { replace: true });
        },
        [i18n, searchParams, navigate, location.pathname]
    );

    // Initialize language from URL or localStorage on component mount
    useEffect(() => {
        const urlLang = searchParams.get('lng');
        const storedLang = localStorage.getItem('language');

        // Priority: URL parameter > localStorage > default
        let targetLang = 'vi';

        if (urlLang && ['en', 'zh', 'vi'].includes(urlLang)) {
            targetLang = urlLang;
        } else if (storedLang && ['en', 'zh', 'vi'].includes(storedLang)) {
            targetLang = storedLang;
            // If we have stored language but no URL param, update URL
            if (targetLang !== 'vi') {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set('lng', targetLang);
                navigate(`${location.pathname}?${newSearchParams.toString()}`, {
                    replace: true,
                });
            }
        }

        if (i18n.language !== targetLang) {
            i18n.changeLanguage(targetLang);
            localStorage.setItem('language', targetLang);
        }
    }, [searchParams, i18n, navigate, location.pathname]);

    return {
        currentLanguage: i18n.language,
        changeLanguage: handleLanguageChange,
    };
};
