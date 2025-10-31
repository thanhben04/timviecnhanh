import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Input, Form, Select, message, Flex } from 'antd';
import { ChevronDown } from 'assets/icons/outlined/ChevronDown';
import { mobileCountryCodeList } from 'constants/MobileCodeCountry';
import { useTranslation } from 'react-i18next';

interface SmsVerificationModalProps {
    open: boolean;
    onClose: () => void;
    onVerificationSuccess?: (phoneNumber: string) => void;
}

const SmsVerificationModal: React.FC<SmsVerificationModalProps> = ({
    open,
    onClose,
    onVerificationSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [hasPhoneError, setHasPhoneError] = useState(false);
    const { t } = useTranslation();

    // Countdown effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleClose = useCallback(() => {
        setCountdown(0);
        form.resetFields();
        onClose();
    }, [form, onClose]);

    const handleSendOtp = useCallback(async () => {
        try {
            const values = form.getFieldsValue(['countryCode', 'phone']);
            const phoneNumber = `+${values.countryCode}${values.phone}`;

            if (!values.phone || !/^[0-9]{9,10}$/.test(values.phone)) {
                setHasPhoneError(true);
                message.error(t('auth_phone_invalid'));
                return;
            }

            setHasPhoneError(false);
            setLoading(true);

            // Simulate OTP send API
            console.log('Sending OTP to:', phoneNumber);
            message.success(t('auth_otp_sent'));
            setCountdown(60); // start countdown
        } catch (error) {
            console.error('Failed to send OTP:', error);
            message.error(t('auth_send_otp_failed'));
        } finally {
            setLoading(false);
        }
    }, [form, t]);

    const handleVerifyOtp = useCallback(
        async (values: any) => {
            try {
                setLoading(true);
                const fullPhoneNumber = `+${values.countryCode}${values.phone}`;
                const otp = values.otp;

                // Simulate OTP verification
                console.log('Verifying OTP:', otp, 'for', fullPhoneNumber);

                if (otp !== '123456') {
                    throw new Error('Invalid OTP');
                }

                message.success(t('auth_verify_success'));
                if (onVerificationSuccess) {
                    onVerificationSuccess(fullPhoneNumber);
                }
                handleClose();
            } catch (error) {
                console.error('Failed to verify OTP:', error);
                message.error(t('auth_verify_failed'));
            } finally {
                setLoading(false);
            }
        },
        [handleClose, onVerificationSuccess, t]
    );

    const disableSendOTP = countdown > 0 || loading;

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            closable
            centered
            width={435}
            className="sms-verification-modal"
            title={
                <div className="phone-verification-modal-header">
                    <span className="modal-title">{t('auth_change_phone')}</span>
                </div>
            }
        >
            <div className="sms-verification-modal-body">
                <div className="verification-subtitle">
                    {t('auth_enter_phone_for_otp')}
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    className="sms-verification-form"
                    onFinish={handleVerifyOtp}
                >
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
                                        suffixIcon={<ChevronDown stroke='#171717' />}
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
                                    <Input
                                        placeholder={t('auth_enter_phone')}
                                        style={{ width: 'calc(100% - 100px)' }}
                                        maxLength={16}
                                    />
                                </Form.Item>
                            </Input.Group>
                        </div>
                    </Form.Item>

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
                                        onClick={handleSendOtp}
                                        disabled={disableSendOTP}
                                        className={`send-otp-button${disableSendOTP ? '-disabled' : ''}`}
                                        size="small"
                                    >
                                        {countdown > 0
                                            ? t('auth_resend_otp', { countdown })
                                            : t('auth_get_otp')}
                                    </Button>
                                }
                            />
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            className='verify-otp-button'
                        >
                            {t('auth_change_phone')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default SmsVerificationModal;
