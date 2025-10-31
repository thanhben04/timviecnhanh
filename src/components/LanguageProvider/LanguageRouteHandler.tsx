import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle language updates when routes change
 * Must be used inside Router context
 */
const LanguageRouteHandler: React.FC = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleRouteLanguageChange = async () => {
            const urlParams = new URLSearchParams(location.search);
            const urlLang = urlParams.get('lng');

            if (urlLang && ['en', 'zh', 'vi'].includes(urlLang)) {
                // Update language if URL parameter is different from current
                if (i18n.language !== urlLang) {
                    await i18n.changeLanguage(urlLang);
                    localStorage.setItem('language', urlLang);
                }
            } else {
                // If no URL parameter, check localStorage
                const storedLanguage = localStorage.getItem('language');
                if (storedLanguage && ['en', 'zh', 'vi'].includes(storedLanguage) && i18n.language !== storedLanguage) {
                    await i18n.changeLanguage(storedLanguage);
                }
            }
        };

        handleRouteLanguageChange();
    }, [location.search, i18n]);

    return null; // This component doesn't render anything
};

export default LanguageRouteHandler;
