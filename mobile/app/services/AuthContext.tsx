
import React, { createContext, useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextValue = {
  userToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  make_api_call : (method : string, url : string, body?: any) =>  Promise<any>;
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


  const logout = async (): Promise<void> => {
    setUserToken(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  const make_api_call = async (method : string, url : string, body : any = null) => {

    if (!userToken){
        alert("Unauthentificated user")
        throw new Error("No token available");
    }

    const options : RequestInit = {
        method : method,
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${userToken}`
        }
    }

    if (body){
        options.body = JSON.stringify(body) // if body != null, we add it in the request body
    }
    
    try{
        const response = await fetch (url, options);
        
        if (!response.ok){
            if (response.status == 401){
                alert("Token isn't valid anymore, please reconnect")
                logout();
            }

            const errorData = await response.json().catch(()=> null)
            console.error(`Erreur API (${response.status}) - ${errorData}`)
            throw new Error(`Servor error : ${response.status}`)
        }

        return await response.json()
    }catch(err){
        console.error(`Network error ${err}`)
        throw err
    }

  }

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout, make_api_call }}>
      {children}
    </AuthContext.Provider>
  );
};