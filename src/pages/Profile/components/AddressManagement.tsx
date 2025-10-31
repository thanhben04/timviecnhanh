import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, List, Space, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addressService } from '../../../services/addressService';
import AddressModal from '../modals/AddressModal';
import CustomStatusModal from '../../../components/Modal/StatusModal';
import { Address, AddressFormData } from '../types';
import { EditIcon } from 'assets/icons/outlined/EditIcon';
import { RemoveIcon } from 'assets/icons/outlined/RemoveIcon';
import { useIsMobile } from 'hooks/useIsMobile';

const { Text, Title } = Typography;

const AddressManagement = () => {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            name: 'Huynh Mai An Phu',
            phone_number: '+84987654321',
            city: '79', // Ho Chi Minh City code
            cityName: 'TP. Hồ Chí Minh',
            ward: '27169', // Example ward code for Binh Thanh district
            wardName: 'Phường 25, Quận Bình Thạnh',
            address: '2A Điện Biên Phủ',
            isDefault: true
        },
        {
            id: '2',
            name: 'Huynh Mai An Phu',
            phone_number: '+84987654321',
            city: '79', // Ho Chi Minh City code
            cityName: 'TP. Hồ Chí Minh',
            ward: '27169', // Example ward code for Binh Thanh district
            wardName: 'Phường 25, Quận Bình Thạnh',
            address: '2A Điện Biên Phủ',
            isDefault: false
        }
    ]);

    const isMobile = useIsMobile();

    const onAddAddress = async (addressData: AddressFormData) => {
        // Resolve province and ward names
        const province = addressService.getProvinceByCode(addressData.city);
        const ward = addressService.getWardByCode(addressData.ward);

        const newAddress: Address = {
            id: Date.now().toString(), // In real app, this would come from API
            ...addressData,
            cityName: province?.name || addressData.city,
            wardName: ward?.name || addressData.ward
        };

        // If new address is set as default, remove default from others
        if (addressData.isDefault) {
            setAddresses(prev => [
                newAddress,
                ...prev.map(addr => ({ ...addr, isDefault: false }))
            ]);
        } else {
            setAddresses(prev => [...prev, newAddress]);
        }
    };

    const onEditAddress = async (id: string, addressData: AddressFormData) => {
        // Resolve province and ward names
        const province = addressService.getProvinceByCode(addressData.city);
        const ward = addressService.getWardByCode(addressData.ward);

        setAddresses(prev => prev.map(addr => {
            if (addr.id === id) {
                return {
                    ...addr,
                    ...addressData,
                    cityName: province?.name || addressData.city,
                    wardName: ward?.name || addressData.ward
                };
            }
            // If this address is being set as default, remove default from others
            if (addressData.isDefault && addr.id !== id) {
                return { ...addr, isDefault: false };
            }
            return addr;
        }));
    };

    const onDeleteAddress = (id: string) => {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const onSetDefaultAddress = (id: string) => {
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const handleAddAddress = () => {
        setEditingAddress(undefined);
        setIsEditing(false);
        setModalVisible(true);
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleModalSubmit = (values: AddressFormData) => {
        if (isEditing && editingAddress?.id) {
            // If setting as default, remove default from other addresses
            if (values.isDefault) {
                onSetDefaultAddress(editingAddress.id);
            }
            onEditAddress(editingAddress.id, values);
        } else {
            onAddAddress(values);

            // If setting as default for new address, need to handle in parent component
        }
        setModalVisible(false);
        setEditingAddress(undefined);
        setIsEditing(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditingAddress(undefined);
        setIsEditing(false);
    };

    const handleDeleteClick = (id: string) => {
        setAddressToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (addressToDelete) {
            onDeleteAddress(addressToDelete);
        }
        setDeleteModalVisible(false);
        setAddressToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setAddressToDelete(null);
    };

    const getLocationDisplayName = (address: Address) => {
        // Try to get names from addressService, fallback to stored values
        const province = addressService.getProvinceByCode(address.city);
        const ward = addressService.getWardByCode(address.ward);

        const provinceName = province?.name || address.cityName || address.city;
        const wardName = ward?.name || address.wardName || address.ward;

        return `${wardName}, ${provinceName}`;
    };

    const renderAddressItem = (address: Address) => (
        <List.Item
            key={address.id}
            className="address-item"
        >
            <Flex vertical={isMobile} gap={12} justify='space-between' align='center' className="address-content">
                <Flex vertical gap={8} className="address-header">
                    <Space align="center">
                        <Text strong>{address.name}</Text>
                        <Text type="secondary">|</Text>
                        <Text>{address.phone_number}</Text>
                    </Space>
                    <div className="address-detail">
                        <Text type="secondary">{address.address}, {getLocationDisplayName(address)}</Text>
                    </div>
                    {address.isDefault && (
                        <Tag className='default-address-tag'>{t('profile_default_address')}</Tag>
                    )}
                </Flex>
                <div className="address-actions">
                    <Flex gap={12}>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleEditAddress(address)}
                            icon={<EditIcon />}
                            className="manage-address-btn"
                        >
                            {t('profile_edit_address_btn')}
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleDeleteClick(address.id!)}
                            icon={<RemoveIcon />}
                            className="manage-address-btn"
                        >
                            {t('profile_delete_address_btn')}
                        </Button>
                    </Flex>
                </div>
            </Flex>
        </List.Item>
    );

    return (
        <Card>
            <div className="address-management">
                <div className="address-header-section">
                    <Title level={4}>{t('profile_address')}</Title>
                </div>
                <List
                    dataSource={addresses}
                    renderItem={renderAddressItem}
                    className="address-list"
                />
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddAddress}
                    className="add-address-btn"
                >
                    {t('profile_add_new_address')}
                </Button>

                <AddressModal
                    visible={modalVisible}
                    address={editingAddress}
                    onCancel={handleModalCancel}
                    onSubmit={handleModalSubmit}
                    isEditing={isEditing}
                />

                <CustomStatusModal
                    open={deleteModalVisible}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    modalStatus="warning"
                    title={t('profile_delete_address_confirm_title')}
                    message={t('profile_delete_address_confirm')}
                    cancelText={t('no')}
                    confirmText={t('yes')}
                />
            </div>
        </Card>
    );
};

export default AddressManagement;
