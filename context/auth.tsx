
import { auth } from '@/services/firebaseConfig';
import React, { createContext, useState, useEffect } from 'react';

export type UserProps = {
    email: string | null
    id: string
}

type AuthContextProps = {
    user: UserProps | null
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log('auth state changed ' + user?.uid)
        if(user){
            setUser({
                email: user?.email,
                id: user?.uid
            });
        }else{
            setUser(null)
        }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
