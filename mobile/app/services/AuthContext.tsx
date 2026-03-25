
import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextValue = {
  userToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (e) {
      console.log("Erreur de récupération du token", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);


  const login = async (username: string, password: string) => {
    console.log(JSON.stringify({username, password}))
    
    const response = await fetch('http://192.168.1.125:8000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    


    if (!response.ok) {
        const errorInfo = await response.json();
        console.log("Erreur : ", errorInfo)
        return
    }

    if (response.ok) {
      const data = await response.json();
      setUserToken(data.token); // On met à jour la mémoire React
      await SecureStore.setItemAsync('userToken', data.token); // On sauvegarde dans le coffre
    } else {
      alert("Identifiants incorrects !");
    }
  };

  // Fonction pour se déconnecter
  const logout = async (): Promise<void> => {
    setUserToken(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};