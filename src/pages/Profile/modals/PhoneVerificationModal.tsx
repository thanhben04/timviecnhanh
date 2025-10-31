import React from 'react';
import { Modal, Flex, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { GoogleIcon } from 'assets/icons/GoogleIcon';
import { ZaloIcon } from 'assets/icons/ZaloIcon';
import { ChevronRight } from 'assets/icons/outlined/ChevronRight';

interface PhoneVerificationOption {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

interface PhoneVerificationModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    onSmsVerification: () => void;
    onGoogleVerification: () => void;
    onZaloVerification: () => void;
}

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
    open,
    onClose,
    title,
    onSmsVerification,
    onGoogleVerification,
    onZaloVerification,
}) => {
    const { t } = useTranslation();

    const verificationOptions: PhoneVerificationOption[] = [
        {
            id: 'sms',
            icon: <MessageOutlined style={{ fontSize: '20px', color: '#1677ff' }} />,
            title: t('phone_verification_sms_title'),
            description: t('phone_verification_sms_desc'),
            onClick: onSmsVerification,
        },
        {
            id: 'google',
            icon: <GoogleIcon />,
            title: t('phone_verification_google_title'),
            description: t('phone_verification_google_desc'),
            onClick: onGoogleVerification,
        },
        {
            id: 'zalo',
            icon: <ZaloIcon />,
            title: t('phone_verification_zalo_title'),
            description: t('phone_verification_zalo_desc'),
            onClick: onZaloVerification,
        },
    ];

    const handleOptionClick = (option: PhoneVerificationOption) => {
        option.onClick();
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={true}
            centered
            width={435}
            className="phone-verification-modal"
            title={
                <div className="phone-verification-modal-header">
                    <span className="modal-title">{title}</span>
                </div>
            }
        >
            <div className="phone-verification-modal-body">
                <div className="verification-subtitle">
                    {t('phone_verification_method_select')}
                </div>

                <Flex vertical gap={12} className="verification-options">
                    {verificationOptions.map((option) => (
                        <Button
                            key={option.id}
                            className="verification-option-button"
                            onClick={() => handleOptionClick(option)}
                            type="text"
                        >
                            <div className="option-content">
                                <div className="option-icon">
                                    {option.icon}
                                </div>
                                <div className="option-text">
                                    <div className="option-title">{option.title}</div>
                                    <div className="option-description">{option.description}</div>
                                </div>
                                <ChevronRight />
                            </div>
                        </Button>
                    ))}
                </Flex>
            </div>
        </Modal>
    );
};

export default PhoneVerificationModal;
