import React, { useEffect, useState } from 'react';
import { Modal, Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { AddressModalProps, AddressFormData } from '../types';
import { addressService, AddressOption } from '../../../services/addressService';
import TextInput from 'components/common/CommonInput/TextInput';
import Textarea from 'components/common/CommonInput/Textarea';
import Select from 'components/common/CommonInput/Select';

const AddressModal: React.FC<AddressModalProps> = ({
    visible,
    address,
    onCancel,
    onSubmit,
    isEditing = false
}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [provinceOptions, setProvinceOptions] = useState<AddressOption[]>([]);
    const [wardOptions, setWardOptions] = useState<AddressOption[]>([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('');

    // Load provinces when modal opens
    useEffect(() => {
        if (visible) {
            loadProvinces();
        }
    }, [visible]);

    // Load initial data when editing
    useEffect(() => {
        if (visible) {
            if (address && isEditing) {
                form.setFieldsValue(address);
                // If editing, load wards for the selected province
                if (address.city) {
                    setSelectedProvinceCode(address.city);
                    loadWards(address.city);
                }
            } else {
                form.resetFields();
                setWardOptions([]);
                setSelectedProvinceCode('');
            }
        }
    }, [visible, address, isEditing, form]);

    const loadProvinces = async () => {
        try {
            setLoadingProvinces(true);
            const options = await addressService.getProvinceOptions();
            setProvinceOptions(options);
        } catch (error) {
            console.error('Failed to load provinces:', error);
        } finally {
            setLoadingProvinces(false);
        }
    };

    const loadWards = async (provinceCode: string) => {
        try {
            setLoadingWards(true);
            const options = await addressService.getWardOptionsByProvince(provinceCode);
            setWardOptions(options);
        } catch (error) {
            console.error('Failed to load wards:', error);
        } finally {
            setLoadingWards(false);
        }
    };

    const handleProvinceChange = (value: string) => {
        setSelectedProvinceCode(value);
        form.setFieldValue('ward', undefined); // Clear ward selection
        setWardOptions([]);
        if (value) {
            loadWards(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values as AddressFormData);
            form.resetFields();
        } catch (error) {
            console.error('Form validation failed:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={isEditing ? t('profile_edit_address') : t('profile_add_new_address')}
            open={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            width={435}
            okText={isEditing ? t('profile_update_address') : t('profile_add_address')}
            cancelText={t('cancel')}
            destroyOnClose
            className='address-modal'
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    isDefault: false
                }}
            >
                <Form.Item
                    name="name"
                    label={t('profile_address_name')}
                    rules={[
                        { required: true, message: t('profile_address_name_required') },
                        { max: 50, message: t('profile_address_name_max_length') }
                    ]}
                >
                    <TextInput placeholder={t('profile_address_name_placeholder')} />
                </Form.Item>
                <Form.Item
                    name="phone_number"
                    label={t('profile_phone_number')}
                    rules={[
                        { required: true, message: t('profile_phone_number_required') },
                        {
                            pattern: /^(\+84|84|0)[3-9]\d{8}$/,
                            message: t('profile_phone_number_invalid')
                        }
                    ]}
                >
                    <TextInput placeholder={t('profile_phone_number_placeholder')} />
                </Form.Item>

                <Form.Item
                    name="city"
                    label={t('profile_address_city')}
                    rules={[
                        { required: true, message: t('profile_address_city_required') }
                    ]}
                >
                    <Select
                        placeholder={t('profile_address_city_placeholder')}
                        loading={loadingProvinces}
                        options={provinceOptions}
                        onChange={handleProvinceChange}
                    />
                </Form.Item>
                <Form.Item
                    name="ward"
                    label={t('profile_address_ward')}
                    rules={[
                        { required: true, message: t('profile_address_ward_required') }
                    ]}
                >
                    <Select
                        placeholder={t('profile_address_ward_placeholder')}
                        loading={loadingWards}
                        options={wardOptions}
                        disabled={!selectedProvinceCode}
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    label={t('profile_address_detail')}
                    rules={[
                        { required: true, message: t('profile_address_detail_required') },
                        { max: 200, message: t('profile_address_detail_max_length') }
                    ]}
                >
                    <Textarea
                        placeholder={t('profile_address_detail_placeholder')}
                    />
                </Form.Item>

                <Form.Item
                    name="isDefault"
                    valuePropName="checked"
                >
                    <Checkbox>
                        {t('profile_set_default_address')}
                    </Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddressModal;
