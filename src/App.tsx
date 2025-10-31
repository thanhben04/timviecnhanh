import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import LanguageProvider from './components/LanguageProvider/LanguageProvider';
import './App.css';
import './Input.scss'
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <ConfigProvider
                    // theme={{
                    //     token: {
                    //         colorPrimary: '#d00000',
                    //     },
                    // }}
                >
                    <AppRouter />
                </ConfigProvider>
            </LanguageProvider>
        </AuthProvider>
    );
};

export default App;
