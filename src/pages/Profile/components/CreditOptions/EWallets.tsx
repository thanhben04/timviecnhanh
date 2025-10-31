import React from 'react';
import { Flex, Typography, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import momo from 'assets/images/momo.png';
const { Text } = Typography;

interface EWallet {
    id: string;
    walletType: 'Momo' | 'Zalopay' | 'Vnpay';
    accountNumber: string;
    status: 'linked' | 'pending';
    isDefault?: boolean;
}

interface EWalletsProps {
    eWallets: EWallet[];
    onAddWallet?: () => void;
}

const EWallets: React.FC<EWalletsProps> = ({ eWallets, onAddWallet }) => {
    const { t } = useTranslation();

    return (
        <Flex vertical gap={16}>
            <Flex justify="space-between" align="center" className="section-header">
                <Text strong>{t('electronic_wallets')}</Text>
            </Flex>

            <div className="cards-list">
                {eWallets.map(wallet => (
                    <div key={wallet.id} className="payment-item">
                        <Flex align="center" gap={12} >
                            <Flex vertical gap={16} className="payment-info">
                                <Flex justify='space-between' align='center' className="card-header">
                                    <Flex gap={12} className="card-types">
                                        <Image src={momo} alt="Visa" className="card-type-icon" preview={false} />
                                    </Flex>
                                    {/* <Button
                                        type="text"
                                        icon={<PlusOutlined />}
                                        onClick={onAddWallet}
                                        className="add-button"
                                    >
                                        {t('add_wallet_link')}
                                    </Button> */}
                                </Flex>
                                <Flex justify='space-between' align='center' className="card-details">
                                    <Flex align='center' gap={12} className="bank-info">
                                        <Text strong>{wallet.walletType}</Text>
                                        {wallet.isDefault && (
                                            <Text className="default-badge">{t('default_badge')}</Text>
                                        )}
                                    </Flex>
                                    {wallet.status === 'linked' && (
                                        <Text className="status-linked">{t('linked_status')}</Text>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                ))}
            </div>
        </Flex>
    );
};

export default EWallets;
