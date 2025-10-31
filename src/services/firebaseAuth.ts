import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export interface FirebaseAuthResult {
    user: User;
    token: string;
}

export class FirebaseAuthService {
    // Google Sign In
    static async signInWithGoogle(): Promise<FirebaseAuthResult> {
        try {
            const result: UserCredential = await signInWithPopup(
                auth,
                googleProvider
            );
            const user = result.user;

            // Get the ID token
            const token = await user.getIdToken();

            console.log('Google sign in successful:', {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });

            return {
                user,
                token,
            };
        } catch (error: any) {
            console.error('Google sign in error:', error);
            throw new Error(error.message || 'Failed to sign in with Google');
        }
    }

    // Sign Out
    static async signOut(): Promise<void> {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
        } catch (error: any) {
            console.error('Sign out error:', error);
            throw new Error(error.message || 'Failed to sign out');
        }
    }

    // Get current user
    static getCurrentUser(): User | null {
        return auth.currentUser;
    }

    // Listen to auth state changes
    static onAuthStateChanged(callback: (user: User | null) => void) {
        return auth.onAuthStateChanged(callback);
    }
}

export default FirebaseAuthService;
