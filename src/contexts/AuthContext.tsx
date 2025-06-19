import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserById } from '../services/userService';
import { User } from '../types/user';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
  error: null,
  refreshUserData: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const fetchUserData = async (user: FirebaseUser) => {
    try {
      // Force token refresh to ensure we have the latest claims
      await user.getIdToken(true);
      
      const userDoc = await getUserById(user.uid);
      console.log('Fetched user data:', userDoc); // Debug log
      if (userDoc) {
        setUserData(userDoc);
      }
    } catch (err: any) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    }
  };

  const refreshUserData = async () => {
    if (currentUser) {
      console.log('Refreshing user data...'); // Debug log
      await fetchUserData(currentUser);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.uid); // Debug log
      setCurrentUser(user);
      setAuthInitialized(true);
      
      if (user) {
        setLoading(true);
        await fetchUserData(user);
        setLoading(false);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        await fetchUserData(user);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    loading: loading || !authInitialized,
    error,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {authInitialized && children}
    </AuthContext.Provider>
  );
};