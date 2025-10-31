import React, { useState } from 'react';
import { Modal, Button, Form, Typography, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import TextInput from 'components/common/CommonInput/TextInput';
import Radio from 'components/common/CommonInput/Radio';


const { Text } = Typography;

interface BankDetailsModalProps {
    visible: boolean;
    selectedBankName: string;
    form: any;
    onOk: () => void;
    onCancel: () => void;
}

const BankDetailsModal: React.FC<BankDetailsModalProps> = ({
    visible,
    selectedBankName,
    form,
    onOk,
    onCancel
}) => {
    const { t } = useTranslation();
    const [connectionMethod, setConnectionMethod] = useState<'account' | 'card'>('account');

    return (
        <Modal
            title={selectedBankName}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={435}
            className="bank-details-modal"
            footer={[
                <Button key="back" onClick={onCancel}>
                    {t('back')}
                </Button>,
                <Button key="confirm" type="primary" onClick={onOk} className="confirm-btn">
                    {t('confirm')}
                </Button>
            ]}
        >
            <div className="bank-details-content">
                <div className="connection-info">
                    <Text>{t('connection_method')}</Text>
                    <Radio
                        className='connection-method'
                        options={[
                            { label: t('account_number_option'), value: 'account' },
                            { label: t('card_number_option'), value: 'card' }
                        ]}
                        value={connectionMethod}
                        gridOptionLayout='horizontal'
                        onChange={(value) => setConnectionMethod(value as 'account' | 'card')}
                    />
                </div>

                <Form form={form} layout="vertical" className="bank-details-form custom-input" style={{ marginTop: 16 }}>
                    {connectionMethod === 'account' && (
                        <>
                            <Form.Item
                                name="accountNumber"
                                label={t('account_number')}
                                rules={[{ required: true, message: t('account_number_required') }]}
                            >
                                <TextInput placeholder={t('account_number_placeholder')} />
                            </Form.Item>

                            <Form.Item
                                name="accountHolder"
                                label={t('account_holder')}
                                rules={[{ required: true, message: t('account_holder_required') }]}
                            >
                                <TextInput placeholder={t('account_holder_placeholder')} />
                            </Form.Item>
                        </>
                    )}

                    {connectionMethod === 'card' && (
                        <>
                            <Form.Item
                                name="cardNumber"
                                label={t('card_number')}
                                rules={[{ required: true, message: t('card_number_required') }]}
                            >
                                <TextInput placeholder={t('card_number_placeholder')} />
                            </Form.Item>

                            <Form.Item
                                name="issueDate"
                                label={t('issue_date')}
                                rules={[{ required: true, message: t('issue_date_required') }]}
                            >
                                <TextInput placeholder={t('issue_date_placeholder')} />
                            </Form.Item>
                        </>
                    )}
                </Form>

                <Flex vertical gap={12} className="verification-info">
                    <Text strong>{t('pre_link_conditions')}</Text>
                    <div className="info-list">
                        <Text>{t('support_account_link')}</Text>
                        <Text>{t('support_card_link')}</Text>
                        <Text>{t('sms_banking_required')}</Text>
                        <Text>{t('minimum_balance')}</Text>
                    </div>

                    <Text strong className="verification-title">{t('bank_verification')}</Text>
                    <div className="info-list">
                        <Text>{t('phone_verification')}</Text>
                    </div>
                </Flex>
            </div>
        </Modal>
    );
};

export default BankDetailsModal;
