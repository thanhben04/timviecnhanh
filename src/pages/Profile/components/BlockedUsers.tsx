import React, { memo, useState, useMemo, useCallback } from 'react';
import { Card, List, Avatar, Button, Typography, Empty, Space, Modal, message, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

interface BlockedUser {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    blockedDate: string;
    reason?: string;
}

const BlockedUsers = memo(() => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [unblockModalVisible, setUnblockModalVisible] = useState(false);
    const [userToUnblock, setUserToUnblock] = useState<BlockedUser | null>(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    // Mock data - In real app, this would come from API
    const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
        {
            id: '1',
            username: 'user123',
            displayName: 'John Doe',
            avatar: undefined,
            blockedDate: '2024-01-15',
            reason: 'Spam'
        },
        {
            id: '2',
            username: 'seller456',
            displayName: 'Jane Smith',
            avatar: undefined,
            blockedDate: '2024-01-10',
            reason: 'Inappropriate behavior'
        },
        {
            id: '3',
            username: 'buyer789',
            displayName: 'Bob Wilson',
            avatar: undefined,
            blockedDate: '2024-01-05',
            reason: 'Harassment'
        }
    ]);

    // Filter blocked users based on search text
    const filteredUsers = useMemo(() => {
        return blockedUsers;
    }, [blockedUsers]); const handleUnblockClick = useCallback((user: BlockedUser) => {
        setUserToUnblock(user);
        setUnblockModalVisible(true);
    }, []);

    const handleUnblockConfirm = useCallback(async () => {
        if (!userToUnblock) return;

        try {
            setIsLoading(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Remove user from blocked list
            setBlockedUsers(prev => prev.filter(user => user.id !== userToUnblock.id));

            message.success(t('blocked_users_unblock_success', { name: userToUnblock.displayName }));
            setUnblockModalVisible(false);
            setUserToUnblock(null);
        } catch (error) {
            message.error(t('blocked_users_unblock_error'));
            console.error('Failed to unblock user:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userToUnblock, t]);

    const handleUnblockCancel = useCallback(() => {
        setUnblockModalVisible(false);
        setUserToUnblock(null);
        setAgreeToTerms(false);
        setDontShowAgain(false);
    }, []);

    const renderBlockedUser = useCallback((user: BlockedUser) => (
        <List.Item
            key={user.id}
            className="blocked-user-item"
            actions={[
                <Button
                    type="primary"
                    size="small"
                    onClick={() => handleUnblockClick(user)}
                    className="unblock-button"
                >
                    {t('blocked_users_unblock')}
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={
                    <Avatar
                        size={48}
                        src={user.avatar}
                        icon={<UserOutlined />}
                        className="user-avatar"
                    />
                }
                title={
                    <Space direction="vertical" size={0} className="user-info">
                        <Text strong className="display-name">{user.displayName}</Text>
                        {/* <Text type="secondary" className="username">@{user.username}</Text> */}
                    </Space>
                }
            // description={
            //     <Space direction="vertical" size={4} className="user-details">
            //         <Text type="secondary" className="blocked-date">
            //             {t('blocked_users_blocked_on', { date: formatDate(user.blockedDate) })}
            //         </Text>
            //         {user.reason && (
            //             <Text type="secondary" className="block-reason">
            //                 {t('blocked_users_reason')}: {user.reason}
            //             </Text>
            //         )}
            //     </Space>
            // }
            />
        </List.Item>
    ), [t, handleUnblockClick]);

    return (
        <div className="blocked-users">
            <Card>
                <div className="blocked-users-header">
                    <Title level={4} className="section-title">
                        {t('profile_blocked_users')}
                    </Title>
                </div>
                <div className="blocked-users-content">
                    {filteredUsers.length > 0 ? (
                        <>
                            {/* <div className="blocked-users-count">
                                <Text type="secondary">
                                    {t('blocked_users_count', {
                                        count: filteredUsers.length,
                                        total: blockedUsers.length
                                    })}
                                </Text>
                            </div> */}
                            <List
                                dataSource={filteredUsers}
                                renderItem={renderBlockedUser}
                                className="blocked-users-list"
                                pagination={filteredUsers.length > 10 ? {
                                    pageSize: 10,
                                    showSizeChanger: false,
                                    showQuickJumper: false,
                                } : false}
                            />
                        </>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={t('blocked_users_empty_state')}
                            className="empty-state"
                        />
                    )}
                </div>
            </Card>

            <Modal
                title={t('blocked_users_modal_title')}
                open={unblockModalVisible}
                onCancel={handleUnblockCancel}
                footer={null}
                className="unblock-modal"
                centered
                width={400}
                closable={false}
            >
                <div className="modal-content">
                    <Text className="modal-message">
                        {t('blocked_users_modal_message', { name: userToUnblock?.displayName })}
                    </Text>

                    <div className="modal-checkboxes">
                        <div className="checkbox-item">
                            <Checkbox
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                            >
                                {t('blocked_users_agree_terms_prefix')}{' '}
                                <button type="button" className="terms-link">
                                    {t('blocked_users_terms_link')}
                                </button>
                            </Checkbox>
                        </div>
                        <div className="checkbox-item">
                            <Checkbox
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                            >
                                {t('blocked_users_dont_show_again')}
                            </Checkbox>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <Button
                            onClick={handleUnblockCancel}
                            className="cancel-button"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleUnblockConfirm}
                            loading={isLoading}
                            className="confirm-button"
                            disabled={!agreeToTerms}
                        >
                            {t('blocked_users_confirm')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default BlockedUsers;
