import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const { i18n } = useTranslation();
    const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);

    useEffect(() => {
        const initializeLanguage = async () => {
            // Get language from localStorage first (for persistence)
            const storedLanguage = localStorage.getItem('language');

            // Get language from URL query parameter using window.location
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lng');

            // Priority: URL parameter > Stored language > Default
            let targetLanguage = 'vi'; // Default to Vietnamese

            if (urlLang && ['en', 'zh', 'vi'].includes(urlLang)) {
                targetLanguage = urlLang;
            } else if (storedLanguage && ['en', 'zh', 'vi'].includes(storedLanguage)) {
                targetLanguage = storedLanguage;
            }

            // Store the language in localStorage for persistence
            localStorage.setItem('language', targetLanguage);

            // Change language if it's different from current
            if (i18n.language !== targetLanguage) {
                await i18n.changeLanguage(targetLanguage);
            }

            setIsLanguageInitialized(true);
        };

        initializeLanguage();

        // Listen for URL changes to update language
        const handleLocationChange = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lng');

            if (urlLang && ['en', 'zh', 'vi'].includes(urlLang) && i18n.language !== urlLang) {
                i18n.changeLanguage(urlLang);
                localStorage.setItem('language', urlLang);
            }
        };

        // Listen for popstate events (back/forward navigation)
        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, [i18n]);

    // Show loading or render children based on initialization state
    if (!isLanguageInitialized) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spin size="large" />
            </div>
        );
    }

    return <>{children}</>;
};

export default LanguageProvider;
