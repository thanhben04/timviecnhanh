import { Button, Card, Col, Flex, Form, Row } from 'antd';
import DateInput from 'components/common/CommonInput/DateInput';
import Radio from 'components/common/CommonInput/Radio';
import Select from 'components/common/CommonInput/Select';
import Switch from 'components/common/CommonInput/Switch';
import Textarea from 'components/common/CommonInput/Textarea';
import TextInput from 'components/common/CommonInput/TextInput';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddressOption, addressService } from 'services/addressService';
import PhoneVerificationModal from '../modals/PhoneVerificationModal';
import SmsVerificationModal from '../modals/SmsVerificationModal';
import { useAuth } from 'context/AuthContext';

const PersonalInfo = memo(() => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [form] = Form.useForm();
    const [isChanged, setIsChanged] = useState(false);
    const [provinces, setProvinces] = useState<AddressOption[]>([]);
    const [wards, setWards] = useState<AddressOption[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);

    // Load provinces on component mount
    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const provinceOptions = await addressService.getProvinceOptions();
                setProvinces(provinceOptions);
            } catch (error) {
                console.error('Failed to load provinces:', error);
            }
        };
        loadProvinces();
    }, []);

    // Load wards when province changes
    useEffect(() => {
        const loadWards = async () => {
            if (selectedProvince) {
                try {
                    const wardOptions = await addressService.getWardOptionsByProvince(selectedProvince);
                    setWards(wardOptions);
                } catch (error) {
                    console.error('Failed to load wards:', error);
                }
            } else {
                setWards([]);
            }
        };
        loadWards();
    }, [selectedProvince]);

    const handleProvinceChange = useCallback((value: string) => {
        setSelectedProvince(value);
        // Clear ward selection when province changes
        form.setFieldsValue({ ward: undefined });
    }, [form]);

    const handleCloseVerificationModal = useCallback(() => {
        setIsVerificationModalOpen(false);
    }, []);

    const handleSmsVerification = useCallback(() => {
        console.log('SMS verification selected');
        setIsVerificationModalOpen(false);
        setIsSmsModalOpen(true);
    }, []);

    const handleGoogleVerification = useCallback(() => {
        console.log('Google verification selected');
        // Add your Google verification logic here
        setIsVerificationModalOpen(false);
    }, []);

    const handleZaloVerification = useCallback(() => {
        console.log('Zalo verification selected');
        // Add your Zalo verification logic here
        setIsVerificationModalOpen(false);
    }, []);

    const handleCloseSmsModal = useCallback(() => {
        setIsSmsModalOpen(false);
    }, []);

    const handleSmsVerificationSuccess = useCallback((phoneNumber: string) => {
        console.log('SMS verification successful for phone:', phoneNumber);
        // Update user phone number in form
        form.setFieldsValue({ phone: phoneNumber });
        setIsSmsModalOpen(false);
        // You can also call onSave or update user state here
    }, [form]);

    const handleValuesChange = useCallback(() => {
        setIsChanged(true);
    }, []);

    const handleSave = useCallback((values: any) => {
        // Submission handler left blank
    }, []);

    const formFields = useMemo(() => [
        {
            name: 'nick_name',
            label: t('profile_display_name'),
            initialValue: user?.nick_name,
            component: <TextInput placeholder={t('profile_enter_display_name')} />,
            span: 24
        },
        {
            name: 'phone',
            label: t('profile_phone'),
            initialValue: user?.phone,
            component: (
                <>
                    <div
                        onClick={() => setIsVerificationModalOpen(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <TextInput
                            placeholder={t('profile_phone')}
                            value={user?.phone || ''}
                        />
                    </div>
                    <PhoneVerificationModal
                        title={t('auth_change_phone')}
                        open={isVerificationModalOpen}
                        onClose={handleCloseVerificationModal}
                        onSmsVerification={handleSmsVerification}
                        onGoogleVerification={handleGoogleVerification}
                        onZaloVerification={handleZaloVerification}
                    />
                    <SmsVerificationModal
                        open={isSmsModalOpen}
                        onClose={handleCloseSmsModal}
                        onVerificationSuccess={handleSmsVerificationSuccess}
                    />
                </>
            ),
            span: 12
        },
        {
            name: 'email',
            label: t('profile_email'),
            initialValue: user?.email,
            component: <TextInput disabled placeholder={t('profile_email')} />,
            span: 12
        },
        {
            name: 'birthday',
            label: t('profile_birthday'),
            initialValue: user?.birthday,
            component: (
                <DateInput
                    placeholder={t('profile_select_birthday')}
                    showNowBtn={false}
                />
            ),
            span: 12
        },
        {
            name: 'gender',
            label: t('profile_gender'),
            initialValue: user?.gender === 0 ? 'male' : 'female',
            component: (
                <Radio
                    gridOptionLayout='horizontal'
                    options={
                        [
                            {
                                label: t('profile_male'),
                                value: 'male'
                            },
                            {
                                label: t('profile_female'),
                                value: 'female'
                            }
                        ]
                    }
                    placeholder={t('profile_select_gender')}
                />
            ),
            span: 12
        },
        {
            name: 'province',
            label: t('profile_province'),
            component: (
                <Select
                    options={provinces}
                    placeholder={t('profile_select_province')}
                    onChange={handleProvinceChange}
                />
            ),
            span: 12
        },
        {
            name: 'ward',
            label: t('profile_ward'),
            component: (
                <Select
                    options={wards}
                    placeholder={t('profile_select_ward')}
                    disabled={!selectedProvince}
                />
            ),
            span: 12
        },
        {
            name: 'bio',
            label: t('profile_bio'),
            component: (
                <Textarea
                    placeholder={t('profile_enter_bio')}
                />
            ),
            span: 24
        },
        {
            name: 'profile_management',
            label: t('profile_management'),
            component: (
                <Flex gap={12}>
                    <Flex justify='space-between' align='center' className='profile-management'>
                        <span>{t('profile_age')}</span>
                        <Switch
                            value={true}
                            onChange={(checked) => { }}
                        />
                    </Flex>
                    <Flex justify='space-between' align='center' className='profile-management'>
                        <span>{t('profile_location')}</span>
                        <Switch
                            value={true}
                            onChange={(checked) => { }}
                        />
                    </Flex>
                    <Flex justify='space-between' align='center' className='profile-management'>
                        <span>{t('profile')}</span>
                        <Switch
                            value={true}
                            onChange={(checked) => { }}
                        />
                    </Flex>
                </Flex>
            ),
            span: 24
        },
    ], [user, t, provinces, wards, selectedProvince, handleProvinceChange, isVerificationModalOpen, handleCloseVerificationModal, handleSmsVerification, handleGoogleVerification, handleZaloVerification, isSmsModalOpen, handleCloseSmsModal, handleSmsVerificationSuccess]);

    useEffect(() => {
        form.setFieldsValue({
            ...user,
            gender: user?.gender === 0 ? 'male' : 'female',
        });

        // Set selected province if user has province data
        if (user?.province) {
            setSelectedProvince(user.province);
        }
    }, [form, user]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            onValuesChange={handleValuesChange}
            className='personal-info-form'
        >
            <Card title={
                <Flex justify='space-between' align='center' className='personal-info-header'>
                    {t('profile_personal_info')}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!isChanged}
                            className={`save-button ${isChanged ? 'active' : ''}`}
                        >
                            {t('profile_save_changes')}
                        </Button>
                    </Form.Item>
                </Flex>
            }>

                <Row gutter={[12, 16]}>
                    {formFields.map((field, index) => (
                        <Col span={field.span || 24} key={field.name}>
                            <Form.Item
                                name={field.name}
                                label={field.label}
                                initialValue={field.initialValue}
                            >
                                {field.component}
                            </Form.Item>
                        </Col>
                    ))}

                </Row>
            </Card>
        </Form>

    );
});

export default PersonalInfo;
