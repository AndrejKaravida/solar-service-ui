import { createContext, ReactNode, useEffect, useState } from "react";
import {
  cognitoSignIn,
  cognitoSignOut,
  getCurrentUser,
} from "../services/authentication";

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isLoggedIn = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    };
    isLoggedIn();
  }, []);

  const signIn = async (email: string, password: string) => {
    await cognitoSignIn(email, password);
    const user = await getCurrentUser();
    setUser(user);
  };

  const signOut = async () => {
    await cognitoSignOut();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
