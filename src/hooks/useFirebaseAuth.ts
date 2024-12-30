import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useToast } from '../contexts/ToastContext';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      showToast('success', 'Signed in successfully');
      return result.user;
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      showToast('success', 'Account created successfully');
      return result.user;
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      showToast('success', 'Signed out successfully');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      showToast('success', 'Signed in with Google successfully');
      return result.user;
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast('success', 'Password reset email sent');
    } catch (error: any) {
      showToast('error', error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    resetPassword
  };
}