import React, { memo, useState, useEffect } from 'react';
import { Card, Flex, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguageUrl } from '../../../hooks/useLanguageUrl';
import Radio from 'components/common/CommonInput/Radio';

const { Title, Text } = Typography;

interface LanguageOption {
    code: string;
    name: string;
    flag: string;
    countryCode: string;
}

const LanguageSettings = memo(() => {
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage } = useLanguageUrl();
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    // Sync selectedLanguage with currentLanguage when it changes
    useEffect(() => {
        setSelectedLanguage(currentLanguage);
    }, [currentLanguage]);

    // Available languages with their details
    const languages: LanguageOption[] = [
        {
            code: 'vi',
            name: 'Tiếng Việt',
            flag: 'https://flagcdn.com/vn.svg',
            countryCode: '+84'
        },
        {
            code: 'zh',
            name: '简体中文',
            flag: 'https://flagcdn.com/cn.svg',
            countryCode: '+86'
        },
        {
            code: 'en',
            name: 'English',
            flag: 'https://flagcdn.com/us.svg',
            countryCode: '+44'
        }
    ];

    const handleLanguageChange = async (languageCode: string) => {
        setSelectedLanguage(languageCode);
        try {
            changeLanguage(languageCode);
            message.success(t('language_changed_successfully'));
        } catch (error) {
            message.error(t('language_change_failed'));
        }
    };

    return (
        <div className="language-settings">
            <Card>
                <div className="language-settings-header">
                    <Title level={4}>{t('profile_language_setting')}</Title>
                </div>

                <div className="language-options">
                    <Radio
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        options={languages.map(lang => ({
                            value: lang.code,
                            label: (
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    className="language-content"
                                >
                                    <Flex align="center" gap={12}>
                                        <img
                                            src={lang.flag}
                                            alt={`${lang.name} flag`}
                                            className="language-flag"
                                        />
                                        <Text className="language-name">{lang.name}</Text>
                                    </Flex>
                                    <Text
                                        type="secondary"
                                        className="country-code"
                                    >
                                        {lang.countryCode}
                                    </Text>
                                </Flex>
                            )
                        }))}
                    />
                </div>

            </Card>
        </div>
    );
});

export default LanguageSettings;
