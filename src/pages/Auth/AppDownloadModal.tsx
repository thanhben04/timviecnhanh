import { CloseOutlined } from '@ant-design/icons';
import { Col, Flex, Image, Modal, Row, Typography } from 'antd';
import React, { useCallback } from 'react';
import logo from '../../assets/images/2hand_logo.png';
import appMockup from '../../assets/images/app_mockup.png';
import placeholder from '../../assets/images/placeholder.png';

const { Title, Text } = Typography;

interface AppDownloadModalProps {
    open: boolean;
    onClose: () => void;
}

const AppDownloadModal: React.FC<AppDownloadModalProps> = React.memo(({ open, onClose }) => {
    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Modal
            open={open}
            footer={null}
            closable={false}
            centered
            width={1138}
            className="app-download-modal"
        >
            <Row gutter={24}>
                <Col span={12} className="left-section">
                    <div className="text-wrapper">
                        <Title level={5} style={{ color: '#d40000', marginBottom: 0 }}>
                            MUA BÁN DỄ DÀNG HƠN
                        </Title>
                        <Text style={{ color: '#4a4a4a' }}>CHỈ VỚI MỘT CHẠM!</Text>
                    </div>
                    <Image className='app-image' src={appMockup} width={283} preview={false} />
                </Col>
                <Col span={12} className="right-section">
                    <Image src={logo} width={100} preview={false} />
                    <Flex gap={16}>
                        <Flex vertical align="center" gap={8} className="qr-section">
                            <Image src={placeholder} preview={false} />
                            <Text>
                                Quét mã QR để tải ứng dụng trên <span className="app">App Store</span>
                            </Text>
                        </Flex>
                        <Flex vertical align="center" gap={8} className="qr-section">
                            <Image src={placeholder} preview={false} />
                            <Text>
                                Quét mã QR để tải ứng dụng trên <span className="app">App Store</span>
                            </Text>
                        </Flex>
                    </Flex>
                </Col>
            </Row>
            <CloseOutlined className="modal-close" onClick={handleCancel} />
        </Modal>
    );
});

export default AppDownloadModal;
