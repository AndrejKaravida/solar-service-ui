import { createContext, ReactNode, useEffect, useState } from "react";
import {
  cognitoSignIn,
  cognitoSignOut,
  getCurrentUser,
} from "../services/authentication.service";
import { IUser } from "../Models/IUser";

interface AuthContextType {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const isLoggedIn = async () => {
      const user = await getCurrentUser();
      if (user) {
        const newUser = {
          role: user.attributes["custom:role"],
          email: user.attributes.email,
        };
        setUser(newUser);
      }
    };
    isLoggedIn();
  }, []);

  const signIn = async (email: string, password: string) => {
    await cognitoSignIn(email, password);
    const cognitoUser = await getCurrentUser();
    const newUser = {
      role: cognitoUser.attributes["custom:role"],
      email: cognitoUser.attributes.email,
    };
    setUser(newUser);
  };

  const signOut = async () => {
    await cognitoSignOut();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
