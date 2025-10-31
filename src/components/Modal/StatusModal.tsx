import React from 'react';
import { Modal, Button, Flex } from 'antd';
import {
    InfoCircleFilled,
    CheckCircleFilled,
    WarningFilled,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ErrorStatusIcon } from 'assets/icons/ErrorStatusIcon';
import './Modal.scss';


const statusIconMap = {
    error: <ErrorStatusIcon />,
    info: <InfoCircleFilled style={{ fontSize: 36, color: '#1890ff' }} />,
    success: <CheckCircleFilled style={{ fontSize: 36, color: 'green' }} />,
    warning: <ErrorStatusIcon fill='#faad14' />,
};

interface CustomStatusModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    modalStatus?: 'error' | 'info' | 'success' | 'warning';
    title?: string;
    message: React.ReactNode;
    cancelText?: string;
    confirmText?: string;
}

const CustomStatusModal: React.FC<CustomStatusModalProps> = ({
    open,
    onCancel,
    onConfirm,
    modalStatus = 'info',
    title,
    message,
    cancelText,
    confirmText,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            closable={false}
            centered
            width={420}
            className="custom-status-modal"
        >
            <div className="modal-body">
                <Flex vertical gap={12} align='center'>
                    {statusIconMap[modalStatus]}
                    <h3 className="modal-title">{title || t('app_title')}</h3>
                </Flex>
                <div className="modal-message">{message}</div>
                <div className="modal-footer">
                    <Button onClick={onCancel}>{cancelText || t('cancel')}</Button>
                    <Button type="primary" danger={modalStatus === 'error'} onClick={onConfirm}>
                        {confirmText || t('confirm')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CustomStatusModal;
