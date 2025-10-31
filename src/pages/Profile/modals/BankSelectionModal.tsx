import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from 'assets/icons/outlined/SearchIcon';

interface Bank {
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
    short_name: string;
    support: number;
    isTransfer: number;
    swift_code: string;
}

interface BankSelectionModalProps {
    visible: boolean;
    banks: Bank[];
    isLoading: boolean;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onBankSelect: (bank: Bank) => void;
    onCancel: () => void;
}

const BankSelectionModal: React.FC<BankSelectionModalProps> = ({
    visible,
    banks,
    isLoading,
    searchTerm,
    onSearchChange,
    onBankSelect,
    onCancel
}) => {
    const { t } = useTranslation();
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

    useEffect(() => {
        if (!visible) {
            setSelectedBank(null); // reset selection when modal closes
        }
    }, [visible]);

    return (
        <Modal
            title={t('add_linked_bank')}
            open={visible}
            onCancel={onCancel}
            onOk={() => selectedBank && onBankSelect(selectedBank)}
            okText={t('next')}
            cancelText={t('cancel')}
            className="bank-selection-modal"
            width={435}
        >
            <div className="bank-modal-content">
                <div className="search-section">
                    <Input
                        placeholder={t('search_bank')}
                        suffix={<SearchIcon />}
                        className="bank-search"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="banks-grid">
                    {isLoading ? (
                        <div className="loading-banks">{t('loading_banks')}</div>
                    ) : (
                        banks.map(bank => (
                            <div
                                key={bank.id}
                                className={`bank-item ${selectedBank?.id === bank.id ? 'selected' : ''}`}
                                onClick={() => setSelectedBank(bank)}
                            >
                                <div className="bank-logo">
                                    {bank.logo ? (
                                        <img src={bank.logo} alt={bank.name} className="bank-logo-img" />
                                    ) : (
                                        <div className="bank-logo-placeholder">🏦</div>
                                    )}
                                </div>
                                {/* <Text className="bank-name">{bank.shortName || bank.short_name || bank.name}</Text> */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default BankSelectionModal;
