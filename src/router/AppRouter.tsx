import React from 'react';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';

import LanguageRouteHandler from '../components/LanguageProvider/LanguageRouteHandler';
import Layout from '../components/Layout/Layout';
import MobileProfilePageLayout from '../components/Layout/MobileProfilePageLayout';

import AppDownloadMobile from 'pages/Auth/AppDownloadMobile';
import PhoneAuth from '../pages/Auth/PhoneAuth';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile/Profile';

import {
    Orders,
    Credits,
    NotificationSettings,
    PrivacySettings,
    BlockedUsers,
    LanguageSettings,
    HelpCenter,
    PersonalInfo,
    AddressManagement,
} from '../pages/Profile/components';

import { routeNames } from './constants';

const mobileProfileRoutes = [
    { path: 'personal', element: <PersonalInfo /> },
    { path: 'address', element: <AddressManagement /> },
    { path: 'orders', element: <Orders /> },
    { path: 'credits', element: <Credits /> },
    { path: 'notifications', element: <NotificationSettings /> },
    { path: 'settings', element: <PrivacySettings /> },
    { path: 'blocked-users', element: <BlockedUsers /> },
    { path: 'language', element: <LanguageSettings /> },
    { path: 'help-center', element: <HelpCenter /> },
];

const AppRouter: React.FC = () => {
    return (
        <Router>
            <LanguageRouteHandler />
            <Routes>
                {/* Auth & Download */}
                <Route path={`/${routeNames.AUTH}`} element={<PhoneAuth />} />
                <Route path={`/${routeNames.APP_DOWNLOAD}`} element={<AppDownloadMobile />} />

                {/* Home with Layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />

                {/* Full Profile Page (Desktop) */}
                <Route path={`/${routeNames.PROFILE}`} element={<Layout><Profile /></Layout>} />

                {/* Mobile Profile Sections */}
                {mobileProfileRoutes.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={`/${routeNames.PROFILE}/${path}`}
                        element={<MobileProfilePageLayout>{element}</MobileProfilePageLayout>}
                    />
                ))}

                {/* Redirects */}
                <Route path={`/${routeNames.HOME}`} element={<Navigate to="/" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
