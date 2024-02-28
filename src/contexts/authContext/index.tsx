"use client"
import { auth, googleAuthProvider } from '@/lib/firebase/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'

interface AuthContextProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, initializeUser)
      return unsub;
    }, [auth])

    async function initializeUser(user: any) {
      if (user) {
        setCurrentUser({...user});
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null)
        setUserLoggedIn(false)
      }
      setLoading(false);
    }
  }, [])
  const value = {
    currentUser,
    userLoggedIn,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider