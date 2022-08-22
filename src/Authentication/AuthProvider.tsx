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

  const createUser = async (): Promise<IUser | null> => {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }
    return {
      firstName: user.attributes.given_name,
      lastName: user.attributes.family_name,
      userId: user.attributes.sub,
      role: user.attributes["custom:role"],
      email: user.attributes.email,
    };
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      const user = await createUser();
      setUser(user);
    };
    isLoggedIn();
  }, []);

  const signIn = async (email: string, password: string) => {
    await cognitoSignIn(email, password);

    const user = await createUser();
    setUser(user);
  };

  const signOut = async () => {
    await cognitoSignOut();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
