import React from 'react';
import { Modal, Flex } from 'antd';
import './Modal.scss';

interface ContentSection {
    id: number;
    title: string;
    content: string;
}

interface ContentModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    sections: ContentSection[];
    closeButtonText?: string;
}

const ContentModal: React.FC<ContentModalProps> = ({
    open,
    onClose,
    title,
    subtitle,
    sections,
    closeButtonText,
}) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={true}
            centered
            width={600}
            className="content-modal"
            title={title}
        >
            <Flex vertical gap={16} className="content-modal-body">
                {/* Title and subtitle */}
                <div className="content-modal-title-section">
                    {subtitle && (
                        <p className="content-modal-subtitle">{subtitle}</p>
                    )}
                </div>

                {/* Content sections */}
                <div className="content-modal-sections">
                    {sections.map((section) => (
                        <div key={section.id} className="content-section">
                            <h3 className="section-title">
                                {section.id}. {section.title}
                            </h3>
                            <p className="section-content">{section.content}</p>
                        </div>
                    ))}
                </div>
            </Flex>
        </Modal>
    );
};

export default ContentModal;
