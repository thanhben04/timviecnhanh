import React from 'react';
import { Layout as AntLayout } from 'antd';
import './Layout.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const { Content } = AntLayout;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AntLayout className="custom-layout">
            <Header />
            <Content className="main-content">{children}</Content>
            <Footer />
        </AntLayout>
    );
};

export default Layout;
