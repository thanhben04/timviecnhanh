import Cookies from 'js-cookie';

// Simple cookie debugging utility
export const debugCookies = () => {
    console.log('=== Cookie Debug Info ===');
    console.log('All cookies:', document.cookie);
    console.log('authToken:', Cookies.get('authToken'));
    console.log('user:', Cookies.get('user'));
    console.log('Domain:', window.location.hostname);
    console.log('Protocol:', window.location.protocol);
    console.log('=========================');
};

// Test cookie functionality
export const testCookies = () => {
    console.log('Testing cookie functionality...');

    // Set a test cookie
    Cookies.set('test', 'value', { path: '/' });
    console.log('Set test cookie');

    // Try to read it immediately
    const testValue = Cookies.get('test');
    console.log('Read test cookie immediately:', testValue);

    // Set a test auth token
    Cookies.set('test-authToken', 'fake-token-123', { path: '/' });
    console.log('Set test auth token');

    // Read it back
    const testToken = Cookies.get('test-authToken');
    console.log('Read test auth token:', testToken);

    // Test with different expiration
    Cookies.set('test-7days', 'value-7days', { expires: 7, path: '/' });
    const test7days = Cookies.get('test-7days');
    console.log('Test 7 days cookie:', test7days);

    console.log('All cookies after test:', document.cookie);
};

const cookieDebugUtils = { debugCookies, testCookies };
export default cookieDebugUtils;
