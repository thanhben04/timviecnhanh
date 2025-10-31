import React, { useState } from 'react';
import { Modal, Tag, Flex, Typography, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { TextArea } = Input;

interface FeedbackModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (data: FeedbackData) => void;
}

interface FeedbackData {
    topic: string;
    message: string;
    rating: number;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
    visible,
    onCancel,
    onSubmit,
}) => {
    const { t } = useTranslation();
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const navigate = useNavigate();

    const feedbackTopics = [
        {
            key: 'search',
            label: t('feedback_search_tool') || 'Công cụ tìm kiếm',
        },
        {
            key: 'interface',
            label: t('feedback_interface') || 'Tính năng giao diện web',
        },
        {
            key: 'purchase',
            label: t('feedback_purchase_process') || 'Quy trình mua/bán sản phẩm',
        },
        {
            key: 'notification',
            label: t('feedback_notification') || 'Thông báo đơn hàng',
        },
        {
            key: 'other',
            label: t('feedback_other') || 'Khác',
        },
    ];

    const emojiRatings = [
        { value: 1, emoji: '😞' },
        { value: 2, emoji: '😕' },
        { value: 3, emoji: '🙂' },
        { value: 4, emoji: '😊' },
        { value: 5, emoji: '🤩' },
    ];

    const handleSubmit = () => {
        if (!selectedTopic || !message.trim()) {
            return;
        }

        const feedbackData: FeedbackData = {
            topic: selectedTopic,
            message: message.trim(),
            rating: selectedRating,
        };

        onSubmit(feedbackData);
        handleCancel();
        navigate('/profile');
    };

    const handleCancel = () => {
        setSelectedTopic('');
        setMessage('');
        setSelectedRating(0);
        onCancel();
    };

    return (
        <Modal
            open={visible}
            onCancel={handleCancel}
            closable={true}
            centered
            width={500}
            className="feedback-modal"
            title={t('feedback_modal_title') || 'Góp ý sản phẩm'}
            onOk={() => handleSubmit()}
            okText={t('submit') || 'Gửi'}
            cancelText={t('cancel') || 'Hủy'}
        >
            <Flex vertical gap={20} className="feedback-modal-content">
                {/* Description */}
                <Text className="feedback-description">
                    {t('feedback_description') || 'Chúng tôi trân trọng mọi ý kiến từ bạn! Hãy đánh chú thời gian chia sẻ cảm nhận và góp ý về sản phẩm của chúng tôi.'}
                </Text>

                {/* Topic Selection */}
                <Flex vertical gap={12}>
                    <Text strong>
                        {t('feedback_topic_label') || 'Chủ đề cần góp ý'}
                    </Text>
                    <Flex wrap gap={8} className="feedback-topics">
                        {feedbackTopics.map((topic) => (
                            <Tag.CheckableTag
                                key={topic.key}
                                checked={selectedTopic === topic.key}
                                onChange={(checked) => {
                                    if (checked) {
                                        setSelectedTopic(topic.key);
                                    } else {
                                        setSelectedTopic('');
                                    }
                                }}
                                className="feedback-topic-tag"
                            >
                                {topic.label}
                            </Tag.CheckableTag>
                        ))}
                    </Flex>
                </Flex>

                {/* Message Input */}
                <Flex vertical gap={12}>
                    <Text strong>
                        {t('feedback_message_label') || 'Nội dung góp ý'}
                    </Text>
                    <TextArea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('feedback_message_placeholder') || 'Chia sẻ ý kiến của bạn...'}
                        rows={4}
                        maxLength={500}
                        showCount
                    />
                </Flex>

                {/* Rating */}
                <Flex vertical gap={12}>
                    <Text strong>
                        {t('feedback_rating_question') || 'Bạn có hài lòng với 2Hand không?'}
                    </Text>
                    <Flex gap={16} justify="space-between" className="emoji-ratings">
                        {emojiRatings.map((rating) => (
                            <Flex
                                key={rating.value}
                                vertical
                                align="center"
                                gap={4}
                                className={`emoji-rating ${selectedRating === rating.value ? 'selected' : ''}`}
                                onClick={() => setSelectedRating(rating.value)}
                            >
                                <span className="emoji">{rating.emoji}</span>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default FeedbackModal;
