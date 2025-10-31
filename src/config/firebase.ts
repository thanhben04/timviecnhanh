import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey:
        process.env.FIREBASE_API_KEY ||
        'AIzaSyB013sh68MU5qyYZHu0AvR8V3bcSETnutk',
    authDomain:
        process.env.FIREBASE_AUTH_DOMAIN ||
        'login-gg-demo-fifobox-app.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'login-gg-demo-fifibox-app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;
