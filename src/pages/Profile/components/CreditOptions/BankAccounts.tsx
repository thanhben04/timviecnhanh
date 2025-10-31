import React from 'react';
import { Button, Flex, Typography, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ChevronRight } from 'assets/icons/outlined/ChevronRight';
import { useTranslation } from 'react-i18next';
import banks from 'assets/images/banks.png';
const { Text } = Typography;

interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    isDefault?: boolean;
}

interface BankAccountsProps {
    bankAccounts: BankAccount[];
    onAddBank: () => void;
}

const BankAccounts: React.FC<BankAccountsProps> = ({ bankAccounts, onAddBank }) => {
    const { t } = useTranslation();

    return (
        <Flex vertical gap={16}>
            <Flex justify="space-between" align="center" className="section-header">
                <Text strong>{t('bank_accounts')}</Text>
            </Flex>

            <div className="cards-list">
                {bankAccounts.map(account => (
                    <div key={account.id} className="payment-item">
                        <Flex align="center" gap={12}>
                            <Flex vertical gap={16} className="payment-info">
                                <Flex justify='space-between' align='center' className="card-header">
                                    <Flex gap={12} className="card-types">
                                        <Image src={banks} alt="Visa" className="card-type-icon" preview={false} />
                                    </Flex>
                                    <Button
                                        type="text"
                                        icon={<PlusOutlined />}
                                        onClick={onAddBank}
                                        className="add-button"
                                    >
                                        {t('add_account')}
                                    </Button>
                                </Flex>
                                <Flex justify='space-between' align='center' className="card-details">
                                    <Flex align='center' gap={12} className="bank-info">
                                        <Text strong>{account.bankName}</Text>
                                        {account.isDefault && (
                                            <Text className="default-badge">{t('default_badge')}</Text>
                                        )}
                                    </Flex>
                                    <Flex align='center' gap={12}>
                                        <Text className="card-number">{account.accountNumber}</Text>
                                        <ChevronRight stroke='#A3A3A3' />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                ))}
            </div>
        </Flex>
    );
};

export default BankAccounts;
