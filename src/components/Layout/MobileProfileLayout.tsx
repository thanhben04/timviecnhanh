import React, { useState } from 'react';
import { Layout as AntLayout, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import MobileProfileSidebar from '../../pages/Profile/mobile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useIsMobile } from 'hooks/useIsMobile';
import './MobileProfileLayout.scss';

const { Content } = AntLayout;

interface MobileProfileLayoutProps {
    children: React.ReactNode;
}

// Map URL paths to keys for profile sections
const urlToKeyMap = {
    '/profile/personal': 'personal',
    '/profile/address': 'address',
    '/profile/orders': 'orders',
    '/profile/credits': 'credits',
    '/profile/notifications': 'notifications',
    '/profile/settings': 'settings',
    '/profile/blocked-users': 'blockedUsers',
    '/profile/language': 'language',
    '/profile/help-center': 'helpCenter',
    '/profile/feedbacks': 'feedbacks',
};

const MobileProfileLayout: React.FC<MobileProfileLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isMobile = useIsMobile();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // Get current selected key based on URL
    const getSelectedKey = () => {
        const currentKey = urlToKeyMap[location.pathname as keyof typeof urlToKeyMap];
        return currentKey || 'personal';
    };

    const handleMenuClick = (key: string) => {
        // Menu click is handled by navigation in the sidebar component
        setSidebarVisible(false); // Close sidebar after selection
    };

    const handleLogout = () => {
        logout();
        setSidebarVisible(false);
    };

    const showSidebar = () => {
        setSidebarVisible(true);
    };

    const hideSidebar = () => {
        setSidebarVisible(false);
    };

    if (!isMobile) {
        // If not mobile, just render children without sidebar
        return (
            <AntLayout className="custom-layout">
                <Header />
                <Content className="main-content">{children}</Content>
                <Footer />
            </AntLayout>
        );
    }

    return (
        <AntLayout className="mobile-profile-layout">
            <Header />

            {/* Mobile Profile Content */}
            <Content className="mobile-profile-content">
                {/* Profile Menu Button */}
                <div className="profile-menu-header">
                    <button className="profile-menu-btn" onClick={showSidebar}>
                        <MenuOutlined />
                        <span>Profile Menu</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="profile-page-content">
                    {children}
                </div>

                {/* Mobile Profile Sidebar Drawer */}
                <Drawer
                    title="Profile"
                    placement="left"
                    onClose={hideSidebar}
                    open={sidebarVisible}
                    width="100%"
                    className="mobile-profile-drawer"
                    bodyStyle={{ padding: 0 }}
                >
                    <MobileProfileSidebar
                        user={user}
                        selectedKey={getSelectedKey()}
                        isEditing={false}
                        onMenuClick={handleMenuClick}
                        onEditToggle={() => { }}
                        onLogout={handleLogout}
                    />
                </Drawer>
            </Content>

            <Footer />
        </AntLayout>
    );
};

export default MobileProfileLayout;
