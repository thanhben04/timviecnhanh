import React, { memo, useRef } from 'react';
import { Avatar, Card, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ProfileHeaderProps } from '../types';

const ProfileHeader = memo(({ user, onEditToggle, isEditing }: ProfileHeaderProps) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        // Trigger hidden file input
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected avatar file:', file);
        }
    };

    return (
        <Card className="profile-header">
            <Flex gap={12} align="center" justify="flex-start">
                <div className="profile-avatar-section" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                    <Avatar
                        size={54}
                        src={user?.avatar}
                        icon={<UserOutlined />}
                        className="profile-avatar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <span className="profile-name">
                    {user?.nick_name || t('profile_unknown_user')}
                </span>
            </Flex>
        </Card>
    );
});

export default ProfileHeader;
