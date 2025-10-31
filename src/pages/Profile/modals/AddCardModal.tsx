import React from 'react';
import { Modal, Button, Form, Typography, Flex, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { SecurityCheckedIcon } from 'assets/icons/outlined/SecurityCheckedIcon';
import visa_logo from 'assets/images/visa.png';
import mastercard_logo from 'assets/images/master_card.png';
import jcb_logo from 'assets/images/jcb.png';
import america_express_logo from 'assets/images/american_express.png';
import TextInput from 'components/common/CommonInput/TextInput';

const { Text } = Typography;

interface AddCardModalProps {
    visible: boolean;
    form: any;
    onOk: () => void;
    onCancel: () => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ visible, form, onOk, onCancel }) => {
    const { t } = useTranslation();

    return (
        <Modal
            title={t('add_credit_debit_card')}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            className="add-card-modal"
            width={435}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {t('cancel')}
                </Button>,
                <Button key="submit" type="primary" onClick={onOk} className="submit-btn">
                    {t('confirm')}
                </Button>
            ]}
        >
            <Flex vertical gap={16} className="modal-content">
                <div className="security-notice">
                    <Text className="security-text">
                        <SecurityCheckedIcon />
                        {t('card_security_notice')}
                    </Text>
                    <Text className="security-subtext">
                        {t('card_security_description')}
                    </Text>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    className="card-form custom-input"
                >
                    <Flex justify='space-between' align='center' className="card-header">
                        <Text>{t('card_details')}</Text>
                        <Flex gap={12} className="card-types">
                            <Image src={visa_logo} alt="Visa" className="card-type-icon" preview={false} />
                            <Image src={mastercard_logo} alt="Mastercard" className="card-type-icon" preview={false} />
                            <Image src={jcb_logo} alt="JCB" className="card-type-icon" preview={false} />
                            <Image src={america_express_logo} alt="American Express" className="card-type-icon" preview={false} />
                        </Flex>
                    </Flex>

                    <Form.Item
                        name="cardholderName"
                        label={t('cardholder_name')}
                        rules={[{ required: true, message: t('cardholder_name_required') }]}
                    >
                        <TextInput placeholder={t('cardholder_name_placeholder')} />
                    </Form.Item>

                    <Form.Item
                        name="cardNumber"
                        label={t('card_number')}
                        rules={[{ required: true, message: t('card_number_required') }]}
                    >
                        <TextInput placeholder={t('card_number_placeholder')} />
                    </Form.Item>

                    <Flex gap={16}>
                        <Form.Item
                            name="expiryDate"
                            label={t('expiry_date')}
                            className="expiry-field"
                            rules={[{ required: true, message: t('expiry_date_required') }]}
                        >
                            <TextInput placeholder={t('expiry_date_placeholder')} />
                        </Form.Item>

                        <Form.Item
                            name="cvv"
                            label={t('cvv_code')}
                            className="cvv-field"
                            rules={[{ required: true, message: t('cvv_required') }]}
                        >
                            <TextInput placeholder={t('cvv_placeholder')} />
                        </Form.Item>
                    </Flex>

                    <Text>{t('card_registration_address')}</Text>

                    <Form.Item
                        name="address"
                        label={t('address')}
                        rules={[{ required: true, message: t('address_required') }]}
                    >
                        <TextInput placeholder={t('address_placeholder')} />
                    </Form.Item>

                    <Form.Item
                        name="postalCode"
                        label={t('postal_code')}
                        rules={[{ required: true, message: t('postal_code_required') }]}
                    >
                        <TextInput placeholder={t('postal_code_placeholder')} />
                    </Form.Item>

                    <Text className="terms-text">
                        {t('verification_fee_notice')}
                    </Text>
                </Form>
            </Flex>
        </Modal>
    );
};

export default AddCardModal;
