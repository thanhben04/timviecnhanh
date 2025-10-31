import {
    LoginOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex } from 'antd';
import { CartIcon } from 'assets/icons/solid/CartIcon';
import { ChevronDown } from 'assets/icons/outlined/ChevronDown';
import { NotificationIcon } from 'assets/icons/solid/NotificationIcon';
import { UserIcon } from 'assets/icons/solid/UserIcon';
import { useAuth } from 'context/AuthContext';
import { useIsMobile } from 'hooks/useIsMobile';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { routeNames } from 'router/constants';
import { LogoutOutlinedIcon } from 'assets/icons/outlined/LogoutOutlinedIcon';
import { UserOutlinedIcon } from 'assets/icons/outlined/UserOutlinedIcon';

const HeaderUser = () => {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const iconSize = isMobile ? 20 : 24;

    const userMenuItems = [
        {
            key: 'profile',
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <UserOutlinedIcon width={16} height={16} />
                    {t('profile')}
                </span>
            ),
            onClick: () => navigate(`${routeNames.PROFILE}`),
        },
        {
            key: 'logout',
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LogoutOutlinedIcon width={16} height={16} />
                    {t('logout')}
                </span>
            ),
            onClick: handleLogout,
        },
    ];

    const renderAuthSection = () => {
        // Show loading state while auth is initializing
        if (loading) {
            return (
                <div className="auth-section">
                    <Button loading>Loading...</Button>
                </div>
            );
        }

        if (isAuthenticated) {
            return (
                <div className="auth-section">
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Flex gap={8} align="center" className="user-dropdown">
                            <UserIcon width={iconSize} height={iconSize} />
                            {!isMobile && (
                                <>
                                    <span className="username">{user?.nick_name || t('account')}</span>
                                    <ChevronDown />
                                </>
                            )}
                        </Flex>
                    </Dropdown>
                </div>
            );
        }

        return (
            <div className="auth-section">
                <Dropdown
                    menu={{
                        items: [{
                            key: 'login',
                            label: (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <LoginOutlined />
                                    {t('login')}
                                </span>
                            ),
                            onClick: () => navigate(`${routeNames.AUTH}`),
                        }]
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                >

                    <Flex gap={8} align="center" className="user-dropdown">
                        <UserIcon width={iconSize} height={iconSize} />
                        {!isMobile && (
                            <>
                                <span className="username">{user?.nick_name || t('account')}</span>
                                <ChevronDown />
                            </>
                        )}
                    </Flex>
                </Dropdown>
            </div >
        );
    };
    return (
        <Flex>
            <Flex justify="space-between" align='center' gap={isMobile ? 12 : 20} className="header-user" style={{ width: '100%' }}>
                <NotificationIcon width={iconSize} height={iconSize} />
                {renderAuthSection()}
                <CartIcon width={iconSize} height={iconSize} />
            </Flex>
        </Flex>
    );
};

export default HeaderUser;
