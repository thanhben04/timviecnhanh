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


import { routeNames } from './constants';
import SearchJob from 'pages/SearchJob/SearchJob';
import JobDetail from 'pages/Job/JobDetail';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <LanguageRouteHandler />
            <Routes>

                {/* Home with Layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />

                {/* Home with Layout */}
                <Route path="/search" element={<Layout><SearchJob /></Layout>} />
                <Route path="/job/:id" element={<Layout><JobDetail /></Layout>} />


                {/* Redirects */}
                <Route path={`/${routeNames.HOME}`} element={<Navigate to="/" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
