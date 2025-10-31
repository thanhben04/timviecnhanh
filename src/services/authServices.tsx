import Cookies from 'js-cookie';
import { AuthUser, PhoneVerificationRequest, OTPVerificationRequest } from "../types";
import apiClient from "./api";

// Auth-related API calls
export const authServices = {
    // Send OTP to phone number
    sendOTP: (phoneData: PhoneVerificationRequest): Promise<{ success: boolean; message: string }> =>
        apiClient.post('/sms/send', phoneData),

    // Verify OTP and login/register
    verifyOTP: (otpData: OTPVerificationRequest): Promise<AuthUser> =>
        apiClient.post('/sms/verify', otpData),

    //google login 
    googleLogin: (idToken: string): Promise<{ data: { token: string; user: AuthUser } }> =>
        apiClient.post('/auth/google', { idToken }),

    // Logout
    logout: (): Promise<void> => {
        Cookies.remove('authToken', { path: '/' });
        Cookies.remove('user', { path: '/' });
        return Promise.resolve();
    },

    // Get current user
    getCurrentUser: (): Promise<AuthUser> => apiClient.get('/auth/me'),

    // Refresh token
    refreshToken: (): Promise<{ token: string }> =>
        apiClient.post('/auth/refresh'),
};
