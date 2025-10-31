import Cookies from 'js-cookie';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authServices } from '../services/authServices';
import { AuthUser, OTPVerificationRequest, PhoneVerificationRequest } from '../types';
import { debugCookies, testCookies } from '../utils/cookieDebug';
import FirebaseAuthService from '../services/firebaseAuth';
import { routeNames } from 'router/constants';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    sendOTP: (phoneData: PhoneVerificationRequest) => Promise<void>;
    verifyOTPLogin: (otpData: OTPVerificationRequest) => Promise<void>;
    googleLogin: () => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const initializeAuth = async () => {
            try {
                setLoading(true); // Explicitly set loading to true at start
                const token = Cookies.get('authToken');
                const savedUser = Cookies.get('user');

                console.log('Initializing auth...', {
                    token: !!token,
                    savedUser: !!savedUser,
                    tokenValue: token,
                    allCookies: document.cookie
                });

                // Debug cookies
                debugCookies();

                // Test simple cookie functionality
                console.log('Testing simple cookie...');
                testCookies();
                Cookies.set('test-cookie', 'test-value', { path: '/' });
                const testRead = Cookies.get('test-cookie');
                console.log('Test cookie read:', testRead);

                if (token && savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    console.log('User loaded from cookies:', parsedUser);

                    // TEMPORARILY SKIP backend verification to test cookie persistence
                    console.log('Skipping backend verification for debugging');

                    // Optionally verify token with backend
                    // try {
                    //     const currentUser = await authServices.getCurrentUser();
                    //     setUser(currentUser);
                    //     console.log('User verified with backend:', currentUser);
                    // } catch (error) {
                    //     console.log('Token verification failed, clearing cookies');
                    //     // Token might be expired, clear cookies
                    //     Cookies.remove('authToken', { path: '/' });
                    //     Cookies.remove('user', { path: '/' });
                    //     setUser(null);
                    // }
                } else {
                    console.log('No auth data found in cookies');
                    console.log(process.env.REACT_APP_API_URL);

                    // Auto navigate to home page if not logged in
                    if (window.location.pathname !== routeNames.HOME && window.location.pathname !== routeNames.AUTH) {
                        window.location.href = routeNames.HOME;
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                // Add small delay to ensure loading state is visible
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log('Auth initialization complete, setting loading to false');
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const sendOTP = async (phoneData: PhoneVerificationRequest) => {
        try {
            await authServices.sendOTP(phoneData);
        } catch (error) {
            throw error;
        }
    };

    const verifyOTPLogin = async (otpData: OTPVerificationRequest) => {
        try {
            const userData = await authServices.verifyOTP(otpData);
            // Store token and user data in cookies with 7 days expiration
            // Simplified cookie options for debugging
            const cookieOptions = {
                expires: 7,
                path: '/'
                // Removed secure and sameSite for testing
            };

            console.log('Setting cookies with options:', cookieOptions);
            console.log('userData received:', userData);

            // Try setting individual values to avoid JSON issues
            Cookies.set('authToken', userData.token, cookieOptions);
            Cookies.set('userName', userData.nick_name || 'User', cookieOptions);
            Cookies.set('userEmail', userData.email || '', cookieOptions);
            Cookies.set('userId', userData.id?.toString() || '', cookieOptions);

            // Also try the full user object
            try {
                const userString = JSON.stringify(userData);
                Cookies.set('user', userString, cookieOptions);
                console.log('User JSON string:', userString);
            } catch (jsonError) {
                console.error('JSON stringify error:', jsonError);
            }

            // Immediately read back to verify
            setTimeout(() => {
                console.log('Cookies verification after 100ms:', {
                    token: Cookies.get('authToken'),
                    userName: Cookies.get('userName'),
                    user: Cookies.get('user'),
                    allCookies: document.cookie
                });
            }, 100);
            setUser(userData);
        } catch (error) {
            throw error;
        }
    };

    const googleLogin = async () => {
        try {
            const { token } = await FirebaseAuthService.signInWithGoogle();
            const res = await authServices.googleLogin(token);
            console.log('Google login successful:', res);
            const userData: AuthUser = {
                ...res.data?.user,
                token: res.data.token
            }

            const cookieOptions = { expires: 1, path: '/' };
            Cookies.set('authToken', token, cookieOptions);
            Cookies.set('user', JSON.stringify(userData), cookieOptions);
            setUser(userData);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authServices.logout();
        Cookies.remove('authToken', { path: '/' });
        Cookies.remove('user', { path: '/' });
        setUser(null);
        window.location.href = `${routeNames.AUTH}`;
    };

    const value: AuthContextType = {
        user,
        loading,
        sendOTP,
        verifyOTPLogin,
        googleLogin,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
