import {
    Button,
    Card,
    Checkbox,
    Divider,
    Flex,
    Form,
    Input,
    Select,
    Typography,
} from 'antd';
import { DownButtonIcon } from 'assets/icons/DownButtonIcon';
import ContentModal from 'components/Modal/ContentModal';
import CustomStatusModal from 'components/Modal/StatusModal';
import { getPrivacyContent } from 'constants/Privacies';
import { useIsMobile } from 'hooks/useIsMobile';
import { useLanguageNavigation } from 'hooks/useLanguageNavigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/2hand_logo.png';
import loginWrapper from '../../assets/images/login_wrapper.png';
import { useAuth } from '../../context/AuthContext';
import { OTPVerificationRequest, PhoneVerificationRequest } from '../../types';
import { AppDownload } from './AppDownload';
import './PhoneAuth.scss';
import { SocialLogin } from './SocialLogin';
import { mobileCountryCodeList } from 'constants/MobileCodeCountry';
import NumberInput from 'components/common/CommonInput/NumberInput';

const { Text } = Typography;

const PhoneAuth: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | React.ReactElement | null>(null);
    const [countdown, setCountdown] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [contentModal, setContentModal] = useState<{
        open: boolean;
        title: string;
        subtitle?: string;
        sections: Array<{ id: number; title: string; content: string }>;
    }>({
        open: false,
        title: '',
        subtitle: '',
        sections: []
    });
    const { navigateWithLanguage } = useLanguageNavigation();
    const { verifyOTPLogin, sendOTP, googleLogin } = useAuth();
    const isMobile = useIsMobile();


    const handleOpenContentModal = (type: 'terms' | 'privacy' | 'data-sharing') => {
        const content = getPrivacyContent(type);
        setHasError(false);
        setContentModal({
            open: true,
            ...content
        });
    };

    const handleCloseContentModal = () => {
        setContentModal(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSendOTP = useCallback(async () => {
        const phoneNumber = form.getFieldValue('phone');
        const selectedCountryCode = form.getFieldValue('countryCode') || '+84';

        if (!phoneNumber) {
            form.validateFields(['phone']);
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Combine country code with phone number
            const sanitizedCountryCode = selectedCountryCode?.replace('+', '');
            const fullPhoneNumber = `${sanitizedCountryCode}${phoneNumber?.replace(/^0+/, '')}`;

            const payload: PhoneVerificationRequest = {
                mobile: fullPhoneNumber?.trim(),
                key: process.env.REACT_APP_PHONE_VERIFICATION_KEY || 'ZHMM',
            };

            await sendOTP(payload);
            setCountdown(60);
        } catch (err: any) {
            console.log("hehe")
            setError(err.response?.data?.message || err.message || 'Failed to send OTP. Please try again.');
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }, [form, sendOTP]);

    const handleSubmit = useCallback(
        async (values: { phone: string; otp: string; countryCode?: string }) => {
            try {
                setLoading(true);
                setError('');

                // Combine country code with phone number
                const selectedCountryCode = values.countryCode || '+84';
                const sanitizedCountryCode = selectedCountryCode?.replace('+', '');

                const fullPhoneNumber = `${sanitizedCountryCode}${values.phone?.replace(/^0+/, '')}`;

                const payload: OTPVerificationRequest = {
                    phone: fullPhoneNumber?.trim(),
                    code: values.otp?.trim(),
                };

                await verifyOTPLogin(payload);
                navigateWithLanguage('/');
            } catch (err: any) {
                console.log("hehe")
                setError(err.response?.data?.message || err.message || 'Invalid OTP. Please try again.');
                setHasError(true);
            } finally {
                setLoading(false);
            }
        },
        [verifyOTPLogin, navigateWithLanguage]
    );

    const handleSocialLogin = useCallback(async (provider: string) => {
        if (provider === 'google') {
            try {
                await googleLogin();
                navigateWithLanguage('/');
            } catch (error) {
                console.error('Google login failed:', error);
            }
        } else {
            console.log(`Social login with ${provider}`);
        }
    }, [googleLogin, navigateWithLanguage]);

    return (
        <div className="phone-auth-container">
            {!isMobile && (
                <img className="phone-auth-image" src={loginWrapper} alt="Login" />
            )}
            <div className="phone-auth-wrapper">
                <Card className="phone-auth-card" bordered={false}>
                    <AppDownload />
                    <div className="phone-auth-header">
                        <img src={logo} alt="2hand" />
                    </div>

                    <Form
                        form={form}
                        name="phoneAuth"
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="phone-auth-form"
                    >
                        <Form.Item shouldUpdate noStyle>
                            {({ getFieldValue, getFieldsError }) => {
                                const phoneErrors = getFieldsError().find(field => field.name[0] === 'phone')?.errors || [];
                                const hasPhoneError = phoneErrors.length > 0;

                                return (
                                    <Form.Item name="phone_number" required>
                                        <div className={`custom-input ${hasPhoneError ? 'error' : ''}`}>
                                            <label className="floating-label">{t('auth_phone_number')}</label>
                                            <Input.Group compact>
                                                <Form.Item
                                                    name="countryCode"
                                                    initialValue="84"
                                                    noStyle
                                                >
                                                    <Select
                                                        defaultValue="84"
                                                        showSearch
                                                        suffixIcon={<DownButtonIcon />}
                                                        style={{ width: 100 }}
                                                        dropdownStyle={{ width: 484 }}
                                                        optionLabelProp="label"
                                                        filterOption={(input, option) => {
                                                            const callingCode = option?.value as string;
                                                            const item = mobileCountryCodeList.find(i => i.callingCode === callingCode);
                                                            if (!item) return false;
                                                            return (
                                                                item.name.toLowerCase().includes(input.toLowerCase()) ||
                                                                item.callingCode.includes(input)
                                                            );
                                                        }}
                                                    >
                                                        {mobileCountryCodeList.map(item => (
                                                            <Select.Option
                                                                key={item.code}
                                                                value={item.callingCode}
                                                                label={
                                                                    <Flex gap={8} align="center">
                                                                        <img src={item.flag} alt={item.name} width={20} height={20} />
                                                                        <span>+{item.callingCode}</span>
                                                                    </Flex>
                                                                }
                                                            >
                                                                <Flex gap={8} align="center">
                                                                    <img src={item.flag} alt={item.name} width={20} height={20} />
                                                                    <span>{item.name}</span>
                                                                    <span>(+{item.callingCode})</span>
                                                                </Flex>
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name="phone"
                                                    noStyle
                                                    rules={[
                                                        { required: true, message: t('auth_phone_required') },
                                                        {
                                                            pattern: /^[0-9]{9,10}$/,
                                                            message: t('auth_phone_invalid'),
                                                        },
                                                    ]}
                                                >
                                                    <NumberInput
                                                        placeholder={t('auth_enter_phone')}
                                                        maxLength={16}
                                                        className='phone-input'
                                                    />
                                                </Form.Item>
                                            </Input.Group>
                                        </div>
                                    </Form.Item>
                                );
                            }}
                        </Form.Item>
                        <Form.Item shouldUpdate noStyle>
                            {({ getFieldValue, getFieldsError }) => {
                                const phone = getFieldValue('phone');
                                const phoneFieldError = getFieldsError().find(field => field.name[0] === 'phone');
                                const phoneError = phoneFieldError ? phoneFieldError.errors.length > 0 : false;
                                const disableSendOTP = !phone || phoneError || countdown > 0 || loading;
                                return (
                                    <Form.Item
                                        name="otp"
                                        rules={[
                                            { required: true, message: t('auth_otp_required') },
                                            { len: 6, message: t('auth_otp_invalid') },
                                        ]}
                                    >
                                        <div className={`custom-input ${form.getFieldError('otp').length > 0 ? 'error' : ''}`}>
                                            <label className="floating-label">{t('auth_enter_otp')}</label>
                                            <Input
                                                maxLength={6}
                                                placeholder={t('auth_otp_placeholder')}
                                                suffix={
                                                    <Button
                                                        type="link"
                                                        onClick={handleSendOTP}
                                                        disabled={disableSendOTP}
                                                        className={`send-otp-button${disableSendOTP ? '-disabled' : ''}`}
                                                        size="small"
                                                    >
                                                        {countdown > 0 ? t('auth_resend_otp', { countdown }) : t('auth_get_otp')}
                                                    </Button>
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                );
                            }}
                        </Form.Item>
                        <Flex gap={16}>
                            <Form.Item
                                name="agree"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            //  value ? Promise.resolve() : Promise.reject('Bạn cần đồng ý với các điều khoản'),
                                            if (value) {
                                                return Promise.resolve();
                                            }
                                            else {
                                                setHasError(true);
                                                setError(<Text type="secondary">
                                                    {t('auth_terms_error')}{' '}
                                                    <span className="link" onClick={() => handleOpenContentModal('terms')}>{t('auth_terms')}</span>,{' '}
                                                    <span className="link" onClick={() => handleOpenContentModal('privacy')}>{t('auth_privacy')}</span> {t('and')}{' '}
                                                    <span className="link" onClick={() => handleOpenContentModal('data-sharing')}>{t('auth_data_sharing')}</span>
                                                </Text>);
                                                return;
                                            }
                                        }
                                    },
                                ]}
                            >
                                <Checkbox>

                                </Checkbox>
                            </Form.Item>
                            <Text type="secondary">
                                {t('auth_terms_text')}{' '}
                                <span className="link" onClick={() => handleOpenContentModal('terms')}>{t('auth_terms')}</span>,{' '}
                                <span className="link" onClick={() => handleOpenContentModal('privacy')}>{t('auth_privacy')}</span> {t('and')}{' '}
                                <span className="link" onClick={() => handleOpenContentModal('data-sharing')}>{t('auth_data_sharing')}</span>
                            </Text>
                        </Flex>
                        <Form.Item>
                            {/* Disable when one field is not completetd or error */}
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                className="register-button"
                            >
                                {t('auth_register')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>
                        <Text type="secondary">{t('auth_login_with')}</Text>
                    </Divider>

                    <SocialLogin onLogin={handleSocialLogin} />
                </Card>
            </div>
            {/* Make an antd error modal */}
            <CustomStatusModal
                open={hasError}
                modalStatus="error"
                title={t('auth_notification')}
                message={
                    error || t('auth_error')
                }
                onCancel={() => setHasError(false)}
                onConfirm={() => setHasError(false)}
                cancelText={t('auth_cancel')}
                confirmText={t('auth_agree')}
            />

            <ContentModal
                open={contentModal.open}
                onClose={handleCloseContentModal}
                title={contentModal.title}
                subtitle={contentModal.subtitle}
                sections={contentModal.sections}
                closeButtonText={t('auth_close')}
            />
        </div>
    );
};

export default React.memo(PhoneAuth);
