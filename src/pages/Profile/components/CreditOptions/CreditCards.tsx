import React from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import visa_logo from 'assets/images/visa.png';
import mastercard_logo from 'assets/images/master_card.png';
import jcb_logo from 'assets/images/jcb.png';
import america_express_logo from 'assets/images/american_express.png';
import { ChevronRight } from 'assets/icons/outlined/ChevronRight';

const { Text } = Typography;

interface CreditCard {
    id: string;
    cardNumber: string;
    cardType: 'visa' | 'mastercard' | 'jcb' | 'american_express';
    isDefault?: boolean;
    bankName?: string;
}

interface CreditCardsProps {
    creditCards: CreditCard[];
    onAddCard: () => void;
}

const CreditCards: React.FC<CreditCardsProps> = ({ creditCards, onAddCard }) => {
    const { t } = useTranslation();

    return (
        <Flex vertical gap={16}>
            <Flex justify="space-between" align="center" className="section-header">
                <Text>{t('credit_debit_cards')}</Text>
            </Flex>

            <div className="cards-list">
                {creditCards.map(card => (
                    <div key={card.id} className="payment-item">
                        <Flex align="center" gap={12}>
                            <Flex vertical gap={16} className="payment-info">
                                <Flex justify='space-between' align='center' className="card-header">
                                    <Flex gap={12} className="card-types">
                                        <Image src={visa_logo} alt="Visa" className="card-type-icon" preview={false} />
                                        <Image src={mastercard_logo} alt="Mastercard" className="card-type-icon" preview={false} />
                                        <Image src={jcb_logo} alt="JCB" className="card-type-icon" preview={false} />
                                        <Image src={america_express_logo} alt="American Express" className="card-type-icon" preview={false} />
                                    </Flex>
                                    <Button
                                        type="text"
                                        icon={<PlusOutlined />}
                                        onClick={onAddCard}
                                        className="add-button"
                                    >
                                        {t('add_new_card')}
                                    </Button>
                                </Flex>
                                <Flex justify='space-between' align='center' className="card-details">
                                    <Flex align='center' gap={12} className="bank-info">
                                        <Text className="bank-name">{card.bankName}</Text>
                                        {card.isDefault && (
                                            <Text className="default-badge">{t('default_badge')}</Text>
                                        )}
                                    </Flex>
                                    <Flex align='center' gap={12}>
                                        <Text className="card-number">{card.cardNumber}</Text>
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

export default CreditCards;
