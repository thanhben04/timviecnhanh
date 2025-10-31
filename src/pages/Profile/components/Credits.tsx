import React, { useState, memo, useCallback } from 'react';
import { Flex, Form } from 'antd';
import CreditCards from './CreditOptions/CreditCards';
import BankAccounts from './CreditOptions/BankAccounts';
import EWallets from './CreditOptions/EWallets';
import AddCardModal from '../modals/AddCardModal';
import BankSelectionModal from '../modals/BankSelectionModal';
import BankDetailsModal from '../modals/BankDetailsModal';
import { useBanks, Bank } from './useBanks';

interface CreditCard {
    id: string;
    cardNumber: string;
    cardType: 'visa' | 'mastercard' | 'jcb' | 'american_express';
    isDefault?: boolean;
    bankName?: string;
}

interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    isDefault?: boolean;
}

interface EWallet {
    id: string;
    walletType: 'Momo' | 'Zalopay' | 'Vnpay';
    accountNumber: string;
    status: 'linked' | 'pending';
}

const Credits = memo(() => {
    const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
    const [isAddBankModalVisible, setIsAddBankModalVisible] = useState(false);
    const [isBankDetailsModalVisible, setIsBankDetailsModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState<string>('');
    const [form] = Form.useForm();
    const [bankForm] = Form.useForm();

    // Use the custom hook for banks
    const {
        filteredBanks,
        bankSearchTerm,
        setBankSearchTerm,
        isLoadingBanks
    } = useBanks();

    // Mock data - in real app, this would come from props or API
    const [creditCards] = useState<CreditCard[]>([
        {
            id: '1',
            cardNumber: '**** **** **** 0000',
            cardType: 'visa',
            isDefault: true,
            bankName: 'Vietcombank'
        }
    ]);

    const [bankAccounts] = useState<BankAccount[]>([
        {
            id: '1',
            bankName: 'Vietcombank',
            accountNumber: '*0000',
            accountName: 'Vietcombank',
            // isDefault: true
        }
    ]);

    const [eWallets] = useState<EWallet[]>([
        {
            id: '1',
            walletType: 'Momo',
            accountNumber: '',
            status: 'linked'
        },
    ]);

    const handleAddCard = () => {
        setIsAddCardModalVisible(true);
    };

    const handleAddBank = () => {
        setIsAddBankModalVisible(true);
    };

    const handleBankSelect = (bank: Bank) => {
        setSelectedBank(bank.name);
        setIsAddBankModalVisible(false);
        setIsBankDetailsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsAddCardModalVisible(false);
        form.resetFields();
    };

    const handleBankModalCancel = () => {
        setIsAddBankModalVisible(false);
        setBankSearchTerm('');
    };

    const handleBankDetailsCancel = () => {
        setIsBankDetailsModalVisible(false);
        bankForm.resetFields();
        setSelectedBank('');
    };

    const handleBankDetailsOk = useCallback
        (() => {
            console.log('New bank data:', bankForm.getFieldsValue());
            setIsBankDetailsModalVisible(false);
            // bankForm.validateFields().then(values => {
            //     console.log('New bank account data:', { ...values, bankName: selectedBank });
            //     // Handle adding new bank account
            //     setIsBankDetailsModalVisible(false);
            //     bankForm.resetFields();
            //     setSelectedBank('');
            // });
        }, [bankForm]);

    const handleModalOk = useCallback(() => {
        console.log('New card data:', form.getFieldsValue());
        setIsAddCardModalVisible(false);
        // form.validateFields().then(values => {
        //     console.log('New card data:', values);
        //     // Handle adding new card
        //     setIsAddCardModalVisible(false);
        //     form.resetFields();
        // });
    }, [form]);

    return (
        <div className="credits-container">
            <Flex vertical gap={16} className="credits-section">
                <CreditCards
                    creditCards={creditCards}
                    onAddCard={handleAddCard}
                />

                <BankAccounts
                    bankAccounts={bankAccounts}
                    onAddBank={handleAddBank}
                />

                <EWallets
                    eWallets={eWallets}
                />
            </Flex>

            <AddCardModal
                visible={isAddCardModalVisible}
                form={form}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            />

            <BankSelectionModal
                visible={isAddBankModalVisible}
                banks={filteredBanks}
                isLoading={isLoadingBanks}
                searchTerm={bankSearchTerm}
                onSearchChange={setBankSearchTerm}
                onBankSelect={handleBankSelect}
                onCancel={handleBankModalCancel}
            />

            <BankDetailsModal
                visible={isBankDetailsModalVisible}
                selectedBankName={selectedBank}
                form={bankForm}
                onOk={handleBankDetailsOk}
                onCancel={handleBankDetailsCancel}
            />
        </div>
    );
});

export default Credits;
